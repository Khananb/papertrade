'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TrendingUp, TrendingDown, ChevronUp, ChevronDown, ShoppingCart, X } from 'lucide-react';
import { toast } from 'sonner';

// Backend: replace with GET /api/trader/portfolio/holdings
const holdings = [
  { id: 'hold-001', symbol: 'RELIANCE', name: 'Reliance Industries', qty: 10, avgBuy: 2841.5, ltp: 2967.35, dayChange: +1.24, totalPnl: +1258.5, segment: 'Large Cap', sector: 'Energy' },
  { id: 'hold-002', symbol: 'TCS', name: 'Tata Consultancy', qty: 5, avgBuy: 3920.0, ltp: 3887.25, dayChange: -0.84, totalPnl: -163.75, segment: 'Large Cap', sector: 'IT' },
  { id: 'hold-003', symbol: 'HDFCBANK', name: 'HDFC Bank', qty: 15, avgBuy: 1612.4, ltp: 1698.90, dayChange: +0.56, totalPnl: +1297.5, segment: 'Large Cap', sector: 'Banking' },
  { id: 'hold-004', symbol: 'ZOMATO', name: 'Zomato Ltd', qty: 200, avgBuy: 178.3, ltp: 212.45, dayChange: +2.31, totalPnl: +6830.0, segment: 'Mid Cap', sector: 'Consumer' },
  { id: 'hold-005', symbol: 'INFY', name: 'Infosys Ltd', qty: 8, avgBuy: 1756.0, ltp: 1689.75, dayChange: -1.42, totalPnl: -530.0, segment: 'Large Cap', sector: 'IT' },
  { id: 'hold-006', symbol: 'TATAMOTORS', name: 'Tata Motors', qty: 50, avgBuy: 724.8, ltp: 801.30, dayChange: +1.87, totalPnl: +3825.0, segment: 'Large Cap', sector: 'Auto' },
  { id: 'hold-007', symbol: 'NYKAA', name: 'FSN E-Commerce', qty: 300, avgBuy: 156.2, ltp: 147.85, dayChange: -0.63, totalPnl: -2505.0, segment: 'Small Cap', sector: 'Consumer' },
  { id: 'hold-008', symbol: 'PAYTM', name: 'One97 Comm.', qty: 100, avgBuy: 512.0, ltp: 489.40, dayChange: -0.94, totalPnl: -2260.0, segment: 'Mid Cap', sector: 'Fintech' },
];

const segmentColors: Record<string, string> = {
  'Large Cap': 'bg-info-subtle text-info',
  'Mid Cap': 'bg-warning-subtle text-warning',
  'Small Cap': 'bg-negative-subtle text-negative',
};

