'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Copy, Check, LogIn } from 'lucide-react';
import { toast } from 'sonner';


interface LoginValues {
  email: string;
  password: string;
  remember: boolean;
}

const demoCredentials = [
  { id: 'demo-trader', role: 'Trader', email: 'rohan.kumar@papertrade.in', password: 'Trade@2026' },
  { id: 'demo-admin', role: 'Admin', email: 'admin@papertrade.in', password: 'Admin@2026' },
];

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

export default function LoginForm({ onSwitchToSignup }: LoginFormProps) {
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const { register, handleSubmit, setValue, formState: { errors }, setError } = useForm<LoginValues>({
    defaultValues: { email: '', password: '', remember: false },
  });

  const handleCopy = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleUseDemoCredential = (cred: typeof demoCredentials[0]) => {
    setValue('email', cred.email);
    setValue('password', cred.password);
    toast.info(`Demo credentials for ${cred.role} autofilled`);
  };

  // Backend: replace with POST /api/auth/login
  const onSubmit = async (data: LoginValues) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);

    const valid = demoCredentials.find((c) => c.email === data.email && c.password === data.password);
    if (!valid) {
      setError('email', { message: 'Invalid credentials — use the demo accounts below to sign in' });
      return;
    }

    toast.success(`Welcome back! Redirecting to ${valid.role} dashboard…`);
    setTimeout(() => {
      if (valid.role === 'Admin') window.location.href = '/admin-panel';
      else window.location.href = '/';
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <h2 className="text-[22px] font-800 text-foreground">Welcome back</h2>
        <p className="text-[13px] text-muted-foreground mt-0.5">Log in to your PaperTrade account</p>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="login-email" className="block text-[13px] font-600 text-foreground mb-1.5">
          Email address
        </label>
        <input
          id="login-email"
          type="email"
          placeholder="you@example.com"
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
          })}
          className={`w-full px-4 py-3 rounded-xl border text-[14px] bg-card text-foreground placeholder:text-muted-foreground/60 outline-none transition-all focus:ring-2 focus:ring-ring focus:border-primary ${
            errors.email ? 'border-negative ring-1 ring-negative' : 'border-input hover:border-primary/40'
          }`}
        />
        {errors.email && (
          <p className="text-[12px] text-negative mt-1 flex items-center gap-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="login-password" className="text-[13px] font-600 text-foreground">Password</label>
          <button type="button" className="text-[12px] font-600 text-primary hover:text-primary/80 transition-colors">
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <input
            id="login-password"
            type={showPwd ? 'text' : 'password'}
            placeholder="••••••••"
            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
            className={`w-full px-4 py-3 pr-11 rounded-xl border text-[14px] bg-card text-foreground placeholder:text-muted-foreground/60 outline-none transition-all focus:ring-2 focus:ring-ring focus:border-primary ${
              errors.password ? 'border-negative ring-1 ring-negative' : 'border-input hover:border-primary/40'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPwd(!showPwd)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-[12px] text-negative mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Remember */}
      <div className="flex items-center gap-2">
        <input
          id="login-remember"
          type="checkbox"
          {...register('remember')}
          className="w-4 h-4 rounded border-input accent-primary"
        />
        <label htmlFor="login-remember" className="text-[13px] text-muted-foreground">Remember me for 30 days</label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 gradient-primary text-white font-700 text-[14px] rounded-xl hover:opacity-90 transition-opacity scale-click disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
              <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
            </svg>
            Logging in…
          </>
        ) : (
          <>
            <LogIn size={16} />
            Log In
          </>
        )}
      </button>

      <p className="text-center text-[13px] text-muted-foreground">
        Don't have an account?{' '}
        <button type="button" onClick={onSwitchToSignup} className="font-700 text-primary hover:text-primary/80 transition-colors">
          Sign up free
        </button>
      </p>

      {/* Demo credentials */}
      <div className="mt-2 border border-border rounded-xl overflow-hidden">
        <div className="bg-muted px-4 py-2.5 border-b border-border">
          <p className="text-[11px] font-700 text-muted-foreground uppercase tracking-wider">Demo Accounts</p>
        </div>
        <div className="divide-y divide-border">
          {demoCredentials.map((cred) => (
            <div key={cred.id} className="flex items-center justify-between px-4 py-2.5 hover:bg-muted/50 transition-colors">
              <div>
                <p className="text-[12px] font-700 text-foreground">{cred.role}</p>
                <p className="text-[11px] text-muted-foreground font-mono">{cred.email}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleCopy(cred.email, `${cred.id}-email`)}
                  className="p-1.5 rounded-lg hover:bg-border text-muted-foreground transition-colors"
                  title="Copy email"
                >
                  {copied === `${cred.id}-email` ? <Check size={12} className="text-positive" /> : <Copy size={12} />}
                </button>
                <button
                  type="button"
                  onClick={() => handleUseDemoCredential(cred)}
                  className="px-2.5 py-1 bg-primary text-primary-foreground text-[11px] font-700 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Use
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}