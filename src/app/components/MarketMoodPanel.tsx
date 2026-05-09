'use client';
import React from 'react';
import dynamic from 'next/dynamic';


const RadialBarChart = dynamic(() => import('recharts').then(m => m.RadialBarChart), { ssr: false });
const RadialBar = dynamic(() => import('recharts').then(m => m.RadialBar), { ssr: false });
const PolarAngleAxis = dynamic(() => import('recharts').then(m => m.PolarAngleAxis), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(m => m.ResponsiveContainer), { ssr: false });

// Backend: replace with GET /api/market/mood
const moodData = [{ name: 'Mood', value: 68, fill: 'var(--primary)' }];

const sectors = [
  { id: 'sec-it', name: 'IT', change: +1.14, direction: 'up' },
  { id: 'sec-bank', name: 'Banking', change: -0.31, direction: 'down' },
  { id: 'sec-auto', name: 'Auto', change: +0.87, direction: 'up' },
  { id: 'sec-pharma', name: 'Pharma', change: +0.42, direction: 'up' },
  { id: 'sec-fmcg', name: 'FMCG', change: -0.18, direction: 'down' },
  { id: 'sec-realty', name: 'Realty', change: +2.31, direction: 'up' },
];

export default function MarketMoodPanel() {
  return (
    <div className="bg-card border border-border rounded-2xl card-shadow p-4">
      <h2 className="text-[14px] font-700 text-foreground mb-3">Market Mood</h2>

      <div className="flex items-center gap-4">
        <div className="w-[80px] h-[80px] flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="90%"
              data={moodData}
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
              <RadialBar dataKey="value" cornerRadius={8} background={{ fill: 'var(--muted)' }} />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <p className="text-[28px] font-800 font-tabular text-foreground leading-none">68</p>
          <p className="text-[12px] font-600 text-positive">Greed</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">Fear & Greed Index</p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-border">
        <p className="text-[11px] font-600 uppercase tracking-wider text-muted-foreground mb-2">Sector Performance</p>
        <div className="grid grid-cols-2 gap-1.5">
          {sectors.map((s) => (
            <div key={s.id} className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg ${s.direction === 'up' ? 'bg-positive-subtle' : 'bg-negative-subtle'}`}>
              <span className="text-[11px] font-600 text-foreground">{s.name}</span>
              <span className={`text-[11px] font-700 font-tabular ${s.direction === 'up' ? 'text-positive' : 'text-negative'}`}>
                {s.change > 0 ? '+' : ''}{s.change}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}