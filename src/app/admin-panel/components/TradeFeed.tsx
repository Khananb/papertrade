'use client';
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

// Backend: replace with WebSocket /ws/admin/trade-feed or SSE /api/admin/trades/live
const initialFeed = [
  { id: 'feed-001', trader: 'Arjun Mehta', symbol: 'NIFTY 24400 CE', type: 'BUY', qty: 50, price: 124.5, segment: 'F&O', time: '12:14:38' },
  { id: 'feed-002', trader: 'Rohan Kumar', symbol: 'RELIANCE', type: 'BUY', qty: 5, price: 2960.0, segment: 'Intraday', time: '12:13:52' },
  { id: 'feed-003', trader: 'Dev Kapoor', symbol: 'ZOMATO', type: 'SELL', qty: 100, price: 215.2, segment: 'Delivery', time: '12:13:11' },
  { id: 'feed-004', trader: 'Rahul Joshi', symbol: 'BANKNIFTY 52500 PE', type: 'BUY', qty: 25, price: 88.0, segment: 'F&O', time: '12:12:44' },
  { id: 'feed-005', trader: 'Vikram Nair', symbol: 'HDFCBANK', type: 'BUY', qty: 10, price: 1695.0, segment: 'Delivery', time: '12:12:02' },
  { id: 'feed-006', trader: 'Kavya Reddy', symbol: 'TCS', type: 'BUY', qty: 2, price: 3890.0, segment: 'Delivery', time: '12:11:29' },
  { id: 'feed-007', trader: 'Priya Sharma', symbol: 'INFY', type: 'SELL', qty: 5, price: 1692.0, segment: 'Intraday', time: '12:10:58' },
  { id: 'feed-008', trader: 'Ananya Singh', symbol: 'SBIN', type: 'BUY', qty: 20, price: 843.5, segment: 'Delivery', time: '12:10:17' },
];

const segmentColors: Record<string, string> = {
  'F&O': 'bg-warning-subtle text-warning',
  Intraday: 'bg-info-subtle text-info',
  Delivery: 'bg-secondary text-secondary-foreground',
};

export default function TradeFeed() {
  const [feed, setFeed] = useState(initialFeed);
  const [live, setLive] = useState(true);

  // Simulate live feed updates
  useEffect(() => {
    if (!live) return;
    const symbols = ['BAJFINANCE', 'WIPRO', 'ICICIBANK', 'MARUTI', 'TATAMOTORS'];
    const traders = ['Arjun Mehta', 'Rohan Kumar', 'Dev Kapoor', 'Vikram Nair'];
    const segments = ['F&O', 'Intraday', 'Delivery'] as const;

    const interval = setInterval(() => {
      const newItem = {
        id: `feed-live-${Date.now()}`,
        trader: traders[Math.floor(traders.length * 0.5)],
        symbol: symbols[Math.floor(symbols.length * 0.4)],
        type: Math.random() > 0.5 ? 'BUY' : 'SELL',
        qty: [5, 10, 25, 50, 100][Math.floor(5 * 0.3)],
        price: [500, 1200, 2800, 7100, 12400][Math.floor(5 * 0.2)],
        segment: segments[Math.floor(segments.length * 0.3)],
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
      };
      setFeed((prev) => [newItem, ...prev.slice(0, 11)]);
    }, 4000);

    return () => clearInterval(interval);
  }, [live]);

  return (
    <div className="bg-card border border-border rounded-2xl card-shadow overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-border">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${live ? 'bg-positive animate-pulse' : 'bg-muted-foreground'}`} />
          <h2 className="text-[14px] font-700 text-foreground">Live Trade Feed</h2>
        </div>
        <button
          onClick={() => setLive(!live)}
          className={`p-1.5 rounded-lg transition-colors ${live ? 'bg-positive-subtle text-positive hover:bg-positive/20' : 'bg-muted text-muted-foreground hover:bg-border'}`}
          title={live ? 'Pause feed' : 'Resume feed'}
        >
          <RefreshCw size={13} className={live ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="divide-y divide-border max-h-[420px] overflow-y-auto scrollbar-thin">
        {feed.map((item) => (
          <div key={item.id} className="flex items-center px-4 py-2.5 hover:bg-muted/30 transition-colors fade-in">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className={`text-[11px] font-700 ${item.type === 'BUY' ? 'text-positive' : 'text-negative'}`}>
                  {item.type === 'BUY' ? <TrendingUp size={10} className="inline" /> : <TrendingDown size={10} className="inline" />} {item.type}
                </span>
                <span className="text-[12px] font-700 text-foreground truncate">{item.symbol}</span>
              </div>
              <p className="text-[11px] text-muted-foreground truncate">{item.trader} · {item.qty} qty @ ₹{item.price.toLocaleString('en-IN')}</p>
            </div>
            <div className="flex flex-col items-end gap-1 ml-2 flex-shrink-0">
              <span className={`text-[10px] font-600 px-1.5 py-0.5 rounded-full ${segmentColors[item.segment] || 'bg-muted text-muted-foreground'}`}>
                {item.segment}
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}