// Builds the OpenMausBot-importable packages from the repo sources:
//   dist/<id>.openmaus.json  openmaus.package v2 (complete: soul, skills, starter memory, team brief)
//   dist/<id>.md             BotMRR Markdown v1 (portable and readable; no starter memory or room goals)
// Usage: node scripts/build.mjs

import { mkdirSync, readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml, stringify as stringifyYaml } from "yaml";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(join(root, path), "utf8");
const errors = [];
const fail = (message) => errors.push(message);

const KEY = /^[a-z0-9][a-z0-9_-]*$/;
const SKILL = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const COLORS = new Set(["green", "blue", "red", "orange", "purple", "cyan", "pink", "yellow", "teal", "coral"]);
const bytes = (text) => Buffer.byteLength(text, "utf8");

function frontmatter(text, path) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    fail(`${path}: missing frontmatter block (---)`);
    return { meta: {}, body: text };
  }
  return { meta: parseYaml(match[1]) ?? {}, body: match[2].trim() };
}

// ── sources ───────────────────────────────────────────────────────────────

const team = parseYaml(read("team.yaml"));
const brief = read(team.team.brief).trim();

const playbooks = readdirSync(join(root, "playbooks"))
  .filter((file) => file.endsWith(".md"))
  .sort()
  .map((file) => {
    const path = `playbooks/${file}`;
    const { meta, body } = frontmatter(read(path), path);
    const key = file.replace(/\.md$/, "");
    if (!KEY.test(key)) fail(`${path}: file name is not a valid key`);
    if (!meta.name || !meta.summary || !meta.triggers?.length) fail(`${path}: needs name, summary, and triggers`);
    if ((meta.summary ?? "").length > 300) fail(`${path}: summary exceeds 300 characters`);
    if (body.length > 24_000) fail(`${path}: instructions exceed 24000 characters`);
    return { key, name: meta.name, summary: meta.summary, triggers: meta.triggers, instructions: body };
  });

