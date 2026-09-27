# Work checkpoint

## Objective

Stabilize the Electron-hosted ChatGPT Web integration across current and legacy UI variants: runtime repair, model/effort discovery, browser task lifecycle, and completion handling.

## Current status

- Completed: setup can repair a persisted runtime command whose old executable no longer exists.
- Completed: current pt-BR three-position power slider is recognized as authoritative even though ChatGPT omits redundant `data-locked="false"` attributes.
- Completed: current and legacy effort selectors remain in the selector sets.
- Completed: compact picker detection recognizes English and pt-BR accessible labels.
- Completed: a completed-looking planning card no longer commits the broker completion fence before the first delayed MCP claim; prospective workspace work remains active until an actual outcome, tool activity, cancellation, or the normal turn deadline.
- Completed: fresh ChatGPT browser conversations are now the default and are enabled in the active user config, preventing a retained Web transcript from replaying an expired/revoked per-turn Codex Native `turn_token` on the second message of the same Codex chat.
- Completed: the safe local-production restart finished; the restarted runtime is healthy on `127.0.0.1:17841`, accepts turns, and reports zero active HTTP/browser turns.
- Completed: authenticated Codex steering now closes the superseded stream with a terminal non-retryable `response.incomplete` event instead of `response.failed`, so a newer user instruction no longer produces the misleading `stream disconnected before completion` error on the replaced response.
- Completed: automatic mode now transports large compiled Codex contexts as integrity-checked text attachments by default, preventing ChatGPT's composer from rejecting the retry as an oversized inline message.
- Completed: an error action/alert that appears after the owned submission baseline is detected before an assistant DOM exists, so the first failed send terminates immediately instead of hanging for the two-minute response grace.
- Completed: English and pt-BR oversized-message alerts are classified as non-retryable inline failures; the bridge will not click/repeat the same oversized bubble.
- Completed: attachment transport now keeps the live `<codex_transport_resume>` and current `turn_token` inline while moving only bulky context/durable instructions into the text file. The token is removed from the attachment and appears exactly once across the complete transport.
- Completed: when bulky history is attached, the exact latest human-authored request is also repeated inline in a delimited JSON string immediately before the transport resume. It is explicitly authoritative over older requests, plans, interpretations, and assistant replies, preventing a semantically related stale dossier task from replacing the active UI request.
- Completed: context-attachment mode now also keeps a minimal Codex Native availability/action contract inline. It states that the selected connector is active and requires a real native call before claiming the executor, workspace, or editing tools are unavailable.
- Completed: the promoted inline active-user-request copy now receives the same retired turn/request/binding handle sanitization as the attached JSON envelope, preventing a token quoted by prior conversation content from competing with the current resume token.
- Completed: ephemeral broker capabilities now use a model-copy-safe lowercase hexadecimal representation (`turn_` plus 24 hex characters, 96 random bits) instead of mixed-case Base64URL. This preserves a strong local one-turn capability while preventing observed dropped-character corruption.
- Completed: native MCP authentication no longer depends exclusively on perfect model transcription. An unknown/corrupted handle resolves to the sole eligible active Native turn inside the private broker; known retired handles, Zero Risk requests, and ambiguous concurrent turns remain rejected. The broker returns the resolved token so MCP activity cleanup uses the real channel identity.
- Completed: automatic Native tools and prompts no longer expose or accept `turn_token` at all. The private MCP server claims the sole active Native broker channel internally; explicit request IDs remain only for manual Zero Risk, while ambiguous concurrent Native channels fail closed.
- Completed: context attachments no longer inflate the Codex model catalog to a fictitious 1,050,000-token window with a 950,000-token compaction threshold. Attachments remain a browser transport mechanism, while Codex now receives the real model limits and compacts before ChatGPT tool-use reliability collapses.
- Completed: the source browser helper was rebuilt at `F:\codex-chatgpt-web\.launcher-runtime\browser-helper.cjs`.
- Completed: safe local-production restart loaded the correction in PID 52680. The live authenticated `/v1/models` response now advertises Instant/Low as 41k with 32k auto-compaction and Sol/Medium/High as 90k with 80k auto-compaction.
- Completed: cached `Codex Native2` action schemas that still require the retired `turn_token` field are now supported without restoring token-based authentication. The public field is optional and deprecated; a fixed non-secret compatibility value satisfies stale ChatGPT-side validation while the MCP server ignores it and binds the sole active Native turn internally.
- Completed: both inline and attached-context prompts tell stale action forms to use `turn_automatic_binding_000000`, without exposing the private broker capability or contradicting the automatic-binding contract.
- Completed: the Windows tunnel client and its long-lived MCP child were explicitly replaced, followed by a safe launcher/runtime restart, so both public schema and prompt changes are live.
- Completed: every Native action form that exposes the compatibility field now receives `turn_automatic_binding_000000` unconditionally; the schema also advertises that non-secret value as its default instead of asking the model to wait for an impossible pre-dispatch validation failure.
- Completed: if ChatGPT claims that Codex Native, the executor, workspace, repository, or local files are unavailable before any MCP batch exists, the browser worker rejects that unverified prose and automatically retries the same active task on a fresh connector-bound response up to two times.
- Completed: a live two-turn continuity smoke with more than 30,000 characters in the first request proved both the attachment path and the second message in the same Codex chat call Native successfully.
- Completed: fixed the recurring `Codex ran out of room in the model's context window` failure on continued Web chats. File-backed transport now advertises a separate 1,050,000-token Codex-side safety ceiling with the official 95% usable-input reserve, while retaining each selected route's measured compaction trigger (Instant 32,000; Sol Medium/High 80,000; Pro 95,000). The hard input ceiling and compaction threshold are no longer derived into a nearly identical pair.
- Completed: audited the supplied `codex-chatgpt-web-main.zip` against the current working tree and official upstream 6.1.2. The ZIP has 22 source files absent from the current tree and 80 changed files, but wholesale replacement is unsafe because the current fork contains newer local MCP binding, completion-fence, context-attachment, queued-follow-up, and overthinking recovery behavior.
- Completed: identified the safest high-value selective porting candidates from the ZIP: current ChatGPT Activity DOM classification and turn binding, atomic effort-slider snapshots while preserving the local 3/legacy/5-position selectors, native `/api/auth/session` verification and explicit sign-in-required propagation, reply/code-card parsing hardening, and canonical `goal.internal_context` provenance.
- Completed: classified the ZIP's native-task bridge, Windows local scheduler, bundled-skill selection, connector renaming, and tray assets as optional product features rather than prerequisites for the current stability bugs. Broker/compaction changes require a separate semantic audit and must not overwrite the current tokenless Native binding or completion fence.
- Pending: continue investigating delayed completion/false idle behavior if it reproduces after the effort-control failure is removed.
- Pending: user acceptance retry of the actual dossier UI edit; the equivalent long-context/two-message transport is now proven end to end without touching the dossier repository.

