# recicleScanAI · backend

API Node/Express que recebe uma foto, usa a Anthropic API (visão) para identificar o
material do resíduo e devolve a lata correta + tempo de decomposição, usando a tabela
de referência em `src/services/wasteCatalog.js`.

## Setup

```bash
cp .env.example .env
# preencha ANTHROPIC_API_KEY e DATABASE_URL no .env

createdb reciclescan
psql reciclescan < sql/schema.sql

npm install
npm run dev
```

## Endpoints

### `POST /api/scan`
`multipart/form-data` com campo `image`. Retorna:

```json
{
  "result": {
    "itemLabel": "garrafa PET de refrigerante",
    "material": "plastico",
    "confidence": 0.94,
    "binColor": "#E23B32",
    "binName": "Lata Vermelha · Plástico",
    "recycles": true,
    "decomposeMinYears": 100,
    "decomposeMaxYears": 450,
    "recycleTimeLabel": "...",
    "tips": "..."
  },
  "scanId": "uuid",
  "createdAt": "2026-08-18T12:00:00.000Z"
}
```

### `GET /api/history?limit=20`
Retorna os últimos escaneamentos salvos no Postgres.

### `GET /api/health`
Healthcheck simples.
# RecicleScanAi-backend
