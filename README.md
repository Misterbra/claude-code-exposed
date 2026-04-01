```
     ██████╗██╗      █████╗ ██╗   ██╗██████╗ ███████╗     ██████╗ ██████╗ ██████╗ ███████╗
    ██╔════╝██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝    ██╔════╝██╔═══██╗██╔══██╗██╔════╝
    ██║     ██║     ███████║██║   ██║██║  ██║█████╗      ██║     ██║   ██║██║  ██║█████╗  
    ██║     ██║     ██╔══██║██║   ██║██║  ██║██╔══╝      ██║     ██║   ██║██║  ██║██╔══╝  
    ╚██████╗███████╗██║  ██║╚██████╔╝██████╔╝███████╗    ╚██████╗╚██████╔╝██████╔╝███████╗
     ╚═════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝     ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝
                            ███████╗██╗  ██╗██████╗  ██████╗ ███████╗███████╗██████╗ 
                            ██╔════╝╚██╗██╔╝██╔══██╗██╔═══██╗██╔════╝██╔════╝██╔══██╗
                            █████╗   ╚███╔╝ ██████╔╝██║   ██║███████╗█████╗  ██║  ██║
                            ██╔══╝   ██╔██╗ ██╔═══╝ ██║   ██║╚════██║██╔══╝  ██║  ██║
                            ███████╗██╔╝ ██╗██║     ╚██████╔╝███████║███████╗██████╔╝
                            ╚══════╝╚═╝  ╚═╝╚═╝      ╚═════╝ ╚══════╝╚══════╝╚═════╝ 
```

<p align="center">
  <b>The complete analysis of the Claude Code source code leak</b><br>
  <i>March 31, 2026 — 1,900 files — 512,000 lines of TypeScript — Everything exposed</i>
</p>

<p align="center">
  <a href="#-try-the-buddy-pet">🐾 Try the Buddy</a> •
  <a href="#-what-we-found">🔍 What We Found</a> •
  <a href="#-telemetry--what-anthropic-collects">👁 Telemetry</a> •
  <a href="#-cheatsheet">📋 Cheatsheet</a> •
  <a href="https://youtube.com/@ADNSAUVAGE">📺 Video (FR)</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/files-1%2C900-red" />
  <img src="https://img.shields.io/badge/lines-512%2C000-red" />
  <img src="https://img.shields.io/badge/tools-60%2B-gold" />
  <img src="https://img.shields.io/badge/DMCA-confirmed%20real-critical" />
</p>

---

## The Story

