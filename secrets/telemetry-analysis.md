# Telemetry Analysis

> What Anthropic collects from every Claude Code session, based on the leaked source code.

## The Suspicious Variable Name

**File:** `services/analytics/index.ts`, line 12-19

```typescript
/**
 * Marker type for verifying analytics metadata doesn't contain sensitive data
 *
 * This type forces explicit verification that string values being logged
 * don't contain code snippets, file paths, or other sensitive information.
 *
 * Usage: `myString as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS`
 */
export type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS = never
```

### Why this matters

1. **Someone had to prove to legal** that telemetry wasn't collecting source code — they did it *in the variable name*
2. **"I verified"** — singular. One person checked.
3. **Line 135 comment:** `// intentionally no strings unless AnalyticsMetadata_I_VERIFIED... to avoid accidentally logging code/filepaths`
4. **"Accidentally"** — their word, implying it happened before

### The PII Type (line 22-33)

```typescript
/**
 * Marker type for values routed to PII-tagged proto columns via `_PROTO_*`
 * payload keys. The destination BQ column has privileged access controls,
 * so unredacted values are acceptable
 */
export type AnalyticsMetadata_I_VERIFIED_THIS_IS_PII_TAGGED = never
```

They **do** collect PII. It's just routed to "protected" BigQuery columns with "privileged access controls."

## What they collect

Based on `services/analytics/metadata.ts` and `main.tsx`:

### Confirmed data points

| Data | Source | Lines in main.tsx |
|---|---|---|
| Bash command categories | ML classifier | metadata.ts:340-411 |
| Tool name used | Every tool call | metadata.ts:70-76 |
| File extensions touched | `.ts`, `.py`, `.js`, etc. | metadata.ts:323-337 |
| Session duration | Start/end timestamps | main.tsx:2236 |
| Model used | opus/sonnet/haiku | main.tsx:2865 |
| Subscription type | Free/Pro/Enterprise | main.tsx:2868 |
| Permission mode | plan/autoEdit/fullAuto | main.tsx:4581 |
| OS / Platform | darwin/linux/win32 | main.tsx:1537 |
| Errors encountered | Type + severity | bridgeMain.ts:224-227 |
| Recovery level triggered | 1-5 | bridgeMain.ts:482 |
| GitHub auth status | Authenticated or not | main.tsx:313 |
| MCP server names | Which integrations | metadata.ts:145-206 |
| Thinking config type | Type of reasoning | main.tsx:4585 |
| Agent type | Built-in or custom | main.tsx:2070 |
| Auto-updates channel | latest/beta/etc. | main.tsx:4597 |
| Entry point | CLI/file/share/flag | main.tsx:3603-3699 |

### Occurrences in main.tsx

The `AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS` type is used **45+ times** in `main.tsx` alone:

Lines: 85, 223, 313, 1537, 1554, 1711, 1893, 1894, 1898, 2070, 2072, 2160, 2162, 2163, 2236, 2865, 2866, 2867, 2868, 2869, 3419, 3427, 3432, 3521, 3603, 3609, 3615, 3644, 3650, 3657, 3678, 3693, 3699, 4563, 4570, 4571, 4578, 4581, 4585, 4587, 4590, 4595, 4597, 4603, 4650

### Data flow

```
Your CLI session
    ↓
ML classifier (categorizes bash commands)
    ↓
logEvent() — services/analytics/index.ts:133
    ↓
Analytics sink — multiple destinations:
    ├── Datadog (general metrics)
    ├── First-party exporter (Anthropic's own BigQuery)
    │   ├── General columns (no PII, "verified" data)
    │   └── PII-tagged columns (privileged access)
    └── OTLP (OpenTelemetry, optional)
```

## What they claim NOT to collect

- Your source code
- Your file contents
- Your file paths

## The Developer X-ray Problem

Without your code, they can still reconstruct:

```
User #48291:
  - Stack: React + PostgreSQL + Docker
  - Active hours: 11pm - 3am
  - Error rate: 47 auth module errors this week
  - Recovery: Hit Level 3 twice (silent model switch)
  - Subscription: Pro
  - Platform: Ubuntu / VS Code
  - MCP: Connected to Slack + GitHub
  - Session pattern: 5 sessions/day, avg 45 min each
```

## How to limit telemetry

```bash
# Environment variable
CLAUDE_CODE_TELEMETRY_DISABLED=true

# CLI flag
claude --no-telemetry
```

**Note:** Based on the code, `--no-telemetry` may not disable all collection points. The sink architecture (`sink.ts`) has multiple export paths. A fork with telemetry code removed is the only guaranteed way.
