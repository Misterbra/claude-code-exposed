#!/usr/bin/env node
/**
 * Buddy Pet — extracted from Claude Code source leak
 * Salt: friend-2026-401
 * 18 species, 5 rarity levels, 5 personality stats
 * Zero dependencies. Just Node.js.
 */

const crypto = require('crypto')
const readline = require('readline')

const SALT = 'friend-2026-401'

// ── 18 Species with ASCII art ───────────────────────────────────────
const SPECIES = [
  { name: 'duck',     art: ['  __',  ' >(.)__', '  (___/'] },
  { name: 'goose',    art: ['  __',  ' >(O)__', '  (___/'] },
  { name: 'blob',     art: ['  ___', ' (   )', '  (___) '] },
  { name: 'cat',      art: ['  /\\_/\\', ' ( o.o )', '  > ^ <'] },
  { name: 'dragon',   art: ['  /|_|\\', ' ( 0_0 )', ' /|   |\\'] },
  { name: 'octopus',  art: ['  ___', ' (O_O)', ' /|\\|\\'] },
  { name: 'owl',      art: ['  ___', ' {O,O}', '  (|)'] },
  { name: 'penguin',  art: ['  (o)', ' /(o_o)\\', '  \\_^_/'] },
  { name: 'turtle',   art: ['   __', ' _[__]_', ' (____) '] },
  { name: 'snail',    art: ['   __@', '  (____)', '  /    /'] },
  { name: 'ghost',    art: ['  .-.', ' (o o)', '  | |  '] },
  { name: 'axolotl',  art: [' \\(^..^)/', '  (    )', '  /\\  /\\'] },
  { name: 'capybara', art: ['  /\\_/\\', ' ( o_o)', '  |>  |>'] },
  { name: 'cactus',   art: ['  _|_', ' / | \\', '  |_|'] },
  { name: 'robot',    art: ['  [=]', ' [O_O]', ' /[ ]\\'] },
  { name: 'rabbit',   art: ['  /\\ /\\', ' ( o.o)', '  (\")(\")'] },
  { name: 'mushroom', art: ['  .--.', ' / .. \\', '  |  |'] },
  { name: 'chonk',    art: ['  ___', ' (   )', ' (___)'] },
]

const RARITY = [
  { name: 'COMMON',    stars: 1, chance: 60, color: '\x1b[37m' },
  { name: 'UNCOMMON',  stars: 2, chance: 25, color: '\x1b[32m' },
  { name: 'RARE',      stars: 3, chance: 10, color: '\x1b[36m' },
  { name: 'EPIC',      stars: 4, chance: 4,  color: '\x1b[35m' },
  { name: 'LEGENDARY', stars: 5, chance: 1,  color: '\x1b[33m' },
]

const HATS = ['none', 'wizard', 'crown', 'tophat', 'beret', 'bandana', 'horns', 'halo', 'antenna']
const EYES = ['o', 'O', '@', '*', '^', '~', '.', '0', 'x', '-']
const BIOS = [
  'Believes recursion solves everything',
  'Mass-reverts on Fridays',
  'Mass-deploys on Fridays',
  'Debugs with print statements only',
  'Has never read the docs',
  'Thinks tabs are superior',
  'Thinks spaces are superior',
  'Once deleted production',
  'Loves regex, fears regex',
  'Sleeps during standups',
  'Comments every single line',
  'Never comments anything',
  'Has 47 unfinished side projects',
  'Still uses jQuery unironically',
  'Blames the compiler',
  'Git force pushes to main',
  'Types 200 WPM but only bugs',
  'Dreams in TypeScript',
]

const STAT_NAMES = ['DEBUGGING', 'PATIENCE', 'CHAOS', 'WISDOM', 'SARCASM']

// ── Colors ──────────────────────────────────────────────────────────
const C = {
  reset:   '\x1b[0m',
  bold:    '\x1b[1m',
  dim:     '\x1b[2m',
  gold:    '\x1b[33m',
  green:   '\x1b[32m',
  red:     '\x1b[31m',
  cyan:    '\x1b[36m',
  magenta: '\x1b[35m',
  white:   '\x1b[37m',
  bg:      '\x1b[40m',
  shiny:   '\x1b[33m\x1b[1m',
}

// ── Hash-based generation ───────────────────────────────────────────
function generateBuddy(seed) {
  const hash = crypto.createHash('sha256').update(seed + SALT).digest('hex')

  // Species (first 2 hex chars → 0-255 → mod 18)
  const speciesIdx = parseInt(hash.slice(0, 2), 16) % SPECIES.length
  const species = SPECIES[speciesIdx]

  // Rarity (next 2 hex chars → 0-255 → weighted)
  const rarityRoll = parseInt(hash.slice(2, 4), 16) / 255 * 100
  let rarity = RARITY[0]
  let cumulative = 0
  for (const r of RARITY) {
    cumulative += r.chance
    if (rarityRoll <= cumulative) { rarity = r; break }
  }

  // Shiny (next 2 hex → 1% chance)
  const shiny = parseInt(hash.slice(4, 6), 16) < 3  // ~1.2%

  // Stats (5 stats, 2 hex chars each)
  const stats = {}
  for (let i = 0; i < 5; i++) {
    const val = parseInt(hash.slice(6 + i * 2, 8 + i * 2), 16)
    stats[STAT_NAMES[i]] = Math.round(val / 255 * 100)
  }

  // Hat
  const hatIdx = parseInt(hash.slice(16, 18), 16) % HATS.length
  const hat = HATS[hatIdx]

  // Eyes
  const eyeIdx = parseInt(hash.slice(18, 20), 16) % EYES.length
  const eye = EYES[eyeIdx]

  // Bio
  const bioIdx = parseInt(hash.slice(20, 22), 16) % BIOS.length
  const bio = BIOS[bioIdx]

  // Name (from hash)
  const names = ['Zigzag','Pixel','Glitch','Byte','Nova','Echo','Spark','Flux',
                 'Drift','Pulse','Blip','Chirp','Mochi','Waffle','Nimbus','Pip',
                 'Taco','Noodle','Biscuit','Sprout','Fizz','Wobble','Zephyr','Crumb']
  const nameIdx = parseInt(hash.slice(22, 24), 16) % names.length
  const name = names[nameIdx]

  return { species, rarity, shiny, stats, hat, eye, bio, name, hash: hash.slice(0, 12) }
}

