# Full Stack Open — exercises (monorepo)

Submit this repository to the [Full Stack Open submission system](https://studies.cs.helsinki.fi/stats/courses/fullstackopen/submissions). Use one well-named folder per exercise block; keep the same GitHub URL across parts.

## Part 1

| Folder | Exercises |
|--------|-----------|
| `courseinfo/` | 1.1–1.5 |
| `unicafe/` | 1.6–1.11 |
| `anecdotes/` | 1.12–1.14 |

## Part 2

| Folder | Exercises / role |
|--------|------------------|
| `courseinfo/` | 2.1–2.5 (course information, modules) |
| `part2-notes/` | Chapter example: collections, forms, filter (no backend; complements the material) |
| `phonebook/` | 2.6–2.17 (forms, `json-server`, axios, CRUD, notifications) |
| `countries/` | 2.18–2.20 (REST countries + OpenWeatherMap via env) |

### Run Part 2 apps locally

**Phonebook** — needs the API on port 3001 in a second terminal:

```bash
cd phonebook
npm install
npm run server
```

```bash
cd phonebook
npm run dev
```

**Countries** — for weather in 2.20, copy `countries/.env.example` to `countries/.env`, set `VITE_SOME_KEY` to your [OpenWeatherMap](https://openweathermap.org/api) key, then restart `npm run dev`. Do not commit `.env`.

```bash
cd countries
npm install
npm run dev
```

**Other Vite apps** (`courseinfo`, `unicafe`, `anecdotes`, `part2-notes`):

```bash
cd <folder>
npm install
npm run dev
```
