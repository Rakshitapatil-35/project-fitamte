# MEMBER 01 — UI/UX, BRANDING & LANDING PAGE

## 1. Module Title & Branch
- **Module**: UI/UX, Branding, Design System, Media Assets & Landing Page
- **Git Branch**: `feature/landing-ui` (branched from baseline `main`)

---

## 2. Member Responsibility
Own the visual identity, luxury ivory/espresso/gold theme, global design tokens, responsive layout shell (TopNav, BottomTabBar, Toast, LoadingState, 60fps motion helpers), FITMATE logo & brand assets, fashion photography catalog, and the public Landing Page (`#/`).

---

## 3. Exact Assigned Source Files (Exclusive Ownership)
- `FIT/frontend/pages/LandingPage.js`
- `FIT/frontend/components/TopNav.js`
- `FIT/frontend/components/BottomTabBar.js`
- `FIT/frontend/components/LoadingState.js`
- `FIT/frontend/components/Toast.js`
- `FIT/frontend/components/motion.js`
- `FIT/frontend/styles/theme.css`
- `FIT/frontend/config/images.js`
- `FIT/frontend/assets/brand/*`
- `FIT/frontend/assets/images/landing/*`
- `FIT/frontend/assets/images/mens/*`
- `FIT/frontend/assets/images/womens/*`

---

## 4. Exact Files That Must NOT Be Modified
- `FIT/frontend/index.html`, `FIT/frontend/app.js`, `FIT/frontend/routes/router.js`, `FIT/frontend/state/store.js`, `FIT/frontend/services/api.js`, `FIT/frontend/build.py`, `FIT/frontend/bundle.js` (Shared Core — frozen)
- Any other member's `FIT/frontend/pages/*.js` (`AuthPage.js`, `OnboardingPage.js`, `DashboardPage.js`, `MeasurementsPage.js`, `BrandProductPickerPage.js`, `ResultPage.js`, `ComparisonTablePage.js`, `HistoryProfilesPage.js`)
- `FIT/frontend/assets/images/measurement-guides/*` (owned by Member 3)
- Everything under `FIT/backend/*`

---

## 5. Tasks to Implement & Maintain
1. **Landing Page (`#/`)**:
   - Animated FITMATE hero emblem/logo (`FITMATE_IMAGES.brand.heroLogo` / `emblem`), tagline `"YOUR PERFECT FIT STARTS HERE"`, editorial showcase, and dual primary CTAs (`Log In` -> `#/auth?mode=login`, `Sign Up` -> `#/auth?mode=signup`).
2. **Global Navigation & Shell**:
   - `TopNav.js` (`renderTopNav`, `attachTopNavEvents`) and `BottomTabBar.js` (`renderBottomTabBar`) with responsive mobile/desktop breakpoints and active-route highlighting.
   - `Toast.js` and `LoadingState.js` for consistent feedback and skeleton/loading states across all pages.
3. **Design System (`theme.css`) & Motion (`motion.js`)**:
   - Maintain luxury Warm Ivory (`#F8F5EF` / `#E9DCC5`), Espresso (`#2C1D16`), and Champagne Gold (`#C8A46B`) tokens, typography (`Playfair Display` / `Inter`), and `initBackgroundBlobs`, `ripple`, `attachCursorGlow`.
4. **Centralized Image Catalog (`config/images.js`)**:
   - Enforce strict gender separation (`assets/images/mens/*` for `male`, `assets/images/womens/*` for `female`), zero duplicate images across styles, and `3:4` portrait assets (`900x1200+`) for every style ID in the authoritative catalog.

---

## 6. Existing Functionality to Preserve
- Returning authenticated users hitting `#/` are redirected to `#/gender` by `Router.handleRoute()` unless `?stay=1` is present.
- Exported function signatures in `LandingPage.js` (`renderLandingPage`, `onMountLandingPage`), `TopNav.js` (`renderTopNav`, `attachTopNavEvents`), `images.js` (`FITMATE_IMAGES`, `getCategoryImage`, `getFitStyleImage`), and `motion.js` (`initBackgroundBlobs`, `ripple`, `attachCursorGlow`).
- All 55 unique paths in `config/images.js` must resolve with `HTTP 200 OK`.

---

## 7. APIs & Dependencies
- **Depends on (Read-Only)**:
  - `store.getState()` (`isAuthenticated`, `user`, `toasts`) from `FIT/frontend/state/store.js`
  - `api.logout()` from `FIT/frontend/services/api.js` (via `TopNav` sign-out button)
- **Provides to Other Members**:
  - `FITMATE_IMAGES`, `getCategoryImage(gender, categoryGroup)`, `getFitStyleImage(gender, categoryGroup, fitStyleId)`
  - CSS variables & `.btn-*`, `.card-*`, `.fitmate-*` classes in `theme.css`
  - `renderTopNav()`, `renderBottomTabBar()`, `LoadingState`, `Toast`

---

## 8. Expected Output & Testing Requirements
- Clean ES modules with zero syntax errors (`node --check` on each modified `.js` file).
- Zero broken `<img>` tags or 404 assets across all 55 mapped paths in `config/images.js`.
- Responsive verification on desktop (`1280px+`) and mobile (`375px`) viewports with zero console errors.
- Submit: modified files, asset check output, screenshots of `#/` and nav states, commit hash, and known issues list.

---

## 9. Git Commands & Integration
```bash
git checkout main
git pull origin main
git checkout -b feature/landing-ui

# After implementation & testing:
git status
git add FIT/frontend/pages/LandingPage.js FIT/frontend/components/ FIT/frontend/styles/theme.css FIT/frontend/config/images.js FIT/frontend/assets/brand/ FIT/frontend/assets/images/landing/ FIT/frontend/assets/images/mens/ FIT/frontend/assets/images/womens/
git commit -m "Implement FITMATE landing UI, theme, and media assets"
git push -u origin feature/landing-ui
```
- **Never push directly to `main`, never force-push, and never edit another member's files.**
- Merge via PR into `integration/fitmate-complete` where `python FIT/frontend/build.py` regenerates `bundle.js`.
