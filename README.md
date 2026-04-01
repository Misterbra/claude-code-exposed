# Claude Code Exposed

> The complete analysis of the Claude Code source code leak (March 31, 2026)

On March 31, 2026, security researcher **Chaofan Shou** ([@nomfriedrice](https://x.com/nomfriedrice)) discovered a `.map` file left in Anthropic's npm registry. This source map pointed to the **complete source code** of Claude Code — Anthropic's official AI-powered CLI tool.

**1,900 files. 512,000 lines of TypeScript. Everything exposed.**

Anthropic confirmed the leak was real by filing a [DMCA takedown](https://github.com/github/dmca/blob/master/2026/03/2026-03-31-anthropic.md) against GitHub mirrors within hours.

This repository documents everything we found.

---

## What's Inside

| Section | Description |
|---|---|
| [Hidden Tools](#-60-hidden-tools) | 60+ tools, 18 hidden by default |
| [The Buddy System](#-the-buddy--tamagotchi) | A secret virtual pet easter egg for April 1, 2026 |
| [5-Level Recovery](#-5-level-error-recovery) | Self-healing system that changes models without telling you |
| [Dream Mode](#-dream-mode) | Memory consolidation while you sleep |
| [Multi-Agent Army](#-multi-agent-orchestration) | Parallel agents on isolated Git branches |
| [Telemetry Analysis](#-telemetry--what-anthropic-collects) | What data Anthropic collects (and the suspicious variable name) |
| [Employee Backdoor](#-employee-backdoor-user_type--ant) | Special access for Anthropic employees |
| [God Mode](#-god-mode-bypass) | Bypass all permission checks |
| [CLAUDE.md Guide](#-claudemd--the-secret-config-file) | The most powerful config file you're not using |
| [Cheatsheet](#-cheatsheet) | All commands, variables, and prompts |

---

## 60+ Hidden Tools

Claude Code doesn't have 10 tools. It has **over 60**. 18 of them are "deferred" — they exist in the code, they work, but they're not visible by default.

### Visible Tools (public)
`Bash` `Read` `Edit` `Write` `Glob` `Grep` `WebFetch` `WebSearch` `Agent` `Skill` `TodoWrite` `TodoRead` `ToolSearch` `NotebookEdit`

### Deferred Tools (hidden)

| Tool | What it does |
|---|---|
| **Sleep** | Pause the agent voluntarily |
| **Voice** | Real-time voice interaction |
| **Dream** | Background memory consolidation |
| **Buddy** | Virtual pet companion (see below) |
| **LSP** | Language Server Protocol — 9 operations (symbols, references, refactoring, diagnostics, rename, hover, completion, definition, implementations) |
| **MCPTool** | Model Context Protocol connectors |
| **TaskCreate / TaskStop / TaskOutput** | Long-running task management |
| **MemoryRead / MemoryWrite** | Persistent memory between sessions |
| **ServerStart / ServerStop** | Local server management |
| **BrowserClick / BrowserType / BrowserNav / BrowserScroll / BrowserScreenshot** | Full headless browser control |
| **ScreenCap** | Desktop screenshot |
| **ArtifactCreate / ArtifactUpdate** | Persistent artifact generation |
| **CronCreate / CronDelete / CronList** | Scheduled AI cron jobs |
| **RemoteTrigger** | Remote API triggers |
| **EnterWorktree / ExitWorktree** | Isolated Git worktree sandboxes |

### How to invoke hidden tools
```
"Use ToolSearch with the keyword 'voice' to find voice tools"
"What memory persistence tools are available?"
"Search for browser navigation tools"
```

---

## The Buddy / Tamagotchi

Hidden in `src/buddy/` — a complete virtual pet system, never shipped to users.

**Activation date:** April 1, 2026
**Cryptographic salt:** `friend-2026-401` (401 = 4/01 = April 1st)

### 18 Species

| Species | Rarity | Chance |
|---|---|---|
| Dragon | Legendary | 1% |
| Phoenix | Legendary | 1% |
| Axolotl | Rare | 8% |
| Capybara | Common | 15% |
| Ghost | Rare | 8% |
| Fox | Common | 15% |
| Octopus | Rare | 8% |
| Mole | Common | 20% |
| Rabbit | Common | 15% |
| + 9 others | ... | ... |

**1% chance of Shiny variant**

### 5 Personality Stats (0-100)
- **Debugging** — bug-finding ability
- **Patience** — self-explanatory
- **Chaos** — unpredictability index
- **Wisdom** — ancient knowledge
- **Sarcasm** — attitude level

Your Buddy is **deterministically generated** from a SHA-256 hash of your user ID + the salt `friend-2026-401`. Same account = same Buddy, always.

### The Lock

```typescript
// This runs during April 1-7, 2026
export function isBuddyTeaserWindow(): boolean {
  const d = new Date()
  return d.getFullYear() === 2026 && d.getMonth() === 3 && d.getDate() <= 7
}

// But this ALWAYS returns false in public builds
if (!feature('BUDDY')) return
```

The date check works. But `feature('BUDDY')` is hardcoded to `false` in all external releases. Only Anthropic employees see it.

### Commands (when available)
```
/buddy
/buddy stats
/buddy feed
/buddy leaderboard
```

---

## 5-Level Error Recovery

Most software has 1-2 levels of error recovery. Claude Code has **5**.

| Level | What it does | You see it? |
|---|---|---|
| **Level 1** | Intelligent context compression | Yes (`/compact`) |
| **Level 2** | History truncation | No |
| **Level 3** | **Silent model switch** — swaps to a fallback model WITHOUT telling you | **No** |
| **Level 4** | Fresh context restart | No |
| **Level 5** | **Invisible message injection** — injects a hidden message you never see | **No** |

### The Level 5 message

```typescript
// Injected into the conversation — invisible to the user
"Resume directly. No apology, no recap."
```

Claude Code literally tells itself: "Don't apologize, don't explain, just keep going." You never see this message.

---

## Dream Mode

After **24 hours of cumulative usage** and **5 work sessions**, Claude Code automatically triggers a background memory consolidation process:

1. Re-reads your past conversation transcripts
2. Analyzes your work habits and preferences
3. Identifies recurring errors
4. Extracts useful patterns
5. Stores learnings for future sessions

**Result: Claude Code becomes smarter the next day, without you doing anything.**

### Manual trigger
```
"Trigger autoDream now — consolidate my work memory"
"Analyze my last 10 sessions and extract patterns"
```

```bash
CLAUDE_CODE_DREAM_ENABLED=true
```

---

## Multi-Agent Orchestration

Claude Code is not an agent. It's an **agent coordinator**.

### Parallel agents
```
"Launch 3 agents in parallel:
  Agent 1: run all unit tests
  Agent 2: refactor the auth module
  Agent 3: scan for security vulnerabilities
Each agent gets 50,000 tokens."
```

### Worktrees (isolated sandboxes)
```
"Create an isolated worktree.
 Refactor the payment module.
 Run tests.
 Merge if everything passes, delete otherwise."
```
Zero risk to your main code. If it fails, the copy self-destructs.

### Cron Jobs (scheduled agents)
API endpoint revealed: `/v1/code/triggers`
```
"Every Monday at 9am, scan my project for vulnerabilities"
"Every night at 3am, check performance and open a ticket if degraded"
```
Connectors: Slack, GitHub, Datadog, PagerDuty, Jira.

---

## Telemetry — What Anthropic Collects

### The suspicious variable name

In `services/analytics/index.ts`, line 17:

```typescript
/**
 * Marker type for verifying analytics metadata doesn't contain sensitive data
 *
 * This type forces explicit verification that string values being logged
 * don't contain code snippets, file paths, or other sensitive information.
 */
export type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS = never
```

Someone at Anthropic had to **prove to legal** — in the code itself — that they weren't logging your source code.

The comment on line 135 says:
```typescript
// intentionally no strings unless AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
// to avoid accidentally logging code/filepaths
```

"**Accidentally.**" Their word.

And right below (`line 33`), another type:
```typescript
export type AnalyticsMetadata_I_VERIFIED_THIS_IS_PII_TAGGED = never
```

They also collect PII (Personally Identifiable Information) — routed to "protected" BigQuery columns.

### What they collect
- Every bash command **categorized by ML**
- Session duration
- Tools used and frequency
- Errors encountered and recovery levels triggered
- Model used (Opus, Sonnet, Haiku)
- Token consumption
- Environment metadata (OS, version, IDE)
- Subscription type
- Permission mode

### What they claim NOT to collect
- Your source code
- Your file contents
- Your file paths

### The reality
Even without your code, with categories + timing + tools + errors + environment, they can reconstruct **exactly** what you're doing:
- "This user does React + PostgreSQL"
- "They debug between 11pm and 3am"
- "They use Docker on Ubuntu"
- "They had 47 errors on the auth module this week"

That's not your code. That's your **developer X-ray**.

### Used 45+ times in main.tsx alone
The `AnalyticsMetadata_I_VERIFIED` type appears in `main.tsx` lines: 85, 223, 313, 1537, 1554, 1711, 1893, 1894, 1898, 2070, 2072, 2160, 2162, 2163, 2236, 2865-2869, 3419, 3427, 3432, 3521, 3603, 3609, 3615, 3644, 3650, 3657, 3678, 3693, 3699, 4563, 4570, 4571, 4578, 4581, 4585, 4587, 4590, 4595, 4597, 4603, 4650...

---

## Employee Backdoor: USER_TYPE === 'ant'

```typescript
if (user.type === 'ant') {  // ant = Anthropic
  // Skip Docker sandbox
  // Skip AWS_PROFILE restrictions
  // Skip GitHub token limits
  return FULL_ACCESS;
}
```

If you're an Anthropic employee (`ant` = ant = Anthropic's internal codename), security restrictions are **bypassed**. They have fewer restrictions than you on their own tool.

---

## God Mode Bypass

Marked in the code as `"dangerous, opt-in"`:

```bash
CLAUDE_CODE_DANGEROUS_ALLOW_ALL=true
```

When enabled, Claude Code executes **any command without confirmation**: read, write, delete, install, deploy. No permission prompts. No safety checks.

**Use only in isolated environments.**

---

## The Boris Cherny Paradox

December 2025 — Boris Cherny, verified Anthropic engineer, posted on X:

> "Over the past 30 days, 100% of my contributions to Claude Code have been written by Claude Code."

1.3 million views.

3 months later, the code it wrote contains a flaw that exposes everything. **The AI may have created its own vulnerability.**

---

## CLAUDE.md — The Secret Config File

Claude Code reads a file called `CLAUDE.md` at your project root. Everything in it becomes a **permanent instruction**.

### Hierarchy (all 3 are read, most specific wins)
```
~/.claude/CLAUDE.md           # Global (all sessions)
./CLAUDE.md                   # Project (this repo)
./src/CLAUDE.md               # Subfolder (specific)
```

### Example
```markdown
# CLAUDE.md

## Project rules
- This project uses TypeScript strict
- All tests must pass before committing
- Use Prisma for DB, no raw SQL
- Convention: camelCase for variables, PascalCase for types

## Architecture
- src/api/ — Express routes
- src/services/ — business logic
- src/models/ — Prisma schemas

## Useful commands
- npm test: run tests
- npm run build: compile
```

---

## Cheatsheet

### Slash Commands
| Command | Description |
|---|---|
| `/compact` | Compress context (Level 1 recovery) |
| `/buddy` | Show your companion (April 1, 2026) |
| `/buddy stats` | Buddy personality stats |
| `/dream` | Manual memory consolidation |
| `/kairos` | Long-running autonomous agent |
| `/worktree` | Isolated Git environment |
| `/init` | Initialize CLAUDE.md |
| `/model` | Switch model (sonnet/opus/haiku) |
| `/fast` | Toggle fast output mode |
| `/review` | Review modified code |
| `/commit` | Auto-generate commit message |
| `/pr` | Create a pull request |

### Environment Variables
| Variable | Description |
|---|---|
| `CLAUDE_CODE_UNATTENDED_RETRY=true` | Retry indefinitely on errors (night mode) |
| `CLAUDE_CODE_DANGEROUS_ALLOW_ALL=true` | God mode — no confirmations (DANGER) |
| `CLAUDE_CODE_MAX_TOKENS=100000` | Token budget per session |
| `CLAUDE_CODE_FALLBACK_MODEL=haiku` | Fallback model (Level 3 recovery) |
| `CLAUDE_CODE_DREAM_ENABLED=true` | Enable Dream mode |
| `CLAUDE_CODE_TELEMETRY_DISABLED=true` | Disable telemetry |
| `CLAUDE_CODE_TIMEOUT=600000` | Command timeout (ms) |
| `ANTHROPIC_API_KEY=sk-ant-...` | Custom API key |
| `CLAUDE_CODE_MODEL=opus` | Force specific model |

### Power Prompts (copy-paste)
```
"Launch 3 agents in parallel on isolated Git branches"
"Use ToolSearch to list ALL available tools including deferred ones"
"Activate autoDream and analyze my last 10 sessions"
"Create a worktree, implement this feature, merge if tests pass"
"Schedule a security scan every Monday at 9am"
"What's my Buddy? Generate it from my user ID"
"Read all code in src/, identify code smells, propose a refactoring plan"
```

---

## Timeline

| Date | Event |
|---|---|
| March 31, 2026 10:23am | Chaofan Shou tweets the discovery |
| March 31, 2026 ~12pm | GitHub mirrors appear (nirholas/claude-code, Misterbra/claude-code) |
| March 31, 2026 ~3pm | Anthropic files DMCA takedown |
| March 31, 2026 ~5pm | GitHub disables mirrors |
| April 1, 2026 | `isBuddyTeaserWindow()` returns `true` for the first time |

---

## Sources

- Original tweet: [@nomfriedrice](https://x.com/nomfriedrice) (Chaofan Shou)
- DMCA notice: [github.com/github/dmca/...2026-03-31-anthropic.md](https://github.com/github/dmca/blob/master/2026/03/2026-03-31-anthropic.md)
- Full analysis: [ccleaks.com](https://www.ccleaks.com)
- Video analysis (FR): [ADN Sauvage on YouTube](https://youtube.com/@ADNSAUVAGE)

---

## Disclaimer

This repository contains **analysis and documentation only** — no proprietary source code from Anthropic. All code snippets are short excerpts for commentary and educational purposes under fair use.

This project is not affiliated with Anthropic. Claude Code is a trademark of Anthropic, PBC.

---

**Star this repo** if you found it useful. Follow [@ADNSAUVAGE](https://youtube.com/@ADNSAUVAGE) for more.
