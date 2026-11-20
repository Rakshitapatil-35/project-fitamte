# FITMATE — GIT BRANCHING & COLLABORATION WORKFLOW

## 1. Branch Topology

```text
main (protected baseline)
  |
  |-- feature/landing-ui         (Member 1)
  |-- feature/auth-onboarding    (Member 2)
  |-- feature/measurements       (Member 3)
  |-- feature/ai-recommendations (Member 4)
  |-- feature/profile-history    (Member 5)
  |
  +-- integration/fitmate-complete (PR merge target before main)
```

All five `feature/*` branches MUST originate from the exact same baseline commit on `main`.

---

## 2. Starting Work (Every Member)

```bash
git checkout main
git pull origin main
git checkout -b feature/your-module
```

Replace `feature/your-module` with:
- Member 1: `feature/landing-ui`
- Member 2: `feature/auth-onboarding`
- Member 3: `feature/measurements`
- Member 4: `feature/ai-recommendations`
- Member 5: `feature/profile-history`

---

## 3. Committing & Pushing Changes

Before staging, always inspect `git status` and `git diff --name-only` to verify **only your assigned files** were modified:

```bash
git status
git add <only-your-assigned-files>
git commit -m "Implement your assigned FITMATE module"
git push -u origin feature/your-module
```

---

## 4. Strict Git Rules
1. **Never push directly to `main`.**
2. **Never force-push (`git push --force` / `-f`).**
3. **Never commit another member's files or `FIT/frontend/bundle.js`** (`bundle.js` is rebuilt centrally on `integration/fitmate-complete` to prevent merge conflicts).
4. **Never commit `.env`, `__pycache__/`, `.pytest_cache/`, or modified `size_recommendation.db` test artifacts.**
5. If you need a change in a **Frozen Shared Core** file (`store.js`, `api.js`, `router.js`, `models/measurement.py`), open a request with the Integration Lead rather than editing it on your feature branch.
