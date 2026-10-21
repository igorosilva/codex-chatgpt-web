---
name: frontend-visual-qa
description: Use when a web application needs complete responsive visual QA, rendered interaction coverage, or correction of reproducible layout defects across pages and viewports.
---

# Frontend Visual QA

Perform corrective responsive QA against the running application and its source. The unit of coverage is:

`page + viewport + content + state + interaction`

Screenshots and static source inspection are evidence, not substitutes for navigating, exercising, correcting, and revalidating the real interface.

## Operating contract

Use this end-to-end flow:

`discover -> navigate -> test -> interact -> detect -> reproduce -> find root cause -> correct -> revalidate -> check regressions -> report`

For every actionable defect, complete this loop before moving on:

`detect -> reproduce -> identify root cause -> correct -> revalidate -> check regressions`

Do not leave a technically feasible in-scope correction as a recommendation. Preserve valid behavior, architecture, the design system, accessibility, and visual identity. A scenario may remain unresolved only when an external dependency, missing access/data, unavailable environment, inaccessible route, pre-existing blocking error, or real tool limitation prevents progress; record it as `BLOQUEADO` and continue all independent work.

Avoid destructive interactions. Open and inspect a deletion confirmation, for example, but do not confirm deletion merely to test responsiveness. Do not create or modify automated tests unless the user explicitly asks.

## Establish capabilities and the coverage ledger

Before QA:

1. Read project instructions and inspect the current working tree without discarding existing changes.
2. Confirm the application can be rendered. Whenever Playwright is available in the execution context, you MUST use it for the rendered responsive validation, including exact viewport execution, navigation, interaction, geometry inspection, correction revalidation, and regression checks. Do not replace available Playwright coverage with static inspection, screenshots alone, or a manual-only pass. Use equivalent browser automation only when Playwright is unavailable or technically incompatible, and record that limitation. Confirm the relevant source can be edited and validated.
3. Create a coverage ledger containing discovered pages, layouts, viewports, content variants, states, interactions, components, findings, corrections, regression targets, evidence, and blockers. Update it during execution.
4. If an essential capability is absent, do not claim it exists. Mark only the affected scenarios `BLOQUEADO`; static inspection does not make runtime coverage pass.

## Discover the application completely

Do not rely only on URLs supplied by the user. Combine routing/source inspection with real navigation through menus, sidebars, links, tabs, and internal flows. Inventory:

- public and authenticated routes;
- static and dynamic route patterns, obtaining safe representative records for dynamic pages;
- list, detail, create, and edit pages;
- routes exposed by navigation and routes present only in routing code;
- shared layouts and visually distinct route states.

Deduplicate aliases that render the same page and record the reason. A route pattern with materially different layout/content states needs representative coverage for each state. A page that was not discovered or opened is not approved.

## Inventory visual states and interactions

For each page, identify all visually relevant elements and states. The inventory is open-ended and includes:

- containers, Grid/Flex layouts, headers, sidebars, desktop/mobile navigation, breadcrumbs, tabs, cards, metrics, sticky/fixed elements, and shared shells;
- forms and conditional fields; inputs, textareas, selects, searchable comboboxes, filters, checkboxes, radios, switches, money fields, validation and helper text;
- dropdowns, menus, popovers, tooltips, accordions, toasts, modals, dialogs, drawers, and confirmations;
- DatePickers, MonthPickers, calendars, period navigation, complex calendar groups, and detail panels;
- tables, long columns, actions, checkboxes, sorting, row/bulk selection, sticky headers/columns, pagination, empty and loading states;
- charts, axes, labels, legends, points/segments, hover/focus tooltips, aspect ratio, and intentional internal scrolling;
- loading, empty, error, success, disabled, focus, hover, selected, open/closed, expanded/collapsed, and Light/Dark states when present.

This list is a reference, not a whitelist. Exercise discovered interactions rather than observing only the initial state: open overlays and pickers, search selects, apply safe filters, change tabs/views, navigate periods and pagination, sort, select rows, expand groups, open mobile navigation, toggle sidebars, and inspect chart interaction when technically possible.

Use realistic stress content where safely available: long titles and labels, large monetary values, dates, badges, descriptions, validation messages, multiple actions, dense lists, and high-information states. Do not mutate persistent data merely to manufacture content unless the user authorized it.

## Separate baseline coverage from interaction coverage

Maintain two linked matrices instead of multiplying every state by every width:

1. **Page-width baseline:** open every discovered page at every mandatory width and inspect its initial/default rendered state, visible content, global geometry, overflow, navigation, and page-level layout. No width may be inferred from a neighbor.
2. **State-interaction coverage:** exercise every discovered state and interaction at the smallest and largest relevant width of each distinct responsive layout mode, at actual breakpoint boundaries when the layout changes, at any width where the component is near a viewport edge, and at every width where a defect was observed.

Every interaction record must still name its page, exact viewport, content, state, and action. Expand interaction coverage to additional mandatory widths whenever geometry, placement, available actions, or content flow differs. Run the full Cartesian product only when the user explicitly requests it or evidence shows that a state behaves materially differently at each width.

Work in bounded route/component batches: baseline, exercise high-risk states, fix a reproduced defect immediately, revalidate its exact scenario and affected consumers, then continue. Do not postpone all corrections until the entire inventory is complete, and do not rerun unaffected matrix cells after a localized change.

