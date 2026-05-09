'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import { LayoutDashboard, TrendingUp, BarChart2, BookOpen, Award, Bot, Briefcase, ChevronLeft, ChevronRight, Settings, LogOut, Bell, Wallet, Target, PiggyBank,  } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: number;
  section?: string;
}

const navItems: NavItem[] = [
  { id: 'nav-dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} />, href: '/', section: 'main' },
  { id: 'nav-portfolio', label: 'Portfolio', icon: <Briefcase size={18} />, href: '/trader-dashboard', section: 'main' },
  { id: 'nav-orders', label: 'Orders', icon: <BookOpen size={18} />, href: '/trader-dashboard', section: 'main', badge: 3 },
  { id: 'nav-watchlist', label: 'Watchlist', icon: <Target size={18} />, href: '/trader-dashboard', section: 'main' },
  { id: 'nav-equity', label: 'Equity', icon: <TrendingUp size={18} />, href: '/trader-dashboard', section: 'markets' },
  { id: 'nav-fno', label: 'F&O', icon: <BarChart2 size={18} />, href: '/trader-dashboard', section: 'markets' },
  { id: 'nav-fd', label: 'Fixed Deposit', icon: <PiggyBank size={18} />, href: '/trader-dashboard', section: 'markets' },
  { id: 'nav-ai-coach', label: 'AI Coach', icon: <Bot size={18} />, href: '/trader-dashboard', section: 'tools', badge: 2 },
  { id: 'nav-achievements', label: 'Achievements', icon: <Award size={18} />, href: '/trader-dashboard', section: 'tools' },
  { id: 'nav-wallet', label: 'Virtual Wallet', icon: <Wallet size={18} />, href: '/trader-dashboard', section: 'tools' },
  { id: 'nav-settings', label: 'Settings', icon: <Settings size={18} />, href: '/trader-dashboard', section: 'account' },
];

const sectionLabels: Record<string, string> = {
  main: 'Main',
  markets: 'Markets',
  tools: 'Tools',
  account: 'Account',
};

export default function TradeSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const sections = ['main', 'markets', 'tools', 'account'];

  return (
    <aside
      className={`sidebar-transition bg-card border-r border-border flex flex-col h-screen sticky top-0 z-40 ${
        collapsed ? 'w-16 min-w-[64px]' : 'w-60 min-w-[240px]'
      }`}
    >
      {/* Logo */}
      <div className={`flex items-center border-b border-border h-16 px-4 ${collapsed ? 'justify-center' : 'justify-between'}`}>
        <div className="flex items-center gap-2 overflow-hidden">
          <AppLogo size={32} />
          {!collapsed && (
            <span className="font-bold text-[15px] text-foreground tracking-tight whitespace-nowrap">
              PaperTrade
            </span>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors ${collapsed ? 'hidden' : ''}`}
          aria-label="Collapse sidebar"
        >
          <ChevronLeft size={16} />
        </button>
      </div>

      {/* Expand button when collapsed */}
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="mx-auto mt-2 p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
          aria-label="Expand sidebar"
        >
          <ChevronRight size={16} />
        </button>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-3 px-2">
        {sections.map((section) => {
          const items = navItems.filter((n) => n.section === section);
          return (
            <div key={`section-${section}`} className="mb-4">
              {!collapsed && (
                <p className="text-[10px] font-600 uppercase tracking-widest text-muted-foreground px-3 mb-1.5">
                  {sectionLabels[section]}
                </p>
              )}
              {items.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all duration-150 group relative ${
                      isActive
                        ? 'bg-secondary text-primary font-600' :'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <span className={`flex-shrink-0 ${isActive ? 'text-primary' : ''}`}>{item.icon}</span>
                    {!collapsed && (
                      <>
                        <span className="text-[13.5px] font-500 whitespace-nowrap flex-1">{item.label}</span>
                        {item.badge !== undefined && (
                          <span className="text-[10px] font-700 bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                    {collapsed && item.badge !== undefined && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Bottom user area */}
      <div className={`border-t border-border p-3 flex flex-col gap-1`}>
        <button className={`flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-muted text-muted-foreground transition-colors w-full ${collapsed ? 'justify-center' : ''}`}>
          <Bell size={16} />
          {!collapsed && <span className="text-[13px] font-500">Notifications</span>}
        </button>
        {!collapsed && (
          <div className="flex items-center gap-2.5 px-3 py-2 mt-1 bg-muted rounded-xl">
            <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-white text-[11px] font-700 flex-shrink-0">
              RK
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-600 text-foreground truncate">Rohan Kumar</p>
              <p className="text-[11px] text-muted-foreground truncate">Trader · Level 4</p>
            </div>
            <button className="text-muted-foreground hover:text-negative transition-colors">
              <LogOut size={14} />
            </button>
          </div>
        )}
        {collapsed && (
          <button className="mx-auto mt-1 p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
            <LogOut size={16} />
          </button>
        )}
      </div>
    </aside>
  );
}