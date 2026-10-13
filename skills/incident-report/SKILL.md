---
name: incident-report
description: Blameless post-incident report template with timeline, impact, cause, and actions. Use after any outage, data loss, or serious degradation.
---

# Incident report

Save as `knowledge/infra/incidents/YYYY-MM-DD-<topic>.md`. Blameless: describe systems and decisions, not people.

```markdown
# Incident: <short title>

- **Status:** resolved | monitoring
- **Severity:** S1 | S2 | S3
- **Duration:** <start> → <end> (time zone), total <min>
- **Detected by:** alert | user (via Dora) | team

## Impact
Who was affected, how many accounts or requests, which features, and whether there was data loss or a wrong charge.

## Timeline
- HH:MM — first signal
- HH:MM — detection
- HH:MM — action X
- HH:MM — recovery

## Root cause
What happened and why (use "5 whys" until you reach something actionable). Separate the trigger from the cause.

## What worked and what didn't
- Detection, communication, rollback, tooling.

## Actions
| Action | Type (prevent, detect, mitigate) | Owner | Ticket |
| --- | --- | --- | --- |

## Communication
What was said to users (Dora drafts it, the founder approves).
```

Rules:
- Publish a draft within 24 h of recovery, and review it with Bento and Julie when the cause is in the application.
- Every action becomes a ticket with an owner. Alfredo prioritizes them.
- No secrets, internal IPs, or personal data in the report.
