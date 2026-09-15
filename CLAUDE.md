# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Flormorado Café — a React 19 + TypeScript SPA e-commerce site for a Colombian specialty-coffee brand, deployed to production at flormoradocafe.com via GitHub Pages. Spanish is the language used throughout UI copy, comments, and content data files.

## Commands

```bash
npm start                # dev server at localhost:3000 with HMR (webpack-dev-server)
npm run build            # production bundle to dist/
npm run preview          # serve dist/ locally to sanity-check a production build
npm run deploy           # build + write dist/CNAME + publish dist/ to gh-pages branch
npm run prettier         # format src/**/*.{ts,tsx,js,jsx,json,css,scss,md}
npm run prettier:check   # check formatting without writing
npm run lint             # ESLint over src/**/*.{ts,tsx}
npm run lint:fix         # ESLint with --fix
npm test                 # run the Jest suite once
npm run test:watch       # Jest in watch mode
npx tsc --noEmit         # type-check without emitting (no dedicated npm script)
```

To run a single test file, pass it to Jest directly: `npx jest src/utils/constants/store/order.test.ts`.

Tests live colocated with the source they cover (`Thing.ts` + `Thing.test.ts` in the same folder), using Jest + `@testing-library/react` with a `jest-environment-jsdom` environment; `jest.config.js` mirrors the `@/*` path aliases from `tsconfig.json`/`webpack.config.js` and stubs SCSS/asset imports (see `src/__mocks__/fileMock.js`) since Jest can't process them the way webpack does.

`.github/workflows/ci.yml` runs `tsc --noEmit`, lint, format check, tests, and build on every PR to `main` and every push to `main` — treat a red CI check the same as a local failure.

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

**Bootstrap chain** (`src/index.tsx` → `src/App.tsx`): `ConfigCatProvider` (feature flags, auto-polling every 10s) wraps `HashRouter` wraps redux `Provider` wraps `App`. `App` renders `Loader`, `Navbar`, the route `Router`, `Footer`, `ToastFmc`, `WhatsAppButton`, and the global `ShoppingCart` — the latter three are rendered app-wide outside the route tree, not per-page. `Navbar`/`Footer` sit outside the `Suspense` boundary so they stay mounted while a lazy route chunk loads; only `<Router />` is wrapped.

**Routing**: `react-router-dom` v7 with `HashRouter` (required for GitHub Pages, which has no server-side routing support). Routes live in `src/app/router/index.tsx`, path strings come from `URLS` in `src/utils/constants`. Because of `HashRouter`, all in-app links resolve as `/#/route`. Every route component is `React.lazy`-loaded (one webpack chunk per page) — when adding a new route, follow the same `lazy(() => import("@/pages/X/X").then((m) => ({ default: m.X })))` pattern rather than a static import from the `@/pages` barrel, or it won't get its own chunk.

**State management**: a single Redux Toolkit slice (`mainSlice` in `src/app/providers/redux/reducer.ts`) mounted at `store.main`. Shape (`IMainState` in `src/types/store`) has two top-level branches: `session` (loader, categoryTitle, showCart, toast, cart) and `flags` (raw ConfigCat flag values). There is no domain/entity state beyond the cart — product/blog/store content is not stored in Redux, it comes from static constants (see below).

Two ways to touch the store, both wired to the same slice:
- Inside components: `useAppDispatch` / `useAppSelector` from `src/app/providers/redux` (typed wrappers around react-redux hooks).
- Outside components (e.g. from `useInit`, plain modules): the pre-bound setter functions in `src/utils/constants/redux/sets.ts` (`setFlags`, `setLoader`, `setCart`, `setShowCart`, `setShowToast`, `setToastMessage`, `setCategoryTitle`), which call `store.dispatch` directly. Prefer these setters over dispatching action creators manually when outside a component's render, to stay consistent with the existing pattern.

