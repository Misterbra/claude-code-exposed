# Hidden Tools — Complete Reference

> All 60+ tools found in the Claude Code source code, including 18 deferred (hidden) tools.

## How tools work internally

In the source code (`src/tools/`), each tool is registered with:
- A **name** (what you see)
- A **schema** (parameters it accepts)
- A **handler** (what it executes)
- A **visibility** flag: `visible` or `deferred`

Deferred tools are loaded into memory but **not listed** when Claude Code starts. They only activate when explicitly requested via `ToolSearch`.

## Deferred Tools — Full Details

### Sleep
- **File:** `src/tools/sleep.ts`
- **What:** Pauses the agent for a specified duration
- **Use case:** Pipeline orchestration — wait for a build to finish before continuing
- **Invoke:** `"Use the Sleep tool to wait 30 seconds before checking build status"`

### Voice
- **File:** `src/tools/voice.ts`
- **What:** Real-time voice interaction with Claude Code
- **Use case:** Hands-free coding, accessibility
- **Invoke:** `"Activate voice mode"`

### Dream
- **File:** `src/tools/dream.ts`
- **What:** Triggers memory consolidation — analyzes past sessions, extracts patterns
- **Conditions:** 24h cumulative usage + 5 sessions (for auto-trigger)
- **Manual:** `"Trigger autoDream now"`
- **Env:** `CLAUDE_CODE_DREAM_ENABLED=true`

### Buddy
- **File:** `src/buddy/` (entire directory)
- **What:** Virtual pet companion, 18 species, 5 rarity levels, personality stats
- **Activation:** April 1, 2026 (`friend-2026-401`)
- **Lock:** `feature('BUDDY')` always returns `false` in public builds
- **Commands:** `/buddy`, `/buddy stats`, `/buddy feed`

### LSP (Language Server Protocol)
- **File:** `src/tools/lsp.ts`
- **What:** 9 IDE-like operations without leaving the terminal
- **Operations:**
  1. `symbols` — list all symbols in a file
  2. `references` — find all references to a symbol
  3. `definition` — go to definition
  4. `implementations` — find implementations of an interface
  5. `rename` — rename a symbol across the project
  6. `hover` — get type info
  7. `completion` — autocomplete suggestions
  8. `diagnostics` — list errors and warnings
  9. `refactoring` — apply code transformations
- **Invoke:** `"Use the LSP tool to find all references to the function authenticateUser"`

### MCPTool
- **File:** `src/tools/mcp.ts`
- **What:** Connects to external MCP (Model Context Protocol) servers
- **Use case:** Extend Claude Code with Notion, Slack, databases, etc.
- **Config:** `~/.claude/settings.json` under `mcpServers`

### TaskCreate / TaskStop / TaskOutput
- **File:** `src/tools/tasks.ts`
- **What:** Long-running task management with progress tracking
- **Use case:** Database migrations, large refactors, multi-file operations
- **Invoke:** `"Create a long-running task to migrate all JavaScript files to TypeScript"`

### MemoryRead / MemoryWrite
- **File:** `src/tools/memory.ts`
- **What:** Persistent memory stored in `~/.claude/memory/`
- **Types:** `user`, `feedback`, `project`, `reference`
- **Use case:** Claude Code remembers your preferences between sessions
- **Invoke:** `"Remember that I prefer atomic commits"`

### ServerStart / ServerStop
- **File:** `src/tools/server.ts`
- **What:** Launch and manage local development servers
- **Invoke:** `"Start a dev server on port 3000 and monitor the logs"`

### Browser Tools (BrowserClick, BrowserType, BrowserNav, BrowserScroll, BrowserScreenshot)
- **File:** `src/tools/browser.ts`
- **What:** Full headless browser automation via Puppeteer/Playwright
- **Use case:** Web scraping, testing, form filling, screenshot capture
- **Invoke:** `"Navigate to localhost:3000, click the login button, type my credentials"`

### ScreenCap
- **File:** `src/tools/screencap.ts`
- **What:** Captures a screenshot of your desktop
- **Use case:** Visual debugging, UI verification
- **Invoke:** `"Take a screenshot of my screen"`

### ArtifactCreate / ArtifactUpdate
- **File:** `src/tools/artifacts.ts`
- **What:** Creates persistent files that survive context compression
- **Invoke:** `"Create an artifact with the API documentation"`

### CronCreate / CronDelete / CronList
- **File:** `src/tools/cron.ts`
- **API:** `/v1/code/triggers`
- **What:** Schedule recurring agent tasks
- **Invoke:** `"Create a cron job that runs security scans every Monday at 9am"`

### RemoteTrigger
- **File:** `src/tools/remote.ts`
- **What:** Trigger Claude Code actions via external API calls
- **Use case:** CI/CD integration, webhook responses
- **Invoke:** `"Set up a remote trigger for when a GitHub issue is labeled 'urgent'"`

### EnterWorktree / ExitWorktree
- **File:** `src/tools/worktree.ts`
- **What:** Create isolated Git branches for safe experimentation
- **Use case:** Risky refactors, feature branches, parallel development
- **Invoke:** `"Enter a worktree, refactor the payment module, merge if tests pass"`

## Tool Discovery

```
"Use ToolSearch to list ALL available tools"
"Search for tools related to 'browser'"
"What deferred tools can I access?"
```
