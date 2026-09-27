import { describe, expect, test } from "bun:test";
import {
  CHATGPT_CONTEXT_ATTACHMENT_THRESHOLD_CHARS,
  CHATGPT_CONTEXT_ATTACHMENT_MAX_BYTES,
  contextAfterLatestCompactionSummary,
  largeContextAsAttachment,
  type CompiledChatGptWebPrompt,
} from "../src/adapters/chatgpt-web/prompt";
import { SUMMARY_PREFIX } from "../src/responses/compaction";
import type { CodexMessage } from "../src/types";
import { validateSkillFiles } from "../src/adapters/chatgpt-web/skill-attachments";
import {
  estimateCompiledChatGptWebInputTokens,
  estimateCompiledChatGptWebMessageTokens,
} from "../src/adapters/chatgpt-web/input-tokens";

function prompt(text: string): CompiledChatGptWebPrompt {
  return { text, images: [] };
}

describe("large context attachment transport", () => {
  test("moves a large inline envelope to one text attachment", () => {
    const original = "x".repeat(CHATGPT_CONTEXT_ATTACHMENT_THRESHOLD_CHARS);
    const result = largeContextAsAttachment(prompt(original), true);
    expect(result.text.length).toBeLessThan(500);
    expect(result.skillFiles?.[0]?.name).toMatch(/^codex-task-context--[a-f0-9]{16}\.txt$/);
    expect(result.skillFiles?.[0]?.text).toBe(original);
    expect(result.skillFiles?.[0]?.contextTransport).toBe(true);
    expect(() => validateSkillFiles(result.skillFiles)).not.toThrow();
  });

  test("counts uploaded context in total input but not in the visible message boundary", () => {
    const original = "historical context ".repeat(20_000);
    const result = largeContextAsAttachment(prompt(original), true);
    const messageTokens = estimateCompiledChatGptWebMessageTokens(result, "gpt-5.6-sol");
    const inputTokens = estimateCompiledChatGptWebInputTokens(result, "gpt-5.6-sol");

    expect(result.skillFiles?.[0]?.contextTransport).toBe(true);
    expect(messageTokens).toBeLessThan(1_000);
    expect(inputTokens).toBeGreaterThan(40_000);
  });

  test("splits oversized UTF-8 context into ordered files without breaking characters", () => {
    const original = `${"x".repeat(CHATGPT_CONTEXT_ATTACHMENT_MAX_BYTES - 2)}🙂tail`;
    const result = largeContextAsAttachment(prompt(original), true);
    expect(result.skillFiles).toHaveLength(2);
    expect(result.skillFiles?.map(file => file.text).join("")).toBe(original);
    expect(result.skillFiles?.map(file => file.name)).toEqual([
      expect.stringMatching(/^codex-task-context-part-01-of-02--[a-f0-9]{16}\.txt$/),
      expect.stringMatching(/^codex-task-context-part-02-of-02--[a-f0-9]{16}\.txt$/),
    ]);
    expect(result.skillFiles?.every(file => Buffer.byteLength(file.text, "utf8") <= CHATGPT_CONTEXT_ATTACHMENT_MAX_BYTES)).toBe(true);
    expect(result.text).toContain("in order");
    expect(() => validateSkillFiles(result.skillFiles)).not.toThrow();
  });

  test("drops oldest user files to reserve context slots while preserving newer files", () => {
    const occupied = Array.from({ length: 9 }, (_, index) => ({
      name: `file-${index}.bin`, mimeType: "application/octet-stream", base64: "YQ==", sha256: "0".repeat(64),
    }));
    const oversized = {
      ...prompt("x".repeat(CHATGPT_CONTEXT_ATTACHMENT_MAX_BYTES + 1)),
      inputFiles: occupied,
    };
    const result = largeContextAsAttachment(oversized, true);
    expect(result.inputFiles).toHaveLength(8);
    expect(result.inputFiles?.[0]?.name).toBe("file-1.bin");
    expect(result.skillFiles).toHaveLength(2);
    expect(result.text).toContain("codex-task-context-part-01-of-02");
  });

  test("keeps small prompts inline and obeys the preference", () => {
    const small = prompt("small task");
    expect(largeContextAsAttachment(small, true)).toBe(small);
    const large = prompt("x".repeat(CHATGPT_CONTEXT_ATTACHMENT_THRESHOLD_CHARS));
    expect(largeContextAsAttachment(large, false)).toBe(large);
  });

  test("keeps the live MCP resume and turn token inline while attaching only bulky context", () => {
    const token = "turn_12345678901234567890123456789012";
    const resume = [
      "<codex_transport_resume>",
      `The task context is complete. Pass turn_token ${token} unchanged to every Codex Native call in this response. Execute the latest active user request now.`,
      "</codex_transport_resume>",
    ].join("\n");
    const original = `${"historical context ".repeat(20_000)}\n${resume}`;
    const result = largeContextAsAttachment(prompt(original), true);

    expect(result.text).toContain(resume);
    expect(result.text).toContain(token);
    expect(result.text).toContain("Codex Native is selected and active for this response");
    expect(result.text).toContain("Do not claim that the executor, workspace, or editing tools are unavailable");
    expect(result.skillFiles?.map(file => file.text).join("")).not.toContain(token);
    expect(result.skillFiles?.map(file => file.text).join("")).not.toContain("<codex_transport_resume>");
    expect(`${result.text}\n${result.skillFiles?.map(file => file.text).join("")}`.match(new RegExp(token, "g"))).toHaveLength(1);
  });

  test("keeps the latest human request authoritative inline when history moves to an attachment", () => {
    const latest = "Move the dossier cards to the top and restore the numbered next steps.";
    const result = largeContextAsAttachment({
      ...prompt(`${"old hearing request ".repeat(20_000)}\n<codex_transport_resume>Execute the latest active user request now.</codex_transport_resume>`),
      activeUserRequest: latest,
    }, true);

    expect(result.text).toContain("exact latest human-authored request");
    expect(result.text).toContain(JSON.stringify(latest));
    expect(result.text.indexOf(JSON.stringify(latest))).toBeLessThan(result.text.indexOf("<codex_transport_resume>"));
    expect(result.skillFiles?.map(file => file.text).join("")).not.toContain(latest);
  });

  test("removes a retired token from the inline active-request copy", () => {
    const staleToken = "turn_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    const currentToken = "turn_BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB";
    const result = largeContextAsAttachment({
      ...prompt(`${"history ".repeat(20_000)}\n<codex_transport_resume>Pass turn_token ${currentToken} unchanged.</codex_transport_resume>`),
      activeUserRequest: `Retry the edit after the prior response mentioned ${staleToken}.`,
    }, true);

    expect(result.text).not.toContain(staleToken);
    expect(result.text).toContain("[retired turn handle]");
    expect(result.text.match(new RegExp(currentToken, "g"))).toHaveLength(1);
  });

  test("does not replace an already transactional multipart prompt", () => {
    const multipart = {
      ...prompt("x".repeat(CHATGPT_CONTEXT_ATTACHMENT_THRESHOLD_CHARS)),
      multipart: { parts: ["one", "two"] as [string, string], commit: "commit" },
    };
    expect(largeContextAsAttachment(multipart, true)).toBe(multipart);
  });
});

describe("post-compaction context selection", () => {
  test("keeps instructions and the latest compacted checkpoint without replaying stale history", () => {
    const messages: CodexMessage[] = [
      { role: "developer", content: "persistent instruction", timestamp: 1 },
      { role: "user", content: "old request", timestamp: 2 },
      { role: "assistant", content: [{ type: "text", text: "old response" }], timestamp: 3 },
      { role: "user", content: `${SUMMARY_PREFIX}\nCumulative checkpoint`, timestamp: 4 },
      { role: "user", content: "current request", timestamp: 5 },
    ];

    expect(contextAfterLatestCompactionSummary(messages)).toEqual([
      messages[0],
      messages[3],
      messages[4],
    ]);
  });

  test("does not alter history when no readable checkpoint exists", () => {
    const messages: CodexMessage[] = [{ role: "user", content: "current request", timestamp: 1 }];
    expect(contextAfterLatestCompactionSummary(messages)).toEqual(messages);
  });
});
