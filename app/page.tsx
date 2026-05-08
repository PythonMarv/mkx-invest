"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ─── Ticker data ────────────────────────────────────────────────────────────
const TICKERS = [
  { sym: "BTC/USD", price: "67,420", chg: "+2.31%", up: true },
  { sym: "ETH/USD", price: "3,218", chg: "+1.14%", up: true },
  { sym: "S&P 500", price: "5,204", chg: "-0.41%", up: false },
  { sym: "QQQ", price: "441.20", chg: "+0.82%", up: true },
  { sym: "NVDA", price: "874.50", chg: "+3.10%", up: true },
  { sym: "GOLD", price: "2,341", chg: "-0.22%", up: false },
  { sym: "DXY", price: "104.3", chg: "+0.11%", up: true },
  { sym: "VIX", price: "14.82", chg: "-1.20%", up: false },
];

// ─── Journal posts ───────────────────────────────────────────────────────────
const POSTS = [
  {
    date: "Apr 28, 2025",
    tag: "Trade Review",
    title: "Missed the SPX breakout — here's why",
    excerpt:
      "Dissecting a setup I passed on and what it cost me in hindsight. The checklist was there. The conviction wasn't.",
    readTime: "4 min",
  },
  {
    date: "Apr 19, 2025",
    tag: "Strategy",
    title: "Momentum + Mean Reversion: my hybrid framework",
    excerpt:
      "How I combine trend-following with pullback entries to squeeze better R:R without over-trading.",
    readTime: "6 min",
  },
  {
    date: "Apr 11, 2025",
    tag: "Technology",
    title: "My TradingView Pine Script alert setup",
    excerpt:
      "The exact filters that ping me before entries — not after. No more chasing candles.",
    readTime: "5 min",
  },
];

// ─── Monthly returns ─────────────────────────────────────────────────────────
const MONTHLY = [
  { m: "Jan", v: 8.2, pos: true },
  { m: "Feb", v: -3.1, pos: false },
  { m: "Mar", v: 11.4, pos: true },
  { m: "Apr", v: 6.7, pos: true },
  { m: "May", v: -1.8, pos: false },
  { m: "Jun", v: 9.3, pos: true },
  { m: "Jul", v: 4.2, pos: true },
  { m: "Aug", v: -2.4, pos: false },
  { m: "Sep", v: 7.8, pos: true },
  { m: "Oct", v: 12.1, pos: true },
  { m: "Nov", v: -0.9, pos: false },
  { m: "Dec", v: 5.6, pos: true },
];

const MAX_ABS = Math.max(...MONTHLY.map((m) => Math.abs(m.v)));

