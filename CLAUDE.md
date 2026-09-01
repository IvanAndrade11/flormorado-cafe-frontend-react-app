# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Flormorado Café — a React 19 + TypeScript SPA e-commerce site for a Colombian specialty-coffee brand, deployed to production at flormoradocafe.com via GitHub Pages. Spanish is the language used throughout UI copy, comments, and content data files.

## Commands

```bash
npm start              # dev server at localhost:3000 with HMR (webpack-dev-server)
npm run build           # production bundle to dist/
npm run preview         # serve dist/ locally to sanity-check a production build
npm run deploy           # build + write dist/CNAME + publish dist/ to gh-pages branch
npm run prettier         # format src/**/*.{ts,tsx,js,jsx,json,css,scss,md}
npm run prettier:check   # check formatting without writing
```

There is no test runner, linter (ESLint), or type-check script configured in this repo — `tsc` type errors surface only through `ts-loader` during `npm start` / `npm run build`. There is no single-test command since there are no tests.

## Commit messages

Follow the existing history's convention, one line, no body:

```
:gitmoji: TICKET-ID: short lowercase description, no trailing period
```

- `TICKET-ID` is the Jira-style ticket the branch is for (e.g. `FMC-0010`), matching the `feature/TICKET-ID` branch name.
- Keep the description short and imperative (e.g. `fix loader stuck when flag never resolves`, not a multi-sentence explanation).
- Pick the gitmoji by change type, matching prior usage in this repo: `:sparkles:` new feature, `:bug:` bug fix, `:lipstick:` UI/style only, `:memo:` docs, `:package:` deps/config, `:building_construction:` architecture/structural change, `:boom:` breaking change, `:wrench:` tooling/config.
- Do not add a commit body — if the change needs more explanation than the one-line subject, put that explanation in the PR description instead.

## Environment

Env vars are injected via `dotenv-webpack`, which picks the file based on webpack mode:
- `.env.development` → `npm start`
- `.env.production` → `npm run build`

Both files are gitignored. Key var: `SDK_CNFCT` (ConfigCat SDK key). These files must exist locally before running dev/build or webpack will fail to inject them.

## Architecture

**Bootstrap chain** (`src/index.tsx` → `src/App.tsx`): `ConfigCatProvider` (feature flags, auto-polling every 10s) wraps `HashRouter` wraps redux `Provider` wraps `App`. `App` renders `Loader`, `Navbar`, the route `Router`, `Footer`, `ToastFmc`, `WhatsAppButton`, and the global `ShoppingCart` — the latter three are rendered app-wide outside the route tree, not per-page.

**Routing**: `react-router-dom` v7 with `HashRouter` (required for GitHub Pages, which has no server-side routing support). Routes live in `src/app/router/index.tsx`, path strings come from `URLS` in `src/utils/constants`. Because of `HashRouter`, all in-app links resolve as `/#/route`.

**State management**: a single Redux Toolkit slice (`mainSlice` in `src/app/providers/redux/reducer.ts`) mounted at `store.main`. Shape (`IMainState` in `src/types/store`) has two top-level branches: `session` (loader, categoryTitle, showCart, toast, cart) and `flags` (raw ConfigCat flag values). There is no domain/entity state beyond the cart — product/blog/store content is not stored in Redux, it comes from static constants (see below).

Two ways to touch the store, both wired to the same slice:
- Inside components: `useAppDispatch` / `useAppSelector` from `src/app/providers/redux` (typed wrappers around react-redux hooks).
- Outside components (e.g. from `useInit`, plain modules): the pre-bound setter functions in `src/utils/constants/redux/sets.ts` (`setFlags`, `setLoader`, `setCart`, `setShowCart`, `setShowToast`, `setToastMessage`, `setCategoryTitle`), which call `store.dispatch` directly. Prefer these setters over dispatching action creators manually when outside a component's render, to stay consistent with the existing pattern.

**Feature flags**: `useFlags` (`src/hooks/useFlags.ts`) wraps `configcat-react`'s `useFeatureFlag` for each known flag (`testFlag`, `storeProducts`, `storeCategories`, `coffeeGrowers`, `blog`). `useInit` (`src/hooks/useInit.ts`) reads flags once and pushes them into Redux via the setters above; it's the single place flags cross from ConfigCat into app state. See `docs/configCat/blog.jsonc` for the schema the `blog` flag's remote content follows.

**Content/data**: product, category, filter/sort, and navigation data are static TypeScript/JSON constants under `src/utils/constants/` (`store/data.ts`, `store/filter.ts`, `store/order.ts`, `common/data.ts`, `common/actions.ts`, `media/*`), not fetched from an API — `src/services/` is a placeholder for a future backend integration. When adding or changing store data (products, filters, sort options), edit these constant files rather than component code.

**Path aliases** (defined identically in both `tsconfig.json` and `webpack.config.js` — keep them in sync if changed): `@/*` → `src/*`, `@components/*` → `src/components/*`, `@pages/*` → `src/pages/*`, `@assets/*` → `src/assets/*`.

**Component layering** under `src/components/`: `common/` (generic, cross-app: Loader, ScrollToTop, Toast), `layout/` (page chrome: Navbar, Footer), `section/` (content sections/carousels used on Landing-type pages), `ui/` (interface widgets, including the `Store/` subtree for product cards, the shopping cart, and the product configurator). Each folder exposes an `index.ts` barrel; import from the barrel (e.g. `@/components/ui`) rather than deep-importing a component file directly, matching existing usage.

**Cart behavior**: cart items live in Redux (`session.cart`, typed `ICoffeeProduct[]`) and are grouped/summed by grind type in the `ShoppingCart` component tree (`ProductListGroup`, `TotalView`, `BottomButtons`) — see `src/components/ui/Store/ShoppingCart/` before changing cart logic, since grouping-by-grind is the one non-obvious business rule in the cart.

**Styling**: Sass/SCSS co-located per component/page (`Component.scss` next to `Component.tsx`), plus global variables/mixins in `src/styles/globals.scss` and app-wide rules in `src/styles/styles.scss`. Bootstrap 5 / React Bootstrap is used alongside custom SCSS.
