Saya ingin kamu bertindak sebagai senior frontend engineer, UI/UX designer, creative director, dan deployment engineer.

Tugas utama:
Ubah total website FinCLI saya di:
https://suryadharmaa.github.io/fincli-web/

menjadi website landing page modern, interaktif, premium, dan terupdate berdasarkan README FinCLI terbaru yang saya berikan. Website lama masih menampilkan versi lama, jadi gunakan README terbaru sebagai sumber utama konten. Targetnya: website harus terlihat seperti produk fintech/AI finance kelas premium, dengan interaksi selevel Mozaic Finance, tetapi tetap original dan tidak menjiplak pixel-by-pixel.

Referensi utama:

1. Website saat ini: https://suryadharmaa.github.io/fincli-web/
2. Referensi interaksi/feel: https://mozaic.finance/
3. README terbaru FinCLI v1.9.0 yang sudah tersedia di project/user upload.
4. Wajib riset online tambahan untuk:

   * gaya visual Mozaic Finance
   * interaksi landing page DeFi/AI finance modern
   * GitHub Pages static deployment
   * Vite/React GitHub Pages deployment
   * desain Romawi/Sparta yang bisa diterapkan secara modern

Konsep visual:
Buat tema gabungan:
“FinCLI Imperium: Roman-Spartan Financial Command Center”

Style utama:

* Fintech dark premium
* Roman Empire / Sparta / ancient command room
* Marble, bronze, gold, obsidian black, deep crimson, dark navy
* Subtle laurel wreath, Roman columns, Spartan shield, legion banner, tactical map, engraved stone, bronze trim
* Digabung dengan elemen FinCLI: terminal, slash command, market data, AI research, trading cockpit, provider status, portfolio risk, backtesting, local web access

Jangan membuat desain terlihat seperti game fantasy murahan. Harus terlihat:

* premium
* serious
* cinematic
* finance-grade
* AI-native
* modern
* responsive
* GitHub Pages ready

Tech stack yang disarankan:

* React + Vite
* TypeScript
* Tailwind CSS
* Framer Motion untuk animasi
* Lucide React untuk icon
* Recharts atau lightweight SVG custom charts
* Tidak boleh menggunakan backend/server-side rendering
* Tidak boleh menggunakan API key rahasia di frontend
* Semua harus bisa jalan di GitHub Pages sebagai static site

Batasan penting GitHub Pages:

* Website harus bisa di-build menjadi static assets.
* Jangan menggunakan server backend, FastAPI, Express, database server, atau SSR.
* Jika perlu data market, gunakan mock/static JSON demo data.
* Jika ingin menampilkan fitur Local Web Access FinCLI, tampilkan sebagai simulasi interaktif/demo UI, bukan menjalankan backend asli.
* Jangan expose token, API key, broker key, atau credential apa pun.
* Gunakan `base: "/fincli-web/"` di vite.config jika repo bernama fincli-web.
* Sediakan GitHub Actions workflow untuk deploy ke GitHub Pages.
* Pastikan `npm install`, `npm run build`, dan deployment tidak error.

Konten wajib berdasarkan README FinCLI v1.9.0:

* Hero harus menyebut FinCLI v1.9.0
* Tagline utama:
  “A terminal-native financial workstation. Research, trade, and analyze markets without leaving your shell.”
* Highlight fitur:

  1. Local Web Access
  2. AI-powered market research
  3. Research Engine v4
  4. Provider System v3
  5. Portfolio Risk v3
  6. Live trading with Alpaca and Binance
  7. Backtesting
  8. Screener and alerts
  9. Watchlist
  10. Slash command registry
  11. Provider/model status
  12. Local-first storage
  13. Security / purge / encrypted secrets
  14. Plugin system
  15. GitHub/npm install instructions

Struktur website:

1. Navbar

   * Logo FinCLI
   * Version badge v1.9.0
   * Links: Features, Local Web, Commands, Research, Trading, Security, Install, GitHub
   * CTA: “Install FinCLI”
   * Mobile menu

2. Hero Section

   * Dark cinematic Roman command center background
   * Animated terminal panel
   * Floating market cards
   * Roman/Spartan visual accents
   * CTA buttons:

     * “Get Started”
     * “Explore Commands”
     * “View GitHub”
   * Stats:

     * Research Engine v4
     * Provider System v3
     * Local Web Access
     * 100+ Commands
     * Alpaca + Binance
     * Python 3.11+ / Node 18+

3. Interactive Command Console
   Buat terminal mockup interaktif:

   * User bisa klik command contoh:
     /research AAPL --deep
     /chart AAPL 1d --overlay rsi,macd
     /scan sp500 rsi<30
     /portfolio risk
     /trading live connect alpaca paper
     /provider status
   * Output berubah sesuai command.
   * Output harus rapi, tidak memanjang ke kiri/kanan, ada wrapping, max width, scroll area, dan typography terminal yang bersih.
   * Jangan membuat output mentah seperti terminal biasa yang merusak layout.
   * Tambahkan small chips: Snapshot, Signal, Risk, Trust Gate, Missing Data, Source Scores.

4. Local Web Access Section
   Tampilkan FinCLI v1.9.0 Local Web Access:

   * Browser workspace di localhost:19850
   * Authenticated local dashboard
   * Chat UI
   * Conversation history
   * Dark/light themes
   * Provider and model status
   * Streaming-ready chat
   * Slash command palette
   * Sensitive command confirmation
   * Local-only default
     Buat mock UI seperti “FinCLI Web Command Chamber”.

