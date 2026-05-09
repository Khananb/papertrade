'use client';
import React, { useState } from 'react';
import { AlertTriangle, ChevronRight, CheckCircle2, X } from 'lucide-react';
import { toast } from 'sonner';

// Backend: replace with GET /api/admin/flags?status=open
const flags = [
  { id: 'flag-001', trader: 'Rahul Joshi', email: 'rahul.joshi@hotmail.com', reason: 'Unusual order velocity — 87 trades in 2 hours', severity: 'high', time: '11:42 AM', trades: 87 },
  { id: 'flag-002', trader: 'Unknown User', email: 'temp8821@mailnull.com', reason: 'Multiple account creation attempts from same IP', severity: 'critical', time: '10:18 AM', trades: 0 },
  { id: 'flag-003', trader: 'Sneha Patel', email: 'sneha.patel@yahoo.co.in', reason: 'Account suspended — awaiting KYC verification', severity: 'medium', time: '9:05 AM', trades: 0 },
];

const severityConfig: Record<string, { label: string; className: string; badge: string }> = {
  critical: { label: 'Critical', className: 'border-negative/30 bg-negative-subtle', badge: 'bg-negative text-white' },
  high: { label: 'High', className: 'border-warning/30 bg-warning-subtle', badge: 'bg-warning text-white' },
  medium: { label: 'Medium', className: 'border-border bg-muted/30', badge: 'bg-muted-foreground text-white' },
};

export default function FlaggedAlerts() {
  const [dismissed, setDismissed] = useState<string[]>([]);

  const visible = flags.filter((f) => !dismissed.includes(f.id));

  return (
    <div className="bg-card border border-border rounded-2xl card-shadow overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-border">
        <div className="flex items-center gap-2">
          <AlertTriangle size={15} className="text-negative" />
          <h2 className="text-[14px] font-700 text-foreground">Flagged Alerts</h2>
          {visible.length > 0 && (
            <span className="text-[10px] font-700 bg-negative text-white px-1.5 py-0.5 rounded-full">
              {visible.length}
            </span>
          )}
        </div>
        <button className="text-[12px] font-600 text-primary hover:text-primary/80 transition-colors">
          View all →
        </button>
      </div>

      <div className="p-3 flex flex-col gap-2">
        {visible.length === 0 ? (
          <div className="py-6 text-center">
            <CheckCircle2 size={24} className="mx-auto text-positive mb-2" />
            <p className="text-[13px] font-600 text-foreground">No active alerts</p>
            <p className="text-[12px] text-muted-foreground">Platform is operating normally</p>
          </div>
        ) : (
          visible.map((flag) => {
            const sc = severityConfig[flag.severity];
            return (
              <div key={flag.id} className={`border rounded-xl p-3 ${sc.className} relative fade-in`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[9px] font-700 uppercase tracking-wider px-1.5 py-0.5 rounded-full ${sc.badge}`}>
                      {sc.label}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">{flag.time}</span>
                  </div>
                  <button
                    onClick={() => { setDismissed([...dismissed, flag.id]); toast.success(`Alert for ${flag.trader} dismissed`); }}
                    className="p-0.5 rounded text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                  >
                    <X size={11} />
                  </button>
                </div>
                <p className="text-[12px] font-700 text-foreground mt-1.5">{flag.trader}</p>
                <p className="text-[11px] text-muted-foreground">{flag.email}</p>
                <p className="text-[11px] text-foreground mt-1.5 leading-relaxed">{flag.reason}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => toast.info(`Reviewing account: ${flag.trader}`)}
                    className="flex items-center gap-1 text-[11px] font-700 text-accent hover:text-accent/80 transition-colors"
                  >
                    Review account <ChevronRight size={10} />
                  </button>
                  <button
                    onClick={() => toast.warning(`${flag.trader}'s account suspended`)}
                    className="text-[11px] font-600 text-negative hover:text-negative/80 transition-colors ml-auto"
                  >
                    Suspend
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}