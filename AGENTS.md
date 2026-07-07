# AGENTS.md

Guidance for AI agents (and new contributors) working in this repository.

## What this project is

`@crusaider/srv-schedule` is a small TypeScript library that wraps SRV
Återvinning's unofficial REST API for waste collection schedules
(`https://www.srvatervinning.se/rest-api/core/sewagePickup`). The library is
published to npm and exposes two functions:

- `findSuggestions(query)` – looks up address suggestions / customer details
  for an address.
- `search(query)` – fetches the waste collection schedule for an address.

This is a hobby project. The API is unofficial and may break at any time.

## Tech stack

- **Language:** TypeScript (`strict: true`), target/module `ESNext`.
- **Only runtime dependency:** `cross-fetch` (isomorphic `fetch`).
- **Build:** Rollup → `dist/bundle.cjs.js` (CommonJS), `dist/bundle.esm.js`
  (ESM) and `dist/index.d.ts` (types).
- **Test:** Jest + ts-jest.
- **Lint/format:** ESLint (flat config, type-checked) + Prettier.
- **Git hooks:** Husky + lint-staged (pre-commit runs `npm test` and
  `lint-staged`).

## Project structure

```
src/
  index.ts               Public API – re-exports findSuggestions and search
  findSuggestions.ts     findSuggestions()
  search.ts              search()
  sendAPIRequest.ts      Shared HTTP helper (builds URL, throws on !ok)
  conactPaths.ts         concatPaths() – joins path segments (note: the file
                         name is misspelled; the function is concatPaths)
  SearchResponse.ts      Types for the search response
  SuggestionsResponse.ts Types for the suggestions response
  *.test.ts              Unit tests (run with `npm test`)
tests/
  integration.test.ts    Integration tests against the real API (`npm run test:integration`)
http/
  srv-sewagePickup.http  Manual API calls (VS Code REST Client)
```

## Commands

| Command | Description |
| --- | --- |
| `npm test` | Unit tests (`jest ./src`) – no network calls, `cross-fetch` is mocked. |
| `npm run test:integration` | Integration tests (`jest ./tests`) – call the **real** API, require network access. |
| `npm run build` | Cleans `dist/` and builds with Rollup. |
| `npm run lint` | ESLint on `./src` and `./tests`. |
| `npm run format` | Prettier `--write` across the whole repo. |

## Conventions

- **TypeScript strict.** Keep types precise. Response types are `readonly` –
  keep them that way.
- **New API calls** should go through `sendAPIReqest` in `sendAPIRequest.ts`,
  not call `fetch` directly.
- **Unit tests live next to the source** (`src/*.test.ts`) and must not make
  real network calls – mock `cross-fetch` (see `sendAPIRequest.test.ts` as a
  pattern). Slow/network-dependent tests belong in `tests/`.
- **Formatting is handled by Prettier**, linting by ESLint. Run `npm run
  format` and `npm run lint` before committing. The pre-commit hook also runs
  `npm test`.
- **Do not change the public API** (`findSuggestions`, `search`, exported
  types) without updating `README.md` and considering a version bump.
- There are known typos in identifiers (`sendAPIReqest`, the file
  `conactPaths.ts`). Do not fix them in isolation – they are part of the
  public/internal surface and any change should be deliberate and batched.

## Verify before committing

1. `npm run lint`
2. `npm test`
3. `npm run build` (for changes that may affect the build)

The integration tests require internet and may fail for reasons outside your
code (API down/changed). Run them when relevant, but do not rely on them
blindly in CI without network access.
