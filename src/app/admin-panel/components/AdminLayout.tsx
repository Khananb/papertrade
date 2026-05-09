'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  AlertTriangle,
  Settings,
  Bell,
  Search,
  ChevronDown,
  BarChart2,
  Shield,
  LogOut,
  FileText,
  Megaphone,
} from 'lucide-react';

const adminNavItems = [
  { id: 'anav-overview', label: 'Overview', icon: <LayoutDashboard size={16} />, href: '/admin-panel', active: true },
  { id: 'anav-users', label: 'Users', icon: <Users size={16} />, href: '/admin-panel', badge: 12 },
  { id: 'anav-trades', label: 'Trade Monitor', icon: <TrendingUp size={16} />, href: '/admin-panel' },
  { id: 'anav-flags', label: 'Flagged Accounts', icon: <AlertTriangle size={16} />, href: '/admin-panel', badge: 3 },
  { id: 'anav-analytics', label: 'Analytics', icon: <BarChart2 size={16} />, href: '/admin-panel' },
  { id: 'anav-announcements', label: 'Announcements', icon: <Megaphone size={16} />, href: '/admin-panel' },
  { id: 'anav-reports', label: 'Reports', icon: <FileText size={16} />, href: '/admin-panel' },
  { id: 'anav-settings', label: 'Platform Settings', icon: <Settings size={16} />, href: '/admin-panel' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Admin Topbar */}
      <header className="h-14 bg-card border-b border-border flex items-center px-6 gap-4 sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 gradient-accent rounded-lg flex items-center justify-center">
            <Shield size={14} className="text-white" />
          </div>
          <div className="flex items-center gap-2">
            <AppLogo size={24} />
            <span className="font-800 text-[15px] text-foreground tracking-tight">PaperTrade</span>
            <span className="text-[10px] font-700 bg-accent text-accent-foreground px-2 py-0.5 rounded-full uppercase tracking-wider ml-1">Admin</span>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-xl text-[13px] text-muted-foreground">
            <Search size={14} />
            <span>Search users, trades, reports…</span>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button className="relative p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-negative rounded-full" />
          </button>
          <div className="flex items-center gap-2 pl-3 border-l border-border">
            <div className="w-7 h-7 rounded-full gradient-accent flex items-center justify-center text-white text-[11px] font-700">
              SA
            </div>
            <div className="hidden sm:block">
              <p className="text-[12px] font-600 text-foreground">Super Admin</p>
            </div>
            <ChevronDown size={14} className="text-muted-foreground" />
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`sidebar-transition bg-card border-r border-border flex flex-col sticky top-14 h-[calc(100vh-56px)] ${sidebarOpen ? 'w-52' : 'w-16'}`}>
          <nav className="flex-1 overflow-y-auto py-4 px-2">
            {adminNavItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all ${
                  item.active
                    ? 'bg-accent/10 text-accent font-600' :'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {sidebarOpen && (
                  <>
                    <span className="text-[13px] font-500 flex-1 whitespace-nowrap">{item.label}</span>
                    {item.badge !== undefined && (
                      <span className="text-[10px] font-700 bg-negative text-white rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            ))}
          </nav>

          <div className="border-t border-border p-3">
            <Link
              href="/sign-up-login-screen"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-muted hover:text-negative transition-all w-full`}
            >
              <LogOut size={16} />
              {sidebarOpen && <span className="text-[13px] font-500">Log Out</span>}
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}