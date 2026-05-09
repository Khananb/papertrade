'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import type { TooltipProps } from 'recharts';

const AreaChart = dynamic(() => import('recharts').then(m => m.AreaChart), { ssr: false });
const Area = dynamic(() => import('recharts').then(m => m.Area), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(m => m.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(m => m.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(m => m.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(m => m.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(m => m.ResponsiveContainer), { ssr: false });
const ReferenceLine = dynamic(() => import('recharts').then(m => m.ReferenceLine), { ssr: false });

// Backend: replace with GET /api/trader/portfolio/history?range=30d
const portfolioData = [
  { date: '10 Apr', value: 1400000, pnl: 0 },
  { date: '12 Apr', value: 1412300, pnl: 12300 },
  { date: '14 Apr', value: 1408900, pnl: 8900 },
  { date: '16 Apr', value: 1425600, pnl: 25600 },
  { date: '18 Apr', value: 1419200, pnl: 19200 },
  { date: '20 Apr', value: 1438700, pnl: 38700 },
  { date: '22 Apr', value: 1431400, pnl: 31400 },
  { date: '24 Apr', value: 1452800, pnl: 52800 },
  { date: '26 Apr', value: 1448100, pnl: 48100 },
  { date: '28 Apr', value: 1461300, pnl: 61300 },
  { date: '30 Apr', value: 1455700, pnl: 55700 },
  { date: '2 May', value: 1469200, pnl: 69200 },
  { date: '4 May', value: 1462800, pnl: 62800 },
  { date: '6 May', value: 1478400, pnl: 78400 },
  { date: '8 May', value: 1482341, pnl: 82341 },
];

const ranges = [
  { id: 'range-1w', label: '1W' },
  { id: 'range-1m', label: '1M' },
  { id: 'range-3m', label: '3M' },
  { id: 'range-6m', label: '6M' },
  { id: 'range-all', label: 'ALL' },
];

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload || !payload.length) return null;
  const val = payload[0]?.value as number;
  const pnl = val - 1400000;
  const pct = ((pnl / 1400000) * 100).toFixed(2);
  const isUp = pnl >= 0;
  return (
    <div className="bg-card border border-border rounded-xl p-3 card-shadow-md text-[12px]">
      <p className="font-600 text-muted-foreground mb-1">{label}</p>
      <p className="font-700 text-foreground text-[15px] font-tabular">₹{val.toLocaleString('en-IN')}</p>
      <p className={`font-600 font-tabular ${isUp ? 'text-positive' : 'text-negative'}`}>
        {isUp ? '+' : ''}₹{pnl.toLocaleString('en-IN')} ({isUp ? '+' : ''}{pct}%)
      </p>
    </div>
  );
}

export default function PortfolioChart() {
  const [activeRange, setActiveRange] = useState('range-1m');

  return (
    <div className="bg-card border border-border rounded-2xl p-5 card-shadow">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[15px] font-700 text-foreground">Portfolio Performance</h2>
          <p className="text-[12px] text-muted-foreground">Virtual portfolio value over time</p>
        </div>
        <div className="flex items-center gap-1 bg-muted rounded-xl p-1">
          {ranges.map((r) => (
            <button
              key={r.id}
              onClick={() => setActiveRange(r.id)}
              className={`px-3 py-1 rounded-lg text-[12px] font-600 transition-all ${
                activeRange === r.id
                  ? 'bg-card text-foreground card-shadow'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={portfolioData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}
              axisLine={false}
              tickLine={false}
              interval={2}
            />
            <YAxis
              tick={{ fontSize: 11, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`}
              width={52}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={1400000} stroke="var(--border)" strokeDasharray="4 4" />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--primary)"
              strokeWidth={2.5}
              fill="url(#portfolioGradient)"
              dot={false}
              activeDot={{ r: 4, fill: 'var(--primary)', stroke: 'var(--card)', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}