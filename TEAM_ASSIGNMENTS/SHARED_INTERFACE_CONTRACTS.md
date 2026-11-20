# FITMATE — SHARED INTERFACE CONTRACTS

All five modules integrate against these frozen contracts. Do not alter route paths, exported function signatures, store keys, or API payload schemas without coordinating through the Integration Lead.

---

## 1. Frontend Route Contracts (`FIT/frontend/app.js` & `routes/router.js`)

| Hash Route | Page Module | Exported Lifecycle Contract | Owner |
| :--- | :--- | :--- | :--- |
| `#/` | `LandingPage.js` | `renderLandingPage()`, `onMountLandingPage()` | Member 1 |
| `#/auth` | `AuthPage.js` | `renderAuthPage()`, `onMountAuthPage()` | Member 2 |
| `#/gender` | `OnboardingPage.js` | `renderGenderPage()`, `onMountGenderPage()` | Member 2 |
| `#/category` | `OnboardingPage.js` | `renderCategoryPage()`, `onMountCategoryPage()` | Member 2 |
| `#/onboarding` | `OnboardingPage.js` | `renderOnboardingPage()`, `onMountOnboardingPage()` | Member 2 |
| `#/home` (`requiresAuth: true`) | `DashboardPage.js` | `renderDashboardPage()`, `onMountDashboardPage()` | Member 2 |
| `#/measurements` | `MeasurementsPage.js` | `renderMeasurementsPage()`, `onMountMeasurementsPage()` | Member 3 |
| `#/fit-style` | `BrandProductPickerPage.js` | `renderFitStylePage()`, `onMountFitStylePage()` | Member 4 |
| `#/brand-picker` | `BrandProductPickerPage.js` | `renderBrandProductPickerPage()`, `onMountBrandProductPickerPage()` | Member 4 |
| `#/results` | `ResultPage.js` | `renderResultsPage()`, `onMountResultsPage()` | Member 4 |
| `#/result` | `ResultPage.js` | `renderResultPage()`, `onMountResultPage()` | Member 4 |
| `#/comparison` | `ComparisonTablePage.js` | `renderComparisonTablePage()`, `onMountComparisonTablePage()` | Member 4 |
| `#/history` | `HistoryProfilesPage.js` | `renderHistoryProfilesPage()`, `onMountHistoryProfilesPage()` | Member 5 |

---

## 2. Shared State Store Contract (`FIT/frontend/state/store.js`)
- `store.getState()` exposes: `user`, `isAuthenticated`, `unit` (`"cm" | "in"`), `draftMeasurements` (`gender`, `categoryGroup`, `category`, `fitStyle`, `fitPreference`, `chest_bust`, `waist`, `hips`, `shoulder`, `inseam`, `height`, `weight`), `brandRecommendations`, `activeProfileId`, `toasts`.
- Frozen mutators: `setUnit(unit)`, `setGender(gender)`, `setCategory(categoryGroup)`, `setFitStyle(style, pref)`, `setDraftMeasurement(key, val)`, `setDraftMeasurements(obj)`, `setBrandRecommendations(res)`, `applyProfileToDraft(profile)`, `setUser(user)`, `setActiveProfile(id)`, `addToast(msg, type)`.

---

## 3. Backend API Contracts (`/api/v1/*`)
- **Auth (Member 2)**: `POST /api/v1/auth/register`, `POST /api/v1/auth/login`, `POST /api/v1/auth/refresh`, `POST /api/v1/auth/logout`.
- **Users (Member 5)**: `GET /api/v1/users/me`, `PUT /api/v1/users/me`, `DELETE /api/v1/users/me`.
- **Measurements (Member 3)**: `POST /api/v1/measurements/convert`, `POST|GET /api/v1/measurements`, `GET|PUT|PATCH|DELETE /api/v1/measurements/{profile_id}`, `POST /api/v1/measurements/{profile_id}/reset`, `POST /api/v1/measurements/{profile_id}/default`.
- **Recommendations & ML (Member 4)**: `GET /api/v1/comparison/catalog-styles`, `GET|POST /api/v1/comparison/brands`, `POST|GET /api/v1/recommendations`, `GET|DELETE /api/v1/recommendations/{id}`, `GET /api/v1/models/status`, `POST /api/v1/predict/{size,fit,garment-dims,garment,body-shape,fit-risk}`, `POST|GET /api/v1/feedback`, `GET /api/v1/feedback/me`, `GET /api/v1/feedback/analytics`.

---

## 4. Database Ownership
- `users`, `token_blacklist` (`models/user.py`) -> **Member 2**
- `body_measurement_profiles` (`models/measurement.py`) -> **Frozen Schema** (written by Member 3 & Member 5 via API contracts)
- `recommendations`, `prediction_logs`, `fit_feedbacks` (`models/recommendation.py`, `models/feedback.py`) -> **Member 4**
- `brands`, `clothing_categories`, `products`, `size_charts`, `garment_measurements` (`models/catalog.py`) -> **Frozen Seeded Catalog**

---

## 5. Styling, Asset, Auth & Error Conventions
- **CSS**: Luxury Warm Ivory (`#F8F5EF`, `#E9DCC5`), Espresso (`#2C1D16`), Champagne Gold (`#C8A46B`) tokens in `FIT/frontend/styles/theme.css`.
- **Assets**: Men's styles -> `FIT/frontend/assets/images/mens/mens-<style>.jpg`; Women's styles -> `FIT/frontend/assets/images/womens/womens-<style>.jpg`. Never share assets across genders.
- **Auth**: Bearer JWT in `Authorization: Bearer <token>` via `api.request()`. Guest mode supported on `#/gender` through `#/results`.
- **Errors**: Standardized JSON via `AppException` (`FIT/backend/app/core/exceptions.py`) with HTTP `400`/`401`/`404`/`422`.
