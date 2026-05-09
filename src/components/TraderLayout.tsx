import React from 'react';
import TradeSidebar from './TradeSidebar';
import TradeTopbar from './TradeTopbar';

export default function TraderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <TradeSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TradeTopbar />
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-12 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}