// ── Display ─────────────────────────────────────────────────────────
function clearScreen() {
  process.stdout.write('\x1b[2J\x1b[H')
}

function drawBuddy(buddy, showStats, hearts) {
  clearScreen()
  const { species, rarity, shiny, stats, hat, eye, bio, name } = buddy

  const rc = rarity.color
  const sc = shiny ? C.shiny : rc

  console.log()
  console.log(`  ${C.gold}${C.bold} BUDDY PET ${C.reset}${C.dim}  SALT: ${SALT}${C.reset}`)
  console.log()

  // Art with custom eyes
  const art = species.art.map(line => {
    return line.replace(/o/g, eye).replace(/O/g, eye.toUpperCase())
  })

  // Hearts animation
  const heartStr = hearts > 0 ? ` ${C.red}${'<3 '.repeat(hearts)}${C.reset}` : ''

  // Hat display
  const hatStr = hat !== 'none' ? `  ${C.dim}[${hat}]${C.reset}` : ''

  for (const line of art) {
    console.log(`    ${sc}${line}${C.reset}${heartStr}`)
  }

  console.log()
  console.log(`    ${sc}${C.bold}${name}${C.reset}${hatStr}`)
  console.log(`    ${rc}${'*'.repeat(rarity.stars)}${C.reset} ${rc}${rarity.name}${C.reset}${shiny ? ` ${C.shiny}SHINY!${C.reset}` : ''}`)
  console.log(`    ${C.dim}${species.name}${C.reset}`)
  console.log()
  console.log(`    ${C.cyan}"${bio}"${C.reset}`)
  console.log()

  if (showStats) {
    console.log(`    ${C.gold}--- STATS ---${C.reset}`)
    for (const [stat, val] of Object.entries(stats)) {
      const bar = '#'.repeat(Math.round(val / 5)) + '.'.repeat(20 - Math.round(val / 5))
      const statColor = val >= 80 ? C.green : val >= 50 ? C.gold : val >= 25 ? C.white : C.red
      console.log(`    ${C.dim}${stat.padEnd(10)}${C.reset} ${statColor}${bar} ${val}${C.reset}`)
    }
    console.log()
  }

  console.log(`  ${C.dim}[p] pet  [r] reroll  [n] next species  [s] stats  [q] quit${C.reset}`)
  console.log(`  ${C.dim}[u] enter user ID${C.reset}`)
  console.log()
}

// ── Main ────────────────────────────────────────────────────────────
function main() {
  let seed = Date.now().toString()
  let buddy = generateBuddy(seed)
  let showStats = false
  let hearts = 0
  let speciesIdx = 0

  // Raw mode for keypress
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true)
  }
  process.stdin.resume()
  process.stdin.setEncoding('utf8')

  drawBuddy(buddy, showStats, hearts)

  process.stdin.on('data', (key) => {
    if (key === 'q' || key === '\u0003') {
      clearScreen()
      console.log(`\n  ${C.gold}Bye! ${buddy.name} will miss you.${C.reset}\n`)
      process.exit()
    }

    if (key === 'p') {
      hearts = 3
      drawBuddy(buddy, showStats, hearts)
      setTimeout(() => { hearts = 0; drawBuddy(buddy, showStats, hearts) }, 1500)
      return
    }

    if (key === 'r') {
      seed = Date.now().toString() + Math.random().toString()
      buddy = generateBuddy(seed)
      drawBuddy(buddy, showStats, hearts)
      return
    }

    if (key === 'n') {
      speciesIdx = (speciesIdx + 1) % SPECIES.length
      // Generate with species forced
      seed = SPECIES[speciesIdx].name + Date.now().toString()
      buddy = generateBuddy(seed)
      drawBuddy(buddy, showStats, hearts)
      return
    }

    if (key === 's') {
      showStats = !showStats
      drawBuddy(buddy, showStats, hearts)
      return
    }

    if (key === 'u') {
      // Switch to line mode for input
      if (process.stdin.isTTY) process.stdin.setRawMode(false)
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
      rl.question(`\n  ${C.gold}Enter your user ID: ${C.reset}`, (answer) => {
        rl.close()
        if (answer.trim()) {
          seed = answer.trim()
          buddy = generateBuddy(seed)
        }
        if (process.stdin.isTTY) process.stdin.setRawMode(true)
        drawBuddy(buddy, showStats, hearts)
      })
      return
    }
  })
}

// ── Startup ─────────────────────────────────────────────────────────
clearScreen()
console.log(`
  ${C.gold}${C.bold}BUDDY PET${C.reset}
  ${C.dim}Extracted from Claude Code source leak (March 31, 2026)${C.reset}
  ${C.dim}Salt: ${SALT}${C.reset}
  ${C.dim}18 species | 5 rarity levels | 5 personality stats${C.reset}

  ${C.cyan}Press any key to meet your buddy...${C.reset}
`)

if (process.stdin.isTTY) {
  process.stdin.setRawMode(true)
}
process.stdin.resume()
process.stdin.setEncoding('utf8')
process.stdin.once('data', () => {
  main()
})
