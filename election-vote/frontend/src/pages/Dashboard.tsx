import React from 'react';
import Navbar from '../components/Navbar';
import { BookOpen, MessageSquare, PlayCircle, Trophy, ArrowRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const getModules = (role: string) => {
  const base = [
    {
      title: 'Election Process',
      description: 'Learn the step-by-step journey of a vote from registration to counting.',
      icon: BookOpen,
      link: '/learn',
      color: 'bg-blue-500',
      stats: '8 Modules',
    },
    {
      title: 'AI Chat Assistant',
      description: 'Have a conversation with our AI to get answers to your election queries.',
      icon: MessageSquare,
      link: '/chat',
      color: 'bg-purple-500',
      stats: 'Available 24/7',
    },
    {
      title: 'Voting Simulation',
      description: 'Experience the polling station environment in our realistic simulation.',
      icon: PlayCircle,
      link: '/simulation',
      color: 'bg-emerald-500',
      stats: '3 Modes',
    },
    {
      title: 'Practice Quizzes',
      description: 'Test your knowledge and earn badges as you progress through the courses.',
      icon: Trophy,
      link: '/quiz',
      color: 'bg-amber-500',
      stats: '8 Questions',
    },
    {
      title: 'Election Laws',
      description: 'Explore the legal framework and constitutional rights of every citizen.',
      icon: Info,
      link: '/laws',
      color: 'bg-sky-500',
      stats: '18 Laws',
    },
    {
      title: 'TN Party Analysis',
      description: 'Review achievements and promise trackers of all major political parties.',
      icon: BarChart2,
      link: '/parties',
      color: 'bg-rose-500',
      stats: '12 Parties',
    }
  ];

  if (role === 'ADMIN') {
    base.push({
      title: 'Audit Management',
      description: 'Monitor system security logs and user activity across the platform.',
      icon: Shield,
      link: '/audit',
      color: 'bg-indigo-500',
      stats: 'System Logs',
    });
  }

  return base;
};

import { Shield, BarChart2 } from 'lucide-react';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-4 py-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-white">Welcome, {user.name.split(' ')[0]}!</h1>
          <p className="mt-2 text-slate-400">Track your progress and continue your civic education.</p>
        </header>

        {/* Progress Overview */}
        <div className="mb-10 rounded-2xl bg-slate-900 p-6 ring-1 ring-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white">Your Learning Progress</h3>
              <p className="text-sm text-slate-400">You've completed 4 out of 12 modules this month.</p>
            </div>
            <div className="w-full md:w-64">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-300">33% Completed</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800">
                <div className="h-full w-1/3 rounded-full bg-primary-600 shadow-[0_0_10px_rgba(14,165,233,0.5)]"></div>
              </div>
            </div>
            <Link to="/learn" className="inline-flex items-center text-sm font-semibold text-primary-400 hover:text-primary-300">
              Continue Learning <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Module Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {getModules(user.role).map((module, idx) => (
            <Link 
              key={idx} 
              to={module.link}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-slate-900 p-6 ring-1 ring-slate-800 transition-all hover:-translate-y-1 hover:bg-slate-800/80 hover:ring-slate-700"
            >
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${module.color} bg-opacity-10 text-white shadow-sm`}>
                <module.icon className={`h-6 w-6 ${module.color.replace('bg-', 'text-')}`} />
              </div>
              <h3 className="text-lg font-bold text-white">{module.title}</h3>
              <p className="mt-2 text-sm text-slate-400 line-clamp-2">{module.description}</p>
              
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-800">
                <span className="text-xs font-medium text-slate-500">{module.stats}</span>
                <span className="text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Banner */}
        <div className="mt-12 rounded-2xl bg-primary-600/10 p-6 ring-1 ring-primary-600/20">
          <div className="flex items-start space-x-4">
            <div className="rounded-full bg-primary-600/20 p-2">
              <Info className="h-6 w-6 text-primary-400" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Did you know?</h4>
              <p className="mt-1 text-sm text-slate-400">The first general elections in India were held between 25 October 1951 and 21 February 1952. Over 173 million people were eligible to vote.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
