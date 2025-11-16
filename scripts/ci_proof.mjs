#!/usr/bin/env node
// CI Proof Script: verifies ledger entries and generates hash proofs for file pages.
import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'blake3'
import * as ed from '@noble/ed25519'

const ED_PRIV = process.env.ED25519_PRIV_HEX || ''
const ED_PUB  = process.env.ED25519_PUB_HEX  || ''

function canonicalize(obj){
  if (obj === null || typeof obj !== 'object') return JSON.stringify(obj)
  if (Array.isArray(obj)) return '[' + obj.map(canonicalize).join(',') + ']'
  const keys = Object.keys(obj).sort()
  return '{' + keys.map(k => JSON.stringify(k)+':'+canonicalize(obj[k])).join(',') + '}'
}

function ensureDir(p){ if(!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true }) }

async function verifyLedger(){
  const ledgerDir = path.join('public','ledger')
  const statusDir = path.join('public','status')
  ensureDir(statusDir)

  const reports = []
  for(const file of fs.readdirSync(ledgerDir)){
    if(!file.endsWith('.ndjson')) continue
    const full = path.join(ledgerDir, file)
    const lines = fs.readFileSync(full,'utf8').trim().split('\n').filter(Boolean)
    const results = []
    for(let i=0;i<lines.length;i++){
      try{
        const obj = JSON.parse(lines[i])
        const { payload, hash_b3, signature_ed25519, public_key } = obj
        const canon = canonicalize(payload)
        const digest = createHash().update(Buffer.from(canon)).digest('hex')
        const hashOk = digest.toLowerCase() === String(hash_b3).toLowerCase()
        const sigOk = signature_ed25519 && public_key
          ? await ed.verify(Buffer.from(signature_ed25519,'hex'), Buffer.from(canon), Buffer.from(public_key,'hex'))
          : false
        results.push({ index:i, id: obj.id, type: obj.type, hashOk, sigOk, ok: hashOk && sigOk })
      }catch(e){
        results.push({ index:i, error: e.message })
      }
    }
    const ok = results.every(r => r.ok)
    const report = { file, ok, results }
    reports.push(report)
    fs.writeFileSync(path.join(statusDir, file.replace('.ndjson','')+'.report.json'), JSON.stringify(report,null,2))
  }
  return reports
}

function hashFile(content){ return createHash().update(Buffer.from(content)).digest('hex') }

function scanFilesProof(){
  const srcDir = path.join('pages','files')
  const outDir = path.join('public','files')
  ensureDir(outDir)
  if(!fs.existsSync(srcDir)) return []
  const proofs = []
  for(const file of fs.readdirSync(srcDir)){
    if(!file.endsWith('.md') && !file.endsWith('.mdx')) continue
    const full = path.join(srcDir, file)
    const content = fs.readFileSync(full,'utf8')
    const hex = hashFile(content)
    const out = path.join(outDir, file.replace(/\.(md|mdx)$/,'') + '.hash.json')
    const obj = { file: '/'+full, hash_algo:'BLAKE3', hash_hex: hex, computed_at: new Date().toISOString() }
    fs.writeFileSync(out, JSON.stringify(obj,null,2))
    proofs.push({ file, out, hash_hex: hex })
  }
  return proofs
}

async function main(){
  const reports = await verifyLedger()
  const fileProofs = scanFilesProof()

  // Signing of ledger entries (optional; conservative: don't mutate in CI by default)
  if(ED_PRIV && ED_PUB){
    console.log('Keys provided — CI will only check that entries are signed; it will NOT modify ledger.')
  }

  // summary
  const summary = { generated_at: new Date().toISOString(), reports, fileProofs }
  console.log(JSON.stringify(summary,null,2))
}

main().catch(e=>{ console.error(e); process.exit(1) })


  // Emit aggregated index
  const idx = { generated_at: new Date().toISOString(), files: [] }
  for(const file of fs.readdirSync(path.join('public','status'))){
    if(!file.endsWith('.report.json')) continue
    const rep = JSON.parse(fs.readFileSync(path.join('public','status',file),'utf8'))
    const ok_count = (rep.results||[]).filter(r=>r.ok).length
    const fail_count = (rep.results||[]).filter(r=>!r.ok).length
    idx.files.push({ file: rep.file || file, ok_count, fail_count })
  }
  fs.writeFileSync(path.join('public','status','index.json'), JSON.stringify(idx,null,2))
