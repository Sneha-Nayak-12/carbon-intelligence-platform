import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import {
  TrendingDown,
  TrendingUp,
  Sparkles,
  Zap,
  Calendar,
  Layers,
  UploadCloud,
  FileCheck,
  RefreshCw,
  MapPin,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { mockMarketTrends } from '../services/mockData';

// Mock India Project locations
interface IndiaProject {
  id: string;
  name: string;
  state: string;
  methodology: string;
  capacity: string;
  rating: string;
  coords: { x: number; y: number }; // Percentage coords on our SVG box
  status: string;
}

const indiaProjects: IndiaProject[] = [
  {
    id: 'ind-001',
    name: 'Sundarbans Mangrove Blue Carbon',
    state: 'West Bengal',
    methodology: 'Mangrove Restoration',
    capacity: '75,000 tCO₂e/yr',
    rating: 'AA',
    coords: { x: 78, y: 53 },
    status: 'Verified & Active'
  },
  {
    id: 'ind-002',
    name: 'Western Ghats Agroforestry Sink',
    state: 'Karnataka',
    methodology: 'Soil Carbon',
    capacity: '32,000 tCO₂e/yr',
    rating: 'A',
    coords: { x: 38, y: 78 },
    status: 'Verified & Active'
  },
  {
    id: 'ind-003',
    name: 'Rajasthan Biomass Biochar Facility',
    state: 'Rajasthan',
    methodology: 'Biochar Sequestration',
    capacity: '18,500 tCO₂e/yr',
    rating: 'AAA',
    coords: { x: 26, y: 38 },
    status: 'Issuing Credits'
  },
  {
    id: 'ind-004',
    name: 'Himalayan Afforestation Project',
    state: 'Uttarakhand',
    methodology: 'Afforestation',
    capacity: '45,000 tCO₂e/yr',
    rating: 'AA',
    coords: { x: 42, y: 22 },
    status: 'Under Verification'
  }
];

// Recharts allocation data
const allocationData = [
  { name: 'Direct Air Capture', value: 1500, color: '#0F766E' },
  { name: 'Weathering', value: 3200, color: '#0D9488' },
  { name: 'Biochar', value: 2500, color: '#14B8A6' },
  { name: 'Mangroves', value: 4250, color: '#2D3748' },
  { name: 'Forestry', value: 4500, color: '#4A5568' }
];

export const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<IndiaProject>(indiaProjects[0]);

  // Toggle skeleton loading simulator
  const toggleLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Page Header */}
      <PageHeader
        title="Ecosystem Intelligence Overview"
        description="Consolidated monitoring, registry verification pipelines, carbon balance sheets, and ecological assets analytics."
        breadcrumbs={[]}
        action={
          <button
            onClick={toggleLoading}
            className="inline-flex h-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 shadow-soft hover:bg-slate-50 transition-all active:scale-95"
          >
            <RefreshCw className="mr-1.5 h-3.5 w-3.5 text-slate-400" />
            Simulate Load State
          </button>
        }
      />

      {/* Premium Hero Panel */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 md:p-8 shadow-soft relative overflow-hidden">
        {/* Background micro-art */}
        <div className="absolute right-0 top-0 h-48 w-48 bg-[#0F766E]/5 rounded-bl-full pointer-events-none" />

        <div className="grid gap-6 md:grid-cols-3 items-center">
          {/* Main Hero Context */}
          <div className="md:col-span-2 space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-[#0F766E]">
              <Sparkles className="h-3 w-3" />
              Corporate Compliance Workspace
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 font-heading">
              GreenASHA Platform
            </h2>
            <p className="text-sm text-slate-500 font-light leading-relaxed max-w-xl">
              Audit corporate carbon balance sheets, retire high-integrity credits securely, and connect with global decentralized verifier registries under standard compliance frameworks.
            </p>

            {/* Quick Actions Slot */}
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/marketplace"
                className="inline-flex items-center justify-center rounded-lg bg-[#0F766E] px-4 py-2 text-xs font-bold text-white shadow-soft transition-all hover:bg-[#0F766E]/95 active:scale-95"
              >
                Browse Marketplace
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
              <button
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-soft transition-all hover:bg-slate-50 active:scale-95"
                onClick={() => alert('Drag & drop utility files (CSV/JSON) to import Scope 1/2 emissions.')}
              >
                <UploadCloud className="mr-1.5 h-3.5 w-3.5 text-slate-400" />
                Upload Data
              </button>
              <Link
                to="/reports"
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-soft transition-all hover:bg-slate-50 active:scale-95"
              >
                <FileCheck className="mr-1.5 h-3.5 w-3.5 text-slate-400" />
                Generate Report
              </Link>
            </div>
          </div>

          {/* Platform Status Panel */}
          <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-5 space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">System Nodes</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-slate-400" /> Marketplace Status
                </span>
                <span className="font-semibold text-slate-800">Online • 2.4k Listings</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-slate-400" /> AI Agent Core
                </span>
                <span className="font-semibold text-[#0F766E]">Active (v4.2)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" /> Reporting Period
                </span>
                <span className="font-semibold text-slate-800">Q2 2026 (Sync)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            // Skeleton Loading States
            Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={`sk-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft space-y-4 animate-pulse"
              >
                <div className="flex justify-between items-center">
                  <div className="h-4 w-28 bg-slate-100 rounded"></div>
                  <div className="h-8 w-8 bg-slate-100 rounded-lg"></div>
                </div>
                <div className="h-8 w-24 bg-slate-200 rounded mt-2"></div>
                <div className="h-3 w-40 bg-slate-100 rounded mt-2"></div>
                <div className="h-10 w-full bg-slate-50 rounded-lg mt-3"></div>
              </motion.div>
            ))
          ) : (
            // Custom Visual KPI Cards
            <>
              {/* Card 1: Net Carbon Position */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft hover:shadow-premium transition-all hover:-translate-y-0.5 group"
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Net Carbon Position</span>
                  <div className="h-8 w-8 rounded-lg bg-teal-50 text-[#0F766E] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <TrendingDown className="h-4.5 w-4.5" />
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 font-heading">
                    -14,250 tCO₂e
                  </h3>
                  <span className="inline-flex items-center text-xs font-semibold text-emerald-600 mt-1">
                    -12.4% MoM reduction
                  </span>
                </div>
                {/* Horizontal targets bar */}
                <div className="mt-5 space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                    <span>Target Neutrality</span>
                    <span>100%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0F766E] rounded-full" style={{ width: '84%' }}></div>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Credits Held */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft hover:shadow-premium transition-all hover:-translate-y-0.5 group"
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Credits Held</span>
                  <div className="h-8 w-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Layers className="h-4.5 w-4.5" />
                  </div>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 font-heading">
                      7,850 tCO₂e
                    </h3>
                    <span className="inline-flex items-center text-xs font-semibold text-blue-600 mt-1">
                      +8.3% MoM increase
                    </span>
                  </div>
                  {/* Micro SVG Sparkline */}
                  <svg className="w-16 h-8 text-blue-500 shrink-0" viewBox="0 0 100 30" fill="none">
                    <path
                      d="M0 25 C 20 15, 40 28, 60 10 C 80 0, 90 8, 100 2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="mt-5 border-t border-slate-50 pt-3 text-[10px] text-slate-400 font-light">
                  Estimated value: <span className="font-semibold text-slate-600">$182,400 USD</span>
                </div>
              </motion.div>

              {/* Card 3: Credits Retired */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft hover:shadow-premium transition-all hover:-translate-y-0.5 group"
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Credits Retired</span>
                  <div className="h-8 w-8 rounded-lg bg-emerald-50 text-[#22C55E] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <ShieldCheck className="h-4.5 w-4.5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 font-heading">
                      12,450 tCO₂e
                    </h3>
                    <span className="text-xs text-slate-400 mt-1 block">
                      Compliance retirement target
                    </span>
                  </div>
                  {/* Circular visual progress representation */}
                  <div className="relative h-12 w-12 shrink-0">
                    <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="16" fill="none" stroke="#F1F5F9" strokeWidth="3" />
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke="#22C55E"
                        strokeWidth="3.2"
                        strokeDasharray="100"
                        strokeDashoffset="38"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-700">
                      62%
                    </span>
                  </div>
                </div>
                <div className="mt-5 border-t border-slate-50 pt-3 text-[10px] text-slate-400 font-light">
                  Locking date: <span className="font-semibold text-slate-600">June 2026</span>
                </div>
              </motion.div>

              {/* Card 4: Portfolio Value */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft hover:shadow-premium transition-all hover:-translate-y-0.5 group"
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Portfolio Value</span>
                  <div className="h-8 w-8 rounded-lg bg-teal-50 text-[#0F766E] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="font-bold text-xs">$</span>
                  </div>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 font-heading">
                      $548,200.00
                    </h3>
                    <span className="inline-flex items-center text-xs font-semibold text-emerald-600 mt-1">
                      +15.2% Q2 appreciation
                    </span>
                  </div>
                  {/* Micro SVG Sparkline */}
                  <svg className="w-16 h-8 text-[#0F766E] shrink-0" viewBox="0 0 100 30" fill="none">
                    <path
                      d="M0 25 C 20 20, 30 5, 55 12 C 75 0, 90 2, 100 1"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="mt-5 border-t border-slate-50 pt-3 text-[10px] text-slate-400 font-light">
                  Primary asset: <span className="font-semibold text-slate-600">Puro Carbon Removal</span>
                </div>
              </motion.div>

              {/* Card 5: Active Projects */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft hover:shadow-premium transition-all hover:-translate-y-0.5 group"
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Projects</span>
                  <div className="h-8 w-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <MapPin className="h-4.5 w-4.5" />
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 font-heading">
                    6 Managed
                  </h3>
                  <div className="flex gap-1.5 mt-2.5">
                    <span className="text-[9px] bg-slate-50 border border-slate-100 text-slate-500 px-2 py-0.5 rounded font-semibold">DAC</span>
                    <span className="text-[9px] bg-slate-50 border border-slate-100 text-slate-500 px-2 py-0.5 rounded font-semibold">Weathering</span>
                    <span className="text-[9px] bg-slate-50 border border-slate-100 text-slate-500 px-2 py-0.5 rounded font-semibold">Blue Carbon</span>
                  </div>
                </div>
              </motion.div>

              {/* Card 6: Carbon Reduction Target */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft hover:shadow-premium transition-all hover:-translate-y-0.5 group"
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Reduction Target</span>
                  <div className="h-8 w-8 rounded-lg bg-emerald-50 text-[#22C55E] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <CheckCircle2 className="h-4.5 w-4.5" />
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 font-heading">
                    82% Achieved
                  </h3>
                  <span className="text-xs text-slate-400 mt-1 block">
                    8.2k tCO₂e left to target limit
                  </span>
                </div>
                {/* Horizontal target bar */}
                <div className="mt-5 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '82%' }}></div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Main Insights Panel */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* AI Carbon Intelligence Insights Panel */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-emerald-50 text-[#0F766E] rounded-lg flex items-center justify-center">
                  <Sparkles className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">AI Carbon Intelligence</h3>
                  <p className="text-[10px] text-slate-400 font-light">Real-time ecological optimization feed</p>
                </div>
              </div>
              <span className="text-[10px] bg-slate-50 border border-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold">
                Auto-Refreshed
              </span>
            </div>

            {/* List of Insights */}
            <div className="space-y-4">
              {/* Insight 1 */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl border border-slate-50 hover:border-slate-100 hover:bg-slate-50/20 transition-all">
                <TrendingUp className="h-4.5 w-4.5 text-[#0F766E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Carbon Price Index Volatility</h4>
                  <p className="text-xs text-slate-500 font-light mt-0.5 leading-relaxed">
                    Puro.earth DAC and Biochar index prices ticked up <span className="font-semibold text-slate-700">4.2%</span> due to increased Q3 compliance pre-purchases. We recommend securing allocations now to lock in under-$115 thresholds.
                  </p>
                </div>
              </div>

              {/* Insight 2 */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl border border-slate-50 hover:border-slate-100 hover:bg-slate-50/20 transition-all">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Madagascar Registry Milestone</h4>
                  <p className="text-xs text-slate-500 font-light mt-0.5 leading-relaxed">
                    The Madagascar Mangrove restoration project completed its Verra carbon sequestration audit milestone. Pre-purchased credits are scheduled to issue to your wallet on <span className="font-semibold text-slate-700">July 28, 2026</span>.
                  </p>
                </div>
              </div>

              {/* Insight 3 */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl border border-slate-50 hover:border-slate-100 hover:bg-slate-50/20 transition-all">
                <AlertCircle className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Asset Exposure Recommendation</h4>
                  <p className="text-xs text-slate-500 font-light mt-0.5 leading-relaxed">
                    Acme holdings currently show a <span className="font-semibold text-slate-700">68% exposure</span> to nature-based avoidance offsets. Rebalancing towards permanent geological removal methods (like basaltic weathering) is advised to align with upcoming EU CSRD requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-50 pt-4 flex justify-between items-center text-xs">
            <span className="text-slate-400 font-light">Verification Node: SECURE-REG-100A</span>
            <button className="text-[#0F766E] font-bold hover:underline inline-flex items-center">
              Detailed Compliance Advisor <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Section 5: India Map Placeholder */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-heading mb-1">Geographic Registry</h3>
            <p className="text-xs text-slate-400 font-light mb-5">Subcontinent project nodes. Click markers to inspect.</p>

            {/* Styled India Map Area */}
            <div className="relative h-60 w-full bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex items-center justify-center">
              {/* Simulated Coordinate Grid */}
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-[0.03] pointer-events-none">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div key={i} className="border border-slate-900"></div>
                ))}
              </div>

              {/* Minimal SVG Outline representing India */}
              <svg className="w-5/6 h-5/6 text-slate-200" viewBox="0 0 100 100" fill="currentColor">
                <path d="M 45 10 Q 52 5 50 15 T 48 30 T 40 40 T 32 50 T 24 60 T 38 78 T 48 95 T 52 82 T 62 70 T 78 52 T 84 40 T 70 30 T 60 22 Z" />
              </svg>

              {/* Clickable Map Nodes */}
              {indiaProjects.map((proj) => {
                const active = selectedProject.id === proj.id;
                return (
                  <button
                    key={proj.id}
                    className="absolute"
                    style={{ left: `${proj.coords.x}%`, top: `${proj.coords.y}%` }}
                    onClick={() => setSelectedProject(proj)}
                  >
                    <span className="relative flex h-3 w-3">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${active ? 'bg-[#0F766E]' : 'bg-[#2563EB]'}`}></span>
                      <span className={`relative inline-flex rounded-full h-3 w-3 ${active ? 'bg-[#0F766E] scale-125' : 'bg-[#2563EB]'} transition-transform border border-white shadow-soft`}></span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Project Detail Box */}
            <div className="mt-4 p-3 bg-slate-50/50 rounded-lg border border-slate-100">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                Selected Location Node
              </span>
              <h4 className="text-xs font-bold text-slate-800 mt-1">{selectedProject.name}</h4>
              <p className="text-[10px] text-slate-500 font-light mt-0.5">
                {selectedProject.state} • {selectedProject.methodology}
              </p>
              
              <div className="mt-2.5 flex justify-between items-center text-[10px]">
                <span className="text-slate-400">Capacity: <span className="font-semibold text-slate-700">{selectedProject.capacity}</span></span>
                <span className="bg-teal-50 text-[#0F766E] font-bold px-1.5 py-0.5 rounded text-[9px]">
                  Rating {selectedProject.rating}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-slate-400" /> India Registry</span>
            <span className="font-semibold text-slate-500">{indiaProjects.length} Nodes online</span>
          </div>
        </div>
      </div>

      {/* Section 4: Analytics Chart Section (4 charts in grid) */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-heading">Market & Portfolio Analytics</h3>
          <p className="text-xs text-slate-400 font-light mt-0.5">Statistical projections aggregated across verified compliance registries.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Chart 1: Carbon Removal Trend */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
            <div>
              <h4 className="text-sm font-bold text-slate-900 font-heading">Carbon Removal Trend</h4>
              <p className="text-[10px] text-slate-400 font-light">Monthly volume of carbon removed or avoided (tonnes)</p>
            </div>
            
            <div className="h-60 w-full mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockMarketTrends} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F8FAFC" />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: '#FFFFFF',
                      border: '1px solid #F1F5F9',
                      borderRadius: '8px',
                      fontSize: '11px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="volumeTraded"
                    name="Removed Volume (k)"
                    stroke="#0F766E"
                    strokeWidth={2.2}
                    dot={{ r: 3, fill: '#FFFFFF', stroke: '#0F766E', strokeWidth: 1.5 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Credit Price Trend */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
            <div>
              <h4 className="text-sm font-bold text-slate-900 font-heading">Credit Price Index</h4>
              <p className="text-[10px] text-slate-400 font-light">Average cost per carbon credit index (USD)</p>
            </div>
            
            <div className="h-60 w-full mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockMarketTrends} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F8FAFC" />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: '#FFFFFF',
                      border: '1px solid #F1F5F9',
                      borderRadius: '8px',
                      fontSize: '11px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="averagePrice"
                    name="Price Index ($)"
                    stroke="#22C55E"
                    strokeWidth={2.2}
                    fillOpacity={1}
                    fill="url(#colorPrice)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 3: Portfolio Allocation */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
            <div>
              <h4 className="text-sm font-bold text-slate-900 font-heading">Portfolio Allocation</h4>
              <p className="text-[10px] text-slate-400 font-light">Asset distribution by ecological technology methodology</p>
            </div>
            
            <div className="h-60 w-full mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="h-full w-full sm:w-1/2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={allocationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {allocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend List */}
              <div className="w-full sm:w-1/2 space-y-2 text-xs">
                {allocationData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                      <span className="text-slate-500 font-light truncate max-w-[120px]">{item.name}</span>
                    </div>
                    <span className="font-bold text-slate-800">{((item.value / 15900) * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chart 4: Credits by Methodology */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
            <div>
              <h4 className="text-sm font-bold text-slate-900 font-heading">Credits by Methodology Class</h4>
              <p className="text-[10px] text-slate-400 font-light">Aggregate volume allocations (tCO₂e)</p>
            </div>
            
            <div className="h-60 w-full mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={allocationData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F8FAFC" />
                  <XAxis dataKey="name" stroke="#94A3B8" fontSize={9} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: '#FFFFFF',
                      border: '1px solid #F1F5F9',
                      borderRadius: '8px',
                      fontSize: '11px',
                    }}
                  />
                  <Bar dataKey="value" name="Credits Value" fill="#0F766E" radius={[4, 4, 0, 0]} maxBarSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