## Evidence and validation

- Diagnostics showed authentication, temporary-chat navigation, composer readiness, and session verification succeeding; failure occurred immediately after `effort-slider-visible`.
- Live DOM inspection found one enabled `data-model-picker-power-slider` with semantic range `0..2`, value `1`, and three leaf ticks without `data-locked` attributes. The broader compatibility selector intentionally matched its menu, legacy wrapper, and dedicated owner.
- Live production-function probe returned availability `[true, true, true]`, selected High (`aria-valuenow=2`), then restored Medium (`aria-valuenow=1`, closed label `Média`).
- The failing workspace turn completed in about 27 seconds with two assistant blocks: the earlier block already exposed completion actions and the later block reported an invalid/revoked `turn_token`. This matches the completion fence accepting prospective progress before the delayed first connector claim.
- Comparing consecutive production traces proved that the first turn navigated to a temporary chat and selected Codex Native, while the second reused the retained ChatGPT transcript. That transcript contained the first turn's plaintext capability token, allowing ChatGPT to replay a token which the broker had already retired.
- The reported supersession happened after a browser turn had been accepted but exposed no assistant DOM for two minutes. A subsequent canonical instruction correctly took ownership; the defect was representing that expected ownership transfer as an upstream stream failure.
- The latest failing trace (`a443cb25c85a`) accepted a user turn but produced no assistant DOM for exactly the response grace. The screenshot showed the subsequent ChatGPT retry had resent about 180k inline characters and rendered `A mensagem enviada era longa demais`. Active config had `experimentalContextAttachments: false`, despite the existing attachment transport.
- Pre-response error detection compares newly visible error state against the exact pre-submit baseline. Historical error cards in retained chats therefore remain ignored, preserving current and legacy conversation modes.
- Traces `39937eb045f4` and `9b764dd0c549` proved that the connector was selected and the attachment uploaded, but no broker claim followed. Their visible prompt was only 332 characters because the live MCP resume/token had moved into the file; ChatGPT understood the task but treated Codex Native as unavailable.
- Trace `eba24db9e144` proved the hybrid token fix worked: the connector selected successfully, the current token was claimed as valid, and two `exec_command` calls completed. Its wrong dossier answer was therefore a separate recency/authority defect: the model selected an older hearing-scheduling request from the attached history instead of the latest request to move and restyle the overview cards.
- Trace `085b0e98d713` selected the modern connector and submitted a 1,793-character inline prompt with attached context, but emitted no broker claim before falsely reporting that Codex Native was unavailable. This isolated a third defect: the detailed tool-availability contract remained only in the attachment, so token presence alone did not reliably make the model attempt the connector.
- Trace `c32d12e3b14f` registered current token hash `87a197caa328`, but ChatGPT claimed stale hash `755fd4830059` and received `valid=false, retiredTurn=unknown`. The stale token survived only in the newly promoted raw active-request copy; the canonical attached envelope had already sanitized it.
- Trace `a376cabd2248` registered hash `cd02c5923ca6` for a 37-character Base64URL token, but ChatGPT claimed an unknown 36-character value with hash `140c0fe655de`. This was a one-character model-copy corruption rather than token retirement; the turn had a fresh conversation and the current broker channel was still active.
- Trace `8cd7b11d0085` proved representation alone was insufficient: a 29-character lowercase-hex token registered as hash `df950067b5c1`, while ChatGPT supplied a different 29-character hex value (`2e4d4e01afea`). The model can substitute a full capability even without changing its length, so exact textual copying cannot be the sole authentication transport.
- Trace `e87c7b4130fd` selected the connector and accepted the prompt but made no MCP call before claiming the executor was blocked. This showed that even a recoverable token schema still let the model reason about session authentication instead of using the tool; removing the field from the public Native ABI is required.
- Trace `7c0762ff8300` accepted an estimated 408,074-token input, selected the connector, and submitted successfully, but made no MCP claim before falsely reporting that the editing executor was unavailable. Earlier failures grew progressively from roughly 326k to 404k tokens. The model catalog was allowing this because `experimentalContextAttachments` alone advertised a 1.05m window and a 950k compaction threshold.
- `resolveChatGptWebContextLimits()` now derives limits from the selected model/account/effort even when context attachments are enabled. On Plus, ordinary Low remains 41k/32k and Medium/High 90k/80k; explicit Bigger Context triples the applicable effort-specific values (for example Low 123k/96k and High 270k/240k). File-backed transport therefore no longer disables native compaction.
- The hybrid transport preserves the composer-size fix while restoring MCP authority: task history stays attached, and the live one-turn capability remains in the primary message where ChatGPT's connector planner consumes it.
- Codex remains the conversation source of truth: fresh Web conversations do not create a new Codex chat and receive the recompiled Codex history plus exactly one current per-turn capability.
- Focused prospective-progress and tool-completion contracts passed. Turn-broker lifecycle assertions through token isolation passed, although that existing test file retained open handles and required termination after emitting its results.
- `bun test tests/chatgpt-web-harness.test.ts -t "sequential native messages honor fresh conversation"`: 2 passed, 0 failed (retained and fresh compatibility cases).
- `bun test tests/chatgpt-web-harness.test.ts -t "steering retires|identifies authenticated steering"`: 2 passed, 0 failed.
- Focused send/retry/context regression suite: 12 passed, 0 failed across browser worker, context attachment, and runtime config contracts.
- Hybrid context/token transport tests: 9 attachment tests passed, including exact single-token placement; TypeScript passed. The broader prompt-contract run emitted 33 passes and one unrelated pre-existing compaction trim-count mismatch (`expected 2`, `received 1`).
- Active-request authority regression passed: the inline message contains the newest card/steps request after an attached older hearing request and before the resume block. The focused attachment/prompt run now emits 34 passes and the same unrelated pre-existing compaction trim-count mismatch; TypeScript passes.
- Minimal inline bridge-contract regression passed with the attachment suite: 10 passed, 0 failed; TypeScript passes.
- Retired-token collision regression passed: a stale token quoted in the active-request copy is removed while the current resume token remains exactly once. Full attachment suite: 11 passed, 0 failed; TypeScript passes.
- Model-copy-safe token regression passed: broker registration returns `^turn_[a-f0-9]{24}$` and the exact token claims successfully while the browser turn remains alive; TypeScript passes.
- Unique-active recovery regression passed: one active Native channel recovers an unknown model-corrupted token; adding a second active channel makes the same recovery fail closed; a known retired token never redirects. Focused broker lifecycle: 3 passed, 0 failed; TypeScript passes.
- The earlier tokenless Native MCP ABI integration passed end to end: repeated exec/inventory/tool-search/wait calls bound automatically, queued, delivered, completed, and settled activities with 135 assertions. The later ChatGPT cache-compatibility layer intentionally re-exposes only an optional non-authoritative field with a fixed default; broker authority remains automatic and tokenless.
- `bun run typecheck`: passed.
- `bun test tests/chatgpt-session.test.ts tests/model-contract.test.ts tests/chatgpt-web-models.test.ts`: 44 passed, 0 failed.
- Focused catalog/route validation against the corrected attachment contract: 37 passed, 0 failed across `chatgpt-web-models`, `model-catalog`, and `server-models`; TypeScript passed.
- Full repository suite: 794 passed, 3 skipped, 39 failed, 1 unhandled error. The failures include intentionally stale public-token and 950k attachment-window expectations plus older browser fixtures that do not expose newly required methods. Per the workspace rule, tests were not updated in this execution; the production correction remains type-safe and the tokenless MCP integration itself passed 135 assertions.
- Direct source probe after the correction returned Low 41,000/32,000, High 90,000/80,000, and Bigger Context High 270,000/240,000. The authenticated catalog from the restarted process returned the same ordinary Plus limits.
- Post-restart health: status `ok`, accepting turns, model catalog requests succeeding, replacement runtime PID 52680.
- Live MCP schema probe: `codex_apply_patch` exposes `turn_token` as optional, documents the fixed compatibility value, and accepts that value through schema validation before reaching the broker boundary.
- End-to-end Web smoke through `chatgpt-web/high`: ChatGPT invoked the Native `exec` action, the outer Codex executed `git rev-parse --show-toplevel`, the tool result returned to ChatGPT, and the final answer reached Codex as `MCP_SMOKE_OK F:/codex-chatgpt-web`. This proves the stale required-field form no longer blocks dispatch.
- Clean Instant end-to-end smoke through `chatgpt-web/gpt-5.6-sol-instant` with explicit Low effort: Native `exec` ran `Get-Location | Select-Object -ExpandProperty Path` successfully in 217 ms and the final answer returned as `INSTANT_MCP_OK F:\codex-chatgpt-web`. An intentional first attempt with inherited High effort was rejected before browser work, confirming the Instant route enforces its supported effort instead of silently selecting another mode.
- Latest live processes after the compatibility deployment: runtime PID 49440, tunnel PID 12336, MCP PID 30480; health `ok`, accepting turns, zero active turns after the smoke.
- Local service health: version 6.1.0, accepting turns, zero active HTTP/browser turns.
- Trace `c87832de4f5c` proved the latest real dossier failure never reached MCP: ChatGPT selected the connector and completed its prose between 22:28:31 and 22:28:50, while the tunnel log contained no request after startup. The workspace did not reject the turn; ChatGPT finalized an unverified cached-form/authentication claim before dispatch.
- The exact reported Portuguese blocker is classified as false Native unavailability, while a normal successful workspace conclusion is not.
- The rebuilt helper passed TypeScript and live prompt probes: both inline and attached transports contain the unconditional compatibility instruction and the context attachment remains present.
- Live `tools/list` after restart shows `codex_apply_patch.turn_token.default = turn_automatic_binding_000000`; the field remains non-authoritative and the required tool argument is still only `patch`.
- Safe restart loaded runtime PID 41696; health returned `ok`, `accepting_turns=true`, and zero active turns before smoke validation.
- Post-restart simple smoke: ChatGPT called Native `exec`, `(Get-Location).Path` returned `F:\codex-chatgpt-web`, and the final response was `ROOT_RECOVERY_OK F:\codex-chatgpt-web`.
- Post-restart long-context continuity smoke: turn 1 carried more than 30,000 characters, used the attachment path, called Native `exec`, and returned `LONG_FIRST_OK F:\codex-chatgpt-web`; turn 2 resumed the same Codex session, called Native `exec` again, ran `git branch --show-current`, and returned `LONG_SECOND_OK main`.
- Root context-window evidence: the failing catalog contract exposed 270,000 tokens with an 89% usable window (240,300) and a 240,000 auto-compact trigger, leaving only 300 tokens for prefix/tool/output headroom. Official Codex metadata treats these as independent controls.
- Final live catalog after restart: `chatgpt-web/gpt-5.6-sol-instant` advertises 1,050,000 / 95% / 32,000 and `chatgpt-web/gpt-5.6-sol` advertises 1,050,000 / 95% / 80,000 for context / effective percent / auto-compact.
- Continuation pressure smoke: one synthetic attached-context Codex session completed seven consecutive turns. Its final turn succeeded with 319,726 input tokens, well beyond the former 240,300 hard ceiling, and returned `PRESSURE_TURN_SEVEN_OK` without requiring a new thread.
- Final runtime restart loaded the source correction in PID 35652; health returned `ok`, `accepting_turns=true`, and the live authenticated model catalog returned the corrected limits.
- Final post-audit health check on `http://127.0.0.1:17841/healthz`: PID 35652, status `ok`, `accepting_turns=true`, 44 successful model-catalog requests, and zero active HTTP/browser turns. No ZIP code was imported during the audit.

