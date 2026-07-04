/* ============================================================
   FinCLI landing — app.js
   ============================================================ */
(function () {
  "use strict";

  /* ---------- data ---------- */
  const FEATURES = [
    { ico: "🔎", t: "Research Engine v3", d: "Snapshot/deep/report modes with cited sources, sector/macro/news context blending, Trust Gate, and web research fallback." },
    { ico: "🔗", t: "Provider fallback chain", d: "Quality scoring (0–100), circuit breaker, per-operation metrics. Supported: yfinance, Finnhub, Twelve Data, Alpha Vantage, Polygon.io, IEX Cloud." },
    { ico: "💼", t: "Portfolio Risk v3", d: "Asset class exposure, concentration risk, drawdown, VaR (historical + parametric), correlation matrix, tax reporting, and portfolio health score." },
    { ico: "📊", t: "8 Backtest strategies", d: "sma_cross, rsi_reversion, momentum, bollinger_squeeze, macd_divergence, volume_breakout, mean_reversion, multi_factor. Compare strategies on same symbol." },
    { ico: "📈", t: "Technical analysis", d: "RSI, MACD, EMA/SMA, Bollinger Bands, ATR, support/resistance, market structure. Multi-timeframe via /mtf." },
    { ico: "🗞️", t: "100+ news connectors", d: "Free RSS fallbacks plus API-key-ready providers like Finnhub, Twelve Data, Alpha Vantage. Source quality and freshness scoring." },
    { ico: "🤖", t: "7 AI providers", d: "OpenRouter, OpenAI, Groq, Together, HuggingFace, Gemini, Anthropic. Response caching with 30-min TTL." },
    { ico: "📡", t: "Screener & Alerts", d: "Scan S&P 500, NASDAQ, crypto, forex, commodities. Filters: RSI, SMA cross, support/resistance. Conditional alerts with notification webhooks." },
    { ico: "🔌", t: "Plugin system", d: "Custom commands via manifest, lifecycle hooks (on_startup, on_shutdown), sandboxed API. Blocked by default: os, sys, subprocess, exec()." },
    { ico: "🔒", t: "Local-first storage", d: "SQLite, encrypted secrets (PBKDF2-SHA256), session recovery, watchlist, portfolio, journal, alerts, audit log." },
    { ico: "🎨", t: "Theme system", d: "Multiple built-in themes. Create custom themes with --base. Switch via /theme list and /theme ocean." },
    { ico: "📤", t: "Unified export", d: "Batch export portfolio, journal, alerts, trades to CSV/JSON. Research reports to Markdown/JSON. /export all for full dump." },
  ];

  const TRADING = [
    { ico: "🏦", t: "Live brokers", d: "Alpaca (US equities, paper + live) and Binance (crypto, testnet + live). Connect via /trading live connect." },
    { ico: "🛑", t: "Risk guard", d: "20% max position size, 5% daily loss limit, no leverage in paper mode, auto-disconnect on suspicious activity." },
    { ico: "📋", t: "Audit log", d: "Immutable order audit log — never UPDATE, never DELETE. Full traceability via /trading audit." },
    { ico: "📝", t: "Paper trading", d: "Paper mode for both Alpaca and Binance. Practice with real market data without risking capital." },
    { ico: "🔒", t: "Kill switch", d: "Emergency stop via /trading kill — blocks all orders immediately. Resume when ready with /trading resume." },
    { ico: "🔔", t: "Alert daemon", d: "Background checking with conditional alerts (price, RSI, volume, MACD cross). Discord & Telegram webhooks." },
  ];

  const BACKTEST = [
    { ico: "📊", t: "8 strategies", d: "sma_cross, rsi_reversion, momentum, bollinger_squeeze, macd_divergence, volume_breakout, mean_reversion, multi_factor." },
    { ico: "🔄", t: "Strategy comparison", d: "/backtest compare AAPL sma_cross,rsi_reversion,macd_divergence — compare multiple strategies on same symbol." },
    { ico: "📈", t: "Risk ratios", d: "Sharpe, Sortino, and Calmar ratios. Monte Carlo robustness testing. ASCII equity curve." },
    { ico: "⚙️", t: "Custom parameters", d: "/backtest AAPL sma_cross 1y --fast 10 --slow 30 — tune strategy parameters." },
    { ico: "📉", t: "Portfolio analytics", d: "VaR (historical + parametric), correlation matrix, tax reporting, rebalancing suggestions." },
    { ico: "📅", t: "Economic calendar", d: "/calendar week US high — economic events filtered by impact level." },
  ];

  const COMMANDS = {
    "Research & Analysis": ["/research AAPL", "/research AAPL --deep", "/research AAPL --report --export md report.md", "/market AAPL 1d", "/technical AAPL 1d", "/mtf AAPL 1d,1h,15m", "/chart AAPL 1d --overlay rsi,macd", "/news AAPL", "/calendar week US high"],
    "Portfolio & Risk": ["/portfolio", "/portfolio add AAPL 10 185", "/portfolio update AAPL 5 160", "/portfolio risk", "/portfolio correlation", "/portfolio tax", "/portfolio benchmark SPY", "/portfolio rebalance", "/portfolio create crypto"],
    "Live Trading": ["/trading live connect alpaca paper", "/trading live buy AAPL 10 --confirm", "/trading live sell AAPL 5 --confirm", "/trading live positions", "/trading live orders", "/trading kill", "/trading resume", "/trading audit"],
    "Screener & Alerts": ["/scan sp500 rsi<30", "/scan nasdaq sma_cross", "/scan crypto below_resistance", "/scan watchlist rsi<30", "/watchlist add AAPL", "/alert add AAPL above 200", "/notification add discord alerts <webhook>"],
    "Backtesting & Journal": ["/backtest AAPL sma_cross 1y", "/backtest AAPL sma_cross 1y --fast 10 --slow 30", "/backtest compare AAPL sma_cross,rsi_reversion,macd_divergence", "/journal add AAPL bullish \"setup\"", "/journal stats", "/journal review"],
    "Favourites": ["/favourites", "/favourites add AAPL", "/favourites remove AAPL"],
    "Providers & AI": ["/provider status", "/provider metrics", "/provider capabilities", "/provider test AAPL", "/provider compare AAPL", "/ai What is RSI?", "/ai_model"],
    "System & Security": ["/doctor", "/doctor report", "/security status", "/security scan", "/security encrypt-key alpaca", "/theme list", "/theme ocean", "/session save", "/session restore", "/plugin list", "/cache stats", "/cache clear", "/setup"],
  };

  const RESEARCH = [
    { t: "Snapshot", d: "Price, change, and key metrics at a glance" },
    { t: "Signal", d: "Directional read from technicals & market structure" },
    { t: "Risk", d: "What could invalidate the thesis" },
    { t: "Context Blend", d: "Sector, macro, and news context combined" },
    { t: "Trust Gate", d: "Confidence cap from data quality & provider reliability" },
    { t: "Missing Data", d: "Honest gaps from provider limits and API plan" },
    { t: "Source Quality", d: "Freshness score and source grade A–E" },
    { t: "Decision Points", d: "Concrete levels and triggers to watch" },
    { t: "Cited Sources", d: "Market, news, macro, fundamentals, web — all cited" },
  ];

  const ROADMAP = [
    { tag: "v1.0.5", t: "Foundation", items: ["Research Engine v3", "Provider System v2", "Portfolio Risk v3", "Trading Safety Layer", "Plugin system", "Theme system"] },
    { tag: "v1.1.0", t: "Live Trading", items: ["Live trading with Alpaca (paper + live)", "Broker key encryption (PBKDF2-SHA256)", "Command consolidation", "/portfolio rebalance", "/export broker"] },
    { tag: "v1.3.0", t: "Charts & AI", items: ["Terminal charting: ASCII candlestick with RSI/MACD", "AI context sliding window (4k tokens)", "Notification webhooks: Discord and Telegram", "Interactive model picker"] },
    { tag: "v1.4.0", t: "Screener & Multi-Portfolio", items: ["Universe-wide screener (sp500, nasdaq, crypto, forex)", "Multi-portfolio support", "Binance crypto broker integration", "Extended scan filters"] },
    { tag: "v1.6.0", t: "Ollama & i18n", items: ["Ollama local LLM support (offline AI)", "Internationalization: /lang command", "Security: path traversal fix", "Performance: fix O(n²) patterns"] },
    { tag: "v1.8.0", t: "Backtesting v2", items: ["4 new strategies (bollinger_squeeze, macd_divergence, volume_breakout, mean_reversion)", "Strategy comparison: /backtest compare", "Portfolio VaR, correlation, tax reporting", "Polygon.io and IEX Cloud providers", "Command aliases: /p, /t, /r, /b, /w, /j, /m, /n, /a, /s", "/favourites for quick access"] },
    { tag: "v1.8.3", t: "Code Quality", items: ["255 ruff errors → 0 across 80+ files", "Fix 6 critical undefined names", "92 typing-only imports behind TYPE_CHECKING", "Full lint cleanup and PEP8 compliance"] },
  ];

  /* ---------- helpers ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

  let io;

  /* ---------- render features ---------- */
  const fg = $("#featureGrid");
  FEATURES.forEach((f, i) => {
    const c = el("div", "card stagger", `<div class="ico">${f.ico}</div><h3>${f.t}</h3><p>${f.d}</p>`);
    c.style.transitionDelay = (i % 3) * 80 + "ms";
    fg.appendChild(c);
  });

  /* ---------- render trading cards ---------- */
  const tg = $("#tradingGrid");
  TRADING.forEach((f, i) => {
    const c = el("div", "card stagger", `<div class="ico">${f.ico}</div><h3>${f.t}</h3><p>${f.d}</p>`);
    c.style.transitionDelay = (i % 3) * 80 + "ms";
    tg.appendChild(c);
  });

  /* ---------- render backtest cards ---------- */
  const bg = $("#backtestGrid");
  BACKTEST.forEach((f, i) => {
    const c = el("div", "card stagger", `<div class="ico">${f.ico}</div><h3>${f.t}</h3><p>${f.d}</p>`);
    c.style.transitionDelay = (i % 3) * 80 + "ms";
    bg.appendChild(c);
  });

  /* ---------- render commands ---------- */
  const grid = $("#cmdGrid");
  const filters = $("#cmdFilters");
  const groups = Object.keys(COMMANDS);

  function buildCommands(filter) {
    grid.innerHTML = "";
    groups.filter(g => filter === "All" || g === filter).forEach(g => {
      const card = el("div", "cmd-card reveal");
      card.appendChild(el("h3", null, g));
      COMMANDS[g].forEach(cmd => {
        const parts = cmd.replace(/^\//, "");
        const row = el("div", "cmd", `<span class="slash">/</span><span>${parts}</span><span class="copied-tag">copied ✓</span>`);
        row.addEventListener("click", (e) => {
          copy(cmd);
          row.classList.add("copied");
          // ripple
          const r = el("span", "ripple");
          const rect = row.getBoundingClientRect();
          r.style.left = (e.clientX - rect.left) + "px";
          r.style.top = (e.clientY - rect.top) + "px";
          r.style.width = r.style.height = Math.max(rect.width, rect.height) + "px";
          row.appendChild(r);
          setTimeout(() => { row.classList.remove("copied"); r.remove(); }, 1200);
        });
        card.appendChild(row);
      });
      grid.appendChild(card);
    });
    observeReveals();
  }

  ["All", ...groups].forEach((g, i) => {
    const b = el("button", "filter" + (i === 0 ? " active" : ""), g);
    b.addEventListener("click", () => {
      $$(".filter").forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      buildCommands(g);
    });
    filters.appendChild(b);
  });
  buildCommands("All");

  /* ---------- render research flow ---------- */
  const rf = $("#researchFlow");
  RESEARCH.forEach((r, i) => {
    const s = el("div", "rstep seq", `<span class="rnum">0${i + 1}</span><div class="rt">${r.t}</div><div class="rd">${r.d}</div>`);
    s.style.transitionDelay = i * 100 + "ms";
    rf.appendChild(s);
  });

  /* ---------- render timeline with progress ---------- */
  const tl = $("#timeline");
  // progress track
  const progressTrack = el("div", "progress-track");
  const progressFill = el("div", "progress-fill");
  progressTrack.appendChild(progressFill);
  tl.appendChild(progressTrack);

  ROADMAP.forEach(r => {
    const item = el("div", "tl-item reveal");
    item.innerHTML = `<span class="tl-tag">${r.tag}</span><h4>${r.t}</h4><ul>${r.items.map(i => `<li>${i}</li>`).join("")}</ul>`;
    tl.appendChild(item);
  });

  /* ---------- copy ---------- */
  function copy(text) {
    if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
    else fallbackCopy(text);
  }
  function fallbackCopy(text) {
    const ta = el("textarea"); ta.value = text; document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    ta.remove();
  }
  $$(".code .copy").forEach(btn => {
    btn.addEventListener("click", () => {
      const code = btn.parentElement.querySelector("code").innerText;
      copy(code);
      btn.textContent = "copied ✓"; btn.classList.add("copied");
      setTimeout(() => { btn.textContent = "copy"; btn.classList.remove("copied"); }, 1400);
    });
  });

  /* ---------- tabs ---------- */
  $$(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;
      $$(".tab-btn").forEach(b => b.classList.toggle("active", b === btn));
      $$(".tab-panel").forEach(p => p.classList.toggle("active", p.dataset.panel === tab));
    });
  });

  /* ---------- nav ---------- */
  const nav = $("#nav");
  const navLinks = $("#navLinks");
  $("#navToggle").addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.addEventListener("click", e => { if (e.target.tagName === "A") navLinks.classList.remove("open"); });

  const toTop = $("#toTop");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 30);
    toTop.classList.toggle("show", window.scrollY > 600);
  }, { passive: true });
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- reveal on scroll ---------- */
  function observeReveals() {
    if (!io) {
      io = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
      }, { threshold: 0.12 });
    }
    $$(".reveal:not(.in)").forEach(r => io.observe(r));
    $$(".stagger:not(.in)").forEach(r => io.observe(r));
  }
  observeReveals();

  /* ---------- research step sequential reveal ---------- */
  const seqObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const steps = $$(".rstep.seq", e.target);
      steps.forEach((s, i) => { setTimeout(() => s.classList.add("in"), i * 120); });
      seqObs.unobserve(e.target);
    });
  }, { threshold: 0.2 });
  if (rf) seqObs.observe(rf);

  /* ---------- roadmap progress on scroll ---------- */
  const tlObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const rect = e.target.getBoundingClientRect();
      const viewH = window.innerHeight;
      const total = rect.height;
      const scrolled = Math.max(0, viewH - rect.top);
      const pct = Math.min(100, (scrolled / (total + viewH * 0.5)) * 100);
      progressFill.style.height = pct + "%";
    });
  }, { threshold: Array.from({ length: 20 }, (_, i) => i * 0.05) });
  tlObs.observe(tl);

  // also update on scroll for smoother progress
  window.addEventListener("scroll", () => {
    if (!tl) return;
    const rect = tl.getBoundingClientRect();
    const viewH = window.innerHeight;
    const total = rect.height;
    const scrolled = Math.max(0, viewH - rect.top);
    const pct = Math.min(100, (scrolled / (total + viewH * 0.5)) * 100);
    progressFill.style.height = pct + "%";
  }, { passive: true });

  /* ---------- count-up stats ---------- */
  const statObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const node = e.target, target = +node.dataset.target, suffix = node.dataset.suffix || "";
      let cur = 0; const step = Math.max(1, Math.round(target / 40));
      const tick = () => { cur = Math.min(target, cur + step); node.textContent = cur + suffix; if (cur < target) requestAnimationFrame(tick); };
      tick(); statObs.unobserve(node);
    });
  }, { threshold: 0.5 });
  $$(".num").forEach(n => statObs.observe(n));

  /* ---------- interactive terminal ---------- */
  const SCRIPTS = {
    "/research AAPL": [
      { c: 'prompt', t: '> ', nobreak: true }, { c: 'cmd', t: '/research AAPL --deep', type: true, delay: 500 },
      { c: 'muted', t: 'resolving providers · fallback chain…', delay: 350 },
      { c: 'label', t: 'SNAPSHOT    ', nobreak: true }, { c: 'val', t: 'AAPL  $214.30  ', nobreak: true }, { c: 'up', t: '+1.84%' },
      { c: 'label', t: 'SIGNAL      ', nobreak: true }, { c: 'up', t: 'Bullish ', nobreak: true }, { c: 'muted', t: '· RSI 58 · MACD cross up' },
      { c: 'label', t: 'RISK        ', nobreak: true }, { c: 'down', t: 'Resistance 218.40 ', nobreak: true }, { c: 'muted', t: '· watch volume' },
      { c: 'label', t: 'CONTEXT     ', nobreak: true }, { c: 'val', t: 'Tech sector ', nobreak: true }, { c: 'up', t: '+0.9% ', nobreak: true }, { c: 'muted', t: '· macro neutral' },
      { c: 'label', t: 'TRUST GATE  ', nobreak: true }, { c: 'val', t: 'Confidence ', nobreak: true }, { c: 'key', t: '0.72 ', nobreak: true }, { c: 'muted', t: '· data quality ok' },
      { c: 'label', t: 'SOURCES     ', nobreak: true }, { c: 'key', t: 'finnhub ', nobreak: true }, { c: 'up', t: 'ok ', nobreak: true }, { c: 'key', t: 'yfinance ', nobreak: true }, { c: 'muted', t: 'delayed' },
      { c: 'label', t: 'DECISION    ', nobreak: true }, { c: 'val', t: 'Hold > 211.0 · add on 218.4 break' },
    ],
    "/portfolio risk": [
      { c: 'prompt', t: '> ', nobreak: true }, { c: 'cmd', t: '/portfolio risk', type: true, delay: 500 },
      { c: 'muted', t: 'calculating exposure…', delay: 300 },
      { c: 'label', t: 'EXPOSURE    ', nobreak: true }, { c: 'val', t: 'Equity 68% ', nobreak: true }, { c: 'muted', t: '· Crypto 22% · Cash 10%' },
      { c: 'label', t: 'CONCENTRATE ', nobreak: true }, { c: 'down', t: 'AAPL 34% ', nobreak: true }, { c: 'muted', t: '· above 25% cap' },
      { c: 'label', t: 'DRAWDOWN    ', nobreak: true }, { c: 'down', t: '-12.4% ', nobreak: true }, { c: 'muted', t: '· est max drawdown' },
      { c: 'label', t: 'PNL         ', nobreak: true }, { c: 'up', t: '+$2,847 ', nobreak: true }, { c: 'muted', t: 'realized · ', nobreak: true }, { c: 'up', t: '+$1,203 ', nobreak: true }, { c: 'muted', t: 'unrealized' },
      { c: 'label', t: 'HEALTH      ', nobreak: true }, { c: 'val', t: '74/100 ', nobreak: true }, { c: 'muted', t: '· reduce AAPL concentration' },
    ],
    "/backtest AAPL 1y": [
      { c: 'prompt', t: '> ', nobreak: true }, { c: 'cmd', t: '/backtest AAPL sma_cross 1y --monte-carlo', type: true, delay: 500 },
      { c: 'muted', t: 'running 1000 simulations…', delay: 400 },
      { c: 'label', t: 'STRATEGY    ', nobreak: true }, { c: 'val', t: 'sma_cross ', nobreak: true }, { c: 'muted', t: '· 20/50 SMA · 8 strategies available' },
      { c: 'label', t: 'RETURN      ', nobreak: true }, { c: 'up', t: '+18.7% ', nobreak: true }, { c: 'muted', t: 'annualized' },
      { c: 'label', t: 'SHARPE      ', nobreak: true }, { c: 'val', t: '1.42 ', nobreak: true }, { c: 'muted', t: '· Sortino 1.89 · Calmar 1.12' },
      { c: 'label', t: 'MONTE CARLO ', nobreak: true }, { c: 'val', t: '5th: ', nobreak: true }, { c: 'down', t: '-8.2% ', nobreak: true }, { c: 'val', t: '95th: ', nobreak: true }, { c: 'up', t: '+41.3%' },
      { c: 'label', t: 'TRADES      ', nobreak: true }, { c: 'val', t: '47 ', nobreak: true }, { c: 'muted', t: '· win rate 62% · avg hold 4.2d' },
    ],
    "/market AAPL 1d": [
      { c: 'prompt', t: '> ', nobreak: true }, { c: 'cmd', t: '/market AAPL 1d', type: true, delay: 500 },
      { c: 'muted', t: 'fetching from provider chain…', delay: 300 },
      { c: 'label', t: 'PRICE       ', nobreak: true }, { c: 'val', t: '$214.30 ', nobreak: true }, { c: 'up', t: '+$3.84 (+1.84%)' },
      { c: 'label', t: 'OPEN        ', nobreak: true }, { c: 'val', t: '$210.46' },
      { c: 'label', t: 'HIGH        ', nobreak: true }, { c: 'val', t: '$215.12' },
      { c: 'label', t: 'LOW         ', nobreak: true }, { c: 'val', t: '$209.88' },
      { c: 'label', t: 'VOLUME      ', nobreak: true }, { c: 'val', t: '52.4M ', nobreak: true }, { c: 'muted', t: '· avg 48.1M' },
      { c: 'label', t: 'PROVIDER    ', nobreak: true }, { c: 'key', t: 'finnhub ', nobreak: true }, { c: 'up', t: 'ok ', nobreak: true }, { c: 'muted', t: '· 45ms' },
    ],
    "/help": [
      { c: 'prompt', t: '> ', nobreak: true }, { c: 'cmd', t: '/help', type: true, delay: 400 },
      { c: 'muted', t: '100+ commands available:', delay: 200 },
      { c: 'label', t: '  /research   ', nobreak: true }, { c: 'val', t: 'Snapshot, deep, or report for a symbol' },
      { c: 'label', t: '  /market     ', nobreak: true }, { c: 'val', t: 'Quote, news, and technical summary' },
      { c: 'label', t: '  /technical  ', nobreak: true }, { c: 'val', t: 'RSI, MACD, EMA/SMA, Bollinger, ATR' },
      { c: 'label', t: '  /chart      ', nobreak: true }, { c: 'val', t: 'ASCII candlestick with indicator overlays' },
      { c: 'label', t: '  /portfolio  ', nobreak: true }, { c: 'val', t: 'Holdings, risk, correlation, tax, rebalance' },
      { c: 'label', t: '  /backtest   ', nobreak: true }, { c: 'val', t: '8 strategies with Monte Carlo & comparison' },
      { c: 'label', t: '  /trading    ', nobreak: true }, { c: 'val', t: 'Alpaca & Binance live trading, kill switch' },
      { c: 'label', t: '  /scan       ', nobreak: true }, { c: 'val', t: 'Screener: sp500, nasdaq, crypto, forex' },
      { c: 'label', t: '  /watchlist  ', nobreak: true }, { c: 'val', t: 'Add, remove, scan with filters' },
      { c: 'label', t: '  /favourites ', nobreak: true }, { c: 'val', t: 'Quick access to most-used symbols' },
      { c: 'label', t: '  /alert      ', nobreak: true }, { c: 'val', t: 'Conditional alerts and daemon' },
      { c: 'label', t: '  /journal    ', nobreak: true }, { c: 'val', t: 'Trade notes, stats, review' },
      { c: 'label', t: '  /news       ', nobreak: true }, { c: 'val', t: '100+ sources for a symbol' },
      { c: 'label', t: '  /export     ', nobreak: true }, { c: 'val', t: 'Batch export to CSV/JSON' },
      { c: 'muted', t: 'aliases: /p  /t  /r  /b  /w  /j  /m  /n  /a  /s' },
      { c: 'muted', t: 'type any command to try it · auto-demo resumes after 8s idle' },
    ],
  };

  // auto-demo sequence (loops when idle)
  const AUTO_SEQ = ["/help", "/research AAPL", "/portfolio risk", "/backtest AAPL 1y", "/market AAPL 1d"];
  const body = $("#termBody");
  const termTitle = $("#termTitle");
  const termField = $("#termField");
  const terminal = $("#terminal");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let autoTimer = null;
  let autoIndex = 0;
  let isRunning = false;
  let isUserInteracting = false;
  let idleResumeTimer = null;

  function clearTerminal() {
    return new Promise(resolve => {
      if (reduced) { body.innerHTML = ""; resolve(); return; }
      body.classList.add("clear-fade");
      setTimeout(() => {
        body.innerHTML = "";
        body.classList.remove("clear-fade");
        resolve();
      }, 300);
    });
  }

  function runScript(cmdKey, opts) {
    opts = opts || {};
    const SCRIPT = SCRIPTS[cmdKey];
    if (!SCRIPT) return Promise.resolve();

    isRunning = true;
    termTitle.textContent = "fincli — " + cmdKey;

    return new Promise(resolve => {
      let line = el("span", "ln");
      body.appendChild(line);

      function runSeg(i) {
        if (i >= SCRIPT.length) {
          // add cursor at end
          line.appendChild(el("span", "cursor"));
          isRunning = false;
          resolve();
          return;
        }
        const seg = SCRIPT[i];
        const span = el("span", seg.c);
        line.appendChild(span);

        const after = () => {
          if (!seg.nobreak) { line = el("span", "ln"); body.appendChild(line); }
          setTimeout(() => runSeg(i + 1), reduced ? 0 : (seg.delay || 120));
        };

        if (seg.type && !reduced) {
          let k = 0;
          const typer = () => { span.textContent = seg.t.slice(0, ++k); if (k < seg.t.length) setTimeout(typer, 38); else after(); };
          typer();
        } else { span.textContent = seg.t; after(); }
      }
      runSeg(0);
    });
  }

  // auto-demo loop
  async function startAutoDemo() {
    if (isUserInteracting || isRunning) return;
    const cmd = AUTO_SEQ[autoIndex % AUTO_SEQ.length];
    autoIndex++;
    await clearTerminal();
    await runScript(cmd);
    // schedule next auto step
    autoTimer = setTimeout(startAutoDemo, reduced ? 1000 : 3500);
  }

  function stopAutoDemo() {
    if (autoTimer) { clearTimeout(autoTimer); autoTimer = null; }
    if (idleResumeTimer) { clearTimeout(idleResumeTimer); idleResumeTimer = null; }
  }

  function scheduleIdleResume() {
    if (idleResumeTimer) clearTimeout(idleResumeTimer);
    idleResumeTimer = setTimeout(() => {
      isUserInteracting = false;
      startAutoDemo();
    }, 8000);
  }

  // run a command from user input or chip
  async function executeCommand(cmd) {
    if (isRunning) return;

    // find matching script (exact or prefix match)
    let scriptKey = null;
    if (SCRIPTS[cmd]) {
      scriptKey = cmd;
    } else {
      // try prefix match: "/research NVDA" → "/research AAPL"
      const base = cmd.split(" ")[0];
      for (const key of Object.keys(SCRIPTS)) {
        if (key.startsWith(base)) { scriptKey = key; break; }
      }
    }

    isUserInteracting = true;
    stopAutoDemo();

    if (!scriptKey) {
      // unknown command — show error
      await clearTerminal();
      let line = el("span", "ln");
      body.appendChild(line);
      const promptSpan = el("span", "prompt");
      promptSpan.textContent = "> ";
      line.appendChild(promptSpan);
      const cmdSpan = el("span", "cmd");
      cmdSpan.textContent = cmd;
      line.appendChild(cmdSpan);
      line = el("span", "ln");
      body.appendChild(line);
      const errSpan = el("span", "down");
      errSpan.textContent = "unknown command";
      line.appendChild(errSpan);
      line = el("span", "ln");
      body.appendChild(line);
      const hintSpan = el("span", "muted");
      hintSpan.textContent = "try: /research, /portfolio, /backtest, /market";
      line.appendChild(hintSpan);
      termTitle.textContent = "fincli — error";
      scheduleIdleResume();
      return;
    }

    await clearTerminal();
    await runScript(scriptKey);
    scheduleIdleResume();
  }

  // input handling
  if (termField) {
    termField.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        const val = termField.value.trim();
        if (val) {
          termField.value = "";
          executeCommand(val);
        }
      }
    });
    termField.addEventListener("focus", () => terminal.classList.add("focused"));
    termField.addEventListener("blur", () => terminal.classList.remove("focused"));
  }

  // start auto-demo once terminal scrolls into view
  const termObs = new IntersectionObserver(es => {
    es.forEach(e => {
      if (e.isIntersecting) { startAutoDemo(); termObs.disconnect(); }
    });
  }, { threshold: 0.3 });
  termObs.observe(terminal);

  /* ---------- background ticker tape canvas ---------- */
  const cv = $("#tape"), ctx = cv.getContext("2d");
  let W, H, cols = [];
  const SYM = ["AAPL", "NVDA", "TSLA", "BTC", "ETH", "SPY", "MSFT", "AMZN", "GLD", "META", "AMD", "QQQ"];
  function resize() {
    W = cv.width = window.innerWidth; H = cv.height = window.innerHeight;
    const n = Math.floor(W / 230) + 1; cols = [];
    for (let i = 0; i < n; i++) {
      cols.push({ x: (i + 0.5) * (W / n), y: Math.random() * H, speed: 0.25 + Math.random() * 0.45, sym: SYM[i % SYM.length], up: Math.random() > 0.5 });
    }
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.font = "13px 'JetBrains Mono', monospace";
    cols.forEach(c => {
      c.y += c.speed;
      if (c.y > H + 40) { c.y = -20; c.up = Math.random() > 0.5; }
      const pct = (c.up ? "+" : "-") + (Math.abs(Math.sin(c.y / 60)) * 3).toFixed(2) + "%";
      ctx.fillStyle = c.up ? "rgba(0,230,118,0.16)" : "rgba(255,90,106,0.14)";
      ctx.fillText(c.sym + "  " + pct, c.x, c.y);
    });
    requestAnimationFrame(draw);
  }
  if (!reduced) { resize(); draw(); window.addEventListener("resize", resize); }
})();
