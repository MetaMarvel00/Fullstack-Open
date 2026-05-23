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

## Part 3 (started)

| Folder | Exercises / role |
|--------|------------------|
| `phonebook-backend/` | 3.1–3.8 — Express API at `/api/persons`, `/info`, morgan logging |

Use **either** `phonebook-backend` **or** `phonebook`’s `json-server` on port **3001**, not both at once. For a full-stack run with the React phonebook, start the **Express** backend, then the Vite app (the frontend is configured for `/api/persons`).

```bash
cd phonebook-backend
npm install
npm run dev
```

```bash
cd phonebook
npm run dev
```

### Run Part 2 apps locally

**Phonebook (Part 2 only, json-server)** — optional if you are not using `phonebook-backend` yet:

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
