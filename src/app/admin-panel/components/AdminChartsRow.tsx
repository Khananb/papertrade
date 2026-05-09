'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import type { TooltipProps } from 'recharts';

const AreaChart = dynamic(() => import('recharts').then(m => m.AreaChart), { ssr: false });
const Area = dynamic(() => import('recharts').then(m => m.Area), { ssr: false });
const BarChart = dynamic(() => import('recharts').then(m => m.BarChart), { ssr: false });
const Bar = dynamic(() => import('recharts').then(m => m.Bar), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(m => m.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(m => m.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(m => m.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(m => m.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(m => m.ResponsiveContainer), { ssr: false });
const Legend = dynamic(() => import('recharts').then(m => m.Legend), { ssr: false });

// Backend: replace with GET /api/admin/analytics/dau?range=30d
const dauData = [
  { date: '10 Apr', dau: 5820, newUsers: 312 },
  { date: '12 Apr', dau: 6140, newUsers: 428 },
  { date: '14 Apr', dau: 5990, newUsers: 381 },
  { date: '16 Apr', dau: 6480, newUsers: 512 },
  { date: '18 Apr', dau: 6210, newUsers: 390 },
  { date: '20 Apr', dau: 6890, newUsers: 641 },
  { date: '22 Apr', dau: 7120, newUsers: 587 },
  { date: '24 Apr', dau: 6940, newUsers: 502 },
  { date: '26 Apr', dau: 7380, newUsers: 698 },
  { date: '28 Apr', dau: 7540, newUsers: 720 },
  { date: '30 Apr', dau: 7210, newUsers: 634 },
  { date: '2 May', dau: 7680, newUsers: 758 },
  { date: '4 May', dau: 7890, newUsers: 801 },
  { date: '6 May', dau: 8050, newUsers: 812 },
  { date: '8 May', dau: 8241, newUsers: 842 },
];

// Backend: replace with GET /api/admin/analytics/volume-by-segment
const segmentData = [
  { segment: 'Equity\nDelivery', equity: 48200, fno: 0, fd: 0 },
  { segment: 'Intraday', equity: 38700, fno: 0, fd: 0 },
  { segment: 'F&O\nOptions', equity: 0, fno: 24100, fd: 0 },
  { segment: 'F&O\nFutures', equity: 0, fno: 12400, fd: 0 },
  { segment: 'Fixed\nDeposit', equity: 0, fno: 0, fd: 8900 },
];

const segmentDataFlat = [
  { segment: 'Eq. Delivery', value: 48200, fill: 'var(--primary)' },
  { segment: 'Intraday', value: 38700, fill: 'var(--accent)' },
  { segment: 'F&O Options', value: 24100, fill: 'var(--warning)' },
  { segment: 'F&O Futures', value: 12400, fill: 'var(--negative)' },
  { segment: 'Fixed Deposit', value: 8900, fill: 'var(--muted-foreground)' },
];

function DAUTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl p-3 card-shadow-md text-[12px]">
      <p className="font-600 text-muted-foreground mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={`dau-tt-${i}`} className="font-700 font-tabular" style={{ color: p.color as string }}>
          {p.name}: {(p.value as number).toLocaleString('en-IN')}
        </p>
      ))}
    </div>
  );
}

function SegTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl p-3 card-shadow-md text-[12px]">
      <p className="font-600 text-muted-foreground mb-1">{label}</p>
      <p className="font-700 font-tabular text-foreground">
        {(payload[0]?.value as number).toLocaleString('en-IN')} trades
      </p>
    </div>
  );
}

export default function AdminChartsRow() {
  const [dauRange, setDauRange] = useState('range-1m');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
      {/* DAU Chart — spans 3 cols */}
      <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-5 card-shadow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[15px] font-700 text-foreground">Daily Active Users</h2>
            <p className="text-[12px] text-muted-foreground">DAU trend + new registrations</p>
          </div>
          <div className="flex items-center gap-1 bg-muted rounded-xl p-1">
            {[
              { id: 'range-1w', label: '1W' },
              { id: 'range-1m', label: '1M' },
              { id: 'range-3m', label: '3M' },
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => setDauRange(r.id)}
                className={`px-3 py-1 rounded-lg text-[12px] font-600 transition-all ${
                  dauRange === r.id ? 'bg-card text-foreground card-shadow' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dauData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="dauGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="var(--accent)" stopOpacity={0.01} />
                </linearGradient>
                <linearGradient id="newGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} interval={2} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} width={36} />
              <Tooltip content={<DAUTooltip />} />
              <Area type="monotone" dataKey="dau" name="DAU" stroke="var(--accent)" strokeWidth={2} fill="url(#dauGrad)" dot={false} />
              <Area type="monotone" dataKey="newUsers" name="New Users" stroke="var(--primary)" strokeWidth={2} fill="url(#newGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-accent" />
            <span className="text-[11px] text-muted-foreground">Daily Active Users</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            <span className="text-[11px] text-muted-foreground">New Registrations</span>
          </div>
        </div>
      </div>

      {/* Segment Volume — spans 2 cols */}
      <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5 card-shadow">
        <div className="mb-4">
          <h2 className="text-[15px] font-700 text-foreground">Trade Volume by Segment</h2>
          <p className="text-[12px] text-muted-foreground">Today's order count</p>
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={segmentDataFlat} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="segment" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} width={32} />
              <Tooltip content={<SegTooltip />} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {segmentDataFlat.map((entry, index) => (
                  <rect key={`seg-bar-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 pt-3 border-t border-border grid grid-cols-2 gap-2">
          {segmentDataFlat.map((s) => (
            <div key={`seg-legend-${s.segment}`} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: s.fill }} />
              <span className="text-[10px] text-muted-foreground truncate">{s.segment}</span>
              <span className="text-[10px] font-700 font-tabular text-foreground ml-auto">{(s.value / 1000).toFixed(1)}k</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}