---
name: Fix bug
summary: Reproduce, find the root cause, fix it with a regression test, and hand it back to Julie.
triggers:
  - bug
  - fix
  - error
  - broken
  - hotfix
---
1. Read the ticket (usually filed by Julie) and reproduce it. If you cannot, comment on the ticket with what you tried and ask for the missing detail.
2. Follow the `diagnosing-bugs` skill: build a fast feedback loop, list hypotheses, and eliminate them one by one. Find the root cause, not just the symptom.
3. With the `tdd` skill, write a test that fails because of the bug first.
4. Fix it with the smallest diff that addresses the cause. Look for the same mistake elsewhere.
5. Run the new test and the relevant suite.
6. Open a `fix/<topic>` PR referencing the ticket, with root cause, fix, risk, and rollback, written with the `pr` skill.
7. Hand off to Julie with the `qa-handoff` skill. S1 and S2 bugs close only after Julie verifies them.
8. If the bug corrupted data, propose a data-repair plan with Toby and wait for the founder's approval.
