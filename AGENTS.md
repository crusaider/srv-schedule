# AGENTS.md

Vägledning för AI-agenter (och nya utvecklare) som arbetar i detta repo.

## Vad projektet är

`@crusaider/srv-schedule` är ett litet TypeScript-bibliotek som wrappar SRV
Återvinnings inofficiella REST-API för sophämtningsschema
(`https://www.srvatervinning.se/rest-api/core/sewagePickup`). Biblioteket
publiceras till npm och exponerar två funktioner:

- `findSuggestions(query)` – slår upp adressförslag/kunddetaljer för en adress.
- `search(query)` – hämtar sophämtningsschemat för en adress.

Detta är ett hobbyprojekt. API:et är inte officiellt och kan sluta fungera när
som helst.

## Teknik-stack

- **Språk:** TypeScript (`strict: true`), target/module `ESNext`.
- **Enda runtime-beroende:** `cross-fetch` (isomorf `fetch`).
- **Bygg:** Rollup → `dist/bundle.cjs.js` (CommonJS), `dist/bundle.esm.js`
  (ESM) och `dist/index.d.ts` (typer).
- **Test:** Jest + ts-jest.
- **Lint/format:** ESLint (flat config, type-checked) + Prettier.
- **Git hooks:** Husky + lint-staged (pre-commit kör `npm test` och
  `lint-staged`).

## Projektstruktur

```
src/
  index.ts              Publikt API – re-exporterar findSuggestions och search
  findSuggestions.ts    findSuggestions()
  search.ts             search()
  sendAPIRequest.ts     Delad HTTP-hjälpare (bygger URL, kastar vid !ok)
  conactPaths.ts        concatPaths() – slår ihop path-segment (obs: filnamnet
                        är felstavat, funktionen heter concatPaths)
  SearchResponse.ts     Typer för search-svaret
  SuggestionsResponse.ts Typer för suggestions-svaret
  *.test.ts             Enhetstester (körs med `npm test`)
tests/
  integration.test.ts   Integrationstest mot det riktiga API:et (`npm run test:integration`)
http/
  srv-sewagePickup.http Manuella API-anrop (VS Code REST Client)
```

## Kommandon

| Kommando | Beskrivning |
| --- | --- |
| `npm test` | Enhetstester (`jest ./src`) – inga nätverksanrop, `cross-fetch` mockas. |
| `npm run test:integration` | Integrationstester (`jest ./tests`) – anropar det **riktiga** API:et, kräver nätverk. |
| `npm run build` | Rensar `dist/` och bygger med Rollup. |
| `npm run lint` | ESLint på `./src` och `./tests`. |
| `npm run format` | Prettier `--write` på hela repot. |

## Konventioner

- **TypeScript strict.** Håll typerna exakta. Svarstyper är `readonly` –
  behåll det.
- **Nya API-anrop** ska gå genom `sendAPIReqest` i `sendAPIRequest.ts`, inte
  anropa `fetch` direkt.
- **Enhetstester ligger bredvid källan** (`src/*.test.ts`) och får inte göra
  riktiga nätverksanrop – mocka `cross-fetch` (se `sendAPIRequest.test.ts` som
  mönster). Långsamma/nätverksberoende tester hör hemma i `tests/`.
- **Formatering sköts av Prettier**, linting av ESLint. Kör `npm run format`
  och `npm run lint` innan commit. Pre-commit-hooken kör dessutom `npm test`.
- **Ändra inte publikt API** (`findSuggestions`, `search`, exporterade typer)
  utan att uppdatera `README.md` och överväga en versionshöjning.
- Det finns kända stavfel i identifierare (`sendAPIReqest`, filen
  `conactPaths.ts`). Rätta dem inte enskilt – de ingår i publik/intern yta och
  en ändring bör vara medveten och samlad.

## Att verifiera innan commit

1. `npm run lint`
2. `npm test`
3. `npm run build` (vid ändringar som kan påverka bygget)

Integrationstesterna kräver internet och kan fela av skäl utanför din kod
(API:et nere/ändrat). Kör dem vid behov, men lita inte blint på dem i CI utan
nät.
