'use client';
import React from 'react';
import { Trophy, Lock } from 'lucide-react';

// Backend: replace with GET /api/trader/achievements
const achievements = [
  { id: 'ach-001', emoji: '🚀', title: 'First Trade', desc: 'Placed your first order', unlocked: true, date: '12 Apr' },
  { id: 'ach-002', emoji: '💰', title: 'Profit Maker', desc: 'Closed 5 profitable trades', unlocked: true, date: '18 Apr' },
  { id: 'ach-003', emoji: '🔥', title: '7-Day Streak', desc: 'Traded 7 days in a row', unlocked: true, date: '25 Apr' },
  { id: 'ach-004', emoji: '📊', title: 'F&O Explorer', desc: 'Place your first F&O trade', unlocked: false, progress: 0 },
  { id: 'ach-005', emoji: '🏆', title: 'Top 50', desc: 'Reach top 50 on leaderboard', unlocked: false, progress: 54 },
  { id: 'ach-006', emoji: '💎', title: 'Diamond Hands', desc: 'Hold a stock for 30+ days', unlocked: false, progress: 80 },
];

export default function AchievementsStrip() {
  return (
    <div className="bg-card border border-border rounded-2xl card-shadow overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-border">
        <div className="flex items-center gap-2">
          <Trophy size={15} className="text-warning" />
          <h2 className="text-[14px] font-700 text-foreground">Achievements</h2>
        </div>
        <span className="text-[11px] font-600 text-positive bg-positive-subtle px-2 py-0.5 rounded-full">
          3/6 unlocked
        </span>
      </div>
      <div className="p-3 grid grid-cols-3 gap-2">
        {achievements?.map((ach) => (
          <div
            key={ach?.id}
            className={`flex flex-col items-center p-2.5 rounded-xl border text-center transition-all ${
              ach?.unlocked
                ? 'border-warning/20 bg-warning-subtle' :'border-border bg-muted/30 badge-locked'
            }`}
            title={ach?.desc}
          >
            <span className="text-[20px] leading-none mb-1">{ach?.emoji}</span>
            <p className="text-[10px] font-700 text-foreground leading-tight">{ach?.title}</p>
            {ach?.unlocked ? (
              <p className="text-[9px] text-muted-foreground mt-0.5">{ach?.date}</p>
            ) : (
              <div className="w-full mt-1.5">
                {ach?.progress !== undefined && ach?.progress > 0 ? (
                  <>
                    <div className="h-1 bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: `${ach?.progress}%` }} />
                    </div>
                    <p className="text-[9px] text-muted-foreground mt-0.5">{ach?.progress}%</p>
                  </>
                ) : (
                  <Lock size={10} className="mx-auto text-muted-foreground" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-border">
        <button className="w-full text-center text-[12px] font-600 text-primary hover:text-primary/80 transition-colors">
          View all achievements →
        </button>
      </div>
    </div>
  );
}