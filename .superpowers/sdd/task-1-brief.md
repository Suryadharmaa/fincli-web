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
