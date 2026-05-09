import React from 'react';
import { Users, TrendingUp, Wallet, Activity, BarChart2, UserPlus, AlertTriangle, DollarSign } from 'lucide-react';

// Backend: replace with GET /api/admin/platform/metrics
const kpis = [
  { id: 'kpi-dau', label: 'Daily Active Users', value: '8,241', change: '+12.4%', up: true, icon: <Activity size={18} />, color: 'bg-info-subtle text-info border-info/20' },
  { id: 'kpi-mau', label: 'Monthly Active Users', value: '41,892', change: '+8.7%', up: true, icon: <Users size={18} />, color: 'bg-secondary text-secondary-foreground border-primary/20' },
  { id: 'kpi-trades', label: 'Trades Today', value: '1,24,387', change: '+22.1%', up: true, icon: <TrendingUp size={18} />, color: 'bg-positive-subtle text-positive border-positive/20' },
  { id: 'kpi-cash', label: 'Virtual Cash in Circulation', value: '₹4,218 Cr', change: '+3.2%', up: true, icon: <Wallet size={18} />, color: 'bg-warning-subtle text-warning border-warning/20' },
  { id: 'kpi-fno', label: 'Active F&O Positions', value: '18,742', change: '-4.1%', up: false, icon: <BarChart2 size={18} />, color: 'bg-negative-subtle text-negative border-negative/20' },
  { id: 'kpi-new', label: 'New Registrations Today', value: '842', change: '+31.5%', up: true, icon: <UserPlus size={18} />, color: 'bg-secondary text-secondary-foreground border-primary/20' },
  { id: 'kpi-flagged', label: 'Flagged Accounts', value: '14', change: '+3 today', up: false, icon: <AlertTriangle size={18} />, color: 'bg-negative-subtle text-negative border-negative/20' },
  { id: 'kpi-streak', label: 'Avg. Session Duration', value: '28 min', change: '+2 min', up: true, icon: <DollarSign size={18} />, color: 'bg-info-subtle text-info border-info/20' },
];

export default function AdminKPIGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
      {kpis?.map((kpi) => (
        <div key={kpi?.id} className={`bg-card border rounded-2xl p-4 card-shadow ${kpi?.color}`}>
          <div className="flex items-start justify-between mb-3">
            <p className="text-[11px] font-600 uppercase tracking-widest opacity-70">{kpi?.label}</p>
            <div className="opacity-80">{kpi?.icon}</div>
          </div>
          <p className="text-[24px] font-800 font-tabular text-foreground leading-none">{kpi?.value}</p>
          <p className={`text-[12px] font-600 mt-1.5 font-tabular ${kpi?.up ? 'text-positive' : 'text-negative'}`}>
            {kpi?.change} vs yesterday
          </p>
        </div>
      ))}
    </div>
  );
}