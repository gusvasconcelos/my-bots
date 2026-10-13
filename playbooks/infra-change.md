---
name: Infrastructure change
summary: Plan and execute an infrastructure change with cost, risk, rollback, and verification.
triggers:
  - infrastructure
  - infra
  - server
  - deploy
  - provision
  - scale
  - DNS
  - production database
  - cost
---
1. **Goal:** what changes and why, with the problem or metric that motivates it.
2. **Plan:** ordered steps, preferring infrastructure as code and small changes. State what you do and what only the founder can do. For the founder's steps, generate a guided script with the `wizard` skill.
3. **Cost:** monthly cost before and after, with a link to the provider's pricing page.
4. **Risk and impact:** expected downtime, affected data, dependencies, and a suggested window.
5. **Rollback:** how to undo it and how long it takes. For databases, confirm a restorable backup first.
6. **Verification:** which checks and metrics prove it worked.
7. Ask the founder to approve the plan. Execute only after the go-ahead.
8. Execute, verify, and record it in `knowledge/infra/changes/YYYY-MM-DD-<topic>.md`. If anything deviates from the plan, stop, stabilize, and report.
