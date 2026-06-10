# Sports Leagues

A small React + TypeScript single-page app that lists sports leagues from
[TheSportsDB](https://www.thesportsdb.com/), lets you filter them client-side,
and shows a league's badge in a modal. Built with Vite, MUI, and TanStack Query.

## Tech stack

| Concern            | Choice                          |
| ------------------ | ------------------------------- |
| Build tool / dev   | Vite                            |
| UI library         | MUI (`@mui/material`) |
| Server state       | TanStack Query (React Query)    |
| HTTP client        | axios                           |
| Toasts             | notistack                       |
| Env validation     | yup                             |

## Running

```bash
yarn install
yarn dev
```
## Design decisions

### Layered architecture: services → query hooks → container hook → components

Data flows through clearly separated layers, each with a single responsibility:

- **`services/TheSportsDB.ts`** owns *how* we talk to the API: the axios
  instance, base URL, endpoint paths, request params, and the response types.
  Components and hooks never construct URLs or know about axios.
- **`hooks/queries/*`** wrap each endpoint in a React Query hook
  (`useSoccerLeagues`, `useLeagueDetails`), owning caching concerns (query keys,
  `enabled`, refetch behaviour) but not the transport details.
- **`hooks/useApp.ts`** is a container hook that holds page-level UI state
  (search text, selected sport) and exposes already-filtered data, keeping
  `App.tsx` declarative.
- **`components/*`** are presentational — they receive data via props and render
  MUI primitives.

The payoff is that each concern can change in isolation: swapping the HTTP
client only touches the service layer; changing cache policy only touches the
query hooks; restyling only touches components.

### Server state lives in TanStack Query, UI state in React

We deliberately do **not** copy fetched data into `useState`. League data is
*server state* and is owned by React Query's cache, which gives us loading/error
flags, deduping, and caching for free. Only genuinely local UI state (the search
string, the selected sport, the currently-open league) lives in `useState`.

`useLeagueDetails` leans on this: it's gated with `enabled: Boolean(id)` so the
badge request only fires once a league is selected, and because the result is
cached by `[leagueDetails, id]`, reopening the same league is instant with no
refetch. `refetchOnWindowFocus` is disabled for the league list since the
catalogue is effectively static and refetching on every tab switch is wasteful.

### Validated configuration (`config.ts` + yup)

Environment values are read from `.env` (injected at build time via Vite's
`define`) and validated **once at startup** with a yup schema. The exported
`CONFIG` object is fully typed (`yup.InferType`), so the rest of the app consumes
configuration with compile-time safety, and a missing or malformed value fails
loudly and immediately instead of surfacing as a confusing runtime 404.

### Explicit loading and error UX

- **Loading:** a dedicated `ListSkeleton` mirrors the shape of the real list so
  the layout doesn't jump when data arrives.
- **Errors:** fetch failures surface as a notistack toast (wired via the
  `SnackbarProvider` at the app root) rather than a silent failure or a broken
  list.
