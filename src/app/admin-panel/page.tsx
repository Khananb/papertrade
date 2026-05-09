import React from 'react';
import AdminLayout from './components/AdminLayout';
import AdminKPIGrid from './components/AdminKPIGrid';
import AdminChartsRow from './components/AdminChartsRow';
import UserManagementTable from './components/UserManagementTable';
import TradeFeed from './components/TradeFeed';
import FlaggedAlerts from './components/FlaggedAlerts';

export default function AdminPanelPage() {
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-700 text-foreground">Platform Overview</h1>
          <p className="text-[13px] text-muted-foreground mt-0.5">
            Live · Last updated 9 May 2026, 12:15 PM IST
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-muted rounded-xl text-[13px] font-600 text-muted-foreground hover:bg-border transition-colors">
            Export Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 gradient-primary rounded-xl text-[13px] font-600 text-white shadow-sm hover:opacity-90 scale-click">
            Broadcast Announcement
          </button>
        </div>
      </div>

      <AdminKPIGrid />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-5">
        <div className="xl:col-span-2 flex flex-col gap-5">
          <AdminChartsRow />
          <UserManagementTable />
        </div>
        <div className="flex flex-col gap-5">
          <FlaggedAlerts />
          <TradeFeed />
        </div>
      </div>
    </AdminLayout>
  );
}