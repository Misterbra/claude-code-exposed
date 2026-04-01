# The Buddy System

> A complete virtual pet companion hidden in Claude Code's source code.

## Overview

Found in `src/buddy/` — a fully implemented Tamagotchi-style pet system that was never shipped to users.

- **18 species** with ASCII art
- **5 rarity levels** (Common to Legendary)
- **5 personality stats** per companion
- **1% Shiny chance** (visual variant)
- **Deterministic generation** from user ID hash

## Activation

```typescript
// Salt used for hash generation
const BUDDY_SALT = 'friend-2026-401'  // 401 = April 1st

// Date window check
export function isBuddyTeaserWindow(): boolean {
  const d = new Date()
  return d.getFullYear() === 2026 && d.getMonth() === 3 && d.getDate() <= 7
}

// Feature gate — ALWAYS false in public builds
if (!feature('BUDDY')) return
```

The system was designed for **April 1-7, 2026**. The date check works. But `feature('BUDDY')` is hardcoded to `false` in all external releases.

## Species Table

| # | Species | ASCII | Rarity |
|---|---|---|---|
| 1 | Duck | `>(.)__ ` | Common |
| 2 | Goose | `>(O)__ ` | Common |
| 3 | Blob | ` (___) ` | Common |
| 4 | Cat | ` /\_/\ ` | Common |
| 5 | Dragon | ` /|_|\ ` | Rare |
| 6 | Octopus | ` (O_O) ` | Rare |
| 7 | Owl | ` {O,O} ` | Uncommon |
| 8 | Penguin | ` (o_o) ` | Common |
| 9 | Turtle | ` _[_]_ ` | Common |
| 10 | Snail | ` @/\_  ` | Common |
| 11 | Ghost | ` (O_O) ` | Rare |
| 12 | Axolotl | ` (^..^)` | Rare |
| 13 | Capybara | ` (o_o) ` | Common |
| 14 | Cactus | ` [|] ` | Uncommon |
| 15 | Robot | ` [O_O] ` | Uncommon |
| 16 | Rabbit | ` (\__/) ` | Common |
| 17 | Mushroom | ` ___   ` | Uncommon |
| 18 | Chonk | ` (___) ` | Common |

## Rarity Distribution

| Rarity | Chance | Stars |
|---|---|---|
| Common | 60% | 1 |
| Uncommon | 25% | 2 |
| Rare | 10% | 3 |
| Epic | 4% | 4 |
| Legendary | 1% | 5 |

**Shiny chance:** 1% (any species can be shiny)

## Personality Stats

Each buddy has 5 stats (0-100), generated from a SHA-256 hash:

| Stat | Description |
|---|---|
| **Debugging** | How good at finding bugs |
| **Patience** | How long before giving up |
| **Chaos** | Unpredictability index |
| **Wisdom** | Ancient knowledge level |
| **Sarcasm** | Attitude meter |

## Hash Generation

```
input = USER_ID + BUDDY_SALT
hash = SHA-256(input)
species = hash[0:4] → mapped to species table
rarity = hash[4:6] → mapped to rarity table
shiny = hash[6:8] → 1% chance
stats = hash[8:18] → 5 stats, 2 hex chars each → 0-255 → scaled to 0-100
```

Same user ID always generates the same buddy. You don't choose. It's a genetic lottery.

## Commands

```
/buddy              — See your companion
/buddy stats        — Full stat breakdown
/buddy feed         — Feed it (interaction)
/buddy leaderboard  — Global rankings
```

## Standalone Demo

See [macheng2017/buddy-pet](https://github.com/macheng2017/buddy-pet) for a working standalone extraction.

## Why this matters

The code was ready. The date was set. The salt was written. And then the source leaked the day before activation.

Coincidence? Intern mistake? Or the greatest marketing stunt of 2026?
