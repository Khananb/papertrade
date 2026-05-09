import React from 'react';
import { TrendingUp, Wallet, Target, Flame, Trophy } from 'lucide-react';

// Backend: replace with API call to GET /api/trader/portfolio/summary
const metrics = {
  portfolioValue: { value: '₹14,82,341', change: '+₹82,341', pct: '+5.88%', up: true },
  daysPnl: { value: '+₹12,847', pct: '+0.87%', up: true },
  cashBalance: { value: '₹2,18,450', label: 'Available to trade' },
  winRate: { value: '67%', label: 'Win rate (90d)', trend: '+4%' },
  streak: { value: '14', label: 'Day streak 🔥' },
  leaderboard: { value: '#23', label: 'of 12,847 traders', change: '↑5 today' },
};

export default function BentoKPIGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
      {/* Hero: Portfolio Value — spans 2 cols */}
      <div className="col-span-2 bg-card border border-border rounded-2xl p-5 card-shadow relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary opacity-5 rounded-full -translate-y-8 translate-x-8" />
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[12px] font-600 uppercase tracking-widest text-muted-foreground mb-1">Total Portfolio Value</p>
            <p className="text-[32px] font-800 font-tabular text-foreground leading-none">{metrics?.portfolioValue?.value}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="flex items-center gap-1 text-[13px] font-600 text-positive">
                <TrendingUp size={13} />
                {metrics?.portfolioValue?.change}
              </span>
              <span className="text-[12px] font-600 text-positive bg-positive-subtle px-2 py-0.5 rounded-full">
                {metrics?.portfolioValue?.pct}
              </span>
              <span className="text-[11px] text-muted-foreground">all time</span>
            </div>
          </div>
          <div className="gradient-primary w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Wallet size={18} className="text-white" />
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-border flex items-center gap-4">
          <div>
            <p className="text-[11px] text-muted-foreground">Invested</p>
            <p className="text-[13px] font-700 font-tabular text-foreground">₹14,00,000</p>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Unrealized P&L</p>
            <p className="text-[13px] font-700 font-tabular text-positive">+₹82,341</p>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Realized P&L</p>
            <p className="text-[13px] font-700 font-tabular text-positive">+₹1,24,560</p>
          </div>
        </div>
      </div>
      {/* Day's P&L */}
      <div className="bg-positive-subtle border border-positive/20 rounded-2xl p-4 card-shadow">
        <div className="flex items-start justify-between mb-3">
          <p className="text-[11px] font-600 uppercase tracking-widest text-positive/70">Day's P&L</p>
          <TrendingUp size={16} className="text-positive" />
        </div>
        <p className="text-[26px] font-800 font-tabular text-positive leading-none">{metrics?.daysPnl?.value}</p>
        <p className="text-[12px] font-600 text-positive mt-1">{metrics?.daysPnl?.pct} today</p>
        <div className="mt-2 h-1 bg-positive/20 rounded-full overflow-hidden">
          <div className="h-full bg-positive rounded-full" style={{ width: '67%' }} />
        </div>
        <p className="text-[11px] text-muted-foreground mt-1">Target: +₹20,000</p>
      </div>
      {/* Cash Balance */}
      <div className="bg-card border border-border rounded-2xl p-4 card-shadow">
        <div className="flex items-start justify-between mb-3">
          <p className="text-[11px] font-600 uppercase tracking-widest text-muted-foreground">Virtual Cash</p>
          <Wallet size={16} className="text-muted-foreground" />
        </div>
        <p className="text-[26px] font-800 font-tabular text-foreground leading-none">{metrics?.cashBalance?.value}</p>
        <p className="text-[12px] text-muted-foreground mt-1">{metrics?.cashBalance?.label}</p>
        <div className="mt-2 flex items-center gap-1.5">
          <span className="text-[11px] font-600 bg-info-subtle text-info px-2 py-0.5 rounded-full">F&O Margin: ₹85,000</span>
        </div>
      </div>
      {/* Win Rate */}
      <div className="bg-card border border-border rounded-2xl p-4 card-shadow">
        <div className="flex items-start justify-between mb-3">
          <p className="text-[11px] font-600 uppercase tracking-widest text-muted-foreground">Win Rate</p>
          <Target size={16} className="text-accent" />
        </div>
        <p className="text-[26px] font-800 font-tabular text-foreground leading-none">{metrics?.winRate?.value}</p>
        <p className="text-[12px] text-muted-foreground mt-1">{metrics?.winRate?.label}</p>
        <p className="text-[11px] font-600 text-positive mt-1">{metrics?.winRate?.trend} vs last month</p>
      </div>
      {/* Streak */}
      <div className="bg-warning-subtle border border-warning/20 rounded-2xl p-4 card-shadow">
        <div className="flex items-start justify-between mb-3">
          <p className="text-[11px] font-600 uppercase tracking-widest text-warning/80">Trading Streak</p>
          <Flame size={16} className="text-warning" />
        </div>
        <p className="text-[26px] font-800 font-tabular text-foreground leading-none">{metrics?.streak?.value} <span className="text-[16px]">days</span></p>
        <p className="text-[12px] text-muted-foreground mt-1">{metrics?.streak?.label}</p>
        <p className="text-[11px] font-600 text-warning mt-1">🏆 Best: 21 days</p>
      </div>
      {/* Leaderboard Rank */}
      <div className="bg-card border border-border rounded-2xl p-4 card-shadow">
        <div className="flex items-start justify-between mb-3">
          <p className="text-[11px] font-600 uppercase tracking-widest text-muted-foreground">Leaderboard</p>
          <Trophy size={16} className="text-warning" />
        </div>
        <p className="text-[26px] font-800 font-tabular text-foreground leading-none">{metrics?.leaderboard?.value}</p>
        <p className="text-[12px] text-muted-foreground mt-1">{metrics?.leaderboard?.label}</p>
        <p className="text-[11px] font-600 text-positive mt-1">{metrics?.leaderboard?.change}</p>
      </div>
    </div>
  );
}