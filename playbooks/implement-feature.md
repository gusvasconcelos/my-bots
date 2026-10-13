---
name: Implement feature
summary: Take a ticket from Alfredo to a verified PR, test-first, with review and a handoff to Julie.
triggers:
  - feature
  - implement
  - new functionality
  - ticket
  - build this
---
1. Confirm there is a ticket (from the `to-tickets` skill) with acceptance criteria and no open blockers. If there is none, ask Alfredo or, if it is small, write the acceptance criteria and confirm them with Alfredo.
2. Read the channel instructions, `docs/agents/`, `GLOSSARY.md`, and the ADRs in the area. If `docs/agents/` does not exist, first run the `setup-matt-pocock-skills` skill with the founder.
3. Branch off `main` and implement with the `implement` skill (one ticket) or `implement-spec` (a whole spec): tests first with `tdd`, frequent typechecks and test runs, full suite at the end.
4. For screens and components, follow the `frontend-design` skill.
5. Review your own diff with `code-review` and fix what it flags.
6. Open the PR with the body in the `pr` skill's format (summary, before/after evidence, merge danger).
7. Hand off to Julie with the `qa-handoff` skill, and fix anything Julie rejects in the same PR.
8. With an Approved verdict, ask the founder to merge, with a one-line summary and the PR link.
