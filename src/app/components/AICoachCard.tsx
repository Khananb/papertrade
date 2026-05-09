'use client';
import React, { useState } from 'react';
import { Bot, ChevronRight, Sparkles, X, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

// Backend: replace with GET /api/ai-coach/nudge?trader_id=...
const insights = [
  {
    id: 'ai-001',
    type: 'opportunity',
    title: 'BAJFINANCE showing bullish momentum',
    body: 'RSI crossed 60 with rising volume. Consider a small position with stop-loss at ₹6,900.',
    action: 'View Analysis',
    urgency: 'medium',
  },
  {
    id: 'ai-002',
    type: 'risk',
    title: 'NYKAA position at -4.8% loss',
    body: 'Your NYKAA holding is near your risk threshold. Consider setting a stop-loss or reviewing the position.',
    action: 'Review Position',
    urgency: 'high',
  },
  {
    id: 'ai-003',
    type: 'learning',
    title: 'Try diversifying into IT sector',
    body: 'Your portfolio is 60% concentrated in Banking. Adding IT exposure could reduce sector risk.',
    action: 'Explore IT Stocks',
    urgency: 'low',
  },
];

const urgencyStyles: Record<string, string> = {
  high: 'border-negative/30 bg-negative-subtle',
  medium: 'border-warning/30 bg-warning-subtle',
  low: 'border-primary/20 bg-secondary',
};

const urgencyBadge: Record<string, string> = {
  high: 'bg-negative text-white',
  medium: 'bg-warning text-white',
  low: 'bg-primary text-primary-foreground',
};

export default function AICoachCard() {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const visible = insights.filter((i) => !dismissed.includes(i.id));

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); toast.success('AI Coach refreshed with latest analysis'); }, 1200);
  };

  return (
    <div className="bg-card border border-border rounded-2xl card-shadow overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 gradient-accent rounded-lg flex items-center justify-center">
            <Bot size={14} className="text-white" />
          </div>
          <div>
            <h2 className="text-[14px] font-700 text-foreground">AI Coach</h2>
            <p className="text-[10px] text-muted-foreground">Powered by market analysis</p>
          </div>
        </div>
        <button
          onClick={handleRefresh}
          className={`p-1.5 rounded-lg bg-muted hover:bg-border text-muted-foreground transition-all ${loading ? 'animate-spin' : ''}`}
        >
          <RefreshCw size={13} />
        </button>
      </div>

      <div className="p-3 flex flex-col gap-2">
        {visible.length === 0 ? (
          <div className="py-6 text-center">
            <Sparkles size={24} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-[13px] font-600 text-foreground">All caught up!</p>
            <p className="text-[12px] text-muted-foreground">No new insights right now.</p>
          </div>
        ) : (
          visible.map((insight) => (
            <div key={insight.id} className={`border rounded-xl p-3 ${urgencyStyles[insight.urgency]} relative fade-in`}>
              <button
                onClick={() => setDismissed([...dismissed, insight.id])}
                className="absolute top-2 right-2 p-0.5 rounded text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={11} />
              </button>
              <div className="flex items-start gap-2 pr-4">
                <span className={`text-[9px] font-700 uppercase tracking-wider px-1.5 py-0.5 rounded-full flex-shrink-0 mt-0.5 ${urgencyBadge[insight.urgency]}`}>
                  {insight.urgency === 'high' ? '⚠ Risk' : insight.urgency === 'medium' ? '📈 Signal' : '💡 Tip'}
                </span>
              </div>
              <p className="text-[12px] font-700 text-foreground mt-1.5 leading-snug">{insight.title}</p>
              <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{insight.body}</p>
              <button
                onClick={() => toast.info(`Opening: ${insight.action}`)}
                className="flex items-center gap-1 mt-2 text-[11px] font-700 text-primary hover:text-primary/80 transition-colors"
              >
                {insight.action} <ChevronRight size={10} />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="px-4 py-3 border-t border-border">
        <button className="w-full text-center text-[12px] font-600 text-accent hover:text-accent/80 transition-colors">
          Open full AI Coach session →
        </button>
      </div>
    </div>
  );
}