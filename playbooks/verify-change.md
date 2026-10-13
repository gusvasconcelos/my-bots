---
name: Verify change
summary: Review, test, and attack a change by risk, capture evidence, and return a clear verdict.
triggers:
  - verify
  - test
  - handoff
  - ready for QA
  - validate PR
  - QA review
---
1. Read the handoff, the ticket, the PR, and the diff. If there are no acceptance criteria, write your own and confirm them with Bento.
2. Review the code with the `code-review` skill (project standards and spec compliance). Comment on the PR.
3. Build a risk-based test plan:
   - main flow end to end;
   - edges: empty, limits, invalid values, unicode, concurrency, large data;
   - permissions: user without access, another tenant, expired session;
   - states: loading, error, success, offline;
   - responsive/mobile and basic accessibility (keyboard, contrast, labels);
   - regressions in the neighboring flows the diff touches.
4. Run it in the stated environment (preview, staging, or local). Never use real customer data.
5. Capture evidence with the `visual-evidence` skill: a screenshot of the expected result and a recording of any failure.
6. If the change involves money, permissions, data, or integrations, attack it locally: boundaries, nulls, broken money values, failing dependencies (500, 429, timeout, truncated JSON), concurrency, idempotency, and hostile payloads. An attack that breaks the change blocks the merge and becomes a regression test (`tdd` skill).
7. Check the browser console and server logs during the test window.
8. For each failure, use the `report-bug` playbook.
9. Reply on the PR and to Bento with:
   - **Verdict:** Approved, Approved with caveats, or Rejected;
   - what was tested and where;
   - evidence (links);
   - bugs filed and their severity;
   - what was not tested and why.
10. Save the report as `knowledge/qa/YYYY-MM-DD-<pr>.md`.
