---
name: bug-ticket
description: Bug ticket template for GitHub Issues or Linear, with steps, severity, and evidence. Use whenever you file or update a bug.
---

# Bug ticket

Title: `[S<n>] <where> — <what happens> when <action>`
Example: `[S2] Checkout — payment fails when applying a 100% coupon`

```markdown
## Summary
<one sentence on the impact for the user>

## Environment
- Product/service: ...
- Environment: production | staging | preview <URL>
- Version/commit: ...
- Browser/device: ...
- When: YYYY-MM-DD HH:MM (time zone)

## Steps to reproduce
1. ...
2. ...

## Expected result
...

## Actual result
...

## Evidence
- Recording: <link>
- Screenshot: <link>
- Log/stack trace:
  ```
  <minimal excerpt, no personal data or secrets>
  ```

## Impact
- Severity: S1 | S2 | S3 | S4 — <why>
- Frequency: always | intermittent (<x of y attempts>)
- Affected users (estimate): ...

## Leads (optional)
<hypothesis about the cause, suspect PR or commit — labeled as a hypothesis>
```

Labels: `bug`, `S1`…`S4`, and the product name, following the triage labels in `docs/agents/`. In Linear, use the matching priority (S1 = Urgent, S2 = High, S3 = Medium, S4 = Low).
