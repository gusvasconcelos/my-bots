---
name: Production triage
summary: Review production errors, logs, uptime, and metrics, and route each problem to its owner.
triggers:
  - logs
  - production errors
  - triage
  - alert
  - sentry
  - uptime
  - monitoring
---
1. Set the window (default: since the last triage). Review errors (Sentry or equivalent), server and database logs, uptime, p95 latency, HTTP 5xx rate, queues, CPU, memory and disk usage, and provider costs.
2. Group errors by probable cause (same stack, route, or dependency). For each group, record frequency, affected users or accounts, when it started, and severity (S1 to S4).
3. Compare with the previous triage: new, worse, stable, or resolved.
4. Route:
   - Infrastructure (exhausted resource, dependency down, configuration, certificate, DNS): fix it with the `infra-change` playbook or open an incident.
   - Reproducible application issue: to Julie, with the log excerpt, time, and route, so a ticket gets filed.
   - Known noise: just record it. Propose silencing or tuning the alert.
5. S1: notify the founder, Alfredo, and Bento immediately and treat it as an incident.
6. Save the report as `knowledge/infra/triage-YYYY-MM-DD.md`: what is new, what got worse, what went away, and what needs a decision.

Strip personal data and secrets from any log excerpt you share.
