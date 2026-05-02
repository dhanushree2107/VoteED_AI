import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Loader2, Vote, CheckCircle, Shield, Users } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '../services/api';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Minimum 8 characters'),
  role: z.enum(['USER', 'ADMIN']),
});
type FormValues = z.infer<typeof schema>;

const features = [
  'AI-powered Election Chatbot',
  'Interactive Voting Simulation',
  'Adaptive Quiz System',
  'Real-time Election Timeline',
  'Multi-language Support (EN/Tamil)',
];

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0); // animate form reveal

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { role: 'USER' }
  });

  const password = watch('password', '');
  const strength = password.length === 0 ? 0 : password.length < 8 ? 1 : /[A-Z]/.test(password) && /[0-9]/.test(password) ? 3 : 2;
  const strengthColors = ['bg-slate-700', 'bg-red-500', 'bg-yellow-500', 'bg-emerald-500'];
  const strengthLabels = ['', 'Weak', 'Good', 'Strong'];

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      await api.post('/auth/register', data);
      toast.success('Account created! Please sign in.');
      navigate('/login');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg grid-pattern min-h-screen flex items-center justify-center p-4">
      <div className="orb orb-1" style={{ background: 'rgba(99,102,241,0.15)' }} />
      <div className="orb orb-2" />

      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl shadow-black/50">

        {/* Left – Form */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card flex flex-col justify-center p-8 lg:p-12"
        >
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-primary-600 rounded-xl p-2">
              <Vote className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold">VoterEd AI</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white">Create your account</h2>
            <p className="text-slate-400 text-sm mt-2">Join thousands learning about democracy</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="reg-name">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  {...register('name')}
                  id="reg-name"
                  type="text"
                  placeholder="John Doe"
                  className="input-glow w-full bg-slate-900/80 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-primary-500 transition-all"
                />
              </div>
              {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="reg-email">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  {...register('email')}
                  id="reg-email"
                  type="email"
                  placeholder="you@example.com"
                  className="input-glow w-full bg-slate-900/80 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-primary-500 transition-all"
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Register as</label>
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
              <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="reg-password">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  {...register('password')}
                  id="reg-password"
                  type="password"
                  placeholder="Min 8 characters"
                  className="input-glow w-full bg-slate-900/80 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-primary-500 transition-all"
                />
              </div>
              {/* Strength bar */}
              {password.length > 0 && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`flex-1 h-1 rounded-full transition-all ${i <= strength ? strengthColors[strength] : 'bg-slate-700'}`} />
                    ))}
                  </div>
                  <p className={`text-xs ${strength === 1 ? 'text-red-400' : strength === 2 ? 'text-yellow-400' : 'text-emerald-400'}`}>
                    {strengthLabels[strength]}
                  </p>
                </div>
              )}
              {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-shine w-full bg-gradient-to-r from-indigo-600 to-primary-500 hover:from-indigo-500 hover:to-primary-400 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-60 shadow-lg shadow-indigo-900/50 mt-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>Create Account <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-400 font-semibold hover:text-primary-300 transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>

        {/* Right – Features */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-indigo-900 via-[#0c4a6e] to-slate-900 overflow-hidden"
        >
          <div className="absolute -left-16 -top-16 w-64 h-64 rounded-full border border-white/10" />
          <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full border border-white/10" />

          <div className="flex items-center gap-3">
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur">
              <Vote className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-xl">VoterEd AI</h1>
              <p className="text-indigo-300 text-xs">Free for all citizens</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-4xl font-black text-white leading-tight">
                Everything you need to be an<br />
                <span className="text-indigo-300">Informed Voter</span>
              </h2>
              <p className="mt-4 text-indigo-100/70 text-sm leading-relaxed">
                Our platform provides a complete civic education experience powered by AI and modern learning techniques.
              </p>
            </div>

            <div className="space-y-3">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-indigo-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-indigo-300" />
                  </div>
                  <span className="text-white/90 text-sm">{f}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <p className="text-indigo-100/70 text-sm">
              🔒 Your data is encrypted and secure. We never share personal information.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
