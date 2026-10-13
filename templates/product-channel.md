# <Product name> — channel instructions

> Paste this into the product channel's **shared instructions** in
> OpenMausBot and point the channel's **working folder** at the product
> repository (where `.claude/skills/` and `knowledge/` live). The bots read
> this before acting. Do not put passwords or keys here; only say where they
> are (e.g. "env vars in Vercel").

## Product (Alfredo)

- **What it is:** <one sentence>
- **For whom:** <audience, company size, role>
- **Problem it solves:** <in the customer's words>
- **Stage:** <experiment | MVP | early traction | growth>. Real users: <no | yes, how many>
- **Primary metric:** <e.g. signups, activated trials, MRR, D30 retention>
- **Riskiest assumption right now:** <...>
- **Links:** site <url> · app <url> · docs <url> · roadmap <url>

## Engineering (Bento and Julie)

- **Repository:** <url> — the channel's working folder
- **Stack:** <language, framework, database, ORM, queues>
- **Commands:** install `<...>` · run `<...>` · test `<...>` · lint `<...>` · typecheck `<...>`
- **Issue tracker:** <GitHub Issues | Linear: team/project> (configured in `docs/agents/`)
- **Test accounts:** <where the test credentials are; never the credentials themselves>
- **Critical flows for regression:** <signup, login, main flow, payment...>
- **Design system:** <link or "none yet">

## Infrastructure (Toby)

- **Hosting:** <provider and services> · **Database:** <provider, plan, backups>
- **Environments:** local `<...>` · preview `<how it is generated>` · staging `<url>` · production `<url>`
- **Deploys:** <how they happen, who triggers them>
- **Observability:** errors <Sentry> · logs <where> · uptime <tool> · metrics <where>
- **Monthly infrastructure budget:** <amount>

## Support (Dora)

- **Support channels:** <support email, Intercom, chat, WhatsApp...>
- **Hours and first-response target:** <...>
- **Docs and FAQ:** <url or knowledge/support/>
- **Sending replies:** <every reply goes through the founder | allowed for how-to questions>

## Market and marketing (Leide and Luna)

- **Direct competitors:** <name — url>, ...
- **Indirect competitors / alternatives:** <spreadsheets, agencies, generic tools...>
- **Reference SaaS outside the segment:** <2 or 3 with great marketing>
- **Communities where the audience hangs out:** <subreddits, groups, profiles, hashtags>
- **Current positioning:** <sentence>
- **Tone of voice:** <e.g. direct, technical, playful>
- **Active channels:** <organic, paid, email...> · **Media budget:** <amount or "no budget yet">
- **Constraints:** <claims we cannot make, topics to avoid>
