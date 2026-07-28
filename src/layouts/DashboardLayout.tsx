import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf,
  LayoutDashboard,
  ShoppingBag,
  Coins,
  Shield,
  BarChart3,
  FileText,
  Building2,
  Settings,
  Menu,
  X,
  Search,
  Bell,
  ChevronDown,
  ChevronsUpDown,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { mockUserProfile } from '../services/mockData';

export const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState('Acme Global Holdings');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const workspaces = [
    { name: 'Acme Global Holdings', role: 'Buyer' },
    { name: 'EcoReserve Trust Ltd', role: 'Seller' },
    { name: 'Global Verifier Node', role: 'Admin' }
  ];

  const navigation = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Marketplace', path: '/dashboard/marketplace', icon: ShoppingBag },
    { name: 'Buyer Dashboard', path: '/dashboard/buyer', icon: Coins },
    { name: 'Seller Dashboard', path: '/dashboard/seller', icon: Leaf },
    { name: 'Admin Dashboard', path: '/dashboard/admin', icon: Shield },
    { name: 'Analytics', path: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Reports', path: '/dashboard/reports', icon: FileText },
    { name: 'Organizations', path: '/dashboard/organizations', icon: Building2 },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  // Helper to check active state
  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 h-16 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileOpen(true)}
            className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-900 focus:outline-none transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Logo brand */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/green_asha_logo.png" alt="GreenASHA Logo" className="h-8 w-auto object-contain" />
          </Link>

          <span className="hidden md:inline-block h-4 w-px bg-slate-200"></span>

          {/* Workspace Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-soft hover:bg-slate-50 transition-all max-w-[200px]"
            >
              <span className="truncate">{selectedWorkspace}</span>
              <ChevronsUpDown className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            </button>

            <AnimatePresence>
              {isWorkspaceOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsWorkspaceOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-1.5 w-56 rounded-xl border border-slate-100 bg-white p-1.5 shadow-premium z-20"
                  >
                    <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Switch Scope
                    </div>
                    {workspaces.map((ws) => (
                      <button
                        key={ws.name}
                        onClick={() => {
                          setSelectedWorkspace(ws.name);
                          setIsWorkspaceOpen(false);
                        }}
                        className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors ${
                          selectedWorkspace === ws.name
                            ? 'bg-slate-50 text-[#0F766E] font-semibold'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <span className="truncate">{ws.name}</span>
                        <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">
                          {ws.role}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Global Search Bar */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search ledger or projects..."
              className="h-9 w-60 rounded-lg border border-slate-200 bg-slate-50/50 pl-9 pr-4 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#0F766E] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0F766E] transition-all"
            />
          </div>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
            </button>

            <AnimatePresence>
              {isNotificationsOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsNotificationsOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-1.5 w-80 rounded-xl border border-slate-100 bg-white p-4 shadow-premium z-20"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Alerts Log</h4>
                      <span className="text-[10px] text-[#0F766E] font-semibold">1 Unread</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex gap-2.5 items-start">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                        <div>
                          <p className="text-xs font-semibold text-slate-800">Direct Air Capture Purchase</p>
                          <p className="text-[10px] text-slate-400 font-light mt-0.5">Verification certificate cert-1001.pdf issued</p>
                        </div>
                      </div>
                      <div className="flex gap-2.5 items-start opacity-60">
                        <div className="h-2 w-2 rounded-full bg-slate-300 mt-1.5 shrink-0"></div>
                        <div>
                          <p className="text-xs font-semibold text-slate-800">Registry Sync Successful</p>
                          <p className="text-[10px] text-slate-400 font-light mt-0.5">Vera node transaction synced</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <span className="h-4 w-px bg-slate-200"></span>

          {/* Profile Menu Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <img
                src={mockUserProfile.avatarUrl}
                alt={mockUserProfile.name}
                className="h-8 w-8 rounded-full border border-slate-100 object-cover"
              />
              <span className="hidden lg:flex items-center text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors">
                {mockUserProfile.name}
                <ChevronDown className="ml-1 h-3.5 w-3.5 text-slate-400" />
              </span>
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-1.5 w-56 rounded-xl border border-slate-100 bg-white p-1.5 shadow-premium z-20"
                  >
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <p className="text-xs font-bold text-slate-800">{mockUserProfile.name}</p>
                      <p className="text-[10px] text-slate-400 font-light mt-0.5 truncate">{mockUserProfile.email}</p>
                    </div>
                    <Link
                      to="/dashboard/settings"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <UserIcon className="h-4 w-4 text-slate-400" />
                      My Profile
                    </Link>
                    <Link
                      to="/login"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors border-t border-slate-50 mt-1"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Link>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 border-r border-slate-100 bg-white shrink-0">
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-7">
            {/* Nav Links */}
            <div className="space-y-1">
              <span className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                Navigation
              </span>
              {navigation.map((item) => {
                const active = isActive(item.path);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      active
                        ? 'bg-teal-50 text-[#0F766E] shadow-soft'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`h-4.5 w-4.5 ${active ? 'text-[#0F766E]' : 'text-slate-400'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Mobile slide-out sidebar drawer */}
        <AnimatePresence>
          {isMobileOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileOpen(false)}
                className="fixed inset-0 bg-black z-50 md:hidden"
              />

              {/* Drawer Container */}
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 bottom-0 left-0 w-72 bg-white border-r border-slate-100 z-50 md:hidden flex flex-col p-6 shadow-premium"
              >
                <div className="flex items-center justify-between mb-8">
                  <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileOpen(false)}>
                    <img src="/green_asha_logo.png" alt="GreenASHA Logo" className="h-8 w-auto object-contain" />
                  </Link>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="p-2 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-6">
                  {navigation.map((item) => {
                    const active = isActive(item.path);
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsMobileOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                          active
                            ? 'bg-teal-50 text-[#0F766E]'
                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <Icon className="h-5 w-5 shrink-0" />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col justify-between min-h-[calc(100vh-4rem)]">
          {/* Animated Route Transition Wrapper */}
          <div className="flex-1">
            <Outlet />
          </div>

          {/* Footer */}
          <footer className="mt-16 border-t border-slate-100 pt-6 pb-2 text-center text-xs text-slate-400 font-light flex flex-col sm:flex-row sm:justify-between items-center gap-2">
            <span>
              &copy; {new Date().getFullYear()} GreenASHA Platform. All rights reserved.
            </span>
            <span className="flex items-center gap-3">
              <a href="#" className="hover:underline">Legal Node</a>
              <span>•</span>
              <a href="#" className="hover:underline">System: SLA 99.98%</a>
            </span>
          </footer>
        </main>
      </div>
    </div>
  );
};