## Execute every required viewport

Run every discovered page at every required width; resolution sampling is not allowed.

| Class | Required widths |
|---|---|
| Mobile | 320, 360, 375, 390, 430 |
| Tablet | 768, 1024 |
| Notebook/Desktop | 1280, 1366, 1440, 1536, 1920, 2560 |
| Ultrawide stress test | 3440 when technically viable |

The minimum baseline matrix is all pages multiplied by the 13 mandatory widths through 2560. Each width must actually be set and recorded; neighboring widths do not imply a pass. States and interactions follow the separate risk-based matrix above and may never be reported as validated unless actually exercised at the recorded viewport. Record a genuinely unreachable scenario as `BLOQUEADO`, never as sampled coverage. Use a representative height appropriate to the environment, then also inspect vertical reachability and scrolling for long content and overlays.

QA viewports are not CSS breakpoints. Never create media queries for every validation width. During correction, prefer fluid layout and existing breakpoints; add a breakpoint only where content actually changes layout. When a transition is relevant, test immediately around it, such as `767 -> 768 -> 769`.

Light/Dark need not blindly duplicate the entire matrix when theme changes only paint, but all theme-dependent surfaces and states must be checked in both themes. At 1920, 2560, and 3440 when available, also inspect excessive stretching, line length, oversized cards/charts/forms, unbalanced grids, empty space, and lost hierarchy.

## Inspect responsive behavior

At each applicable matrix cell and exercised state, verify:

- container width/min/max width, height/min/max height, padding, margin, gap, alignment, distribution, wrapping, nesting, positioning, and content relationship;
- global and local overflow, clipping, overlap, collision, double scrolling, compressed controls, broken grids, disproportionate whitespace, and elements wider than the viewport;
- content readability and reachability, not merely whether its outer container fits;
- keyboard focus, semantic access, contrast, touch targets, reduced motion, and functional behavior affected by layout.

For overlays and floating UI, verify edge collision, flip/shift behavior, z-index, backdrop, width/height constraints, internal scroll, close control, header/body/footer, long content, forms, and reachable actions. On mobile, no side may become inaccessible and scrolling must belong to the correct element.

For tables, do not compress columns indefinitely. If horizontal scroll is necessary, contain it within the table region; keep header/body aligned and first/last columns and actions reachable without creating page-level horizontal overflow. Validate pagination controls, ellipsis, summary, disabled states, wrapping, and page-size options such as 10/25/50/100 when present.

For charts, fitting the box is insufficient: labels, axes, legends, marks, and tooltips must remain legible and understandable, while large screens must not stretch the visualization disproportionately.

## Correct at the root cause

Use rendered evidence and DOM/computed-style/geometry inspection to reproduce the failure, then trace it to the responsible source. Correct at the highest appropriate reusable level:

`shared component or Design System -> global/layout primitive -> page -> justified local exception`

Before changing a shared component, identify its consumers and add them to regression coverage. Prefer existing tokens and primitives, CSS Grid, Flexbox, `minmax()`, `clamp()`, `min()`, `max()`, relative units, wrapping, content-aware sizing, and intentional local overflow.

Avoid `!important`, duplicated CSS, unexplained magic numbers, device-specific hacks, per-viewport breakpoints, hiding functionality, deleting information to make it fit, fixed dimensions that cause clipping, and out-of-scope refactors. Do not truncate meaningful text solely for visual uniformity; use clamping only when the product permits hidden content and preserves access to it.

After each correction:

1. reload or otherwise render the updated code;
2. repeat the exact failing page, viewport, content, state, and interaction;
3. test relevant adjacent widths or breakpoint boundaries;
4. recheck functional behavior and accessibility affected by the change;
5. revalidate affected consumers and responsive layout modes when shared components, AppShell, global CSS, navigation, containers, overlays, fields, tables, pagination, charts, headings, or sections changed; do not restart the entire clean matrix unless the change can affect it globally;
6. run proportionate source validation such as typecheck, lint, and build without altering tests unless requested;
7. update the ledger with evidence and result.

## Approval and reporting contract

Use only these results:

- `OK`: executed and passed without a required correction;
- `Corrigido`: defect fixed and revalidated, including applicable regressions;
- `BLOQUEADO`: not executable for a recorded external reason;
- `Falhou`: executed but still failing; continue correcting unless a real blocker is established.

Never equate absence of evidence with approval:

- page or viewport not executed is not `OK`;
- an interaction not exercised is not validated;
- an unopened modal, picker, dropdown, drawer, or dialog is not validated;
- a partially inspected table is not validated;
- an interactive chart not exercised when possible is not completely validated.

The final report must be concise but verifiable. Include this page matrix:

`Página | 320 | 360 | 375 | 390 | 430 | 768 | 1024 | 1280 | 1366 | 1440 | 1536 | 1920 | 2560 | Resultado`

Also report:

- total pages discovered, opened, tested, and blocked;
- viewports actually executed, with 3440 listed separately when used;
- components, content variants, states, and interactions exercised, including their exact page and viewport;
- defects found, root causes, corrections, and revalidation evidence;
- files and shared components changed;
- regression consumers and scenarios checked;
- unresolved failures and exact blockers.

Do not claim generic “responsiveness validated” without the ledger supporting complete page, viewport, state, and interaction coverage.
