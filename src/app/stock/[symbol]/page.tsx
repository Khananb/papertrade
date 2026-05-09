'use client';
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  TrendingUp, TrendingDown, ArrowLeft, Star, Bell, ShoppingCart, X,
  BarChart2, Activity, Info, BookOpen, ChevronUp, ChevronDown
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import TraderLayout from '@/components/TraderLayout';
import { toast } from 'sonner';

// ── Mock stock data keyed by symbol ──────────────────────────────────────────
const stockDatabase: Record<string, {
  symbol: string; name: string; exchange: string; sector: string; segment: string;
  ltp: number; change: number; changePct: number; open: number; high: number;
  low: number; close: number; volume: string; marketCap: string; pe: number;
  pb: number; eps: number; dividend: number; week52High: number; week52Low: number;
  avgVolume: string; description: string;
}> = {
  RELIANCE: { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', exchange: 'NSE', sector: 'Energy', segment: 'Large Cap', ltp: 2967.35, change: +36.85, changePct: +1.26, open: 2940.0, high: 2985.0, low: 2928.0, close: 2930.50, volume: '18.4L', marketCap: '₹20.1L Cr', pe: 28.4, pb: 2.1, eps: 104.5, dividend: 9.5, week52High: 3217.90, week52Low: 2220.30, avgVolume: '14.2L', description: 'Reliance Industries is India\'s largest private sector company with businesses across energy, petrochemicals, retail, and telecom.' },
  TCS: { symbol: 'TCS', name: 'Tata Consultancy Services', exchange: 'NSE', sector: 'IT', segment: 'Large Cap', ltp: 3887.25, change: -33.0, changePct: -0.84, open: 3920.0, high: 3935.0, low: 3875.0, close: 3920.25, volume: '9.1L', marketCap: '₹14.1L Cr', pe: 31.2, pb: 14.8, eps: 124.7, dividend: 46.0, week52High: 4592.25, week52Low: 3311.0, avgVolume: '7.8L', description: 'TCS is a global leader in IT services, consulting, and business solutions, serving clients across 46 countries.' },
  HDFCBANK: { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', exchange: 'NSE', sector: 'Banking', segment: 'Large Cap', ltp: 1698.90, change: +9.45, changePct: +0.56, open: 1690.0, high: 1712.0, low: 1685.0, close: 1689.45, volume: '24.7L', marketCap: '₹12.9L Cr', pe: 19.8, pb: 2.9, eps: 85.8, dividend: 19.0, week52High: 1880.0, week52Low: 1363.55, avgVolume: '20.1L', description: 'HDFC Bank is India\'s largest private sector bank by assets, offering a wide range of banking and financial services.' },
  BAJFINANCE: { symbol: 'BAJFINANCE', name: 'Bajaj Finance Ltd', exchange: 'NSE', sector: 'NBFC', segment: 'Large Cap', ltp: 7124.50, change: +149.2, changePct: +2.14, open: 6980.0, high: 7180.0, low: 6975.0, close: 6975.30, volume: '12.4L', marketCap: '₹4.3L Cr', pe: 38.1, pb: 7.2, eps: 187.0, dividend: 36.0, week52High: 8192.0, week52Low: 6187.0, avgVolume: '9.8L', description: 'Bajaj Finance is one of India\'s leading NBFCs, offering consumer finance, SME lending, and wealth management.' },
  WIPRO: { symbol: 'WIPRO', name: 'Wipro Ltd', exchange: 'NSE', sector: 'IT', segment: 'Large Cap', ltp: 512.35, change: -4.05, changePct: -0.78, open: 516.0, high: 519.0, low: 508.0, close: 516.40, volume: '8.2L', marketCap: '₹2.7L Cr', pe: 22.4, pb: 3.8, eps: 22.9, dividend: 5.0, week52High: 614.0, week52Low: 418.0, avgVolume: '6.5L', description: 'Wipro is a leading global IT, consulting, and business process services company.' },
  ICICIBANK: { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', exchange: 'NSE', sector: 'Banking', segment: 'Large Cap', ltp: 1289.70, change: +13.45, changePct: +1.05, open: 1276.0, high: 1295.0, low: 1271.0, close: 1276.25, volume: '22.1L', marketCap: '₹9.1L Cr', pe: 18.2, pb: 2.7, eps: 70.9, dividend: 10.0, week52High: 1388.0, week52Low: 1023.0, avgVolume: '18.4L', description: 'ICICI Bank is India\'s second-largest private sector bank, offering retail, corporate, and investment banking services.' },
  ADANIPORTS: { symbol: 'ADANIPORTS', name: 'Adani Ports & SEZ Ltd', exchange: 'NSE', sector: 'Infrastructure', segment: 'Large Cap', ltp: 1341.85, change: +4.55, changePct: +0.34, open: 1337.0, high: 1355.0, low: 1330.0, close: 1337.30, volume: '5.7L', marketCap: '₹2.9L Cr', pe: 32.5, pb: 4.1, eps: 41.3, dividend: 6.0, week52High: 1621.0, week52Low: 1000.0, avgVolume: '4.9L', description: 'Adani Ports is India\'s largest commercial port operator, managing 13 ports across India.' },
  SBIN: { symbol: 'SBIN', name: 'State Bank of India', exchange: 'NSE', sector: 'Banking', segment: 'Large Cap', ltp: 842.60, change: -10.4, changePct: -1.22, open: 853.0, high: 858.0, low: 839.0, close: 853.0, volume: '31.5L', marketCap: '₹7.5L Cr', pe: 10.4, pb: 1.5, eps: 81.0, dividend: 13.7, week52High: 912.0, week52Low: 600.0, avgVolume: '28.2L', description: 'State Bank of India is the country\'s largest public sector bank with over 22,000 branches nationwide.' },
  MARUTI: { symbol: 'MARUTI', name: 'Maruti Suzuki India Ltd', exchange: 'NSE', sector: 'Auto', segment: 'Large Cap', ltp: 12480.25, change: +112.8, changePct: +0.91, open: 12370.0, high: 12540.0, low: 12360.0, close: 12367.45, volume: '2.1L', marketCap: '₹3.8L Cr', pe: 26.8, pb: 4.9, eps: 465.7, dividend: 125.0, week52High: 13680.0, week52Low: 9832.0, avgVolume: '1.8L', description: 'Maruti Suzuki is India\'s largest passenger car manufacturer, with over 40% market share in the domestic market.' },
  ZOMATO: { symbol: 'ZOMATO', name: 'Zomato Ltd', exchange: 'NSE', sector: 'Consumer', segment: 'Mid Cap', ltp: 212.45, change: +4.8, changePct: +2.31, open: 208.0, high: 215.0, low: 207.0, close: 207.65, volume: '45.2L', marketCap: '₹1.9L Cr', pe: 142.0, pb: 8.4, eps: 1.5, dividend: 0, week52High: 304.0, week52Low: 140.0, avgVolume: '38.7L', description: 'Zomato is India\'s leading food delivery and restaurant discovery platform, operating in 800+ cities.' },
  INFY: { symbol: 'INFY', name: 'Infosys Ltd', exchange: 'NSE', sector: 'IT', segment: 'Large Cap', ltp: 1689.75, change: -24.25, changePct: -1.42, open: 1714.0, high: 1718.0, low: 1685.0, close: 1714.0, volume: '14.8L', marketCap: '₹7.0L Cr', pe: 24.1, pb: 7.8, eps: 70.1, dividend: 34.0, week52High: 2006.45, week52Low: 1358.35, avgVolume: '12.1L', description: 'Infosys is a global leader in next-generation digital services and consulting, enabling clients in 56 countries.' },
  TATAMOTORS: { symbol: 'TATAMOTORS', name: 'Tata Motors Ltd', exchange: 'NSE', sector: 'Auto', segment: 'Large Cap', ltp: 801.30, change: +14.75, changePct: +1.87, open: 787.0, high: 808.0, low: 784.0, close: 786.55, volume: '28.4L', marketCap: '₹2.9L Cr', pe: 8.9, pb: 2.4, eps: 90.0, dividend: 3.0, week52High: 1179.0, week52Low: 680.0, avgVolume: '24.6L', description: 'Tata Motors is India\'s largest automobile manufacturer, with brands including Jaguar, Land Rover, and Tata.' },
  NYKAA: { symbol: 'NYKAA', name: 'FSN E-Commerce Ventures', exchange: 'NSE', sector: 'Consumer', segment: 'Small Cap', ltp: 147.85, change: -0.94, changePct: -0.63, open: 148.8, high: 151.0, low: 146.5, close: 148.79, volume: '18.9L', marketCap: '₹42,500 Cr', pe: 98.0, pb: 12.1, eps: 1.5, dividend: 0, week52High: 224.0, week52Low: 120.0, avgVolume: '15.4L', description: 'Nykaa is India\'s leading beauty and personal care e-commerce platform, also operating offline stores.' },
  PAYTM: { symbol: 'PAYTM', name: 'One97 Communications Ltd', exchange: 'NSE', sector: 'Fintech', segment: 'Mid Cap', ltp: 489.40, change: -4.65, changePct: -0.94, open: 494.0, high: 498.0, low: 487.0, close: 494.05, volume: '22.3L', marketCap: '₹31,200 Cr', pe: -42.0, pb: 3.1, eps: -11.6, dividend: 0, week52High: 998.0, week52Low: 310.0, avgVolume: '19.8L', description: 'Paytm is India\'s leading digital payments and financial services company, offering payments, lending, and insurance.' },
};

