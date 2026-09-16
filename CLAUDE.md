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

Component tests need two pieces of setup that are easy to break without noticing: `jest.setup.ts` polyfills `TextEncoder`/`TextDecoder` (React Router 7 reads them at import time and jsdom doesn't provide them), and `src/types/jest-dom.d.ts` re-imports `@testing-library/jest-dom` so `tsc` sees matchers like `toBeInTheDocument` — `jest.setup.ts` lives outside `src`, and `ts-loader` type-checks test files as part of `npm run build`, so without that file a component test breaks the build even though it passes under Jest. `jest.config.js` also ignores `.claude/`, because background Claude sessions create full repo copies under `.claude/worktrees/` that Jest would otherwise pick up.

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

Both files are gitignored. Key vars: `SDK_CNFCT` (ConfigCat SDK key) and `ORDERS_API_URL` (base URL of the orders backend). These files must exist locally before running dev/build or webpack will fail to inject them.

`ORDERS_API_URL` falls back to the production Worker URL when unset (this version of `dotenv-webpack` replaces `process.env` with `{}`, so a missing key reads as `undefined`, not as a stub string). For local end-to-end work, point `.env.development` at `http://localhost:8787` and run the backend repo (`../flormorado-cafe-backend-orders`) with `npm start`; its `.dev.vars` must list `http://localhost:3000` in `ALLOWED_ORIGINS` or the browser blocks the response on CORS. `../.claude/launch.json` has both servers configured (`dev` and `backend`).

## Architecture

**Bootstrap chain** (`src/index.tsx` → `src/App.tsx`): `ConfigCatProvider` (feature flags, auto-polling every 10s) wraps `HashRouter` wraps redux `Provider` wraps `App`. `App` renders `Loader`, `Navbar`, the route `Router`, `Footer`, `ToastFmc`, `WhatsAppButton`, and the global `ShoppingCart` — the latter three are rendered app-wide outside the route tree, not per-page. `Navbar`/`Footer` sit outside the `Suspense` boundary so they stay mounted while a lazy route chunk loads; only `<Router />` is wrapped.

**Routing**: `react-router-dom` v7 with `HashRouter` (required for GitHub Pages, which has no server-side routing support). Routes live in `src/app/router/index.tsx`, path strings come from `URLS` in `src/utils/constants`. Because of `HashRouter`, all in-app links resolve as `/#/route`. Every route component is `React.lazy`-loaded (one webpack chunk per page) — when adding a new route, follow the same `lazy(() => import("@/pages/X/X").then((m) => ({ default: m.X })))` pattern rather than a static import from the `@/pages` barrel, or it won't get its own chunk.

**State management**: a single Redux Toolkit slice (`mainSlice` in `src/app/providers/redux/reducer.ts`) mounted at `store.main`. Shape (`IMainState` in `src/types/store`) has two top-level branches: `session` (loader, categoryTitle, showCart, toast, cart) and `flags` (raw ConfigCat flag values). There is no domain/entity state beyond the cart — product/blog/store content is not stored in Redux, it comes from static constants (see below).

Two ways to touch the store, both wired to the same slice:
- Inside components: `useAppDispatch` / `useAppSelector` from `src/app/providers/redux` (typed wrappers around react-redux hooks).
- Outside components (e.g. from `useInit`, plain modules): the pre-bound setter functions in `src/utils/constants/redux/sets.ts` (`setFlags`, `setLoader`, `setCart`, `setShowCart`, `setShowToast`, `setToastMessage`, `setCategoryTitle`), which call `store.dispatch` directly. Prefer these setters over dispatching action creators manually when outside a component's render, to stay consistent with the existing pattern.

**Feature flags**: `useFlags` (`src/hooks/useFlags.ts`) wraps `configcat-react`'s `useFeatureFlag` for each known flag (`testFlag`, `storeProducts`, `storeCategories`, `coffeeGrowers`, `blog`) and exposes an aggregate `loading` (true until every flag's own `useFeatureFlag` has resolved). `useInit` (`src/hooks/useInit.ts`) waits for that `loading` to turn false, then pushes the flags into Redux via the setters above — it's the single place flags cross from ConfigCat into app state. `docs/configCat/` has one annotated `.jsonc` per flag with the real remote structure — check it before parsing a flag instead of assuming its shape.

**Blog content**: `BlogPost` renders the remote `blog` flag's HTML body via `dangerouslySetInnerHTML`, but only after running it through `DOMPurify.sanitize(...)` — never render that HTML unsanitized, since it comes from a remotely-editable ConfigCat flag. `BlogPost` also applies the entry's SEO fields (`entry.seo.metaTitle`/`metaDescription`/`metaImage`, falling back to `title`/`excerpt`/`featuredImage`) to `document.title` and Open Graph meta tags via the reusable `useDocumentMeta` hook (`src/hooks/useDocumentMeta.ts`); reach for that hook on any other page that needs per-page SEO metadata.

**Content/data**: product, category, filter/sort, and navigation data are static TypeScript/JSON constants under `src/utils/constants/` (`store/data.ts`, `store/filter.ts`, `store/order.ts`, `common/data.ts`, `common/actions.ts`, `media/*`), not fetched from an API. `src/services/` holds the one backend integration, `orders/` (see Checkout below). When adding or changing store data (products, filters, sort options), edit these constant files rather than component code.

