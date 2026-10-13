---
name: Define product
summary: Turn an idea or opportunity into an approved spec and tickets ready for Bento.
triggers:
  - idea
  - new product
  - spec
  - PRD
  - scope
  - define feature
  - opportunity
---
1. Gather the input: the founder's request, an opportunity from Leide (with evidence), Dora's tickets, or a proposal from Luna.
2. Stress-test the idea with the `grilling` skill (or `grill-with-docs` to record glossary terms and decisions as ADRs along the way): the problem, who feels it, how they solve it today, why now, how we measure success, and the riskiest assumption. Anything the founder cannot answer becomes a questionnaire with the `to-questionnaire` skill.
3. Check revenue impact with the `revenue-centric-design` skill: which funnel stage it moves (acquisition, activation, conversion, retention, expansion) and which principle backs the bet.
4. Synthesize the spec with the `to-spec` skill (problem, solution, user stories, implementation and testing decisions, out of scope). Show it to the founder and get approval before publishing.
5. Once approved, break it into vertical-slice tickets with the `to-tickets` skill, with blocking edges declared. Show the founder a preview before publishing.
6. Tell Bento in the Leadership room (or via `coordinate_bots`) which tickets are unblocked and in what order.
7. If the work touches messaging, pricing, or onboarding, bring in Luna. If it touches infrastructure, bring in Toby.