// Generate realistic intraday chart data
function generateIntradayData(basePrice: number, change: number) {
  const data = [];
  const startPrice = basePrice - change;
  const points = 78; // 6.5 hours * 12 (5-min intervals)
  for (let i = 0; i < points; i++) {
    const progress = i / points;
    const trend = change * progress;
    const noise = (Math.sin(i * 0.7) * 0.003 + Math.cos(i * 1.3) * 0.002) * basePrice;
    let price = startPrice + trend + noise;
    const hour = Math.floor(9 + (i * 6.5) / points);
    const minute = Math.floor(((i * 6.5 * 60) / points) % 60);
    data.push({
      time: `${hour}:${minute.toString().padStart(2, '0')}`,
      price: parseFloat(price.toFixed(2)),
      volume: Math.floor(Math.random() * 50000 + 10000),
    });
  }
  return data;
}

function generateWeeklyData(basePrice: number) {
  const data = [];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  let price = basePrice * 0.97;
  for (let i = 0; i < 5; i++) {
    price = price * (1 + (Math.random() - 0.48) * 0.02);
    data.push({ time: days[i], price: parseFloat(price.toFixed(2)), volume: Math.floor(Math.random() * 200000 + 50000) });
  }
  return data;
}

function generateMonthlyData(basePrice: number) {
  const data = [];
  let price = basePrice * 0.92;
  for (let i = 1; i <= 30; i++) {
    price = price * (1 + (Math.random() - 0.47) * 0.015);
    data.push({ time: `${i}`, price: parseFloat(price.toFixed(2)), volume: Math.floor(Math.random() * 300000 + 80000) });
  }
  return data;
}