**Path aliases** (defined identically in both `tsconfig.json` and `webpack.config.js` — keep them in sync if changed): `@/*` → `src/*`, `@components/*` → `src/components/*`, `@pages/*` → `src/pages/*`, `@assets/*` → `src/assets/*`.

**Component layering** under `src/components/`: `common/` (generic, cross-app: Loader, ScrollToTop, Toast), `layout/` (page chrome: Navbar, Footer), `section/` (content sections/carousels used on Landing-type pages), `ui/` (interface widgets, including the `Store/` subtree for product cards, the shopping cart, and the product configurator). Each folder exposes an `index.ts` barrel; import from the barrel (e.g. `@/components/ui`) rather than deep-importing a component file directly, matching existing usage.

**Cart behavior**: cart items live in Redux (`session.cart`, typed `ICoffeeProduct[]`) and are grouped/summed by grind type in the `ShoppingCart` component tree (`ProductListGroup`, `TotalView`, `BottomButtons`) — see `src/components/ui/Store/ShoppingCart/` before changing cart logic, since grouping-by-grind is the one non-obvious business rule in the cart. The cart is also persisted to `localStorage` (`fmc-cart` key, 14-day TTL) in `src/app/providers/redux/store/index.ts`, hydrated on store creation and re-saved on every cart change.

A cart line's `id` is **not** the catalog id: `ProductConfigurator` stores each line as `${product.id}-${grindingId}` so the same coffee in two grinds stays two lines, and `grinding` holds the grind option's id (`"gruesa"`), not its label (`"Gruesa"`). Anything that talks to the catalog or the backend must go through `getCatalogProductId` and `getGrindingLabel` in `src/utils/constants/store/cart.ts` — sending the raw line id makes the backend reject every order as an unknown product. The id is derived rather than stored separately so that carts already sitting in `localStorage` keep working. Totals come from `computeCartTotals` in that same file, which both `TotalView` and the order payload use: the backend recomputes the total with the same rules (free shipping from $150.000, shipping taken from the first cart line) and rejects the order if they disagree, so change them in both repos or not at all.

**Checkout**: `src/pages/Checkout/Checkout.tsx` drives a 3-step accordion (contact → delivery → payment) built from declarative field arrays in `src/utils/constants/common/forms.ts` (`CONTACT_FORM_FIELDS`, `DELIVERY_FORM_FIELDS`, `PAYMENT_FORM_FIELDS`), rendered generically by `CheckoutForm.tsx`. A field's `type` can be `"text"/"email"/"tel"` (plain `Form.Control`), `"select"`, `"checkbox"`, or `"note"` (an informational `Alert`, not real data); `showWhen`/`hideWhen` (`{ field, equals }`) make a field's visibility depend on another field's current value (e.g. the BRE-B key input and its confirmation note only show when `paymentMethod === "bre_b"`). If the "guardar mi información" checkbox is checked, contact + delivery field values are persisted to `localStorage` (`fmc-checkout-info` key, no expiry) and prefilled on the next visit; payment fields are never persisted.

Submitting the payment step posts the order to the backend via `submitOrder` (`src/services/orders/orders.ts`), which maps the flat form state to the backend contract (`src/types/orders`), retries network failures and 5xx up to three times, and never retries a 4xx. What the checkout does with each outcome is the part worth preserving:
- **Created** → shows `OrderConfirmation` (replacing the whole checkout, not a modal, since the cart is about to be empty), saves it to `sessionStorage` (`fmc-last-order`) so a reload still shows it, and only then clears the cart. The cart is never cleared on any other path.
- **409 stale cart** → the cart is up to 14 days old, so this is expected. `reconcileCart` updates prices and drops sold-out items against the catalog already in Redux, and the checkout explains what changed and asks the customer to confirm again. It never silently charges a different amount.
- **Network failure** → the cart is kept and the customer is told to retry.

The idempotency key is tied to the payload's content, not to the page: retrying an identical order reuses it (so the backend returns the order it already created instead of duplicating it), but any change to the cart or the form mints a new one. Reusing a key after an edit would make the backend return the earlier order while the confirmation screen showed the edited cart.

The checkout reads the cart with `useAppSelector`, not `store.getState()`, so the summary re-renders when a stale cart gets repriced.

**WhatsApp marketing consent.** The "novedades y ofertas" checkbox label comes from `WHATSAPP_MARKETING_CONSENT` in `src/utils/constants/common/forms.ts`, and its `version` travels with every order (`contact.marketingConsentVersion`), checked or not. The backend stores it as proof of what the customer agreed to under Colombia's Ley 1581, so **changing the label text requires bumping the version** — otherwise old consents would appear to cover wording the customer never saw.

**BRE-B payments.** For `bre_b` orders the backend returns `instruccionesPago` (company key and account holder), and `OrderConfirmation` shows the exact amount, the key with a copy button, the holder name the customer must see in their banking app, and the order number to write in the transfer message. The key is deliberately not a frontend constant: the backend is the single source for both this screen and the confirmation email. Copy is the primary action because most customers are on the same phone that would have to scan the QR. The QR (`images.BreBQr`, `src/assets/images/payments/`) must be the **official image from the bank app** — BRE-B QRs follow an interoperable standard and a home-made one won't scan.

**Styling**: Sass/SCSS co-located per component/page (`Component.scss` next to `Component.tsx`), plus global variables/mixins in `src/styles/globals.scss` and app-wide rules in `src/styles/styles.scss`. Bootstrap 5 / React Bootstrap is used alongside custom SCSS.
