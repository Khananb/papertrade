'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, UserPlus, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

interface SignupValues {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  experience: string;
  role: string;
  terms: boolean;
}

const experienceLevels = [
  { id: 'exp-beginner', value: 'beginner', label: 'Beginner — Just starting out' },
  { id: 'exp-some', value: 'some', label: 'Some experience — Traded before' },
  { id: 'exp-intermediate', value: 'intermediate', label: 'Intermediate — 1–3 years' },
  { id: 'exp-advanced', value: 'advanced', label: 'Advanced — 3+ years' },
];

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

export default function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupValues>({
    defaultValues: { experience: 'beginner', role: 'trader' },
  });

  const pwd = watch('password');

  // Backend: replace with POST /api/auth/signup
  const onSubmit = async (data: SignupValues) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1600));
    setLoading(false);
    toast.success(`Account created! Welcome to PaperTrade, ${data.fullName.split(' ')[0]}! ₹10,00,000 virtual cash added.`);
    setTimeout(() => onSwitchToLogin(), 1500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3.5">
      <div>
        <h2 className="text-[22px] font-800 text-foreground">Start trading for free</h2>
        <p className="text-[13px] text-muted-foreground mt-0.5">
          Get <span className="font-700 text-primary">₹10,00,000</span> virtual cash instantly
        </p>
      </div>

      {/* Role selector */}
      <div className="flex gap-2">
        {[
          { id: 'role-trader', value: 'trader', label: '📈 Trader' },
          { id: 'role-admin', value: 'admin', label: '🛡 Admin' },
        ].map((r) => (
          <label key={r.id} className="flex-1 cursor-pointer">
            <input type="radio" value={r.value} {...register('role')} className="sr-only" />
            <div className={`py-2.5 px-4 rounded-xl border text-[13px] font-600 text-center transition-all ${
              watch('role') === r.value
                ? 'border-primary bg-secondary text-primary' :'border-input text-muted-foreground hover:border-primary/40'
            }`}>
              {r.label}
            </div>
          </label>
        ))}
      </div>

      {/* Full Name */}
      <div>
        <label htmlFor="signup-name" className="block text-[13px] font-600 text-foreground mb-1.5">Full Name</label>
        <input
          id="signup-name"
          type="text"
          placeholder="Priya Sharma"
          {...register('fullName', { required: 'Full name is required', minLength: { value: 2, message: 'At least 2 characters' } })}
          className={`w-full px-4 py-2.5 rounded-xl border text-[14px] bg-card text-foreground placeholder:text-muted-foreground/60 outline-none transition-all focus:ring-2 focus:ring-ring focus:border-primary ${errors.fullName ? 'border-negative' : 'border-input hover:border-primary/40'}`}
        />
        {errors.fullName && <p className="text-[12px] text-negative mt-1">{errors.fullName.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="signup-email" className="block text-[13px] font-600 text-foreground mb-1.5">Email address</label>
        <input
          id="signup-email"
          type="email"
          placeholder="priya@example.com"
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
          })}
          className={`w-full px-4 py-2.5 rounded-xl border text-[14px] bg-card text-foreground placeholder:text-muted-foreground/60 outline-none transition-all focus:ring-2 focus:ring-ring focus:border-primary ${errors.email ? 'border-negative' : 'border-input hover:border-primary/40'}`}
        />
        {errors.email && <p className="text-[12px] text-negative mt-1">{errors.email.message}</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="signup-phone" className="block text-[13px] font-600 text-foreground mb-1.5">Mobile Number</label>
        <div className="flex gap-2">
          <div className="flex items-center gap-1 px-3 py-2.5 rounded-xl border border-input bg-muted text-[13px] font-600 text-foreground flex-shrink-0">
            🇮🇳 +91
          </div>
          <input
            id="signup-phone"
            type="tel"
            placeholder="98765 43210"
            {...register('phone', {
              required: 'Phone number is required',
              pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit Indian mobile number' },
            })}
            className={`flex-1 px-4 py-2.5 rounded-xl border text-[14px] bg-card text-foreground placeholder:text-muted-foreground/60 outline-none transition-all focus:ring-2 focus:ring-ring focus:border-primary ${errors.phone ? 'border-negative' : 'border-input hover:border-primary/40'}`}
          />
        </div>
        {errors.phone && <p className="text-[12px] text-negative mt-1">{errors.phone.message}</p>}
      </div>

      {/* Experience level */}
      <div>
        <label htmlFor="signup-exp" className="block text-[13px] font-600 text-foreground mb-1.5">
          Trading Experience
          <span className="ml-1.5 text-[11px] text-muted-foreground font-400">(helps us personalize your AI Coach)</span>
        </label>
        <div className="relative">
          <select
            id="signup-exp"
            {...register('experience', { required: true })}
            className="w-full px-4 py-2.5 rounded-xl border border-input text-[14px] bg-card text-foreground outline-none transition-all focus:ring-2 focus:ring-ring focus:border-primary appearance-none cursor-pointer"
          >
            {experienceLevels.map((l) => (
              <option key={l.id} value={l.value}>{l.label}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Password */}
      <div>
        <label htmlFor="signup-password" className="block text-[13px] font-600 text-foreground mb-1.5">Password</label>
        <p className="text-[11px] text-muted-foreground mb-1.5">At least 8 characters with one uppercase and one number</p>
        <div className="relative">
          <input
            id="signup-password"
            type={showPwd ? 'text' : 'password'}
            placeholder="Create a strong password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Minimum 8 characters' },
              pattern: { value: /^(?=.*[A-Z])(?=.*\d).+$/, message: 'Include at least one uppercase letter and one number' },
            })}
            className={`w-full px-4 py-2.5 pr-11 rounded-xl border text-[14px] bg-card text-foreground placeholder:text-muted-foreground/60 outline-none transition-all focus:ring-2 focus:ring-ring focus:border-primary ${errors.password ? 'border-negative' : 'border-input hover:border-primary/40'}`}
          />
          <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && <p className="text-[12px] text-negative mt-1">{errors.password.message}</p>}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="signup-confirm" className="block text-[13px] font-600 text-foreground mb-1.5">Confirm Password</label>
        <input
          id="signup-confirm"
          type="password"
          placeholder="Repeat your password"
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (v) => v === pwd || 'Passwords do not match',
          })}
          className={`w-full px-4 py-2.5 rounded-xl border text-[14px] bg-card text-foreground placeholder:text-muted-foreground/60 outline-none transition-all focus:ring-2 focus:ring-ring focus:border-primary ${errors.confirmPassword ? 'border-negative' : 'border-input hover:border-primary/40'}`}
        />
        {errors.confirmPassword && <p className="text-[12px] text-negative mt-1">{errors.confirmPassword.message}</p>}
      </div>

      {/* Terms */}
      <div className="flex items-start gap-2">
        <input
          id="signup-terms"
          type="checkbox"
          {...register('terms', { required: 'You must accept the terms to continue' })}
          className="w-4 h-4 mt-0.5 rounded border-input accent-primary flex-shrink-0"
        />
        <label htmlFor="signup-terms" className="text-[12px] text-muted-foreground leading-relaxed">
          I agree to PaperTrade's{' '}
          <span className="text-primary font-600 cursor-pointer hover:underline">Terms of Service</span>
          {' '}and{' '}
          <span className="text-primary font-600 cursor-pointer hover:underline">Privacy Policy</span>
        </label>
      </div>
      {errors.terms && <p className="text-[12px] text-negative -mt-2">{errors.terms.message}</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 gradient-primary text-white font-700 text-[14px] rounded-xl hover:opacity-90 transition-opacity scale-click disabled:opacity-60 flex items-center justify-center gap-2 mt-1"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
              <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
            </svg>
            Creating account…
          </>
        ) : (
          <>
            <UserPlus size={16} />
            Create Free Account
          </>
        )}
      </button>

      <p className="text-center text-[13px] text-muted-foreground">
        Already have an account?{' '}
        <button type="button" onClick={onSwitchToLogin} className="font-700 text-primary hover:text-primary/80 transition-colors">
          Log in
        </button>
      </p>
    </form>
  );
}