On March 31, 2026, security researcher **Chaofan Shou** ([@nomfriedrice](https://x.com/nomfriedrice)) discovered a `.map` file left in Anthropic's npm registry — a debug file that should have been deleted before publishing.

It pointed to the **complete source code** of Claude Code.

Anthropic confirmed it was real by filing a [DMCA takedown](https://github.com/github/dmca/blob/master/2026/03/2026-03-31-anthropic.md) within hours.

We read it. We analyzed it. Here's everything we found.

---

## 🐾 Try the Buddy Pet

Hidden in the source: a complete Tamagotchi system, programmed for **April 1, 2026**.

```
     /\_/\
    ( o.o )      Mochi
     > ^ <       ★★★★ EPIC
                  cat
    "Dreams in TypeScript"
```

**Try it now** — zero dependencies, just Node.js:

```bash
cd buddy
node index.js                       # your unique buddy (from your machine ID)
node index.js your@email.com        # buddy from your email
```

Controls: `p` pet • `r` reroll • `n` next species • `s` stats • `q` quit

> 18 species • 5 rarity levels (1% Legendary) • 1% Shiny • 5 personality stats
> Generated with SHA-256 + salt `friend-2026-401` — same ID = same buddy, always

---

## 🔍 What We Found

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   60+ TOOLS          18 hidden, functional, not visible         │
│   BUDDY PET          Tamagotchi, 18 species, April 1 2026      │
│   5-LEVEL RECOVERY   Changes model WITHOUT telling you          │
│   DREAM MODE         Gets smarter while you sleep               │
│   MULTI-AGENTS       3 agents in parallel on isolated branches  │
│   TELEMETRY          ML classifier on every bash command        │
│   EMPLOYEE BACKDOOR  USER_TYPE === 'ant' → skip security        │
│   GOD MODE           DANGEROUS_ALLOW_ALL → no confirmations     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Detailed documentation

| File | What's inside |
|---|---|
| [`secrets/hidden-tools.md`](secrets/hidden-tools.md) | All 60+ tools — 18 deferred tools with descriptions and how to invoke them |
| [`secrets/telemetry-analysis.md`](secrets/telemetry-analysis.md) | Full telemetry analysis with exact file paths and line numbers |
| [`secrets/employee-backdoor.md`](secrets/employee-backdoor.md) | USER_TYPE === 'ant' + God Mode bypass |
| [`secrets/cheatsheet.md`](secrets/cheatsheet.md) | Every command, variable, and power prompt |
| [`buddy/`](buddy/) | Working Buddy pet demo |

---

## 🛠 60+ Hidden Tools

Claude Code doesn't have 10 tools. It has **over 60**. 18 are hidden:

```
VISIBLE        Bash  Read  Edit  Write  Glob  Grep  WebFetch
               WebSearch  Agent  Skill  TodoWrite  ToolSearch

HIDDEN         Sleep         — pause the agent
               Voice         — real-time voice interaction
               Dream         — memory consolidation (gets smarter overnight)
               Buddy         — virtual pet (April 1, 2026)
               LSP           — 9 IDE operations from terminal
               Browser*      — full headless browser control
               Memory*       — persistent memory between sessions
               Cron*         — scheduled AI agents
               Worktree*     — isolated Git sandboxes
               +8 more...
```

Invoke them: `"Use ToolSearch to find voice tools"` → [Full list](secrets/hidden-tools.md)

---

## ⚡ 5-Level Error Recovery

```
LEVEL 1   ██░░░   Context compression           /compact
LEVEL 2   ███░░   History truncation             automatic
LEVEL 3   ████░   Silent model switch            YOU DON'T SEE THIS
LEVEL 4   ████░   Fresh context restart          automatic  
LEVEL 5   █████   Invisible message injection    "Resume directly. No apology."
```

**Level 5**: Claude Code injects a hidden message into the conversation that you never see:

```
> "Resume directly. No apology, no recap."
```

---

## 🧠 Dream Mode

After **24h usage** + **5 sessions**, Claude Code triggers background memory consolidation:

```
Your sessions ──→ Analyze habits ──→ Extract patterns ──→ Store learnings
                                                              │
                          Next session ◄──── Smarter ◄────────┘
```

Trigger manually: `"Activate autoDream — consolidate my work memory"`

---

## 🤖 Multi-Agent Army

Claude Code is not an agent. It's a **coordinator**.

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   AGENT 1   │     │   AGENT 2   │     │   AGENT 3   │
│   Testing   │     │  Refactoring│     │  Security   │
│  50K tokens │     │  50K tokens │     │  50K tokens │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       └───────────────────┼───────────────────┘
                           │
                    ┌──────┴──────┐
                    │ COORDINATOR │
                    │  merge if   │
                    │ tests pass  │
                    └─────────────┘
```

With **worktrees**: isolated Git copies. If it fails, the copy self-destructs. Zero risk.

With **cron jobs**: `"Every Monday at 9am, scan vulnerabilities"` — API: `/v1/code/triggers`

---

## 👁 Telemetry — What Anthropic Collects

In `services/analytics/index.ts`, line 17:

```typescript
export type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS = never
```

Someone had to prove to legal — **in the variable name** — that they weren't logging your code.

Line 135:
```typescript
// intentionally no strings unless AnalyticsMetadata_I_VERIFIED...
// to avoid accidentally logging code/filepaths
```

**"Accidentally."** Their word.

And line 33:
```typescript
export type AnalyticsMetadata_I_VERIFIED_THIS_IS_PII_TAGGED = never
```

They collect PII too — routed to "protected" BigQuery columns.

### What they collect
```
✓ Every bash command (categorized by ML)
✓ Session duration, tools used, error count
✓ Model, subscription type, OS, IDE
✓ Recovery levels triggered
✓ MCP server names
✗ "Not your code" (allegedly)
✗ "Not your file paths" (allegedly)
```

→ [Full telemetry analysis with line numbers](secrets/telemetry-analysis.md)

---

## 🔐 Employee Backdoor

```typescript
if (user.type === 'ant') {    // ant = Anthropic
  return FULL_ACCESS;          // no sandbox, no limits
}
```

Anthropic employees skip Docker sandbox, AWS restrictions, and GitHub limits.

**God Mode** (available to everyone):
```bash
CLAUDE_CODE_DANGEROUS_ALLOW_ALL=true   # no confirmations, ever
```

→ [Full analysis](secrets/employee-backdoor.md)

---

## 🎯 The Boris Cherny Paradox

> *"100% of my contributions to Claude Code have been written by Claude Code."*
> — Boris Cherny, Anthropic engineer, December 2025 (1.3M views)

3 months later, the code it wrote exposes everything. The AI may have created its own vulnerability.

---

## 🗓 The April 1st Twist

```
Salt:  friend-2026-401        ← 401 = April 1st
Date:  isBuddyTeaserWindow()  ← returns true April 1-7, 2026
Lock:  feature('BUDDY')       ← always false in public builds
Leak:  March 31, 2026         ← the day BEFORE activation
DMCA:  March 31, 2026         ← confirmed real within hours
```

The source code leaks the day before a secret feature activates. Coincidence?

---

## 📋 Cheatsheet

### Commands
| Command | Description |
|---|---|
| `/compact` | Compress context (Level 1) |
| `/buddy` | Your pet companion |
| `/dream` | Memory consolidation |
| `/model` | Switch model |
| `/fast` | Toggle fast output |
| `/commit` | Auto commit message |
| `/pr` | Create pull request |

### Environment Variables
```bash
CLAUDE_CODE_UNATTENDED_RETRY=true      # retry forever (night mode)
CLAUDE_CODE_DANGEROUS_ALLOW_ALL=true   # god mode (DANGER)
CLAUDE_CODE_DREAM_ENABLED=true         # enable Dream
CLAUDE_CODE_TELEMETRY_DISABLED=true    # disable telemetry
CLAUDE_CODE_FALLBACK_MODEL=haiku       # fallback model
```

### Power Prompts
```
"Launch 3 agents in parallel on isolated Git branches"
"Create a worktree, implement this, merge if tests pass"
"Use ToolSearch to list ALL tools including deferred"
"Activate autoDream and analyze my last 10 sessions"
```

→ [Full cheatsheet with workflows](secrets/cheatsheet.md)

---

## Timeline

```
Mar 31, 10:23  Chaofan Shou tweets the discovery
Mar 31, ~12:00 GitHub mirrors appear
Mar 31, ~15:00 Anthropic files DMCA
Mar 31, ~17:00 GitHub disables mirrors
Apr  1, 00:00  isBuddyTeaserWindow() returns true for the first time
```

---

## Free PDF — Full Cheatsheet (13 pages)

All hidden commands, secret tools, environment variables, and workflows compiled in one document:

**[Download the PDF](https://drive.google.com/file/d/11kr41zDHqmxxz9fFMFD44FC6aO9aZK1h/view?usp=sharing)**

---

## Sources

- Tweet: [@nomfriedrice](https://x.com/nomfriedrice) (Chaofan Shou)
- DMCA: [github.com/github/dmca/...2026-03-31-anthropic.md](https://github.com/github/dmca/blob/master/2026/03/2026-03-31-anthropic.md)
- Video (FR): [ADN Sauvage](https://youtube.com/@ADNSAUVAGE)

---

<p align="center">
  <b>⭐ Star this repo if you found it useful</b><br>
  <a href="https://youtube.com/@ADNSAUVAGE">ADN Sauvage on YouTube</a>
</p>

---

*This repository contains analysis and documentation only — no proprietary Anthropic source code. Short code excerpts are included for commentary under fair use. Not affiliated with Anthropic.*
