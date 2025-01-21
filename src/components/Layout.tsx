import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2, Home, LogOut, User, BarChart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-8">
        <BarChart2 className="w-8 h-8 text-blue-600" />
        <span className="text-xl font-bold">BizIntel</span>
      </div>
      
      <div className="space-y-2">
        <NavLink to="/dashboard" icon={<Home />} label="Analysis History" active={isActive('/dashboard')} />
        <NavLink to="/analytics" icon={<BarChart />} label="Analytics" active={isActive('/analytics')} />
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
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
};