const skills = readdirSync(join(root, "skills"), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort()
  .map((name) => {
    const path = `skills/${name}/SKILL.md`;
    const instructions = read(path);
    const { meta } = frontmatter(instructions, path);
    if (meta.name !== name || !SKILL.test(name)) fail(`${path}: frontmatter name must match the folder (${name})`);
    if (!meta.description || meta.description.length > 1024) fail(`${path}: description is required, up to 1024 characters`);
    return { name, description: meta.description, instructions };
  });

const agents = team.agents.map((key) => {
  const dir = `agents/${key}`;
  const profile = parseYaml(read(`${dir}/agent.yaml`));
  const soul = read(`${dir}/SOUL.md`).trim();
  const memoryPath = `${dir}/MEMORY.md`;
  if (!KEY.test(key)) fail(`${dir}: invalid key`);
  if (!COLORS.has(profile.appearance?.color)) fail(`${dir}: unsupported color`);
  if (bytes(soul) > 24_000) fail(`${dir}/SOUL.md: exceeds 24000 bytes`);
  if ((profile.description ?? "").length > 4_000) fail(`${dir}: description exceeds 4000 characters`);
  return {
    key,
    name: profile.name,
    title: profile.title,
    description: profile.description,
    soul,
    appearance: profile.appearance,
    playbooks: profile.playbooks ?? [],
    skills: profile.skills ?? [],
    ...(existsSync(join(root, memoryPath)) ? { seed: { memory: { "MEMORY.md": read(memoryPath) } } } : {}),
  };
});

// ── references ────────────────────────────────────────────────────────────

const agentKeys = new Set(agents.map((agent) => agent.key));
const playbookKeys = new Set(playbooks.map((playbook) => playbook.key));
const skillNames = new Set(skills.map((skill) => skill.name));
const roomMembers = new Map(team.rooms.map((room) => [room.key, new Set(room.members)]));

for (const agent of agents) {
  for (const key of agent.playbooks) if (!playbookKeys.has(key)) fail(`${agent.key}: unknown playbook ${key}`);
  for (const name of agent.skills) if (!skillNames.has(name)) fail(`${agent.key}: unknown skill ${name}`);
}
for (const room of team.rooms) {
  for (const member of room.members) if (!agentKeys.has(member)) fail(`room ${room.key}: unknown member ${member}`);
  const responder = room.defaultResponder;
  if (responder.kind === "agent" && !room.members.includes(responder.agent)) fail(`room ${room.key}: default responder is not a member`);
}
for (const routine of team.routines) {
  if (!agentKeys.has(routine.agent)) fail(`routine ${routine.key}: unknown agent`);
  if (routine.room && !roomMembers.get(routine.room)?.has(routine.agent)) fail(`routine ${routine.key}: lead is not a member of the room`);
}
if (team.team.leader && !agentKeys.has(team.team.leader)) fail(`team.leader: unknown agent ${team.team.leader}`);
if (bytes(brief) > 24_000) fail(`${team.team.brief}: exceeds 24000 bytes`);

if (errors.length) {
  console.error(errors.map((message) => `✗ ${message}`).join("\n"));
  process.exit(1);
}

// ── v2 package (JSON) ─────────────────────────────────────────────────────

const routines = team.routines.map((routine) => ({ ...routine, enabledAfterInstall: false }));
const listing = {
  id: team.id,
  release: team.release,
  name: team.name,
  tagline: team.tagline,
  summary: team.summary.trim(),
  category: team.category,
  author: team.author,
  license: team.license,
  tags: team.tags,
  outcomes: team.outcomes,
  setupMinutes: team.setupMinutes,
  requirements: team.requirements,
};
const skillsBlock = skills.length ? { skills: { version: 1, entries: skills } } : {};

const v2 = {
  format: "openmaus.package",
  version: 2,
  package: {
    ...listing,
    team: { name: team.team.name, brief, ...(team.team.leader ? { leader: team.team.leader } : {}) },
    agents,
    rooms: team.rooms,
    routines,
    playbooks,
    ...skillsBlock,
    examples: team.examples,
  },
};

// ── BotMRR Markdown v1 ────────────────────────────────────────────────────
// v1 carries no starter memory, team brief, or room goals.

const v1Routines = routines.filter((routine) => !routine.room).map(({ room: _room, ...routine }) => routine);
const v1 = {
  botmrr: 1,
  ...listing,
  agents: agents.map(({ seed: _seed, ...agent }) => agent),
  ...(team.team.leader ? { chiefOfStaff: team.team.leader } : {}),
  rooms: team.rooms,
  routines: v1Routines,
  playbooks,
  ...skillsBlock,
  examples: team.examples,
};

const name = (key) => agents.find((agent) => agent.key === key)?.name ?? key;
const codes = (keys) => (keys.length ? keys.map((key) => `\`${key}\``).join(", ") : "none");
const responderText = (responder) =>
  responder.kind === "agent" ? `\`${responder.agent}\`` : responder.kind === "mentions" ? "whoever is mentioned" : "everyone";

const markdown = [
  `---\n${stringifyYaml(v1, { lineWidth: 0 })}---`,
  `# ${team.name}`,
  team.tagline,
  "> **Give this file to your Chief of Staff.** It is the complete team blueprint. Any agent system can run it; OpenMausBot can also install it directly.",
  "## Activation",
  "Read the whole document before acting. Confirm the founder's goal and any missing inputs, then create or delegate to the roles below, preserving their names, ownership, room rules, and playbooks. If your platform cannot spawn sub-agents, perform the roles one at a time and keep their outputs separate.\n\nNever ask for pasted passwords or secret keys. Use the platform's normal connection flow. Do not send messages, publish content, spend money, delete data, or enable routines without explicit approval. All routines start paused.",
  brief.replace(/^# .*\n+/, "").replace(/^## /gm, "### "),
  "## Mission",
  team.summary.trim(),
  "## Outcomes",
  team.outcomes.map((outcome) => `- ${outcome}`).join("\n"),
  "## Connections",
  team.requirements.apps.map((app) => `- **${app.label}${app.optional ? " (optional)" : ""}:** ${app.reason}`).join("\n"),
  "## Team",
  agents.map((agent) => [
    `### ${agent.name} — ${agent.title}`,
    `**Role key:** \`${agent.key}\``,
    `**Playbooks:** ${codes(agent.playbooks)} · **Skills:** ${codes(agent.skills)}`,
    agent.description.trim(),
    agent.soul.replace(/^#+ /gm, "#### "),
  ].join("\n\n")).join("\n\n"),
  "## Chief of Staff",
  team.team.leader
    ? `The Chief of Staff role is \`${team.team.leader}\` (${name(team.team.leader)}). It owns delegation, synthesis, conflict resolution, and the final answer to the founder, but never approves on the founder's behalf.`
    : "The founder is the Chief of Staff: delegates, resolves conflicts, and approves.",
  "## Shared rooms",
  team.rooms.map((room) => [
    `### ${room.name}`,
    `**Members:** ${codes(room.members)}  \n**Default responder:** ${responderText(room.defaultResponder)}`,
    room.bulletin.trim(),
  ].join("\n\n")).join("\n\n"),
  "## Routines",
  routines.map((routine) => `- **${routine.name}** (${name(routine.agent)}${routine.room ? `, room \`${routine.room}\`` : ""}; \`${routine.schedule.expression}\` ${routine.schedule.timeZone}, paused): ${routine.prompt.trim()}`).join("\n"),
  "## Playbooks",
  playbooks.map((playbook) => [
    `### ${playbook.name}`,
    `**Playbook key:** \`${playbook.key}\`  \n**Use when:** ${playbook.triggers.join(", ")}`,
    playbook.summary,
    playbook.instructions,
  ].join("\n\n")).join("\n\n"),
  "## Completion rule",
  "Return one clear result to the founder, separate evidence from inference, cite links when using external material, and state what still needs human approval or a connected app.",
].join("\n\n") + "\n";

mkdirSync(join(root, "dist"), { recursive: true });
writeFileSync(join(root, "dist", `${team.id}.openmaus.json`), `${JSON.stringify(v2, null, 2)}\n`);
writeFileSync(join(root, "dist", `${team.id}.md`), markdown);
console.log(`✓ dist/${team.id}.openmaus.json  (${agents.length} bots, ${playbooks.length} playbooks, ${skills.length} skills, ${routines.length} routines)`);
console.log(`✓ dist/${team.id}.md  (BotMRR v1, ${v1Routines.length} routines; room goals and starter memory only in the JSON)`);
