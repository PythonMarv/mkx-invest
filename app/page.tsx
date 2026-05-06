"use client";

import { useState } from "react";

export default function MKXDashboard() {
  const [active, setActive] = useState("Dashboard");

  const menu = [
    "Dashboard",
    "Trades",
    "Journal",
    "Analytics",
    "Automation",
    "Playbook",
    "Reality Check",
    "Settings",
  ];

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-64 bg-zinc-900 p-4 flex flex-col gap-4">
        <h1 className="text-xl font-bold">MKX HQ</h1>
        {menu.map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            className={`text-left px-3 py-2 rounded-xl ${
              active === item
                ? "bg-white text-black"
                : "bg-zinc-800 hover:bg-zinc-700"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl mb-4">{active}</h2>

        {active === "Dashboard" && (
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-zinc-900 p-4 rounded-xl">
              Today PnL: $0
            </div>
            <div className="bg-zinc-900 p-4 rounded-xl">
              Win Rate: 0%
            </div>
            <div className="bg-zinc-900 p-4 rounded-xl">
              Open Trades: 0
            </div>
          </div>
        )}

        {active === "Journal" && (
          <textarea
            className="w-full h-64 bg-black border border-zinc-700 p-2"
            placeholder="Write your thoughts..."
          />
        )}

        {active !== "Dashboard" && active !== "Journal" && (
          <div className="bg-zinc-900 p-4 rounded-xl">
            {active} content coming soon...
          </div>
        )}
      </div>
    </div>
  );
}