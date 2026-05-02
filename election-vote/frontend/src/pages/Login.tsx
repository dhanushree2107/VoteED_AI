import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2, Vote, Shield, BarChart2, Users } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '../services/api';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['USER', 'ADMIN']),
});
type LoginFormValues = z.infer<typeof loginSchema>;

const stats = [
  { icon: Users, value: '900M+', label: 'Registered Voters' },
  { icon: BarChart2, value: '543', label: 'Lok Sabha Seats' },
  { icon: Shield, value: '100%', label: 'Secure Voting' },
];

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { role: 'USER' }
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', data);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      toast.success(`Welcome back, ${res.data.user.name}!`);
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg grid-pattern min-h-screen flex items-center justify-center p-4">
      {/* Glowing orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl shadow-black/50">
        
        {/* Left Panel */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-[#0c4a6e] via-[#075985] to-[#0369a1] overflow-hidden"
        >
          {/* Background decorative circles */}
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full border border-white/10" />
          <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full border border-white/10" />
          <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full border border-white/10" />

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative p-2">
              <div className="pulse-ring">
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur">
                  <Vote className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-white font-bold text-xl">VoterEd AI</h1>
              <p className="text-sky-200 text-xs">Democracy Education Platform</p>
            </div>
          </div>

          {/* Center content */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-sky-200 text-xs mb-4 backdrop-blur">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                AI-Powered Learning
              </div>
              <h2 className="text-4xl font-black text-white leading-tight glow-text">
                Understand<br />
                Democracy<br />
                <span className="text-sky-300">Like Never Before</span>
              </h2>
              <p className="mt-4 text-sky-100/80 text-sm leading-relaxed">
                An interactive AI-powered platform that educates citizens about elections through quizzes, simulations, and intelligent conversations.
              </p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center stat-card border border-white/10"
                >
                  <s.icon className="w-5 h-5 text-sky-300 mx-auto mb-1" />
                  <p className="text-white font-bold text-lg">{s.value}</p>
                  <p className="text-sky-200 text-xs">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom quote */}
          <div className="border-t border-white/10 pt-6">
            <p className="text-sky-100/70 text-sm italic">
              "The ballot is stronger than the bullet."
            </p>
            <p className="text-sky-300 text-xs mt-1 font-medium">— Abraham Lincoln</p>
          </div>
        </motion.div>

        {/* Right Panel – Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card flex flex-col justify-center p-8 lg:p-12"
        >
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="bg-primary-600 rounded-xl p-2">
              <Vote className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold">VoterEd AI</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white">Sign in to your account</h2>
            <p className="text-slate-400 text-sm mt-2">Continue your civic education journey</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="login-email">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  {...register('email')}
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  className="input-glow w-full bg-slate-900/80 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-primary-500 transition-all"
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Sign in as</label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`cursor-pointer flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${watch('role') === 'USER' ? 'bg-primary-500/20 border-primary-500 text-white' : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:border-slate-600'}`}>
                  <input type="radio" value="USER" {...register('role')} className="hidden" />
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-medium">Voter</span>
                </label>
                <label className={`cursor-pointer flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${watch('role') === 'ADMIN' ? 'bg-indigo-500/20 border-indigo-500 text-white' : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:border-slate-600'}`}>
                  <input type="radio" value="ADMIN" {...register('role')} className="hidden" />
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-medium">Admin</span>
                </label>
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-slate-300" htmlFor="login-password">
                  Password
                </label>
                <a href="#" className="text-xs text-primary-400 hover:text-primary-300 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  {...register('password')}
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  className="input-glow w-full bg-slate-900/80 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-primary-500 transition-all"
                />
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-shine w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-primary-900/50 mt-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative flex items-center gap-3 my-2">
              <div className="flex-1 h-px bg-slate-800" />
              <span className="text-xs text-slate-600">or</span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>

            {/* Demo credentials */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center">
              <p className="font-bold text-slate-300 mb-3 text-sm flex items-center justify-center gap-2">
                <Shield className="w-4 h-4 text-primary-400" />
                Quick Demo Access
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const values = { email: 'voter@demo.com', password: 'password123', role: 'USER' };
                    onSubmit(values as LoginFormValues);
                  }}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-slate-800 border border-slate-700 hover:border-primary-500 hover:bg-primary-500/10 transition-all group"
                >
                  <Users className="w-5 h-5 text-slate-400 group-hover:text-primary-400" />
                  <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-300 uppercase tracking-wider">Voter Demo</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const values = { email: 'admin@demo.com', password: 'password123', role: 'ADMIN' };
                    onSubmit(values as LoginFormValues);
                  }}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-slate-800 border border-slate-700 hover:border-indigo-500 hover:bg-indigo-500/10 transition-all group"
                >
                  <Shield className="w-5 h-5 text-slate-400 group-hover:text-indigo-400" />
                  <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-300 uppercase tracking-wider">Admin Demo</span>
                </button>
              </div>
              <p className="mt-3 text-[10px] text-slate-500 italic">Pre-configured accounts for instant exploration</p>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-400 font-semibold hover:text-primary-300 transition-colors">
              Create one free
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
