'use client';
import React, { useState } from 'react';


import { Search, Bell, TrendingUp, TrendingDown, ChevronDown } from 'lucide-react';

const indices = [
  { id: 'idx-nifty', name: 'NIFTY 50', value: '24,318.45', change: '+0.72%', up: true },
  { id: 'idx-sensex', name: 'SENSEX', value: '80,116.49', change: '+0.68%', up: true },
  { id: 'idx-banknifty', name: 'BANK NIFTY', value: '52,441.20', change: '-0.31%', up: false },
  { id: 'idx-niftyit', name: 'NIFTY IT', value: '38,892.75', change: '+1.14%', up: true },
  { id: 'idx-midcap', name: 'NIFTY MIDCAP', value: '55,204.30', change: '+0.45%', up: true },
];

export default function TradeTopbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="h-14 bg-card border-b border-border flex items-center px-6 gap-4 sticky top-0 z-30">
      {/* Market indices ticker */}
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center gap-6">
          {indices?.map((idx) => (
            <div key={idx?.id} className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-[12px] font-600 text-muted-foreground">{idx?.name}</span>
              <span className="text-[13px] font-700 font-tabular text-foreground">{idx?.value}</span>
              <span className={`flex items-center gap-0.5 text-[12px] font-600 font-tabular ${idx?.up ? 'text-positive' : 'text-negative'}`}>
                {idx?.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {idx?.change}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Right actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-lg text-muted-foreground hover:bg-border transition-colors text-[13px]"
        >
          <Search size={14} />
          <span className="hidden sm:inline">Search stocks…</span>
          <kbd className="hidden sm:inline text-[10px] bg-card border border-border rounded px-1 py-0.5">⌘K</kbd>
        </button>

        <button className="relative p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-negative rounded-full" />
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-border">
          <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-white text-[11px] font-700">
            RK
          </div>
          <ChevronDown size={14} className="text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}