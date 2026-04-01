# Claude Code Cheatsheet

> Every command, variable, and power prompt in one place.

## Slash Commands

| Command | Description |
|---|---|
| `/compact` | Compress context (Level 1 recovery) |
| `/buddy` | Show your pet companion (April 1, 2026) |
| `/buddy stats` | Buddy personality stats |
| `/buddy feed` | Interact with your Buddy |
| `/dream` | Manual memory consolidation |
| `/kairos` | Long-running autonomous agent mode |
| `/worktree` | Create isolated Git sandbox |
| `/init` | Generate CLAUDE.md for current project |
| `/clear` | Clear conversation history |
| `/model` | Switch model (sonnet/opus/haiku) |
| `/fast` | Toggle fast output (same model, faster) |
| `/help` | Full help |
| `/review` | Review all modified code |
| `/commit` | Auto-generate commit message |
| `/pr` | Create pull request |
| `/loop 5m /test` | Run /test every 5 minutes |

## Environment Variables

| Variable | Value | Description |
|---|---|---|
| `CLAUDE_CODE_UNATTENDED_RETRY` | `true` | Retry forever on errors (night mode) |
| `CLAUDE_CODE_DANGEROUS_ALLOW_ALL` | `true` | God mode — no confirmations (DANGER) |
| `CLAUDE_CODE_MAX_TOKENS` | `100000` | Token budget per session |
| `CLAUDE_CODE_FALLBACK_MODEL` | `haiku` | Fallback model (Level 3) |
| `CLAUDE_CODE_DREAM_ENABLED` | `true` | Enable Dream mode |
| `CLAUDE_CODE_TELEMETRY_DISABLED` | `true` | Disable telemetry |
| `CLAUDE_CODE_TIMEOUT` | `600000` | Command timeout (ms) |
| `ANTHROPIC_API_KEY` | `sk-ant-...` | Custom API key |
| `CLAUDE_CODE_MODEL` | `opus` | Force specific model |
| `CLAUDE_CODE_CONTEXT_WINDOW` | `200000` | Context window size |
| `CLAUDE_CODE_GIT_SIGN` | `false` | Disable GPG commit signing |
| `CLAUDE_CODE_THEME` | `dark` | Interface theme |

## Permission Modes

```bash
claude --mode plan       # Read-only, can only propose changes
claude --mode autoEdit   # Can edit files, asks before bash
claude --mode fullAuto   # Everything allowed, no prompts
```

## CLAUDE.md Setup

Create `CLAUDE.md` at your project root:

```markdown
# CLAUDE.md

## Rules
- TypeScript strict mode
- Tests must pass before commit
- Use Prisma, no raw SQL

## Architecture
- src/api/ — routes
- src/services/ — logic
- src/models/ — schemas

## Commands
- npm test
- npm run build
```

### Hierarchy (all loaded, most specific wins)
```
~/.claude/CLAUDE.md         # Global
./CLAUDE.md                 # Project
./src/CLAUDE.md             # Subfolder
```

## Power Prompts — Copy-Paste Ready

### Multi-Agent
```
"Launch 3 agents in parallel:
  Agent 1: run all tests and generate a report
  Agent 2: refactor the auth module
  Agent 3: scan for security vulnerabilities
Each agent gets 50,000 tokens."
```

### Worktree (Safe Refactoring)
```
"Create an isolated worktree.
 Refactor the payment module.
 Run all tests.
 Merge if everything passes, delete the worktree if not."
```

### Night Mode
```bash
CLAUDE_CODE_UNATTENDED_RETRY=true claude-code \
  "Refactor the entire auth module.
   Add tests for every function.
   Minimum 90% coverage.
   Commit each file separately.
   Write a summary in REPORT.md"
```

### Security Audit
```
"Scan all dependencies with npm audit.
 Launch an agent to check for SQL injections in src/api/.
 Launch another agent for XSS in src/components/.
 Generate a markdown report with severity and fixes.
 Open a GitHub issue for each critical vulnerability."
```

### Code Migration
```
"Migrate this project from JavaScript to TypeScript strict.
 File by file. Keep tests green after each file.
 Commit after each successful migration."
```

### Tool Discovery
```
"Use ToolSearch to list ALL available tools including deferred ones"
"What browser automation tools are available?"
"Search for tools related to memory persistence"
```

### Dream Mode
```
"Activate autoDream — consolidate my work memory from the last 7 days"
"Analyze my last 10 sessions and extract recurring patterns"
```

### Documentation
```
"Read all files in src/ and generate a complete README with examples"
"Create a CLAUDE.md by analyzing the code conventions in this project"
"Generate a CHANGELOG from the last 30 days of commits"
```

## Workflows

### Morning Standup Agent
```bash
CLAUDE_CODE_UNATTENDED_RETRY=true claude-code \
  "Check git log since yesterday.
   Summarize what changed.
   List open issues labeled 'in-progress'.
   Check CI status.
   Write a standup report in STANDUP.md"
```

### Deploy Guardian
```
"Every time I push to main:
 1. Run the full test suite
 2. Check for security vulnerabilities
 3. Verify no console.log() statements
 4. If all pass, approve the deploy
 5. If any fail, open a GitHub issue with details"
```