**Feature flags**: `useFlags` (`src/hooks/useFlags.ts`) wraps `configcat-react`'s `useFeatureFlag` for each known flag (`testFlag`, `storeProducts`, `storeCategories`, `coffeeGrowers`, `blog`) and exposes an aggregate `loading` (true until every flag's own `useFeatureFlag` has resolved). `useInit` (`src/hooks/useInit.ts`) waits for that `loading` to turn false, then pushes the flags into Redux via the setters above — it's the single place flags cross from ConfigCat into app state. See `docs/configCat/blog.jsonc` for the schema the `blog` flag's remote content follows.

**Blog content**: `BlogPost` renders the remote `blog` flag's HTML body via `dangerouslySetInnerHTML`, but only after running it through `DOMPurify.sanitize(...)` — never render that HTML unsanitized, since it comes from a remotely-editable ConfigCat flag. `BlogPost` also applies the entry's SEO fields (`entry.seo.metaTitle`/`metaDescription`/`metaImage`, falling back to `title`/`excerpt`/`featuredImage`) to `document.title` and Open Graph meta tags via the reusable `useDocumentMeta` hook (`src/hooks/useDocumentMeta.ts`); reach for that hook on any other page that needs per-page SEO metadata.

**Content/data**: product, category, filter/sort, and navigation data are static TypeScript/JSON constants under `src/utils/constants/` (`store/data.ts`, `store/filter.ts`, `store/order.ts`, `common/data.ts`, `common/actions.ts`, `media/*`), not fetched from an API — `src/services/` is a placeholder for a future backend integration. When adding or changing store data (products, filters, sort options), edit these constant files rather than component code.

**Path aliases** (defined identically in both `tsconfig.json` and `webpack.config.js` — keep them in sync if changed): `@/*` → `src/*`, `@components/*` → `src/components/*`, `@pages/*` → `src/pages/*`, `@assets/*` → `src/assets/*`.

**Component layering** under `src/components/`: `common/` (generic, cross-app: Loader, ScrollToTop, Toast), `layout/` (page chrome: Navbar, Footer), `section/` (content sections/carousels used on Landing-type pages), `ui/` (interface widgets, including the `Store/` subtree for product cards, the shopping cart, and the product configurator). Each folder exposes an `index.ts` barrel; import from the barrel (e.g. `@/components/ui`) rather than deep-importing a component file directly, matching existing usage.

**Cart behavior**: cart items live in Redux (`session.cart`, typed `ICoffeeProduct[]`) and are grouped/summed by grind type in the `ShoppingCart` component tree (`ProductListGroup`, `TotalView`, `BottomButtons`) — see `src/components/ui/Store/ShoppingCart/` before changing cart logic, since grouping-by-grind is the one non-obvious business rule in the cart. The cart is also persisted to `localStorage` (`fmc-cart` key, 14-day TTL) in `src/app/providers/redux/store/index.ts`, hydrated on store creation and re-saved on every cart change.

**Checkout**: `src/pages/Checkout/Checkout.tsx` drives a 3-step accordion (contact → delivery → payment) built from declarative field arrays in `src/utils/constants/common/forms.ts` (`CONTACT_FORM_FIELDS`, `DELIVERY_FORM_FIELDS`, `PAYMENT_FORM_FIELDS`), rendered generically by `CheckoutForm.tsx`. A field's `type` can be `"text"/"email"/"tel"` (plain `Form.Control`), `"select"`, `"checkbox"`, or `"note"` (an informational `Alert`, not real data); `showWhen`/`hideWhen` (`{ field, equals }`) make a field's visibility depend on another field's current value (e.g. the BRE-B key input and its confirmation note only show when `paymentMethod === "bre_b"`). If the "guardar mi información" checkbox is checked, contact + delivery field values are persisted to `localStorage` (`fmc-checkout-info` key, no expiry) and prefilled on the next visit; payment fields are never persisted. There is no backend order submission yet — completing the payment step doesn't send the order anywhere.

**Styling**: Sass/SCSS co-located per component/page (`Component.scss` next to `Component.tsx`), plus global variables/mixins in `src/styles/globals.scss` and app-wide rules in `src/styles/styles.scss`. Bootstrap 5 / React Bootstrap is used alongside custom SCSS.
