---
name: escalate-to-qa
description: Format for escalating a user ticket that looks like a bug from Support to QA. Use whenever a ticket points to wrong product behavior.
---

# Escalate to QA

Send to Julie (in the Support room or via `coordinate_bots`):

```
Support escalation — <one-line summary>
Ticket: <link or ID>      Received: YYYY-MM-DD HH:MM (time zone)
Account: <internal account ID; never name, email, or ID documents>
Plan: <if known>          Environment: production | other

What the user tried to do:
...

Expected vs. actual:
...

Steps the user described (in their words, without personal data):
1. ...

Browser / OS / device: ...
Error message or screenshot sent: <link, with personal data covered>
Already tried: <clearing cache, another browser, checking the docs...>
Similar reports: <count and links>
Impact on the user: blocked | has a workaround (<which>) | annoyance
What I told the user: <summary>
```

Rules:
- One escalation per problem. If several users report the same thing, update the existing escalation with the count.
- If users are blocked and many reports arrive at once, notify Toby too (it may be an outage).
- When Julie replies with the ticket, save the link on the support ticket and agree with Julie on what to tell the user.
