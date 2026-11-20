# FITMATE — INTEGRATION & RELEASE CHECKLIST

## 1. Create Integration Branch
```bash
git checkout main
git pull origin main
git checkout -b integration/fitmate-complete
git push -u origin integration/fitmate-complete
```

---

## 2. Staged PR Merge Order (Do Not Merge Blindly)

Merge each feature branch into `integration/fitmate-complete` via reviewed Pull Request in dependency order:

1. **Merge 1 — `feature/landing-ui` (Member 1)**
   - Verify `git diff --name-only` touches only Member 1 files.
   - Verify all 55 unique paths in `FIT/frontend/config/images.js` exist on disk.
2. **Merge 2 — `feature/auth-onboarding` (Member 2)**
   - Run `pytest FIT/backend/app/tests/test_auth.py -v`.
3. **Merge 3 — `feature/ai-recommendations` (Member 4)**
   - Run `pytest FIT/backend/app/tests/test_all_five_models.py FIT/backend/app/tests/test_ml_fallback.py FIT/backend/app/tests/test_recommendation_strategies.py FIT/backend/app/tests/test_feedback_and_extension.py -v`.
4. **Merge 4 — `feature/measurements` (Member 3)**
   - Run `pytest FIT/backend/app/tests/test_unit_conversion.py FIT/backend/app/tests/test_validation.py -v`.
5. **Merge 5 — `feature/profile-history` (Member 5)**
   - Verify `#/history`, `/api/v1/users/me`, edit/reset/default/delete profile flows.

---

## 3. Post-Merge Build & Full Verification

After all 5 branches are merged into `integration/fitmate-complete`:

```bash
# 1. Rebuild frontend standalone bundle
python FIT/frontend/build.py
node --check FIT/frontend/bundle.js

# 2. Run complete backend test suite
python -m pytest FIT/backend/app/tests FIT/backend/tests -v

# 3. Start servers & verify live health + APIs
python -m uvicorn app.main:app --app-dir FIT/backend --host 0.0.0.0 --port 8000
python -m http.server 5173 --directory FIT/frontend
```

### End-to-End Smoke Checklist
- [ ] `#/` renders animated FITMATE logo, tagline, Log In & Sign Up buttons.
- [ ] `#/auth` Sign Up auto-logs in; Demo Login (`UserPass123`) works; Guest mode works.
- [ ] `#/gender` -> `#/category` enforces Women (`Tops`, `Bottoms`, `Dresses`) & Men (`Tops`, `Bottoms`).
- [ ] `#/measurements` validates required fields, converts `cm`/`in`, and renders SVG guides.
- [ ] `#/fit-style` displays gender-correct cards (`Slim` on Tops only, `Skinny` on Bottoms, `Jumpsuit` on Dresses).
- [ ] `#/results` returns live 7-brand predictions from all 5 ML models (`GET /api/v1/models/status` -> 5/5 ready).
- [ ] `#/history` edits, resets, sets default, deletes profiles, and shows timestamped history.

---

## 4. Final Merge to `main`
Once all checks pass on `integration/fitmate-complete`, open a final PR `integration/fitmate-complete` -> `main`, merge cleanly, and tag the release.