## Modified files

- `src/config.ts`: setup-only tolerance for a missing stale runtime executable; ordinary config loading remains strict.
- `src/config.ts`: fresh browser conversation per Codex turn is the safe default for new configs.
- `src/chatgpt-session.ts`: structural availability/selection support for the current three-position power slider while preserving legacy and five-position behavior.
- `src/chatgpt-web-models.ts`: context attachments no longer replace real model context and compaction limits with the artificial 1.05m/950k values.
- `src/adapters/chatgpt-web/model.ts`: defines the fixed non-secret compatibility value for cached Native2 action forms.
- `src/adapters/chatgpt-web/mcp-server.ts`: accepts the retired field as optional compatibility input while continuing to resolve Native authority internally.
- `src/adapters/chatgpt-web/mcp-server.ts`: publishes the fixed compatibility value as the optional field default and instructs callers to always provide it when that cached/current field is exposed.
- `src/adapters/chatgpt-web/browser-worker.ts`: localized compact-picker recognition.
- `src/adapters/chatgpt-web/browser-worker.ts`: keep tool-capable future-tense progress non-terminal even before the first tool batch.
- `src/adapters/chatgpt-web/browser-worker.ts`: detect newly appeared pre-response errors and localized oversized-message alerts without matching historical failures.
- `src/adapters/chatgpt-web/browser-worker.ts`: reject and internally retry unverified Native/workspace-unavailable conclusions that contain no MCP tool batch.
- `src/config.ts`: context attachments default on for automatic mode; explicit opt-out remains available and manual mode remains attachment-free.
- `src/adapters/chatgpt-web/prompt.ts`: split the live MCP resume from large attached context and restore it inline without token duplication.
- `src/adapters/chatgpt-web/prompt.ts`: preserve the exact latest human request as prompt metadata and repeat it inline only when the bulky history is moved to context files.
- `src/adapters/chatgpt-web/prompt.ts`: require the fixed compatibility value on every exposed legacy field before the first dispatch attempt, including attachment transport.
- `tests/context-attachment.test.ts`: regression coverage proving the current token is inline, absent from context files, and unique across the full transport.
- `tests/browser-worker-contract.test.ts`: regression coverage for immediate pre-response failure and localized oversized-message rejection.
- `tests/runtime-layout.test.ts`: align the default fresh-conversation contract with the safe source default.
- `src/adapters/chatgpt-web/adapter-error.ts`: distinguish authenticated steering from ordinary browser/client cancellation without changing its revocation contract.
- `src/adapters/chatgpt-web/index.ts`: serialize a superseded old response as terminal incomplete rather than failed.
- `tests/chatgpt-web-harness.test.ts`: regression coverage for the distinct authenticated-steering error type.
- `.cursor/state/WORK_CHECKPOINT.md`: operational state for continuation.

## Preserved user changes

- `run-local-production.cmd` was inspected but not modified.

## Next exact step

If the user authorizes implementation, port the first low-risk stability batch semantically rather than copying whole files: Activity/progress DOM classification plus owned-turn rebinding, then the atomic effort snapshot while retaining all local selector variants. Validate TypeScript and live browser behavior, restart through `scripts/restart-local-production-safe.ps1`, and only then consider the authentication-session batch. User acceptance can also retry the original dossier UI request in its existing Codex chat; the long-context continuation path is now proven beyond the former hard ceiling.
