// Regenerates the coverage badge in README.md from vitest's coverage-summary.json.
// Run after `pnpm test:coverage`; CI commits the result on pushes to main.
import { readFileSync, writeFileSync } from 'node:fs'

const START = '<!-- coverage-badge:start -->'
const END = '<!-- coverage-badge:end -->'

const summary = JSON.parse(readFileSync('coverage/coverage-summary.json', 'utf-8'))
const pct = summary.total.lines.pct
const color = pct >= 90 ? 'brightgreen' : pct >= 75 ? 'yellow' : 'red'
const label = `${pct.toFixed(1)}%25`.replace('.0%25', '%25')
const badge = `![Coverage](https://img.shields.io/badge/coverage-${label}-${color})`

const readme = readFileSync('README.md', 'utf-8')
const block = `${START}\n${badge}\n${END}`
const pattern = new RegExp(`${START}[\\s\\S]*?${END}`)

if (!pattern.test(readme)) {
  throw new Error(`Could not find ${START} / ${END} markers in README.md`)
}

writeFileSync('README.md', readme.replace(pattern, block))
console.log(`Updated coverage badge to ${pct.toFixed(1)}%`)
