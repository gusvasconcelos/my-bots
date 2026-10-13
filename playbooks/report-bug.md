---
name: Report bug
summary: File a reproducible bug ticket with severity and evidence, without duplicates.
triggers:
  - file bug
  - report bug
  - bug ticket
  - issue
  - production error
---
1. Search the issue tracker for the same or a similar ticket (title, error message, route). If one exists, comment on it with the new occurrence and evidence instead of filing another.
2. Reproduce it at least twice and reduce it to the minimal steps.
3. Collect evidence with the `visual-evidence` skill, plus the relevant log excerpt or stack trace. Strip personal data and secrets.
4. Assign severity:
   - S1: system down, data loss or leak, wrong charge;
   - S2: main flow broken with no workaround;
   - S3: failure with a workaround, or in a secondary flow;
   - S4: cosmetic.
5. Write the ticket with the `bug-ticket` skill and apply the project's labels (see `docs/agents/`).
6. If it came from Dora, reply on the escalation with the ticket link and what to tell the user.
7. S1 and S2: notify Bento, Alfredo, and the founder in the channel right away, with the ticket link. If it is infrastructure, notify Toby.
