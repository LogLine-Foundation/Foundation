#!/usr/bin/env node
// Release cut: compute file hashes, bump version (optional), and write a manifest under public/releases/<stamp>/
import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'blake3'

const stamp = new Date().toISOString().replace(/[-:]/g,'').slice(0,15) // YYYYMMDDTHHMMSS
const base = process.cwd()
const relDir = path.join('public','releases', stamp)
fs.mkdirSync(relDir, { recursive: true })

function hashFile(p){ return createHash().update(fs.readFileSync(p)).digest('hex') }

// Files to include (core governance & proof set)
const include = [
  'pages/manifesto.mdx',
  'pages/comparativo.mdx',
  'pages/files/constituicao-curta.mdx',
  'pages/politicas/conflitos.mdx',
  'pages/politicas/transparencia.mdx',
  'pages/politicas/orcamento.mdx',
  'public/templates/rito_publicacao_bilingue.template.json',
  'public/templates/rito_ratificacao_t2.template.json',
  'lib/logline.mjs',
  'scripts/ci_proof.mjs',
  'scripts/ledger_publish.mjs'
].filter(p => fs.existsSync(p))

const manifest = { stamp, files: [] }
for(const p of include){
  const hex = hashFile(p)
  manifest.files.push({ path:p, blake3: hex })
}

const manifestPath = path.join(relDir, 'manifest.json')
fs.writeFileSync(manifestPath, JSON.stringify(manifest,null,2))

// Write latest pointer
fs.writeFileSync(path.join('public','releases','latest.json'), JSON.stringify({ stamp, manifest: '/releases/'+stamp+'/manifest.json' }, null, 2))

console.log('RELEASE CUT:', stamp)
console.log('manifest:', manifestPath)
