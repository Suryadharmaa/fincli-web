# GitHub Pages Compatibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the existing FinCLI landing page build and deploy cleanly on GitHub Pages at `https://suryadharmaa.github.io/fincli-web/` without changing the current design or interaction model.

**Architecture:** Keep the app as a static Vite build served from the GitHub Pages project subpath `/fincli-web/`. The only work is to verify path-sensitive assets, keep the deploy workflow aligned with Pages artifact deployment, and make tiny config-only fixes if the audit finds a mismatch. No routing, backend, or component refactor is needed.

**Tech Stack:** React 19, TypeScript, Vite 8, GitHub Actions, GitHub Pages.

## Global Constraints

- Preserve the current layout, typography, color system, animations, and copy unless a Pages-only bug forces a narrowly scoped fix.
- Keep the published base path exactly `/fincli-web/`.
- Keep the site static; do not add API calls, server logic, or new runtime dependencies.
- Maintain the current GitHub Pages deploy model using `dist` as the published artifact.
- Keep the landing-page toolchain compatible with Node.js `20.19+` or `22.12+`.

---

### Task 1: Audit Pages-sensitive paths and deployment wiring

**Files:**
- Review: `vite.config.ts`
- Review: `index.html`
- Review: `.github/workflows/deploy-pages.yml`
- Review: `public/site.webmanifest`
- Review: `public/robots.txt`
- Review: `public/sitemap.xml`

**Interfaces:**
- Consumes: the published URL `https://suryadharmaa.github.io/fincli-web/` and the current Vite base path.
- Produces: a list of any root-relative or domain-sensitive references that would break under GitHub Pages.

- [ ] **Step 1: Scan the repo for Pages-sensitive references**

  Run:
  ```bash
  rg -n 'href="/|src="/|start_url|canonical|og:url|og:image|manifest|sitemap' index.html public src .github
  ```
  Expected: only the known GitHub Pages URLs, `%BASE_URL%`-aware asset references, and the Vite entry script remain.

- [ ] **Step 2: Verify the production build shape**

  Run:
  ```bash
  npm run build
  ```
  Expected: exit code `0` and a generated `dist/` directory with bundled assets.

- [ ] **Step 3: Preview the built site locally**

  Run:
  ```bash
  npm run preview
  ```
  Expected: the site loads correctly under the `/fincli-web/` subpath, and the navigation anchors plus demo sections still behave normally.

### Task 2: Apply only the smallest Pages fix, if the audit finds one

**Files:**
- Modify only the file(s) flagged by Task 1, expected to be `vite.config.ts`, `index.html`, or `.github/workflows/deploy-pages.yml`.

**Interfaces:**
- Consumes: the audit result from Task 1.
- Produces: a Pages-safe static build with no design or layout changes.

- [ ] **Step 1: Patch the specific mismatch**

  If the audit finds a broken root-relative path, fix only that reference. Keep the existing design and component structure unchanged. If the audit is clean, do not make a runtime code change.

- [ ] **Step 2: Rebuild after the fix**

  Run:
  ```bash
  npm run build
  ```
  Expected: the build still succeeds and the generated URLs point to `/fincli-web/`.

- [ ] **Step 3: Re-preview the production bundle**

  Run:
  ```bash
  npm run preview
  ```
  Expected: the deployed-equivalent local preview still renders and all assets load.

## Self-Review

- The scope is intentionally small and keeps the current design intact.
- The current repo already looks Pages-ready, so the most likely outcome is zero or one tiny config-only diff.
- If the audit proves everything is already correct, the implementation stops after validation.
