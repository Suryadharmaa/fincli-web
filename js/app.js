/* ============================================================
   FinCLI landing — app.js
   ============================================================ */
(function () {
  "use strict";

  /* ---------- data ---------- */
  const FEATURES = [
    { ico: "🔎", t: "Research-first workflow", d: "A single /research command returns Snapshot, Signal, Risk, Missing Data, Source Quality, and Decision Points." },
    { ico: "🔗", t: "Provider fallback chain", d: "Granular reliability labels: ok, auth_failed, rate_limited, entitlement_missing, partial_data, schedule_only, unavailable." },
    { ico: "📊", t: "Provider metrics", d: "Runtime success rate, average latency, fallback count, and error count — persisted in SQLite across sessions." },
    { ico: "🛡️", t: "AI Grounding Guard", d: "/analyze must consider data quality, provider reliability, and missing data before reaching conclusions." },
    { ico: "📈", t: "Technical analysis", d: "RSI, MACD, EMA/SMA, Bollinger Bands, ATR, support/resistance, market structure, and technical debate." },
    { ico: "💼", t: "Portfolio Risk v3", d: "Exposure by asset class & currency, concentration risk, drawdown estimate, risk budget, and a portfolio health score." },
    { ico: "🗞️", t: "100+ news connectors", d: "Free RSS fallbacks plus API-key-ready providers like Finnhub, Twelve Data, and Alpha Vantage." },
    { ico: "🤖", t: "8 AI providers", d: "OpenRouter, OpenAI, Groq, Together, HuggingFace, Gemini, Anthropic, and compatible HTTP providers." },
    { ico: "🔒", t: "Local-first storage", d: "Config, secrets, SQLite DB, cache, sessions, watchlist, portfolio, journal, and alerts — all on your machine." },
  ];

  const COMMANDS = {
    "Research & Market": ["/research AAPL", "/research AAPL --deep", "/research AAPL --report --export md report.md", "/market AAPL 1d", "/news AAPL 7d", "/technical AAPL 1d", "/analyze AAPL 1d", "/mtf AAPL 1d,1h,15m", "/calendar week US high"],
    "Providers": ["/news_model list", "/news_model priority google_news_rss,yfinance", "/provider status", "/provider metrics", "/provider entitlement", "/provider key status", "/provider test AAPL"],
    "Portfolio & Risk": ["/portfolio", "/portfolio add AAPL 10 185", "/portfolio performance", "/portfolio risk", "/tx add buy AAPL 10 185", "/tx add sell AAPL 5 195"],
    "Workflow": ["/watchlist add AAPL", "/scan watchlist rsi<30", "/journal add AAPL bullish \"...\"", "/journal stats", "/alert add AAPL above 200", "/cache stats"],
    "Security": ["/secrets status", "/secrets clear", "/privacy status", "/privacy purge"],
  };

  const RESEARCH = [
    { t: "Snapshot", d: "Price, change, and key context at a glance" },
    { t: "Signal", d: "Directional read from technicals & structure" },
    { t: "Risk", d: "What could invalidate the thesis" },
    { t: "Missing Data", d: "Honest gaps from provider limits" },
    { t: "Source Quality", d: "Provider reliability labels" },
    { t: "Decision Points", d: "Concrete levels to watch" },
  ];

  const ROADMAP = [
    { tag: "Shipped · v0.3.x", t: "Hardening", items: ["Provider runtime metrics by provider", "Persistent provider metrics", "AI Grounding Guard in /analyze", "Portfolio Risk v3 with drawdown & currency grouping", "Markdown / JSON research export"] },
    { tag: "In progress · v0.4", t: "Building", items: ["Strategy builder", "Alert daemon & notification integrations", "Backtesting with fees, slippage & sizing", "Optional cloud sync", "Plugin marketplace-style connectors", "Realtime streaming where plans support it"] },
  ];

  /* ---------- helpers ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

  // declared early: observeReveals() runs during initial render below,
  // before the reveal-on-scroll block, so `io` must exist first.
  let io;

  /* ---------- render features ---------- */
  const fg = $("#featureGrid");
  FEATURES.forEach((f, i) => {
    const c = el("div", "card reveal", `<div class="ico">${f.ico}</div><h3>${f.t}</h3><p>${f.d}</p>`);
    c.style.transitionDelay = (i % 3) * 60 + "ms";
    fg.appendChild(c);
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
        row.addEventListener("click", () => {
          copy(cmd);
          row.classList.add("copied");
          setTimeout(() => row.classList.remove("copied"), 1200);
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
    const s = el("div", "rstep reveal", `<span class="rnum">0${i + 1}</span><div class="rt">${r.t}</div><div class="rd">${r.d}</div>`);
    s.style.transitionDelay = (i % 3) * 60 + "ms";
    rf.appendChild(s);
  });

  /* ---------- render timeline ---------- */
  const tl = $("#timeline");
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
  }
  observeReveals();

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

  /* ---------- animated terminal typing ---------- */
  const SCRIPT = [
    { c: 'prompt', t: '$ ', nobreak: true }, { c: 'cmd', t: 'fincli', delay: 400 },
    { c: 'prompt', t: '> ', nobreak: true }, { c: 'cmd', t: '/research AAPL --deep', type: true, delay: 500 },
    { c: 'muted', t: 'resolving providers · fallback chain…', delay: 350 },
    { c: 'label', t: 'SNAPSHOT  ', nobreak: true }, { c: 'val', t: 'AAPL  $214.30  ', nobreak: true }, { c: 'up', t: '+1.84%' },
    { c: 'label', t: 'SIGNAL    ', nobreak: true }, { c: 'up', t: 'Bullish ', nobreak: true }, { c: 'muted', t: '· RSI 58 · MACD cross up' },
    { c: 'label', t: 'RISK      ', nobreak: true }, { c: 'down', t: 'Resistance 218.40 ', nobreak: true }, { c: 'muted', t: '· watch volume' },
    { c: 'label', t: 'SOURCES   ', nobreak: true }, { c: 'key', t: 'finnhub ', nobreak: true }, { c: 'up', t: 'ok ', nobreak: true }, { c: 'key', t: 'yfinance ', nobreak: true }, { c: 'muted', t: 'delayed' },
    { c: 'label', t: 'DECISION  ', nobreak: true }, { c: 'val', t: 'Hold > 211.0 · add on 218.4 break' },
    { c: 'prompt', t: '> ', nobreak: true, cursor: true },
  ];

  const body = $("#termBody");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let line = el("span", "ln");
  body.appendChild(line);

  function runTerm(i) {
    if (i >= SCRIPT.length) return;
    const seg = SCRIPT[i];
    const span = el("span", seg.c);
    line.appendChild(span);

    const after = () => {
      if (!seg.nobreak) { line = el("span", "ln"); body.appendChild(line); }
      if (seg.cursor) line.appendChild(el("span", "cursor"));
      setTimeout(() => runTerm(i + 1), reduced ? 0 : (seg.delay || 120));
    };

    if (seg.type && !reduced) {
      let k = 0;
      const typer = () => { span.textContent = seg.t.slice(0, ++k); if (k < seg.t.length) setTimeout(typer, 38); else after(); };
      typer();
    } else { span.textContent = seg.t; after(); }
  }
  // start typing once terminal scrolls into view
  const termObs = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { runTerm(0); termObs.disconnect(); } });
  }, { threshold: 0.3 });
  termObs.observe($("#terminal"));

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
