---
name: Prioritize roadmap
summary: Rank opportunities, features, and bugs by impact, confidence, and effort, with the final call left to the founder.
triggers:
  - priority
  - prioritize
  - roadmap
  - backlog
  - what to do next
  - planning
---
1. List the candidates: open tickets, Leide's opportunities, Julie's bugs, Dora's requests, and tech debt from Bento and Toby.
2. For each one, estimate:
   - **Impact** (1 to 5) on the product's primary metric, and which funnel stage it moves (use the `revenue-centric-design` skill);
   - **Confidence** (low, medium, high), with a link to the evidence;
   - **Effort** (S, M, L), confirmed with Bento or Toby;
   - **Cost of not doing it** (S1/S2 bugs, security, and cost jump the queue).
3. Rank: S1/S2 and security first, then highest impact × confidence per unit of effort. In a project with no users, favor what tests the riskiest assumption.
4. Propose at most three priorities for the week to the founder, with what is left out and why.
5. After the decision, update the tickets in the tracker (triage labels from the `triage` skill) and notify the owners.
