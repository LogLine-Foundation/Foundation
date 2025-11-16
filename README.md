# LogLine Foundation — Next.js Flagship (Governança 100% Digital)

Gerado em 2025-11-16. Este boilerplate inclui:

- **MDX pages**: Institucional, Governança, Transparência, Padrões, Comitês, Publicações, Políticas, Calendário, Contato.
- **Ledger Viewer**: `/transparencia/ledger` carrega `public/ledger/sample.ndjson` e chama `/api/verify`.
- **API de Verificação**: `pages/api/verify.js` — verifica BLAKE3 + Ed25519.
- **CLI**: `npm run verify` — verifica um arquivo NDJSON local no Node.

## Como usar
```bash
npm install
npm run dev
# abrir http://localhost:3000
```

### Verificação
- Endpoint e CLI requerem:
```bash
npm install blake3 @noble/ed25519
```
- Substitua `TO_BE_COMPUTED` e `PUBKEY_HEX` no `public/ledger/sample.ndjson` por valores reais.
- Assinatura: Ed25519 (hex). Hash: BLAKE3 (hex) da **string canonicalizada** do campo `payload`.

### Estrutura
- `pages/_app.js` e `styles/globals.css` — tema sóbrio (antracito, tipografia institucional).
- `pages/transparencia/ledger.js` — viewer com estados *Pendente*, *Assinatura verificada*, *Falha*.
- MDX em `pages/*.mdx` — conteúdo institucional pronto.
