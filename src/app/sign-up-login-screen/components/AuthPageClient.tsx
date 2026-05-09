'use client';
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import AppLogo from '@/components/ui/AppLogo';
import { TrendingUp, Shield, Bot, Trophy } from 'lucide-react';

const features = [
  { id: 'feat-cash', icon: <TrendingUp size={16} />, text: '₹10,00,000 virtual cash to start' },
  { id: 'feat-ai', icon: <Bot size={16} />, text: 'AI Coach with real-time insights' },
  { id: 'feat-safe', icon: <Shield size={16} />, text: 'Risk-free paper trading — no real money' },
  { id: 'feat-game', icon: <Trophy size={16} />, text: 'Compete on leaderboards & earn badges' },
];

export default function AuthPageClient() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left — Brand Panel */}
      <div className="hidden lg:flex lg:w-[52%] xl:w-[55%] gradient-primary flex-col justify-between p-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white opacity-5 rounded-full translate-y-20 -translate-x-20" />

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="bg-white/20 rounded-xl p-2">
            <AppLogo size={32} />
          </div>
          <span className="text-white font-800 text-[22px] tracking-tight">PaperTrade</span>
        </div>

        {/* Hero content */}
        <div className="relative z-10">
          <h1 className="text-white font-800 text-[42px] leading-tight mb-4">
            Master the markets.<br />
            <span className="text-white/70">Zero risk.</span>
          </h1>
          <p className="text-white/80 text-[16px] leading-relaxed mb-8 max-w-md">
            Practice trading with real market data, virtual money, and an AI coach that helps you learn faster than any textbook.
          </p>

          <div className="flex flex-col gap-3">
            {features?.map((f) => (
              <div key={f?.id} className="flex items-center gap-3 text-white/90">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  {f?.icon}
                </div>
                <span className="text-[14px] font-500">{f?.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart illustration placeholder */}
        <div className="relative z-10">
          <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-white/60 text-[11px] font-600 uppercase tracking-wider">Simulated Portfolio</p>
                <p className="text-white font-800 text-[22px] font-tabular">₹14,82,341</p>
              </div>
              <span className="bg-white/20 text-white text-[12px] font-700 px-3 py-1 rounded-full">+5.88%</span>
            </div>
            {/* Simple SVG chart line */}
            <svg viewBox="0 0 300 60" className="w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="white" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="white" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path d="M0,50 L30,42 L60,38 L90,44 L120,30 L150,24 L180,28 L210,18 L240,14 L270,10 L300,8" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M0,50 L30,42 L60,38 L90,44 L120,30 L150,24 L180,28 L210,18 L240,14 L270,10 L300,8 L300,60 L0,60 Z" fill="url(#lineGrad)" />
            </svg>
          </div>
        </div>
      </div>
      {/* Right — Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <AppLogo size={32} />
            <span className="font-800 text-[20px] text-foreground tracking-tight">PaperTrade</span>
          </div>

          {/* Tab switcher */}
          <div className="flex bg-muted rounded-2xl p-1 mb-7">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2.5 rounded-xl text-[14px] font-700 transition-all ${
                activeTab === 'login' ? 'bg-card text-foreground card-shadow' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-2.5 rounded-xl text-[14px] font-700 transition-all ${
                activeTab === 'signup' ? 'bg-card text-foreground card-shadow' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          {activeTab === 'login' ? (
            <LoginForm onSwitchToSignup={() => setActiveTab('signup')} />
          ) : (
            <SignupForm onSwitchToLogin={() => setActiveTab('login')} />
          )}
        </div>
      </div>
    </div>
  );
}