5. Mozaic-inspired Interactive Finance Modules
   Ambil inspirasi dari Mozaic Finance untuk:

   * scroll-based animation
   * glowing cards
   * floating vault-like modules
   * interactive dashboard cards
   * smooth transitions
   * premium DeFi/AI finance feel
     Tetapi jangan copy layout, asset, logo, wording, atau visual secara langsung.

6. Roman/Spartan Feature Cards
   Buat cards dengan nama kreatif:

   * “Research Oracle” untuk Research Engine v4
   * “Provider Legion” untuk Provider System v3
   * “Risk Shield” untuk Portfolio Risk v3
   * “Trade Phalanx” untuk Live Trading
   * “Backtest Arena” untuk Backtesting
   * “Security Vault” untuk encryption/purge/secrets
   * “Command Codex” untuk slash commands
     Setiap card harus punya icon modern + subtle ancient motif.

7. Research Engine v4 Section
   Jelaskan output:

   * Snapshot
   * Signal
   * Risk
   * Context
   * Trust Gate
   * Verified Facts
   * Inferences
   * Missing Data
   * Scenario Matrix
   * Source Scores
   * Summary
     Tampilkan sebagai interactive report preview.

8. Trading Safety Section
   Jelaskan:

   * Alpaca paper/live
   * Binance testnet/live
   * Risk guard
   * Kill switch
   * Immutable audit log
   * 20% max position size
   * 5% daily loss limit
     Tambahkan disclaimer bahwa ini bukan financial advice dan live trading punya risiko.

9. Provider System Section
   Tampilkan provider:

   * yfinance
   * Finnhub
   * Twelve Data
   * Alpha Vantage
   * Polygon.io
   * IEX Cloud
     Buat visual “provider health matrix”:
   * latency
   * quality score
   * fallback state
   * trust level
   * AI confidence cap

10. Install Section
    Buat tabs:

* npm install
* local source install
* local web access
  Isi command:
  npm install -g @drico2008/fincli
  fincli setup
  fincli

Local Web:
pip install -e ".[web]"
fincli web start
fincli --web

11. Commands Section
    Buat searchable command registry UI:

* Research
* Portfolio
* Trading
* Screener
* Alerts
* AI Assistant
* Backtesting
* Security
* Providers
* Plugin system
  User bisa filter kategori command.
  Command bisa diklik untuk copy.

12. Roadmap / Changelog Section
    Tampilkan:

* Next Major
* v1.9.0
* v1.8.5
* v1.8.4
  Ringkas saja, jangan terlalu panjang.

13. Footer

* FinCLI v1.9.0
* MIT License
* npm
* GitHub
* Warning: AI output informational only, not financial advice.
* Data quality depends on provider/API plan.

Interactivity wajib:

* Animated hero
* Smooth scroll
* Hover effects
* Command copy button
* Search/filter commands
* Theme toggle dark/light
* Mock terminal command runner
* Animated provider health cards
* Responsive mobile nav
* Scroll reveal animations
* Optional particle/grid background, tetapi harus ringan
* Jangan memakai animasi berat yang membuat integrated GPU/RAM tinggi
* Respect `prefers-reduced-motion`

Performance requirements:

* Website harus ringan.
* Hindari 3D berat/WebGL berat.
* Jangan gunakan video besar.
* Jangan gunakan asset gambar besar tanpa optimasi.
* Gunakan CSS/SVG untuk Roman/Spartan motifs jika memungkinkan.
* Lazy-load section berat.
* Gunakan memoization bila perlu.
* Pastikan mobile tetap smooth.
* Target Lighthouse:

  * Performance 90+
  * Accessibility 90+
  * Best Practices 90+
  * SEO 90+

Accessibility:

* Semantic HTML
* Keyboard accessible
* Contrast bagus
* Button punya aria-label
* Animasi tidak mengganggu
* Terminal output dapat dibaca screen reader
* Mobile responsive

SEO:

* Title: “FinCLI v1.9.0 — Terminal-Native Financial Workstation”
* Meta description tentang financial terminal, AI research, local web access, trading, backtesting, provider-aware data
* OpenGraph metadata
* Favicon/icon
* Structured sections

Deployment deliverables:

1. Perbarui seluruh source code website.
2. Pastikan semua konten sesuai README v1.9.0.
3. Tambahkan atau update:

   * package.json scripts
   * vite.config.ts dengan base path GitHub Pages
   * GitHub Actions workflow untuk Pages
   * README deployment note
   * 404.html fallback jika SPA routing digunakan
4. Pastikan bisa deploy ke:
   https://suryadharmaa.github.io/fincli-web/
5. Jangan tinggalkan broken link, placeholder kosong, atau lorem ipsum.
6. Jangan menampilkan rahasia/API key/token.
7. Jangan membuat fitur yang membutuhkan backend di GitHub Pages kecuali hanya simulasi visual.

Acceptance criteria:

* Website terlihat jauh lebih modern daripada versi lama.
* Konten sudah update ke FinCLI v1.9.0.
* Tema Roman/Spartan terasa jelas tetapi tetap fintech premium.
* Ada interaksi seperti Mozaic Finance, tetapi original.
* Output terminal rapi dan tidak overflow.
* Bisa jalan lokal dengan `npm run dev`.
* Bisa build dengan `npm run build`.
* Bisa deploy ke GitHub Pages.
* Mobile, tablet, dan desktop semuanya rapi.
* Tidak ada error console kritis.
* Tidak ada dependensi server/backend.
* Tidak ada secret yang terekspos.

Mulai dengan audit singkat struktur project saat ini, lalu implementasikan perubahan secara langsung. Setelah selesai, berikan ringkasan file yang diubah, cara menjalankan lokal, cara build, dan cara deploy ke GitHub Pages.