function generateYearlyData(basePrice: number) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let price = basePrice * 0.75;
  return months.map((m) => {
    price = price * (1 + (Math.random() - 0.44) * 0.04);
    return { time: m, price: parseFloat(price.toFixed(2)), volume: Math.floor(Math.random() * 1000000 + 200000) };
  });
}

type TimeRange = '1D' | '1W' | '1M' | '1Y';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: { time: string } }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl px-3 py-2 card-shadow text-[12px]">
        <p className="text-muted-foreground">{payload[0]?.payload?.time}</p>
        <p className="font-700 text-foreground">₹{payload[0]?.value?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
      </div>
    );
  }
  return null;
};

export default function StockDetailPage() {
  const params = useParams();
  const router = useRouter();
  const symbol = (params?.symbol as string)?.toUpperCase();

  const stock = stockDatabase[symbol] || {
    symbol, name: symbol, exchange: 'NSE', sector: 'Equity', segment: 'Large Cap',
    ltp: 1000, change: 0, changePct: 0, open: 1000, high: 1010, low: 990, close: 1000,
    volume: '5L', marketCap: '₹1L Cr', pe: 20, pb: 2, eps: 50, dividend: 5,
    week52High: 1200, week52Low: 800, avgVolume: '4L',
    description: `${symbol} is a publicly listed company on the Indian stock exchange.`,
  };

  const [timeRange, setTimeRange] = useState<TimeRange>('1D');
  const [activeTab, setActiveTab] = useState<'overview' | 'financials' | 'peers'>('overview');
  const [orderType, setOrderType] = useState<'BUY' | 'SELL'>('BUY');
  const [qty, setQty] = useState('1');

  const chartData = {
    '1D': generateIntradayData(stock.ltp, stock.change),
    '1W': generateWeeklyData(stock.ltp),
    '1M': generateMonthlyData(stock.ltp),
    '1Y': generateYearlyData(stock.ltp),
  }[timeRange];

  const isPositive = stock.changePct >= 0;
  const chartColor = isPositive ? '#22c55e' : '#ef4444';

  const handleOrder = () => {
    const qtyNum = parseInt(qty);
    if (!qtyNum || qtyNum <= 0) { toast.error('Enter a valid quantity'); return; }
    const total = (qtyNum * stock.ltp).toLocaleString('en-IN', { maximumFractionDigits: 0 });
    toast.success(`${orderType} order for ${qtyNum} × ${stock.symbol} @ ₹${stock.ltp} placed! Total: ₹${total}`);
  };

  return (
    <TraderLayout>
      <div className="p-6 space-y-5 max-w-[1400px]">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-xl bg-muted hover:bg-border text-muted-foreground transition-colors"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center text-[12px] font-700 text-muted-foreground flex-shrink-0">
              {stock.symbol.slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-[20px] font-800 text-foreground">{stock.symbol}</h1>
                <span className="text-[11px] font-600 bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{stock.exchange}</span>
                <span className="text-[11px] font-600 bg-info-subtle text-info px-2 py-0.5 rounded-full">{stock.segment}</span>
              </div>
              <p className="text-[13px] text-muted-foreground">{stock.name} · {stock.sector}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toast.info(`${stock.symbol} added to watchlist`)}
              className="p-2 rounded-xl bg-muted hover:bg-border text-muted-foreground transition-colors"
            >
              <Star size={16} />
            </button>
            <button
              onClick={() => toast.info(`Price alert set for ${stock.symbol}`)}
              className="p-2 rounded-xl bg-muted hover:bg-border text-muted-foreground transition-colors"
            >
              <Bell size={16} />
            </button>
          </div>
        </div>

        {/* Price Hero */}
        <div className="bg-card border border-border rounded-2xl p-5 card-shadow">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-[36px] font-800 font-tabular text-foreground leading-none">
                ₹{stock.ltp.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`flex items-center gap-1 text-[15px] font-700 ${isPositive ? 'text-positive' : 'text-negative'}`}>
                  {isPositive ? <TrendingUp size={15} /> : <TrendingDown size={15} />}
                  {isPositive ? '+' : ''}₹{Math.abs(stock.change).toFixed(2)}
                </span>
                <span className={`text-[13px] font-700 px-2 py-0.5 rounded-full ${isPositive ? 'bg-positive-subtle text-positive' : 'bg-negative-subtle text-negative'}`}>
                  {isPositive ? '+' : ''}{stock.changePct.toFixed(2)}%
                </span>
                <span className="text-[12px] text-muted-foreground">Today</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 text-center">
              {[
                { label: 'Open', value: `₹${stock.open.toLocaleString('en-IN')}` },
                { label: 'High', value: `₹${stock.high.toLocaleString('en-IN')}` },
                { label: 'Low', value: `₹${stock.low.toLocaleString('en-IN')}` },
                { label: 'Volume', value: stock.volume },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wide">{item.label}</p>
                  <p className="text-[13px] font-700 font-tabular text-foreground mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Day range bar */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1.5">
              <span>Day Low: ₹{stock.low.toLocaleString('en-IN')}</span>
              <span className="font-600 text-foreground">Day Range</span>
              <span>Day High: ₹{stock.high.toLocaleString('en-IN')}</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${isPositive ? 'bg-positive' : 'bg-negative'}`}
                style={{ width: `${((stock.ltp - stock.low) / (stock.high - stock.low)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {/* Chart + Tabs — left 2/3 */}
          <div className="xl:col-span-2 space-y-5">
            {/* Chart */}
            <div className="bg-card border border-border rounded-2xl p-5 card-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity size={15} className="text-muted-foreground" />
                  <span className="text-[14px] font-700 text-foreground">Price Chart</span>
                </div>
                <div className="flex items-center gap-1 bg-muted rounded-xl p-1">
                  {(['1D', '1W', '1M', '1Y'] as TimeRange[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => setTimeRange(r)}
                      className={`px-3 py-1 rounded-lg text-[12px] font-600 transition-all ${
                        timeRange === r ? 'bg-card text-foreground card-shadow' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartColor} stopOpacity={0.15} />
                      <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="time" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
                  <YAxis tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v.toLocaleString('en-IN')}`} width={70} domain={['auto', 'auto']} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="price" stroke={chartColor} strokeWidth={2} fill="url(#priceGrad)" dot={false} activeDot={{ r: 4, fill: chartColor }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Volume Chart */}
            <div className="bg-card border border-border rounded-2xl p-5 card-shadow">
              <div className="flex items-center gap-2 mb-4">
                <BarChart2 size={15} className="text-muted-foreground" />
                <span className="text-[14px] font-700 text-foreground">Volume</span>
              </div>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={chartData} margin={{ top: 0, right: 5, left: 0, bottom: 0 }}>
                  <XAxis dataKey="time" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
                  <YAxis hide />
                  <Tooltip formatter={(v: number) => [v.toLocaleString('en-IN'), 'Volume']} contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--card)' }} />
                  <Bar dataKey="volume" fill={chartColor} opacity={0.6} radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Tabs: Overview / Financials / Peers */}
            <div className="bg-card border border-border rounded-2xl card-shadow overflow-hidden">
              <div className="flex items-center gap-1 border-b border-border px-4 pt-3">
                {(['overview', 'financials', 'peers'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-[13px] font-600 capitalize border-b-2 transition-all -mb-px ${
                      activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-5">
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    <p className="text-[13px] text-muted-foreground leading-relaxed">{stock.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        { label: 'Market Cap', value: stock.marketCap },
                        { label: 'P/E Ratio', value: stock.pe > 0 ? stock.pe.toFixed(1) : 'N/A' },
                        { label: 'P/B Ratio', value: stock.pb.toFixed(1) },
                        { label: 'EPS (TTM)', value: stock.eps > 0 ? `₹${stock.eps}` : `₹${stock.eps}` },
                        { label: 'Dividend Yield', value: stock.dividend > 0 ? `${stock.dividend}%` : 'Nil' },
                        { label: 'Avg Volume', value: stock.avgVolume },
                      ].map((item) => (
                        <div key={item.label} className="bg-muted/50 rounded-xl p-3">
                          <p className="text-[11px] text-muted-foreground uppercase tracking-wide">{item.label}</p>
                          <p className="text-[14px] font-700 font-tabular text-foreground mt-0.5">{item.value}</p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-[12px] font-600 text-muted-foreground uppercase tracking-wide mb-2">52-Week Range</p>
                      <div className="flex items-center justify-between text-[12px] text-muted-foreground mb-1.5">
                        <span>₹{stock.week52Low.toLocaleString('en-IN')}</span>
                        <span>₹{stock.week52High.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-negative via-warning to-positive rounded-full"
                          style={{ width: `${((stock.ltp - stock.week52Low) / (stock.week52High - stock.week52Low)) * 100}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-1 text-center">
                        Current: ₹{stock.ltp.toLocaleString('en-IN')} ({(((stock.ltp - stock.week52Low) / (stock.week52High - stock.week52Low)) * 100).toFixed(0)}% of range)
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'financials' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Revenue (TTM)', value: `₹${(stock.ltp * 0.8).toFixed(0)} Cr` },
                        { label: 'Net Profit', value: `₹${(stock.eps * 100).toFixed(0)} Cr` },
                        { label: 'EBITDA Margin', value: `${(18 + Math.random() * 12).toFixed(1)}%` },
                        { label: 'Debt/Equity', value: (Math.random() * 1.5).toFixed(2) },
                        { label: 'ROE', value: `${(12 + Math.random() * 15).toFixed(1)}%` },
                        { label: 'ROCE', value: `${(10 + Math.random() * 12).toFixed(1)}%` },
                      ].map((item) => (
                        <div key={item.label} className="bg-muted/50 rounded-xl p-3">
                          <p className="text-[11px] text-muted-foreground uppercase tracking-wide">{item.label}</p>
                          <p className="text-[14px] font-700 font-tabular text-foreground mt-0.5">{item.value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-info-subtle border border-info/20 rounded-xl p-3">
                      <div className="flex items-start gap-2">
                        <Info size={14} className="text-info mt-0.5 flex-shrink-0" />
                        <p className="text-[12px] text-info">Financial data shown is for paper trading simulation. Connect to a live data provider for real-time financials.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'peers' && (
                  <div className="space-y-2">
                    {Object.values(stockDatabase)
                      .filter((s) => s.sector === stock.sector && s.symbol !== stock.symbol)
                      .slice(0, 5)
                      .map((peer) => (
                        <div
                          key={peer.symbol}
                          onClick={() => router.push(`/stock/${peer.symbol}`)}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/60 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center text-[10px] font-700 text-muted-foreground">
                              {peer.symbol.slice(0, 2)}
                            </div>
                            <div>
                              <p className="text-[13px] font-700 text-foreground">{peer.symbol}</p>
                              <p className="text-[11px] text-muted-foreground">{peer.name}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-[13px] font-700 font-tabular text-foreground">₹{peer.ltp.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                            <p className={`text-[11px] font-600 ${peer.changePct >= 0 ? 'text-positive' : 'text-negative'}`}>
                              {peer.changePct >= 0 ? '+' : ''}{peer.changePct.toFixed(2)}%
                            </p>
                          </div>
                        </div>
                      ))}
                    {Object.values(stockDatabase).filter((s) => s.sector === stock.sector && s.symbol !== stock.symbol).length === 0 && (
                      <p className="text-[13px] text-muted-foreground text-center py-4">No peers found in the same sector.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Panel — right 1/3 */}
          <div className="space-y-4">
            {/* Place Order */}
            <div className="bg-card border border-border rounded-2xl p-5 card-shadow">
              <h3 className="text-[14px] font-700 text-foreground mb-4">Place Paper Order</h3>
              <div className="flex gap-2 mb-4">
                {(['BUY', 'SELL'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setOrderType(t)}
                    className={`flex-1 py-2 rounded-xl text-[13px] font-700 transition-all ${
                      orderType === t
                        ? t === 'BUY' ? 'bg-positive text-white' : 'bg-negative text-white' :'bg-muted text-muted-foreground hover:bg-border'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-600 text-muted-foreground uppercase tracking-wide block mb-1.5">Quantity</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQty((q) => String(Math.max(1, parseInt(q) - 1)))}
                      className="p-2 rounded-lg bg-muted hover:bg-border text-muted-foreground transition-colors"
                    >
                      <ChevronDown size={14} />
                    </button>
                    <input
                      type="number"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="flex-1 text-center bg-muted border border-border rounded-lg px-3 py-2 text-[14px] font-700 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                      min="1"
                    />
                    <button
                      onClick={() => setQty((q) => String(parseInt(q) + 1))}
                      className="p-2 rounded-lg bg-muted hover:bg-border text-muted-foreground transition-colors"
                    >
                      <ChevronUp size={14} />
                    </button>
                  </div>
                </div>
                <div className="bg-muted/50 rounded-xl p-3 space-y-1.5">
                  <div className="flex justify-between text-[12px]">
                    <span className="text-muted-foreground">Price</span>
                    <span className="font-600 font-tabular text-foreground">₹{stock.ltp.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-[12px]">
                    <span className="text-muted-foreground">Qty</span>
                    <span className="font-600 font-tabular text-foreground">{qty || 0}</span>
                  </div>
                  <div className="flex justify-between text-[13px] pt-1 border-t border-border">
                    <span className="font-600 text-foreground">Total</span>
                    <span className="font-700 font-tabular text-foreground">
                      ₹{((parseInt(qty) || 0) * stock.ltp).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleOrder}
                  className={`w-full py-3 rounded-xl text-[14px] font-700 transition-all ${
                    orderType === 'BUY' ?'bg-positive hover:bg-positive/90 text-white' :'bg-negative hover:bg-negative/90 text-white'
                  }`}
                >
                  {orderType === 'BUY' ? <ShoppingCart size={15} className="inline mr-2" /> : <X size={15} className="inline mr-2" />}
                  {orderType} {stock.symbol}
                </button>
              </div>
            </div>

            {/* Key Stats */}
            <div className="bg-card border border-border rounded-2xl p-5 card-shadow">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen size={14} className="text-muted-foreground" />
                <h3 className="text-[14px] font-700 text-foreground">Key Stats</h3>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: 'Market Cap', value: stock.marketCap },
                  { label: 'P/E Ratio', value: stock.pe > 0 ? stock.pe.toFixed(1) : 'N/A' },
                  { label: 'P/B Ratio', value: stock.pb.toFixed(1) },
                  { label: 'EPS', value: `₹${stock.eps}` },
                  { label: 'Dividend', value: stock.dividend > 0 ? `${stock.dividend}%` : 'Nil' },
                  { label: '52W High', value: `₹${stock.week52High.toLocaleString('en-IN')}` },
                  { label: '52W Low', value: `₹${stock.week52Low.toLocaleString('en-IN')}` },
                  { label: 'Avg Volume', value: stock.avgVolume },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
                    <span className="text-[12px] text-muted-foreground">{item.label}</span>
                    <span className="text-[12px] font-700 font-tabular text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TraderLayout>
  );
}
