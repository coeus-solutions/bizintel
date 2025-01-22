import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2, History, LogOut, User, BarChart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const TopBar = () => {
  const { user } = useAuth();
  const [showEmail, setShowEmail] = useState(false);

  const userInitial = user?.email?.[0]?.toUpperCase() || '?';

  return (
    <div className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-end">
      <div className="relative">
        <button
          onClick={() => setShowEmail(!showEmail)}
          className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium hover:bg-blue-700 transition-colors"
        >
          {userInitial}
        </button>
        {showEmail && (
          <div className="absolute right-0 mt-2 py-2 px-4 bg-white rounded-lg shadow-lg border border-gray-200 text-sm">
            {user?.email}
          </div>
        )}
      </div>
    </div>
  );
};

const Navigation = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <BarChart2 className="w-8 h-8 text-blue-600" />
        <span className="text-xl font-bold">BizIntel</span>
      </div>
      
      <div className="space-y-2">
        <NavLink to="/dashboard" icon={<History />} label="Analysis History" active={isActive('/dashboard')} />
        <NavLink to="/analytics" icon={<BarChart />} label="Analytics" active={isActive('/analytics')} />
      </div>

      <div className="mt-auto space-y-2">
        <NavLink to="/profile" icon={<User />} label="Profile" active={isActive('/profile')} />
        <button 
          className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={logout}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, label, active }: { to: string; icon: React.ReactNode; label: string; active: boolean }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
      active ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5' })}
    <span>{label}</span>
  </Link>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <TopBar />
      <main className="ml-64 pt-16 p-8">
        {children}
      </main>
    </div>
  );
};