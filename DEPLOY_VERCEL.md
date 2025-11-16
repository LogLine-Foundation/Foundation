# Guia de Deploy — Vercel

Este projeto é Next.js + MDX. Objetivo: publicar **logline.world** (público) e **lofline.foundation** (institucional) no mesmo projeto (ou ambientes separados, se preferir).

## 1) Preparar o repositório
- `main` como branch de produção.
- CI de provas já inclusa: `.github/workflows/proof.yml`.

## 2) Criar o projeto na Vercel
1. Importar o repositório da Fundação.
2. **Framework Preset**: Next.js (Node 20).
3. **Build Command**: `next build` (padrão).  
   **Output Directory**: `.next` (padrão).
4. Variáveis de ambiente (opcionais):  
   - `NEXT_PUBLIC_STATUS_INDEX` = `/status/index.json` (default já funciona)  
   - Chaves **não são** necessárias para build; chaves Ed25519 são usadas na CI do GitHub (não na Vercel).

## 3) Domínios
- **logline.world** → *Production*.  
- **lofline.foundation** → *Production* (opcional: apontar para o mesmo projeto).  
Configurar no painel *Domains* e fazer o `CNAME` para `cname.vercel-dns.com`.

## 4) Previews e proteção
- *Preview Deployments* em cada PR (recomendado).  
- Opcional: proteger previews com senha ou equipe restrita.
- SSO/Teams conforme política interna.

## 5) Cache e headers
O arquivo `vercel.json` define:
- `Cache-Control` agressivo para estáticos (`/public/**`).
- `no-store` para `/status/**` (para sempre pegar o índice de provas novo).

## 6) Pós-deploy
- Checar `/provas-ao-vivo` (deve ler `status/index.json` gerado pela CI).  
- Rodar `npm run release:cut` local e comitar artefatos `public/releases/**` (opcional, recomendado).  
- Publicar **press kit**: `/press`.

## 7) Problemas comuns
- **Relatórios vazios** em `/provas-ao-vivo`: rode a CI (push em `public/ledger/**`) ou `npm run ci:proof` e faça commit de `public/status/*.report.json` + `index.json`.
- **Links PT↔EN** quebrados: faltou `RIT publicacao_bilingue` com `crosslink_proof`.
- **Falha no verificador** `/api/verify`: verifique `machine_gate`, `lang`, `usage_decl` e assinaturas.

## 8) Rollback
- Reverter para um deployment anterior no painel da Vercel.
- Restaurar ledger/arquivos usando o **manifesto de release** em `public/releases/<stamp>/manifest.json`.