export default function HoldingsTable() {
  const [sortCol, setSortCol] = useState<string>('totalPnl');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [filter, setFilter] = useState<'all' | 'profit' | 'loss'>('all');
  const router = useRouter();

  const handleSort = (col: string) => {
    if (sortCol === col) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col); setSortDir('desc'); }
  };

  const filtered = holdings.filter((h) => {
    if (filter === 'profit') return h.totalPnl > 0;
    if (filter === 'loss') return h.totalPnl < 0;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    const aVal = (a as Record<string, unknown>)[sortCol] as number;
    const bVal = (b as Record<string, unknown>)[sortCol] as number;
    return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
  });

  const SortIcon = ({ col }: { col: string }) => (
    <span className="inline-flex flex-col ml-1">
      <ChevronUp size={9} className={sortCol === col && sortDir === 'asc' ? 'text-primary' : 'text-muted-foreground/40'} />
      <ChevronDown size={9} className={sortCol === col && sortDir === 'desc' ? 'text-primary' : 'text-muted-foreground/40'} />
    </span>
  );

  return (
    <div className="bg-card border border-border rounded-2xl card-shadow overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div>
          <h2 className="text-[15px] font-700 text-foreground">Holdings</h2>
          <p className="text-[12px] text-muted-foreground">{holdings.length} positions · Unrealized P&L: <span className="text-positive font-600">+₹8,012</span></p>
        </div>
        <div className="flex items-center gap-2">
          {(['all', 'profit', 'loss'] as const).map((f) => (
            <button
              key={`filter-${f}`}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg text-[12px] font-600 transition-all capitalize ${
                filter === f ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-border'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="bg-muted/50">
              {[
                { key: 'symbol', label: 'Stock' },
                { key: 'qty', label: 'Qty' },
                { key: 'avgBuy', label: 'Avg Buy' },
                { key: 'ltp', label: 'LTP' },
                { key: 'currentValue', label: 'Curr. Value' },
                { key: 'dayChange', label: 'Day Chg%' },
                { key: 'totalPnl', label: 'Total P&L' },
                { key: 'actions', label: '' },
              ].map((col) => (
                <th
                  key={`th-${col.key}`}
                  onClick={() => col.key !== 'actions' && col.key !== 'symbol' && handleSort(col.key)}
                  className={`px-4 py-2.5 text-left text-[11px] font-600 uppercase tracking-wider text-muted-foreground whitespace-nowrap ${
                    col.key !== 'actions' && col.key !== 'symbol' ? 'cursor-pointer hover:text-foreground' : ''
                  }`}
                >
                  {col.label}
                  {col.key !== 'actions' && col.key !== 'symbol' && <SortIcon col={col.key} />}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sorted.map((h) => {
              const currentValue = h.qty * h.ltp;
              const pnlPct = ((h.totalPnl / (h.qty * h.avgBuy)) * 100).toFixed(2);
              return (
                <tr
                  key={h.id}
                  className="hover:bg-muted/40 transition-colors group cursor-pointer"
                  onClick={() => router.push(`/stock/${h.symbol}`)}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center text-[10px] font-700 text-muted-foreground flex-shrink-0">
                        {h.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-[13px] font-700 text-foreground">{h.symbol}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className={`text-[10px] font-600 px-1.5 py-0.5 rounded-full ${segmentColors[h.segment]}`}>
                            {h.segment}
                          </span>
                          <span className="text-[10px] text-muted-foreground">{h.sector}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[13px] font-600 font-tabular text-foreground">{h.qty}</td>
                  <td className="px-4 py-3 text-[13px] font-tabular text-foreground">₹{h.avgBuy.toFixed(2)}</td>
                  <td className="px-4 py-3 text-[13px] font-700 font-tabular text-foreground">₹{h.ltp.toFixed(2)}</td>
                  <td className="px-4 py-3 text-[13px] font-tabular text-foreground">₹{currentValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                  <td className="px-4 py-3">
                    <span className={`flex items-center gap-1 text-[12px] font-600 font-tabular ${h.dayChange >= 0 ? 'text-positive' : 'text-negative'}`}>
                      {h.dayChange >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                      {h.dayChange >= 0 ? '+' : ''}{h.dayChange}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className={`text-[13px] font-700 font-tabular ${h.totalPnl >= 0 ? 'text-positive' : 'text-negative'}`}>
                        {h.totalPnl >= 0 ? '+' : ''}₹{Math.abs(h.totalPnl).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </p>
                      <p className={`text-[11px] font-tabular ${h.totalPnl >= 0 ? 'text-positive' : 'text-negative'}`}>
                        {h.totalPnl >= 0 ? '+' : ''}{pnlPct}%
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => { e.stopPropagation(); toast.success(`Buy order for ${h.symbol} placed`); }}
                        className="p-1.5 rounded-lg bg-positive-subtle text-positive hover:bg-positive/20 transition-colors"
                        title="Buy more"
                      >
                        <ShoppingCart size={13} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); toast.info(`Sell order for ${h.symbol} placed`); }}
                        className="p-1.5 rounded-lg bg-negative-subtle text-negative hover:bg-negative/20 transition-colors"
                        title="Sell position"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="px-5 py-3 border-t border-border flex items-center justify-between bg-muted/30">
        <p className="text-[12px] text-muted-foreground">Showing {sorted.length} of {holdings.length} holdings</p>
        <button className="text-[12px] font-600 text-primary hover:text-primary/80 transition-colors">
          View all holdings →
        </button>
      </div>
    </div>
  );
}