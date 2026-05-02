import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Shield, User, Clock, MapPin, CheckCircle, XCircle, Filter, Search, RefreshCw, Loader2 } from 'lucide-react';
import api from '../services/api';

interface AuditEntry {
  id: string;
  userId: string | null;
  action: string;
  timestamp: string;
  ipAddress: string;
  status: 'SUCCESS' | 'FAILURE';
}

const ACTION_COLORS: Record<string, string> = {
  ACCOUNT_CREATION: 'text-emerald-400 bg-emerald-500/10',
  USER_LOGIN: 'text-sky-400 bg-sky-500/10',
  QUIZ_ATTEMPT: 'text-amber-400 bg-amber-500/10',
  SIMULATION_START: 'text-teal-400 bg-teal-500/10',
  SIMULATION_COMPLETE: 'text-green-400 bg-green-500/10',
  CHATBOT_QUERY: 'text-cyan-400 bg-cyan-500/10',
};

const AuditLogPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'SUCCESS' | 'FAILURE'>('ALL');
  const [search, setSearch] = useState('');

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/audit-logs');
      setLogs(res.data);
    } catch {
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLogs(); }, []);

  const filtered = logs.filter(l => {
    if (statusFilter !== 'ALL' && l.status !== statusFilter) return false;
    if (search && !l.action.toLowerCase().includes(search.toLowerCase()) && !l.userId?.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const successCount = logs.filter(l => l.status === 'SUCCESS').length;
  const failCount = logs.filter(l => l.status === 'FAILURE').length;

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-black text-white">Audit Log</h1>
            <p className="text-slate-400 text-sm mt-1">All system actions are recorded for security and accountability.</p>
          </div>
          <button onClick={fetchLogs} className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl text-slate-300 text-sm hover:border-sky-500 transition-colors">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8 mt-6">
          {[
            { label: 'Total Events', value: logs.length, color: 'text-white' },
            { label: 'Successful', value: successCount, color: 'text-emerald-400' },
            { label: 'Failed', value: failCount, color: 'text-red-400' },
          ].map((s, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center">
              <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-slate-500 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search action or user..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-sky-500" />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            {(['ALL', 'SUCCESS', 'FAILURE'] as const).map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${statusFilter === s ? (s === 'FAILURE' ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white') : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
                {s === 'ALL' ? 'All Status' : s}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 text-sky-400 animate-spin mx-auto mb-3" />
            <p className="text-slate-500 text-sm">Loading audit logs from server...</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && logs.length === 0 && (
          <div className="text-center py-16">
            <Shield className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-white font-bold text-lg mb-2">No Audit Logs Yet</h3>
            <p className="text-slate-500 text-sm">Logs appear here after user actions like Register, Login, Quiz, etc.<br/>Try registering or logging in to generate audit entries.</p>
          </div>
        )}

        {/* Log entries */}
        {!loading && (
          <div className="space-y-2">
            {filtered.map((log, i) => (
              <motion.div key={log.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="bg-slate-900 border border-slate-800 rounded-xl px-5 py-4 flex flex-col md:flex-row md:items-center gap-3 hover:border-slate-700 transition-all">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                    <User className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">{log.userId || 'Unknown User'}</p>
                    <p className="text-slate-500 text-xs">{log.ipAddress}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs flex-shrink-0">
                  <span className={`px-2.5 py-1 rounded-lg font-semibold ${ACTION_COLORS[log.action] || 'text-slate-400 bg-slate-800'}`}>
                    {log.action.replace(/_/g, ' ')}
                  </span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <Clock className="w-3 h-3" />
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                  {log.status === 'SUCCESS'
                    ? <CheckCircle className="w-4 h-4 text-emerald-400" />
                    : <XCircle className="w-4 h-4 text-red-400" />}
                </div>
              </motion.div>
            ))}
            {filtered.length === 0 && logs.length > 0 && (
              <div className="text-center py-12 text-slate-500">No matching audit log entries found.</div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AuditLogPage;