export default function Home() {
  const tickerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  // Sticky nav shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Infinite ticker scroll via CSS animation — duplicate the list
  const tickerItems = [...TICKERS, ...TICKERS];

  return (
    <>
      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html { scroll-behavior: smooth; }

        body {
          background: #080808;
          color: #e0dbd0;
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0f0f0f; }
        ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 3px; }

        /* ── Ticker ── */
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* ── Fade-up entrance ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up          { opacity: 0; animation: fadeUp 0.7s ease forwards; }
        .fade-up.d1       { animation-delay: 0.1s; }
        .fade-up.d2       { animation-delay: 0.25s; }
        .fade-up.d3       { animation-delay: 0.4s; }
        .fade-up.d4       { animation-delay: 0.55s; }
        .fade-up.d5       { animation-delay: 0.7s; }

        /* ── Grain overlay ── */
        .grain::after {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1000;
          opacity: 0.35;
        }

        /* ── Glow accent ── */
        .glow-line {
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #c8a96e44, #c8a96e88, #c8a96e44, transparent);
        }

        /* ── Card hover ── */
        .stat-card {
          background: #0f0f0f;
          border: 0.5px solid #1e1e1e;
          border-radius: 8px;
          padding: 20px 24px;
          transition: border-color 0.2s, transform 0.2s;
        }
        .stat-card:hover { border-color: #2e2e2e; transform: translateY(-2px); }

        .post-card {
          background: #0c0c0c;
          border: 0.5px solid #1a1a1a;
          border-radius: 8px;
          padding: 24px;
          transition: border-color 0.2s, background 0.2s;
          cursor: pointer;
        }
        .post-card:hover { border-color: #c8a96e44; background: #0e0e0e; }

        /* ── Pill tag ── */
        .tag {
          display: inline-block;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 1px;
          text-transform: uppercase;
          background: #1a1a1a;
          border: 0.5px solid #2a2a2a;
          color: #c8a96e;
          padding: 3px 10px;
          border-radius: 3px;
        }

        /* ── Nav ── */
        nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: #080808ee;
          backdrop-filter: blur(12px);
          border-bottom: 0.5px solid #141414;
          transition: box-shadow 0.3s;
        }
        nav.scrolled { box-shadow: 0 4px 40px #00000088; }

        /* ── Buttons ── */
        .btn-primary {
          background: #c8a96e;
          color: #080808;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 12px 28px;
          border: none;
          border-radius: 3px;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          text-decoration: none;
          display: inline-block;
        }
        .btn-primary:hover { background: #d4b87a; transform: translateY(-1px); }

        .btn-ghost {
          background: transparent;
          color: #888;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 12px 28px;
          border: 0.5px solid #2a2a2a;
          border-radius: 3px;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, transform 0.15s;
          text-decoration: none;
          display: inline-block;
        }
        .btn-ghost:hover { border-color: #c8a96e44; color: #c8a96e; transform: translateY(-1px); }

        /* ── Bar chart ── */
        .bar-wrap { display: flex; align-items: flex-end; gap: 6px; height: 80px; }
        .bar-col   { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .bar-inner { width: 100%; border-radius: 2px 2px 0 0; transition: opacity 0.2s; }
        .bar-inner:hover { opacity: 0.8; }
        .bar-label { font-family: 'DM Mono', monospace; font-size: 9px; color: #444; }

        /* ── Strategy cards ── */
        .strategy-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1px;
          background: #141414;
          border: 0.5px solid #141414;
          border-radius: 8px;
          overflow: hidden;
        }
        .strategy-cell {
          background: #0c0c0c;
          padding: 28px 24px;
          transition: background 0.2s;
        }
        .strategy-cell:hover { background: #0f0f0f; }

        /* ── Footer ── */
        footer {
          border-top: 0.5px solid #141414;
          padding: 40px 0 32px;
          margin-top: 80px;
        }
      `}</style>

      <div className="grain">
        {/* ── NAV ── */}
        <nav className={scrolled ? "scrolled" : ""}>
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "0 32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: 60,
            }}
          >
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 22,
                letterSpacing: 3,
                color: "#e0dbd0",
              }}
            >
              MKX<span style={{ color: "#c8a96e" }}>INVEST</span>
            </div>

            <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
              {[
                ["Performance", "/performance"],
                ["Strategy", "/strategy"],
                ["Technology", "/technology"],
                ["Journal", "/journal"],
                ["About", "/about"],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    letterSpacing: 1,
                    color: "#666",
                    textDecoration: "none",
                    textTransform: "uppercase" as const,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#c8a96e")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/hq"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  letterSpacing: 1,
                  color: "#c8a96e",
                  textDecoration: "none",
                  textTransform: "uppercase" as const,
                  background: "#1a1400",
                  border: "0.5px solid #c8a96e44",
                  padding: "7px 16px",
                  borderRadius: 3,
                  transition: "background 0.2s",
                }}
              >
                Private HQ →
              </Link>
            </div>
          </div>
        </nav>

        {/* ── TICKER BAR ── */}
        <div
          style={{
            background: "#0c0c0c",
            borderBottom: "0.5px solid #141414",
            overflow: "hidden",
            height: 36,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            ref={tickerRef}
            style={{
              display: "flex",
              gap: 48,
              animation: "ticker-scroll 30s linear infinite",
              whiteSpace: "nowrap",
            }}
          >
            {tickerItems.map((t, i) => (
              <div
                key={i}
                style={{ display: "flex", gap: 10, alignItems: "center" }}
              >
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    color: "#555",
                    letterSpacing: 0.5,
                  }}
                >
                  {t.sym}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    color: "#aaa",
                  }}
                >
                  {t.price}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    color: t.up ? "#6ec89a" : "#c86e6e",
                  }}
                >
                  {t.chg}
                </span>
                <span
                  style={{ width: 1, height: 12, background: "#222", display: "inline-block" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── HERO ── */}
        <section
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "80px 32px 60px",
            display: "grid",
            gridTemplateColumns: "1fr 420px",
            gap: 60,
            alignItems: "center",
          }}
        >
          {/* Left */}
          <div>
            <div
              className="fade-up d1"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                letterSpacing: 2,
                color: "#c8a96e",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              // Trading Journal & Market Research
            </div>

            <h1
              className="fade-up d2"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(72px, 8vw, 108px)",
                lineHeight: 0.92,
                letterSpacing: 2,
                color: "#e0dbd0",
                marginBottom: 28,
              }}
            >
              Where
              <br />
              Markets
              <br />
              <span style={{ color: "#c8a96e" }}>Meet</span>
              <br />
              Mind
            </h1>

            <p
              className="fade-up d3"
              style={{
                fontSize: 15,
                color: "#666",
                lineHeight: 1.8,
                maxWidth: 400,
                marginBottom: 36,
                fontWeight: 300,
              }}
            >
              Documenting my trading journey — setups, strategies, lessons, and
              raw results. No hype. No signals. Just honest process.
            </p>

            <div
              className="fade-up d4"
              style={{ display: "flex", gap: 12 }}
            >
              <Link href="/strategy" className="btn-primary">
                Read Strategy
              </Link>
              <Link href="/performance" className="btn-ghost">
                View Performance →
              </Link>
            </div>
          </div>

          {/* Right — stat panel */}
          <div
            className="fade-up d3"
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            {/* Main return */}
            <div className="stat-card" style={{ position: "relative", overflow: "hidden" }}>
              <div className="glow-line" style={{ top: 0 }} />
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  letterSpacing: 2,
                  color: "#555",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                2025 YTD Return
              </div>
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 56,
                  letterSpacing: 1,
                  color: "#6ec89a",
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                +34.7%
              </div>
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  color: "#444",
                }}
              >
                vs S&P 500: +12.3% &nbsp;|&nbsp; Outperformance: +22.4pp
              </div>
            </div>

            {/* Two mini cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { label: "Win Rate", value: "61%", sub: "248 trades" },
                { label: "Avg R:R", value: "1:2.4", sub: "Risk/Reward" },
              ].map((s) => (
                <div key={s.label} className="stat-card">
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 10,
                      letterSpacing: 1.5,
                      color: "#555",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    {s.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 34,
                      color: "#e0dbd0",
                      lineHeight: 1,
                      marginBottom: 4,
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 10,
                      color: "#444",
                    }}
                  >
                    {s.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* Monthly return bar chart */}
            <div className="stat-card">
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  letterSpacing: 1.5,
                  color: "#555",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Monthly Returns 2025
              </div>
              <div className="bar-wrap">
                {MONTHLY.map((m) => {
                  const pct = (Math.abs(m.v) / MAX_ABS) * 100;
                  return (
                    <div key={m.m} className="bar-col">
                      <div
                        className="bar-inner"
                        style={{
                          height: `${pct}%`,
                          background: m.pos ? "#6ec89a33" : "#c86e6e33",
                          borderTop: `1px solid ${m.pos ? "#6ec89a" : "#c86e6e"}`,
                          minHeight: 4,
                        }}
                        title={`${m.m}: ${m.v > 0 ? "+" : ""}${m.v}%`}
                      />
                      <div className="bar-label">{m.m}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 32px",
          }}
        >
          <div style={{ height: "0.5px", background: "#141414" }} />
        </div>

        {/* ── STRATEGY SNAPSHOT ── */}
        <section
          style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 32px" }}
        >
          <div
            className="fade-up"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 32,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  letterSpacing: 2,
                  color: "#c8a96e",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                // How I Trade
              </div>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 42,
                  letterSpacing: 1,
                  color: "#e0dbd0",
                }}
              >
                The Framework
              </h2>
            </div>
            <Link href="/strategy" className="btn-ghost">
              Full Strategy →
            </Link>
          </div>

          <div className="strategy-grid">
            {[
              {
                num: "01",
                label: "Instruments",
                title: "Equities & Crypto",
                desc: "US large caps, high-beta growth, BTC/ETH. Focused, not scattered.",
              },
              {
                num: "02",
                label: "Timeframe",
                title: "Swing + Position",
                desc: "2-day to 6-week holds. No scalping noise, no buy-and-forget.",
              },
              {
                num: "03",
                label: "Edge",
                title: "Momentum + Pullback",
                desc: "Enter on confirmed trend with pullback to key level. Patience over frequency.",
              },
              {
                num: "04",
                label: "Risk",
                title: "1% Per Trade",
                desc: "Hard rule. Position-sized every time. Drawdown is managed, not hoped away.",
              },
            ].map((s) => (
              <div key={s.num} className="strategy-cell">
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 40,
                    color: "#1e1e1e",
                    lineHeight: 1,
                    marginBottom: 16,
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 10,
                    letterSpacing: 1.5,
                    color: "#c8a96e",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: "#e0dbd0",
                    marginBottom: 10,
                  }}
                >
                  {s.title}
                </div>
                <div
                  style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}
                >
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ height: "0.5px", background: "#141414" }} />
        </div>

        {/* ── JOURNAL ── */}
        <section
          style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 32px" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 32,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  letterSpacing: 2,
                  color: "#c8a96e",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                // Recent Writing
              </div>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 42,
                  letterSpacing: 1,
                  color: "#e0dbd0",
                }}
              >
                Journal
              </h2>
            </div>
            <Link href="/journal" className="btn-ghost">
              All Posts →
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {POSTS.map((p, i) => (
              <div key={i} className="post-card">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <span className="tag">{p.tag}</span>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 10,
                      color: "#444",
                    }}
                  >
                    {p.date}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: "#e0dbd0",
                    marginBottom: 10,
                    lineHeight: 1.4,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: "#555",
                    lineHeight: 1.7,
                    marginBottom: 20,
                  }}
                >
                  {p.excerpt}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 10,
                      color: "#c8a96e",
                    }}
                  >
                    Read more →
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 10,
                      color: "#333",
                    }}
                  >
                    {p.readTime} read
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA BAND ── */}
        <section
          style={{
            borderTop: "0.5px solid #141414",
            borderBottom: "0.5px solid #141414",
            background: "#0c0c0c",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="glow-line" style={{ top: 0 }} />
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "60px 32px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 32,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  letterSpacing: 2,
                  color: "#c8a96e",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                // Private Access
              </div>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 42,
                  letterSpacing: 1,
                  color: "#e0dbd0",
                  marginBottom: 10,
                }}
              >
                Private HQ
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "#555",
                  maxWidth: 480,
                  lineHeight: 1.7,
                }}
              >
                My personal trading dashboard — live P&L, detailed trade log,
                private journal entries, automation workflows, and reality
                checks. Password-protected.
              </p>
            </div>
            <Link href="/hq" className="btn-primary" style={{ whiteSpace: "nowrap" }}>
              Enter HQ →
            </Link>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer>
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "0 32px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 18,
                letterSpacing: 3,
                color: "#333",
              }}
            >
              MKX<span style={{ color: "#c8a96e66" }}>INVEST</span>
            </div>

            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                color: "#333",
                letterSpacing: 1,
                textAlign: "center",
              }}
            >
              Not financial advice. Trading involves risk.
            </div>

            <div style={{ display: "flex", gap: 24 }}>
              {["Performance", "Strategy", "Journal", "Contact"].map((l) => (
                <Link
                  key={l}
                  href={`/${l.toLowerCase()}`}
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 10,
                    color: "#333",
                    textDecoration: "none",
                    letterSpacing: 1,
                    textTransform: "uppercase" as const,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#666")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#333")
                  }
                >
                  {l}
                </Link>
              ))}
            </div>
          </div>

          <div
            style={{
              maxWidth: 1200,
              margin: "16px auto 0",
              padding: "16px 32px 0",
              borderTop: "0.5px solid #0f0f0f",
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              color: "#222",
              letterSpacing: 0.5,
            }}
          >
            © 2025 MKXInvest.com — Built with Next.js & Vercel
          </div>
        </footer>
      </div>
    </>
  );
}