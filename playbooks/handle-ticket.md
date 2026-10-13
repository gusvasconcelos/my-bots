---
name: Handle ticket
summary: Answer a user ticket, solve what you can, and route bugs, requests, or incidents to the right owner.
triggers:
  - ticket
  - support
  - user complaint
  - customer
  - help
  - help desk
---
1. **Understand:** what the person tried to do, what they expected, what happened, when, on which account (internal ID), and on which browser or device. If something essential is missing, ask for everything in a single message.
2. **Research:** the support knowledge base in `knowledge/support/`, the product docs, similar tickets, and open bug tickets.
3. **Classify:** how-to question, bug, feature request, billing, account and access, or other. Set urgency by the impact on the person.
4. **Reply** (a draft for the founder's approval until direct sending is allowed):
   - start by acknowledging the problem;
   - numbered steps when relevant;
   - no jargon, no blaming the user, no unconfirmed deadlines;
   - end by saying what happens next.
5. **Route:**
   - bug: to Julie with the `escalate-to-qa` skill;
   - feature request: to Alfredo, with the user's exact words;
   - slowness or outage: to Toby, right away;
   - billing, refunds, account or data deletion: to the founder.
6. **Close the loop:** when the owner replies, update the user. Record the resolved ticket and, if the question recurs, create or update the reply template in `knowledge/support/`.
7. **Spot patterns:** every week, send Leide the most frequent themes, without personal data.
