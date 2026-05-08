"use client";

import { useState } from "react";

export default function MKXHomepage() {
  const [active, setActive] = useState("Home");

  const navItems = ["Home", "Philosophy", "About", "Blog", "HQ"];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 w-full border-b border-zinc-800 bg-black/70 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold tracking-[0.25em]">
            MKX INVEST
          </div>

          <nav className="flex gap-3">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setActive(item)}
                className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                  active === item
                    ? "bg-white text-black"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative flex items-center justify-center min-h-screen px-6">
        {/* Background Glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[600px] h-[600px] bg-blue-500/10 blur-3xl rounded-full top-[-200px] right-[-100px]" />
          <div className="absolute w-[500px] h-[500px] bg-white/5 blur-3xl rounded-full bottom-[-200px] left-[-100px]" />
        </div>

        <div className="relative z-10 max-w-5xl text-center">
          <p className="uppercase tracking-[0.4em] text-zinc-500 mb-6 text-sm">
            Independent Trading & Research
          </p>

          <h1 className="text-6xl md:text-8xl font-bold leading-none mb-8 tracking-tight">
            MKX INVEST
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
            Systematic trading, market research, automation, and long-term
            capital development through disciplined execution and asymmetric
            thinking.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-black px-6 py-3 rounded-2xl font-medium hover:scale-105 transition-transform">
              Enter HQ
            </button>

            <button className="border border-zinc-700 px-6 py-3 rounded-2xl hover:bg-zinc-900 transition-colors">
              Read Philosophy
            </button>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-6">
        {[
          {
            title: "Discipline",
            text: "Execution matters more than prediction. Systems outperform emotion over time.",
          },
          {
            title: "Asymmetry",
            text: "Focus on opportunities where risk is defined and upside remains disproportionate.",
          },
          {
            title: "Automation",
            text: "Reduce friction, remove noise, and build scalable workflows around data.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-zinc-900/70 border border-zinc-800 p-8 rounded-3xl backdrop-blur-sm"
          >
            <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
            <p className="text-zinc-400 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </section>

      {/* ABOUT SECTION */}
      <section className="max-w-5xl mx-auto px-6 py-24 border-t border-zinc-900">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-zinc-500 text-sm mb-4">
              About
            </p>

            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Built around focus, systems, and continuous improvement.
            </h2>
          </div>

          <div>
            <p className="text-zinc-400 leading-relaxed text-lg">
              MKX Invest is a personal trading and research platform focused on
              systematic decision-making, automation, market psychology, and
              long-term development. The project combines finance, technology,
              and disciplined execution into a continuously evolving operating
              system.
            </p>
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="max-w-6xl mx-auto px-6 py-24 border-t border-zinc-900">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="uppercase tracking-[0.3em] text-zinc-500 text-sm mb-2">
              Journal & Research
            </p>
            <h2 className="text-4xl font-bold">Latest Writing</h2>
          </div>

          <button className="border border-zinc-700 px-5 py-2 rounded-xl hover:bg-zinc-900">
            View All
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            "The psychology of aggressive short sellers",
            "Why systems outperform motivation",
            "Building a personal trading operating system",
          ].map((post) => (
            <div
              key={post}
              className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-6 hover:border-zinc-600 transition-colors"
            >
              <div className="text-sm text-zinc-500 mb-4">Research</div>
              <h3 className="text-2xl font-semibold leading-snug mb-6">
                {post}
              </h3>
              <button className="text-zinc-400 hover:text-white transition-colors">
                Read article →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 py-10 px-6 mt-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-500 text-sm">
          <div>© 2025 MKX Invest. All rights reserved.</div>
          <div>Built for focus, discipline, and long-term thinking.</div>
        </div>
      </footer>
    </div>
  );
}
