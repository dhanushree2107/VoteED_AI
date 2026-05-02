import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Vote, LogOut, User, Bell } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="border-b border-slate-800 bg-slate-900 px-4 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
            <Vote className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">VoterEd AI</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-300">
          <Link to="/learn" className="hover:text-white transition-colors">Learn</Link>
          <Link to="/chat" className="hover:text-white transition-colors">AI Chat</Link>
          <Link to="/simulation" className="hover:text-white transition-colors">Simulation</Link>
          <Link to="/quiz" className="hover:text-white transition-colors">Quiz</Link>
          <Link to="/laws" className="hover:text-white transition-colors">Laws</Link>
          <Link to="/parties" className="hover:text-white transition-colors">TN Parties</Link>
          <Link to="/audit" className="hover:text-white transition-colors">Audit Log</Link>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative text-slate-400 hover:text-white transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary-500"></span>
          </button>
          
          <div className="flex items-center space-x-3 border-l border-slate-800 pl-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-slate-500 capitalize">{user.role}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-all"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
