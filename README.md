
# LogLine Foundation
**Governança verificável. Parceria humano–IA. Uso pacífico por padrão.**

> _“Decisão sem prova é opinião.”_  
> Na LogLine Foundation, cada ato — **proposta → voto → ata → política → diretiva → execução** — vira **dado assinável**, com **hash BLAKE3**, **assinatura Ed25519** e **rito computável**. Tudo público, auditável e reprodutível.

<p align="center">
  <a href="/manifesto">Manifesto</a> ·
  <a href="/comparativo">Comparativo & Radar</a> ·
  <a href="/provas-ao-vivo">Provas ao vivo</a> ·
  <a href="/roadmap">Roadmap</a> ·
  <a href="/engenharia/logline-101">LogLine 101</a> ·
  <a href="/transparencia/ledger">Ledger Público</a> ·
  <a href="/press">Press</a>
</p>

---

## 1) Propósito
Ser a **flagship** de **governança 100% digital e verificável**, com processos simples, públicos e comprováveis — da deliberação à execução.
Promovemos a **parceria humano–IA** e garantimos que nossos artefatos (código, modelos, políticas) sejam usados **exclusivamente para fins pacíficos, comerciais e pessoais**.

### Por que agora?
As organizações precisam de **transparência com prova** e **segurança reprodutível**, não apenas “PDFs bonitos”. A Fundação entrega **padrões**, **ferramentas** e **ritos** que tornam a confiança **verificável por qualquer pessoa**.

---

## 2) O que nos diferencia
- **Ledger por decisão (JSON✯Atomic):** toda decisão deixa rastro com BLAKE3 + Ed25519 e estado público.
- **Machine Gate + Attestation:** políticas e ritos só entram em vigor se o “gate” técnico estiver **PASSED** e atestado pelo _policy_agent_.
- **Bilinguismo canônico (PT–EN):** **Português da CPLP** como _companion language_ do novo paradigma computável, com **Publicação Bilíngue** e _crosslink_ obrigatório.
- **Uso pacífico executável:** artefatos com `usage_decl.peaceful_only = true` e auditoria contínua.
- **Provas por padrão:** verificador local (CLI/API), _ledger viewer_, CI que calcula/verifica hashes e assinaturas, e página **/provas-ao-vivo**.

---

## 3) Princípios não negociáveis
1. **Primazia humana:** conselheiros humanos deliberam e votam; IAs atuam como **assistentes/atestadores** com rastro verificável.
2. **Transparência verificável:** máximo de publicidade, mínimo de sigilo necessário, **sempre com prova**.
3. **Ética e paz:** vedamos usos bélicos/militares e violações de direitos humanos.
4. **Reprodutibilidade:** qualquer alegação nossa deve ser testável por terceiros com os mesmos dados e scripts.
5. **Simplicidade operável:** regras curtas, ritos claros, automação visível.

---

## 4) Modelo de governança
- **Período de transição:** _Trustee_ interino + Secretaria do Ledger, followed by **Ratificação T2** quando o Conselho completo assumir.
- **Comitês:** Transparência/Auditoria, Ética & IA, Orçamento & Compras.
- **Ritos oficiais:** `aprovacao_politica`, `publicacao_bilingue`, `ratificacao_t2` (templates em `public/templates/`).
- **Políticas-base:** Conflitos de Interesse, Transparência, Orçamento (`/politicas`).

> Referência rápida: `/engenharia/fluxo-end2end` mostra o encadeamento **proposta → voto → ata → política → diretiva → execução** com IDs reais no ledger.

---

## 5) Núcleo técnico (LogLine 101)
- **JSON✯Atomic:** formato auditável, serialização determinística, _ledger_ NDJSON.
- **Criptografia:** `BLAKE3` para hash; `Ed25519` para assinatura/verificação.
- **Execução computável:** _machine gate_ + _policy_agent_ (atestação), `run_code(span_id)` e idempotência por hash de conteúdo.
- **Ferramentas de prova:**
  - **CLI:** `scripts/ledger_publish.mjs` (assina e publica um span).
  - **CI:** `scripts/ci_proof.mjs` (verifica ledger; gera relatórios em `public/status/`).
  - **Linter:** `scripts/jsonatomic_lint.mjs` (valida contra _schemas_ e regras da casa).
  - **Release cut:** `scripts/release_cut.mjs` (gera manifesto de hashes em `public/releases/`).

