# Employee Backdoor: USER_TYPE === 'ant'

> Anthropic employees have a separate access path with fewer restrictions.

## The Code

```typescript
if (user.type === 'ant') {
  // ant = Anthropic internal codename
  // Skip Docker sandbox enforcement
  // Skip AWS_PROFILE restrictions
  // Skip GitHub token limits
  return FULL_ACCESS;
}
```

## What 'ant' users get

| Feature | Regular users | Anthropic employees ('ant') |
|---|---|---|
| Docker sandbox | Enforced | Skipped |
| AWS credentials | Restricted | Full access |
| GitHub tokens | Rate limited | Unlimited |
| Permission prompts | Yes | Reduced |
| Telemetry | Full collection | Unknown |

## God Mode — Bypass Permissions

Separate from the employee backdoor, there's a global bypass:

```bash
CLAUDE_CODE_DANGEROUS_ALLOW_ALL=true
```

Marked in code as **"dangerous, opt-in"**.

When enabled:
- All file operations execute without confirmation
- All bash commands run without prompts
- All network operations proceed silently
- All destructive operations (rm, DROP TABLE, etc.) are allowed

**This is available to ALL users, not just employees.**

Use only in isolated/sandboxed environments.
