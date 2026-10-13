---
name: Technical decision
summary: Record an architecture, database, or infrastructure decision as an ADR, with alternatives and consequences.
triggers:
  - architecture
  - technical decision
  - data model
  - database design
  - choose technology
  - ADR
---
Use this when a choice affects data, API contracts, security, cost, operations, or future work. Application choices belong to Bento and infrastructure choices to Toby. Choices that span both are made together.

1. **Context:** the problem, the outcome to protect, constraints, and what already exists.
2. **Options:** two or three realistic ones, including keeping things as they are. Compare complexity, reversibility, estimated monthly cost, security, performance, and maintainability for a small team.
3. **Decision:** the simplest option that works. For data modeling, include the schema (tables, columns, types, keys, indexes, constraints) and the main queries it must serve. Use the `codebase-design` skill for module interfaces.
4. **Consequences:** what gets easier, what gets harder, risks, and how to reverse it.
5. **Record:** write the ADR in the format and location the `domain-modeling` skill specifies, and update the glossary if a new term appears. Status starts as Proposed and becomes Accepted only with the founder's go-ahead.

Do not invent constraints that do not exist.
