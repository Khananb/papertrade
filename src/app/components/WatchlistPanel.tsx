'use client';
import React, { useState } from 'react';
import { Plus, TrendingUp, TrendingDown, Star } from 'lucide-react';
import { toast } from 'sonner';

// Backend: replace with GET /api/trader/watchlist
const watchlistItems = [
  { id: 'wl-001', symbol: 'BAJFINANCE', name: 'Bajaj Finance', ltp: 7124.50, change: +2.14, volume: '12.4L', high: 7180.0, low: 6980.0 },
  { id: 'wl-002', symbol: 'WIPRO', name: 'Wipro Ltd', ltp: 512.35, change: -0.78, volume: '8.2L', high: 519.0, low: 508.0 },
  { id: 'wl-003', symbol: 'ICICIBANK', name: 'ICICI Bank', ltp: 1289.70, change: +1.05, volume: '22.1L', high: 1295.0, low: 1271.0 },
  { id: 'wl-004', symbol: 'ADANIPORTS', name: 'Adani Ports', ltp: 1341.85, change: +0.34, volume: '5.7L', high: 1355.0, low: 1330.0 },
  { id: 'wl-005', symbol: 'SBIN', name: 'State Bank of India', ltp: 842.60, change: -1.22, volume: '31.5L', high: 858.0, low: 839.0 },
  { id: 'wl-006', symbol: 'MARUTI', name: 'Maruti Suzuki', ltp: 12480.25, change: +0.91, volume: '2.1L', high: 12540.0, low: 12360.0 },
];

export default function WatchlistPanel() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="bg-card border border-border rounded-2xl card-shadow overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-border">
        <div className="flex items-center gap-2">
          <Star size={15} className="text-warning" />
          <h2 className="text-[14px] font-700 text-foreground">Watchlist</h2>
          <span className="text-[11px] font-600 bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full">{watchlistItems?.length}</span>
        </div>
        <button
          onClick={() => toast?.info('Search stocks to add to watchlist')}
          className="p-1.5 rounded-lg bg-muted hover:bg-border text-muted-foreground transition-colors"
        >
          <Plus size={14} />
        </button>
      </div>
      <div className="divide-y divide-border">
        {watchlistItems?.map((item) => (
          <div
            key={item?.id}
            className="flex items-center px-4 py-3 hover:bg-muted/40 transition-colors cursor-pointer group"
            onMouseEnter={() => setHovered(item?.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-[13px] font-700 text-foreground">{item?.symbol}</p>
              </div>
              <p className="text-[11px] text-muted-foreground truncate">{item?.name}</p>
              {hovered === item?.id && (
                <div className="flex items-center gap-2 mt-0.5 fade-in">
                  <span className="text-[10px] text-muted-foreground">H: ₹{item?.high}</span>
                  <span className="text-[10px] text-muted-foreground">L: ₹{item?.low}</span>
                  <span className="text-[10px] text-muted-foreground">Vol: {item?.volume}</span>
                </div>
              )}
            </div>
            <div className="text-right ml-3">
              <p className="text-[13px] font-700 font-tabular text-foreground">₹{item?.ltp?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
              <p className={`text-[11px] font-600 font-tabular flex items-center justify-end gap-0.5 ${item?.change >= 0 ? 'text-positive' : 'text-negative'}`}>
                {item?.change >= 0 ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                {item?.change >= 0 ? '+' : ''}{item?.change}%
              </p>
            </div>
            {hovered === item?.id && (
              <div className="flex items-center gap-1 ml-2 fade-in">
                <button
                  onClick={() => toast?.success(`Buy order for ${item?.symbol} initiated`)}
                  className="px-2 py-1 bg-positive-subtle text-positive text-[11px] font-700 rounded-lg hover:bg-positive/20 transition-colors"
                >
                  B
                </button>
                <button
                  onClick={() => toast?.info(`Sell order for ${item?.symbol} initiated`)}
                  className="px-2 py-1 bg-negative-subtle text-negative text-[11px] font-700 rounded-lg hover:bg-negative/20 transition-colors"
                >
                  S
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-border">
        <button className="w-full text-center text-[12px] font-600 text-primary hover:text-primary/80 transition-colors">
          Manage watchlist →
        </button>
      </div>
    </div>
  );
}