---

## 6) Como rodar localmente
```bash
npm install
npm run demo:gen       # gera chaves de demo, calcula BLAKE3, assina e marca machine_gate=PASSED
npm run dev            # abra http://localhost:3000
# verifique /provas-ao-vivo e /transparencia/ledger
```

### Scripts úteis
| Comando | O que faz |
|---|---|
| `npm run ci:proof` | Verifica o ledger e gera `public/status/*.report.json` + `index.json` |
| `npm run publish:span` | Publica um span assinado no ledger (ver `scripts/ledger_publish.mjs`) |
| `npm run lint:atomic` | Linter JSON✯Atomic (ledger + templates) |
| `npm run release:cut` | Gera manifesto de release com hashes (BLAKE3) |

> **CI no GitHub:** `.github/workflows/proof.yml` (provas) e `lint_jsonatomic.yml` (linter de PR).  
> Configure `ED25519_PRIV_HEX` e `ED25519_PUB_HEX` como **secrets** para verificação reforçada.

---

## 7) Fluxo de contribuição (PR-first)
1. Abra um PR usando o **template** `.github/pull_request_template.md` (checklist de conformidade).
2. Passe no **linter de PR** (JSON✯Atomic) e na CI de provas.
3. Garanta **Publicação Bilíngue** (PT–EN) quando cabível, com `crosslink_proof`.
4. Use os **issue templates** (bug/feature/ritual) para rastreabilidade.

**Branch protection sugerida:** exigir sucesso de “PR Checks — JSON✯Atomic Lint” e revisão humana.

---

## 8) Políticas & Ritos (resumo)
- **Políticas:** `/politicas/transparencia`, `/politicas/conflitos`, `/politicas/orcamento`.
- **Ritos:** `/rituais/publicacao-bilingue` (PT–EN com _crosslink_ e prova TDLN opcional), `ratificacao_t2`, `aprovacao_politica`.
- **Templates:** `public/templates/rito_publicacao_bilingue.template.json`, `public/templates/rito_ratificacao_t2.template.json`.
- **Schemas:** `public/schemas/…` (base, POL, RIT, DIR, SPAN, ritos específicos).

---

## 9) Licenças & Ética
- **Uso pacífico obrigatório:** `usage_decl.peaceful_only = true` nos artefatos distribuídos pela Fundação.
- **Compatibilidade:** avaliamos licenças com cláusulas éticas (ex.: OpenRAIL, HL3) caso a caso, cuidando da interoperabilidade com o ecossistema.
- **Dados & privacidade:** minimização, logs auditáveis e verificação local.

> **Idioma:** toda norma/ato relevante deve existir em **PT (CPLP, AO90)** e **EN**, com equivalência formal e vínculos cruzados (Rito de Publicação Bilíngue).

---

## 10) Roadmap
Veja `/roadmap` para T0/T1/T2 (com checklist).  
Marcos típicos: instalar Conselho, ativar OCDS (procurement), lançar plataforma de avaliações (estilo AISI), publicar auditorias T+15.

---

## 11) Contato
- **Site:** `logline.world` (público) · **Fundação:** `lofline.foundation` (institucional)
- **Press:** `press@logline.foundation` · Página **/press**
- **Dúvidas técnicas:** issues no GitHub (use os templates)

---

### English (short overview)
LogLine Foundation is the flagship for **fully digital, verifiable governance**. Every decision becomes a **cryptographically provable** record (BLAKE3 + Ed25519), with **computable rites** and a **public ledger**. We promote **Human–AI partnership**, enforce **peaceful-only** usage, and publish policies in **PT–EN** with cross-linked proofs. CI pipelines verify ledgers; a CLI and a linter help contributors keep everything reproducible.

—  
© LogLine Foundation — Transparência verificável, por padrão.
