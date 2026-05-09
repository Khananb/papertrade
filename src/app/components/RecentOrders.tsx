'use client';
import React, { useState } from 'react';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';


// Backend: replace with GET /api/trader/orders?limit=8
const orders = [
  { id: 'ord-001', symbol: 'RELIANCE', type: 'BUY', segment: 'Intraday', qty: 5, price: 2960.0, status: 'EXECUTED', time: '10:32 AM', pnl: +185.0 },
  { id: 'ord-002', symbol: 'TCS', type: 'SELL', segment: 'Delivery', qty: 3, price: 3895.0, status: 'EXECUTED', time: '10:47 AM', pnl: -75.0 },
  { id: 'ord-003', symbol: 'NIFTY 24400 CE', type: 'BUY', segment: 'F&O', qty: 50, price: 124.5, status: 'OPEN', time: '11:15 AM', pnl: null },
  { id: 'ord-004', symbol: 'BAJFINANCE', type: 'BUY', segment: 'Delivery', qty: 2, price: 7100.0, status: 'PENDING', time: '11:42 AM', pnl: null },
  { id: 'ord-005', symbol: 'HDFCBANK', type: 'BUY', segment: 'Intraday', qty: 10, price: 1695.0, status: 'EXECUTED', time: '12:08 PM', pnl: +38.0 },
  { id: 'ord-006', symbol: 'SBIN', type: 'SELL', segment: 'Intraday', qty: 20, price: 850.0, status: 'CANCELLED', time: '12:31 PM', pnl: null },
  { id: 'ord-007', symbol: 'ZOMATO', type: 'BUY', segment: 'Delivery', qty: 100, price: 210.0, status: 'EXECUTED', time: '1:04 PM', pnl: +245.0 },
  { id: 'ord-008', symbol: 'BANKNIFTY 52500 PE', type: 'BUY', segment: 'F&O', qty: 15, price: 88.0, status: 'REJECTED', time: '1:22 PM', pnl: null },
];

const statusConfig: Record<string, { icon: React.ReactNode; className: string; label: string }> = {
  EXECUTED: { icon: <CheckCircle2 size={12} />, className: 'text-positive bg-positive-subtle', label: 'Executed' },
  OPEN: { icon: <Clock size={12} />, className: 'text-info bg-info-subtle', label: 'Open' },
  PENDING: { icon: <Clock size={12} />, className: 'text-warning bg-warning-subtle', label: 'Pending' },
  CANCELLED: { icon: <XCircle size={12} />, className: 'text-muted-foreground bg-muted', label: 'Cancelled' },
  REJECTED: { icon: <XCircle size={12} />, className: 'text-negative bg-negative-subtle', label: 'Rejected' },
};

const segmentColors: Record<string, string> = {
  Intraday: 'bg-info-subtle text-info',
  Delivery: 'bg-secondary text-secondary-foreground',
  'F&O': 'bg-warning-subtle text-warning',
};

export default function RecentOrders() {
  const [activeTab, setActiveTab] = useState<'all' | 'executed' | 'open' | 'pending'>('all');

  const filtered = orders.filter((o) => {
    if (activeTab === 'executed') return o.status === 'EXECUTED';
    if (activeTab === 'open') return o.status === 'OPEN';
    if (activeTab === 'pending') return o.status === 'PENDING';
    return true;
  });

  return (
    <div className="bg-card border border-border rounded-2xl card-shadow overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h2 className="text-[15px] font-700 text-foreground">Today's Orders</h2>
        <div className="flex items-center gap-1 bg-muted rounded-xl p-1">
          {(['all', 'executed', 'open', 'pending'] as const).map((tab) => (
            <button
              key={`tab-${tab}`}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-lg text-[12px] font-600 transition-all capitalize ${
                activeTab === tab ? 'bg-card text-foreground card-shadow' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="bg-muted/40">
              {['Stock / Contract', 'Type', 'Segment', 'Qty', 'Price', 'Status', 'P&L', 'Time'].map((col) => (
                <th key={`ordth-${col}`} className="px-4 py-2.5 text-left text-[11px] font-600 uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((order) => {
              const sc = statusConfig[order.status];
              return (
                <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-[13px] font-700 text-foreground">{order.symbol}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[12px] font-700 ${order.type === 'BUY' ? 'text-positive' : 'text-negative'}`}>
                      {order.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[11px] font-600 px-2 py-0.5 rounded-full ${segmentColors[order.segment] || 'bg-muted text-muted-foreground'}`}>
                      {order.segment}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[13px] font-tabular text-foreground">{order.qty}</td>
                  <td className="px-4 py-3 text-[13px] font-tabular text-foreground">₹{order.price.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-600 px-2 py-0.5 rounded-full ${sc.className}`}>
                      {sc.icon} {sc.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {order.pnl !== null ? (
                      <span className={`text-[12px] font-700 font-tabular ${order.pnl >= 0 ? 'text-positive' : 'text-negative'}`}>
                        {order.pnl >= 0 ? '+' : ''}₹{Math.abs(order.pnl)}
                      </span>
                    ) : (
                      <span className="text-[12px] text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[12px] font-tabular text-muted-foreground">{order.time}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="px-5 py-3 border-t border-border flex items-center justify-between bg-muted/30">
        <p className="text-[12px] text-muted-foreground">{filtered.length} orders shown</p>
        <button className="text-[12px] font-600 text-primary hover:text-primary/80 transition-colors">
          View order history →
        </button>
      </div>
    </div>
  );
}