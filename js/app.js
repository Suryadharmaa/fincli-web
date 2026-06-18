/* ============================================================
   FinCLI landing — app.js
   ============================================================ */
(function () {
  "use strict";

  /* ---------- data ---------- */
  const FEATURES = [
    { ico: "🔎", t: "Research Engine v3", d: "Snapshot/deep/report modes with cited sources, sector/macro/news context blending, Trust Gate, and web research fallback." },
    { ico: "🔗", t: "Provider fallback chain", d: "Granular reliability labels: ok, auth_failed, rate_limited, entitlement_missing, partial_data, delayed, fallback, schedule_only, unavailable, circuit_open." },
    { ico: "📊", t: "Provider metrics", d: "Runtime success rate, average latency, fallback count, error count — persisted in SQLite across sessions. Command capability matrix via /provider capabilities." },
    { ico: "🛡️", t: "AI Grounding Guard", d: "/analyze and /research must consider data quality, provider reliability, missing data, cited sources, and provider metrics before conclusions." },
    { ico: "📈", t: "Technical analysis", d: "RSI, MACD, EMA/SMA, Bollinger Bands, ATR, support/resistance, market structure, and technical debate. Multi-timeframe via /mtf." },
    { ico: "💼", t: "Portfolio Risk v3", d: "Exposure by asset class & currency, concentration risk, drawdown estimate, risk budget, realized/unrealized PnL, and portfolio health score." },
    { ico: "🗞️", t: "100+ news connectors", d: "Free RSS fallbacks plus API-key-ready providers like Finnhub, Twelve Data, Alpha Vantage. Source quality and freshness scoring." },
    { ico: "🤖", t: "8 AI providers", d: "OpenRouter, OpenAI, Groq, Together, HuggingFace, Gemini, Anthropic, and compatible HTTP providers." },
    { ico: "🔒", t: "Local-first storage", d: "Config, secrets, SQLite DB, cache, sessions, watchlist, portfolio, journal, alerts, audit log, and portfolio snapshots." },
    { ico: "📡", t: "Realtime streaming", d: "Kraken WebSocket, HyperLiquid WebSocket, Equity polling feed — all configurable adapters with the websockets library." },
    { ico: "🔔", t: "Alert daemon", d: "Background checking with conditional alerts (RSI, volume, MACD cross), alert history, and notification hooks." },
    { ico: "📤", t: "Unified export", d: "Batch export all data — portfolio, journal, alerts, trades — to CSV/JSON. Research reports export to Markdown/JSON." },
  ];

  const TRADING = [
    { ico: "🛑", t: "Risk guard", d: "Max position size, daily loss limit, kill switch, leverage warning, asset class restrictions." },
    { ico: "📋", t: "Audit log", d: "Immutable order audit log — never UPDATE, never DELETE. Full traceability." },
    { ico: "📝", t: "Paper trading", d: "Engine with stop-limit orders, cancel, positions aggregation, and daily PnL." },
    { ico: "🏦", t: "Broker sandboxes", d: "Alpaca paper, Tradier sandbox (full HTTP), IBKR gateway scaffold. 16 broker catalog entries." },
    { ico: "⚙️", t: "Algo strategies", d: "3 built-in: sma_cross, rsi_reversion, momentum. Run via /algo run." },
    { ico: "🔒", t: "Kill switch", d: "Instant trading halt via /trading kill. Resume when ready." },
  ];

  const BACKTEST = [
    { ico: "📊", t: "Professional backtesting", d: "Fees, slippage, spread modeling. Walk-forward split. Position sizing: fixed fractional + Kelly." },
    { ico: "📈", t: "Risk ratios", d: "Sharpe, Sortino, and Calmar ratios. Monte Carlo robustness testing." },
    { ico: "🔄", t: "5 strategies", d: "sma_cross, rsi_reversion, momentum, bollinger, multi_factor. Export to md/json/csv." },
    { ico: "📉", t: "Portfolio snapshots", d: "Time-series snapshots with risk ratios. Benchmark comparison vs SPY, QQQ, BTC." },
    { ico: "🔀", t: "Rebalancing", d: "Rebalancing suggestions and what-if analysis for portfolio changes." },
    { ico: "📅", t: "Economic calendar", d: "/calendar week US high — economic events filtered by impact level." },
  ];

  const COMMANDS = {
    "Research & Market": ["/research AAPL", "/research AAPL --snapshot", "/research AAPL --deep", "/research AAPL --report --export md report.md", "/market AAPL 1d", "/news AAPL 7d", "/technical AAPL 1d", "/analyze AAPL 1d", "/mtf AAPL 1d,1h,15m", "/calendar week US high"],
    "Providers": ["/news_model list", "/news_model priority google_news_rss,yfinance", "/provider status", "/provider metrics", "/provider capabilities", "/provider entitlement", "/provider key status", "/provider test AAPL"],
    "Portfolio & Risk": ["/portfolio", "/portfolio add AAPL 10 185", "/portfolio performance", "/portfolio risk", "/portfolio chart", "/portfolio snapshot", "/portfolio whatif", "/portfolio benchmark", "/tx add buy AAPL 10 185", "/tx add sell AAPL 5 195"],
    "Trading": ["/trading kill", "/trading resume", "/trading risk", "/trading audit", "/trading cancel", "/trading positions", "/broker use alpaca_paper", "/broker status", "/stream kraken", "/algo list", "/algo run sma_cross"],
    "Backtesting": ["/backtest AAPL 1y", "/backtest AAPL 1y --monte-carlo", "/backtest AAPL 1y --walk-forward", "/backtest AAPL 1y --export md"],
    "Workflow": ["/watchlist add AAPL", "/scan watchlist rsi<30", "/journal add AAPL bullish \"...\"", "/journal stats", "/journal review", "/alert add AAPL above 200", "/alert daemon start", "/alert history", "/history", "/cache stats", "/cache clear"],
    "Export": ["/export all", "/export portfolio csv", "/export journal json", "/export trades csv"],
    "Security": ["/secrets status", "/secrets clear", "/privacy status", "/privacy purge"],
  };

  const RESEARCH = [
    { t: "Snapshot", d: "Price, change, and key context at a glance" },
    { t: "Signal", d: "Directional read from technicals & structure" },
    { t: "Risk", d: "What could invalidate the thesis" },
    { t: "Context", d: "Sector, macro, and news blend" },
    { t: "Trust Gate", d: "Confidence cap from data quality" },
    { t: "Missing Data", d: "Honest gaps from provider limits" },
    { t: "Source Quality", d: "Freshness score and source grade A–E" },
    { t: "Decision Points", d: "Concrete levels to watch" },
    { t: "Sources", d: "Cited market, news, macro, fundamentals, web" },
  ];

  const ROADMAP = [
    { tag: "Shipped · v0.3.x", t: "Hardening", items: ["Provider runtime metrics by provider", "Persistent provider metrics", "AI Grounding Guard in /analyze", "Portfolio Risk v3 with drawdown & currency grouping", "Markdown / JSON research export"] },
    { tag: "Shipped · v0.5.0", t: "Provider & Data Reliability", items: ["Standard ProviderResult envelope with granular statuses", "Command capability matrix via /provider capabilities", "Source quality and freshness scoring", "Persistent provider metrics across sessions"] },
    { tag: "Shipped · v0.6.0", t: "Research Engine v3", items: ["Snapshot/deep/report modes with Markdown/JSON export", "Cited source summaries", "Sector/macro/news context blending", "Stronger AI grounding guard tied to Data Trust Gate", "Public web research fallback"] },
    { tag: "Shipped · v0.7.0", t: "Trading Safety Layer", items: ["Risk guard with kill switch and leverage warning", "Immutable order audit log", "Paper trading engine with stop-limit orders", "Broker sandbox adapters: Alpaca, Tradier, IBKR", "Realtime streaming: Kraken, HyperLiquid, Equity", "Algo trading: sma_cross, rsi_reversion, momentum"] },
    { tag: "Shipped · v0.8.0", t: "Portfolio & Backtesting", items: ["Professional backtesting: fees/slippage/spread, walk-forward", "Position sizing: fixed fractional + Kelly", "5 strategies with Sharpe/Sortino/Calmar and Monte Carlo", "Portfolio snapshots, rebalancing, benchmark comparison", "Alert daemon with conditional alerts", "Unified batch export to CSV/JSON"] },
    { tag: "Shipped · v0.9.0", t: "Production Hardening", items: ["GitHub Actions CI (Python 3.11/3.12/3.13 × 3 OS)", "103-command smoke test suite", "Structured error reporting with secret redaction", "Setup wizard, TUI polish, security hardening", "Critical path integration tests"] },
    { tag: "Stable · v1.0.0", t: "Production Release", items: ["456 tests covering critical flows", "CI/CD pipeline validates on every push/PR", "Commands stable and documented", "Provider fallback reliable with granular status labels", "No known critical bug in normal usage"] },
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
      { c: 'prompt', t: '> ', nobreak: true }, { c: 'cmd', t: '/backtest AAPL 1y --monte-carlo', type: true, delay: 500 },
      { c: 'muted', t: 'running 1000 simulations…', delay: 400 },
      { c: 'label', t: 'STRATEGY    ', nobreak: true }, { c: 'val', t: 'sma_cross ', nobreak: true }, { c: 'muted', t: '· 20/50 SMA' },
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
      { c: 'muted', t: 'available commands:', delay: 200 },
      { c: 'label', t: '  /research   ', nobreak: true }, { c: 'val', t: 'Snapshot, deep, or report for a symbol' },
      { c: 'label', t: '  /market     ', nobreak: true }, { c: 'val', t: 'Price, volume, and provider status' },
      { c: 'label', t: '  /technical  ', nobreak: true }, { c: 'val', t: 'RSI, MACD, EMA/SMA, Bollinger, ATR' },
      { c: 'label', t: '  /analyze    ', nobreak: true }, { c: 'val', t: 'AI-grounded analysis with provider context' },
      { c: 'label', t: '  /portfolio  ', nobreak: true }, { c: 'val', t: 'Holdings, risk, PnL, performance' },
      { c: 'label', t: '  /backtest   ', nobreak: true }, { c: 'val', t: 'Strategy backtest with Monte Carlo' },
      { c: 'label', t: '  /trading    ', nobreak: true }, { c: 'val', t: 'Risk guard, kill switch, paper trading' },
      { c: 'label', t: '  /watchlist  ', nobreak: true }, { c: 'val', t: 'Add, remove, scan with filters' },
      { c: 'label', t: '  /journal    ', nobreak: true }, { c: 'val', t: 'Trade notes, stats, review' },
      { c: 'label', t: '  /alert      ', nobreak: true }, { c: 'val', t: 'Conditional alerts and daemon' },
      { c: 'label', t: '  /provider   ', nobreak: true }, { c: 'val', t: 'Status, metrics, capabilities, test' },
      { c: 'label', t: '  /news       ', nobreak: true }, { c: 'val', t: 'Latest headlines for a symbol' },
      { c: 'label', t: '  /export     ', nobreak: true }, { c: 'val', t: 'Batch export to CSV/JSON' },
      { c: 'muted', t: 'type any command to try it · auto-demo resumes after 8s idle' },
    ],
  };

  // auto-demo sequence (loops when idle)
  const AUTO_SEQ = ["/help", "/research AAPL", "/portfolio risk", "/backtest AAPL 1y"];
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
