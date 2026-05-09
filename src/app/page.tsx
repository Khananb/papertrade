import React from 'react';
import TraderLayout from '@/components/TraderLayout';
import BentoKPIGrid from './components/BentoKPIGrid';
import PortfolioChart from './components/PortfolioChart';
import HoldingsTable from './components/HoldingsTable';
import WatchlistPanel from './components/WatchlistPanel';
import AICoachCard from './components/AICoachCard';
import AchievementsStrip from './components/AchievementsStrip';
import RecentOrders from './components/RecentOrders';
import MarketMoodPanel from './components/MarketMoodPanel';

export default function TraderDashboardPage() {
  return (
    <TraderLayout>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-700 text-foreground">Good afternoon, Rohan 👋</h1>
          <p className="text-[13px] text-muted-foreground mt-0.5">
            Market closes in <span className="font-600 text-warning">2h 45m</span> · NSE/BSE · 9 May 2026
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-muted rounded-xl text-[13px] font-600 text-muted-foreground hover:bg-border transition-colors scale-click">
            Add Funds
          </button>
          <button className="flex items-center gap-2 px-4 py-2 gradient-primary rounded-xl text-[13px] font-600 text-white shadow-sm hover:opacity-90 transition-opacity scale-click">
            + New Order
          </button>
        </div>
      </div>

      {/* KPI Bento Grid */}
      <BentoKPIGrid />

      {/* Main content grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3 gap-5 mt-5">
        {/* Left — Chart + Holdings */}
        <div className="xl:col-span-2 flex flex-col gap-5">
          <PortfolioChart />
          <HoldingsTable />
          <RecentOrders />
        </div>

        {/* Right — Watchlist + AI Coach + Achievements */}
        <div className="flex flex-col gap-5">
          <MarketMoodPanel />
          <WatchlistPanel />
          <AICoachCard />
          <AchievementsStrip />
        </div>
      </div>
    </TraderLayout>
  );
}