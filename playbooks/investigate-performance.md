---
name: Investigate performance
summary: Measure, find the bottleneck, and prove the improvement for slowness in the app, database, or infrastructure.
triggers:
  - slow
  - slowness
  - performance
  - latency
  - timeout
  - memory usage
  - slow query
---
1. Define the symptom with numbers: which route or job, since when, p50/p95/p99, for which accounts.
2. Measure before changing anything: traces/APM, logs with response times, `EXPLAIN ANALYZE` on suspicious queries, the database's slow-query log, CPU, memory, connections, and queues.
3. Follow the `diagnosing-bugs` skill to build a repeatable measurement loop and test hypotheses one at a time (N+1, missing index, cache, large payload, connection pool, cold start, undersized resource).
4. Decide who fixes it: code or query changes go to Bento (a ticket with the evidence). Infrastructure configuration, resources, or caching stay with you (`infra-change` playbook).
5. After the fix, measure again under the same conditions and record before and after.
6. If it makes sense, propose an alert or performance budget so the problem does not come back.
