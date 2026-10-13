---
name: qa-handoff
description: Format for handing a change from the Engineer to QA. Use when finishing a PR that changes user-visible or risky behavior.
---

# QA handoff

Send Julie (in the Engineering room or via `coordinate_bots`) a message in this format:

```
QA handoff — <short title>
PR: <link>          Ticket: <link, if any>
Environment: <preview/staging URL, or how to run it locally>
Branch/commit: <branch> @ <short sha>

What changed (user-visible):
- ...

Acceptance criteria:
- [ ] ...

Where to look hardest (risk):
- ...

Test data: <test users/accounts, seeds, coupons — never real credentials in the message; say where they are>
Already verified: <lint/typecheck/tests that ran and their result>
Out of scope: <what does not change>
```

Rules:
- One handoff per PR.
- If the environment is not up yet, say when it will be; do not request QA on code that does not run.
- Answer Julie's questions on the PR so the history stays with the code.
