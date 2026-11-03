// Fails (exit 1) if any icon from components/asset.tsx isn't referenced anywhere in app/, components/ or lib/.
// Run: node scripts/check-assets.mjs
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const list = readFileSync('components/asset.tsx', 'utf8')
const names = [...list.slice(list.indexOf('ASSETS = ['), list.indexOf('] as const')).matchAll(/'([a-z0-9/-]+)'/g)].map((m) => m[1])
const files = (dir) => readdirSync(dir).flatMap((f) => { const p = join(dir, f); return statSync(p).isDirectory() ? files(p) : /\.(tsx?|mjs)$/.test(f) && !p.endsWith('asset.tsx') ? [p] : [] })
const code = ['app', 'components', 'lib'].flatMap(files).map((f) => readFileSync(f, 'utf8')).join('\n')
const unused = names.filter((n) => !code.includes(`'${n}'`) && !code.includes(`"${n}"`))
console.log(`${names.length} icons, ${names.length - unused.length} used`)
if (!names.length || unused.length) { console.error('unused:', unused.join(', ')); process.exit(1) }
