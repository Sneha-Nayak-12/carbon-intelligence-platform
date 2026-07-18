import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Leaf,
  ShoppingBag,
  Sparkles,
  Coins,
  Shield,
  BarChart3,
  FileText,
  Globe,
  Plus,
  Minus,
  CheckCircle2,
  Lock,
  ArrowRight,
  Star,
  ChevronRight
} from 'lucide-react';
import { mockProjects } from '../services/mockData';

// Simple Count-up animation component
const AnimatedCounter: React.FC<{ value: number; suffix?: string; prefix?: string; duration?: number }> = ({
  value,
  suffix = '',
  prefix = '',
  duration = 1500
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMiliseconds = duration;
    const stepTime = 20; // 50 fps
    const numSteps = totalMiliseconds / stepTime;
    const increment = end / numSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <span className="font-display font-extrabold tracking-tight text-slate-900 text-3xl md:text-4xl">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

// FAQ Accordion helper component
const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 py-4 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-2 text-left text-sm font-semibold text-slate-800 focus:outline-none"
      >
        <span>{question}</span>
        {isOpen ? (
          <Minus className="h-4 w-4 text-[#0F766E]" />
        ) : (
          <Plus className="h-4 w-4 text-slate-400" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="mt-2 text-xs text-slate-500 font-light leading-relaxed pb-2">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

import { AnimatePresence } from 'framer-motion';

export const Landing: React.FC = () => {
  const [activeMapFilter, setActiveMapFilter] = useState<'All' | 'Biochar' | 'Afforestation' | 'DAC' | 'Weathering' | 'Renewable'>('All');
  
  // Custom India projects for landing page preview
  const mapProjects = [
    { id: 'm1', name: 'Rajasthan Biochar Facility', type: 'Biochar', color: '#14B8A6', coords: { x: 28, y: 38 }, capacity: '18k t/yr' },
    { id: 'm2', name: 'Western Ghats Afforestation', type: 'Afforestation', color: '#22C55E', coords: { x: 38, y: 78 }, capacity: '45k t/yr' },
    { id: 'm3', name: 'Mumbai Direct Air Capture', type: 'DAC', color: '#0F766E', coords: { x: 30, y: 64 }, capacity: '5k t/yr' },
    { id: 'm4', name: 'Basaltic Weathering Deccan', type: 'Weathering', color: '#6366F1', coords: { x: 42, y: 60 }, capacity: '12k t/yr' },
    { id: 'm5', name: 'Gujarat Wind Energy', type: 'Renewable', color: '#F59E0B', coords: { x: 20, y: 50 }, capacity: '100k t/yr' }
  ];

  const filteredMapProjects = activeMapFilter === 'All' 
    ? mapProjects 
    : mapProjects.filter(p => p.type === activeMapFilter);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col selection:bg-[#0F766E]/10 selection:text-[#0F766E]">
      
      {/* 1. Public Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-100 h-16 flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0F766E] text-white">
            <Leaf className="h-5 w-5" />
          </div>
          <span className="text-base font-bold text-slate-900 font-heading tracking-tight">
            Carbon Intelligence
          </span>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-500">
          <a href="#modules" className="hover:text-slate-900 transition-colors">Platform Modules</a>
          <a href="#workflow" className="hover:text-slate-900 transition-colors">How It Works</a>
          <a href="#marketplace" className="hover:text-slate-900 transition-colors">Marketplace</a>
          <a href="#intelligence" className="hover:text-slate-900 transition-colors">Intelligence Preview</a>
          <a href="#map" className="hover:text-slate-900 transition-colors">Project Directory</a>
          <a href="#faq" className="hover:text-slate-900 transition-colors">FAQ</a>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/login"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-[#0F766E] px-4 text-xs font-bold text-white shadow-soft transition-all hover:bg-[#0F766E]/95 active:scale-95"
          >
            Request Demo
          </Link>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative px-6 py-16 md:px-12 md:py-24 max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center overflow-hidden">
        {/* Left Headline & Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-[#0F766E]">
            <Sparkles className="h-3 w-3" />
            Empowering Enterprise ESG Node
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 font-heading leading-tight">
            Carbon Intelligence for a <span className="text-[#0F766E]">Net-Zero</span> Future
          </h1>
          <p className="text-sm md:text-base text-slate-500 font-light leading-relaxed max-w-lg">
            A unified platform to discover carbon projects, purchase verified carbon credits, monitor sustainability performance, and generate actionable carbon intelligence.
          </p>
          
          <div className="flex items-center gap-4 pt-2">
            <Link
              to="/login"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[#0F766E] px-6 text-xs font-bold text-white shadow-soft transition-all hover:bg-[#0F766E]/95 active:scale-95"
            >
              Explore Marketplace
            </Link>
            <Link
              to="/login"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-6 text-xs font-semibold text-slate-700 shadow-soft transition-all hover:bg-slate-50 active:scale-95"
            >
              Request Demo
            </Link>
          </div>
        </motion.div>

        {/* Right Dashboard Vector Representation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative h-96 w-full flex items-center justify-center"
        >
          {/* Animated floating dashboard elements */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            className="w-full h-full bg-white border border-slate-100 rounded-2xl shadow-premium p-5 space-y-4"
          >
            {/* Top Bar Representation */}
            <div className="flex justify-between items-center border-b border-slate-50 pb-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-400"></span>
                <span className="h-2 w-2 rounded-full bg-yellow-400"></span>
                <span className="h-2 w-2 rounded-full bg-green-400"></span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">sec_ledger_active.v4</span>
            </div>

            {/* Fake Charts */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-[8px] text-slate-400 uppercase tracking-wider block">Credits Held</span>
                <span className="text-sm font-bold text-slate-800 mt-1 block">7,850 t</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-[8px] text-slate-400 uppercase tracking-wider block">Net Offset</span>
                <span className="text-sm font-bold text-slate-800 mt-1 block">12.4k t</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-[8px] text-slate-400 uppercase tracking-wider block">Marketplace</span>
                <span className="text-sm font-bold text-emerald-600 mt-1 block">Online</span>
              </div>
            </div>

            {/* Simulated Line Chart drawing */}
            <div className="h-24 bg-slate-50 rounded-lg p-3 border border-slate-100 relative overflow-hidden flex items-end">
              <svg className="w-full h-12 text-[#0F766E] opacity-70" viewBox="0 0 100 30" fill="none">
                <path d="M0 25 C 20 20, 40 5, 60 18 C 80 8, 90 2, 100 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <span className="absolute left-3 top-2 text-[8px] font-bold text-slate-400">Carbon Abatement Trend</span>
            </div>

            {/* Floating micro indicators */}
            <motion.div
              animate={{ y: [0, 8, 0], x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 bg-teal-50 border border-[#0F766E]/15 rounded-xl p-3 shadow-soft flex items-center gap-2"
            >
              <div className="h-6 w-6 rounded bg-[#0F766E] text-white flex items-center justify-center">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </div>
              <div>
                <span className="text-[8px] text-[#0F766E] block font-bold">Verra Approved</span>
                <span className="text-[10px] text-slate-800 font-semibold block">Afforestation #2910</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0], x: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
              className="absolute -bottom-4 -left-4 bg-white border border-slate-100 rounded-xl p-3 shadow-soft flex items-center gap-2"
            >
              <span className="h-2 w-2 rounded-full bg-blue-500"></span>
              <span className="text-[10px] text-slate-700 font-semibold">DAC price index: $620/t</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. Platform Statistics Panel */}
      <section className="bg-white border-y border-slate-100 py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-8 text-center">
          <div className="flex flex-col">
            <AnimatedCounter value={240} suffix="+" />
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1.5">Verified Projects</span>
          </div>
          <div className="flex flex-col">
            <AnimatedCounter value={12} suffix="M" duration={1700} />
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1.5">Credits Listed</span>
          </div>
          <div className="flex flex-col">
            <AnimatedCounter value={480} suffix="k" />
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1.5">tCO₂e Removed</span>
          </div>
          <div className="flex flex-col">
            <AnimatedCounter value={850} suffix="+" />
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1.5">Organizations</span>
          </div>
          <div className="flex flex-col">
            <AnimatedCounter value={36} suffix="+" />
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1.5">Countries</span>
          </div>
          <div className="flex flex-col">
            <AnimatedCounter value={12} prefix="$" suffix="M+" />
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1.5">Transactions</span>
          </div>
        </div>
      </section>

      {/* 4. Platform Modules Showcase */}
      <section id="modules" className="px-6 py-20 md:px-12 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-heading">
            Ecosystem Core Capabilities
          </h2>
          <p className="text-xs text-slate-500 font-light leading-relaxed max-w-xl mx-auto">
            Standardizing the end-to-end carbon management cycle with premium, modular integrations.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1 */}
          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-soft hover:shadow-premium hover:border-[#0F766E]/20 transition-all group">
            <div className="h-9 w-9 rounded-lg bg-teal-50 text-[#0F766E] flex items-center justify-center mb-4">
              <ShoppingBag className="h-4.5 w-4.5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors font-heading">
              Carbon Marketplace
            </h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed mt-2">
              Browse and secure high-integrity carbon offsets directly from verified developers and project suppliers.
            </p>
            <Link to="/login" className="text-[10px] text-[#0F766E] font-bold mt-4 inline-flex items-center gap-1 hover:underline">
              Learn More <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-soft hover:shadow-premium hover:border-[#0F766E]/20 transition-all group">
            <div className="h-9 w-9 rounded-lg bg-teal-50 text-[#0F766E] flex items-center justify-center mb-4">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors font-heading">
              Carbon Intelligence
            </h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed mt-2">
              Analyze price index movements, market volatility, and capture compliance rebalancing suggestions.
            </p>
            <Link to="/login" className="text-[10px] text-[#0F766E] font-bold mt-4 inline-flex items-center gap-1 hover:underline">
              Learn More <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-soft hover:shadow-premium hover:border-[#0F766E]/20 transition-all group">
            <div className="h-9 w-9 rounded-lg bg-teal-50 text-[#0F766E] flex items-center justify-center mb-4">
              <Coins className="h-4.5 w-4.5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors font-heading">
              Buyer Portal
            </h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed mt-2">
              Manage offset acquisitions, hold credits in escrow, or execute signed retirements securely.
            </p>
            <Link to="/login" className="text-[10px] text-[#0F766E] font-bold mt-4 inline-flex items-center gap-1 hover:underline">
              Learn More <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-soft hover:shadow-premium hover:border-[#0F766E]/20 transition-all group">
            <div className="h-9 w-9 rounded-lg bg-teal-50 text-[#0F766E] flex items-center justify-center mb-4">
              <Leaf className="h-4.5 w-4.5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors font-heading">
              Seller Portal
            </h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed mt-2">
              Register conservation pipelines, monitor carbon storage yields, and manage public listings.
            </p>
            <Link to="/login" className="text-[10px] text-[#0F766E] font-bold mt-4 inline-flex items-center gap-1 hover:underline">
              Learn More <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Card 5 */}
          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-soft hover:shadow-premium hover:border-[#0F766E]/20 transition-all group">
            <div className="h-9 w-9 rounded-lg bg-teal-50 text-[#0F766E] flex items-center justify-center mb-4">
              <Shield className="h-4.5 w-4.5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors font-heading">
              Project Verification
            </h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed mt-2">
              Sync MRV audits through verification nodes to guarantee real ecological permanence.
            </p>
            <Link to="/login" className="text-[10px] text-[#0F766E] font-bold mt-4 inline-flex items-center gap-1 hover:underline">
              Learn More <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Card 6 */}
          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-soft hover:shadow-premium hover:border-[#0F766E]/20 transition-all group">
            <div className="h-9 w-9 rounded-lg bg-teal-50 text-[#0F766E] flex items-center justify-center mb-4">
              <BarChart3 className="h-4.5 w-4.5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors font-heading">
              Carbon Analytics
            </h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed mt-2">
              Model price-performance forecasts and audit methodology volumes using rich graphic layouts.
            </p>
            <Link to="/login" className="text-[10px] text-[#0F766E] font-bold mt-4 inline-flex items-center gap-1 hover:underline">
              Learn More <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Card 7 */}
          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-soft hover:shadow-premium hover:border-[#0F766E]/20 transition-all group">
            <div className="h-9 w-9 rounded-lg bg-teal-50 text-[#0F766E] flex items-center justify-center mb-4">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors font-heading">
              AI Insights
            </h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed mt-2">
              Receive smart prompts monitoring carbon balance exposure and optimizing compliance buying strategies.
            </p>
            <Link to="/login" className="text-[10px] text-[#0F766E] font-bold mt-4 inline-flex items-center gap-1 hover:underline">
              Learn More <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Card 8 */}
          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-soft hover:shadow-premium hover:border-[#0F766E]/20 transition-all group">
            <div className="h-9 w-9 rounded-lg bg-teal-50 text-[#0F766E] flex items-center justify-center mb-4">
              <FileText className="h-4.5 w-4.5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors font-heading">
              Reports & ESG
            </h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed mt-2">
              Download audited compliance receipts, ledger transactions, and signed certificates for disclosures.
            </p>
            <Link to="/login" className="text-[10px] text-[#0F766E] font-bold mt-4 inline-flex items-center gap-1 hover:underline">
              Learn More <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. How It Works - Horizontal Workflow */}
      <section id="workflow" className="bg-white border-y border-slate-100 py-20 px-6 md:px-12 overflow-x-auto">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-heading">
              How the Ecosystem Works
            </h2>
            <p className="text-xs text-slate-500 font-light max-w-xl mx-auto">
              Follow the life-cycle of a verified carbon credit from registration through to permanent retirement.
            </p>
          </div>

          {/* Horizontal Flow Container */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 min-w-[900px] py-4">
            {[
              { num: '01', title: 'Seller Registers', desc: 'Project files submitted' },
              { num: '02', title: 'MRV Audit', desc: 'Verifier verification checks' },
              { num: '03', title: 'Credit Issuance', desc: 'Tokens minted in wallet' },
              { num: '04', title: 'Market Listing', desc: 'Placed in pricing catalog' },
              { num: '05', title: 'Buyer Purchase', desc: 'Fund exchange & settlement' },
              { num: '06', title: 'Portfolio Management', desc: 'Holding index allocation' },
              { num: '07', title: 'Credit Retirement', desc: 'Permanent registry locking' }
            ].map((step, idx) => (
              <React.Fragment key={step.num}>
                {/* Node */}
                <div className="flex-1 bg-[#F8FAFC] border border-slate-100 rounded-xl p-5 relative flex flex-col justify-between items-start min-h-[120px] max-w-[160px]">
                  <span className="text-xs font-bold text-[#0F766E]">{step.num}</span>
                  <div className="mt-3">
                    <h4 className="text-xs font-bold text-slate-800 font-heading leading-tight">{step.title}</h4>
                    <p className="text-[10px] text-slate-400 font-light mt-1">{step.desc}</p>
                  </div>
                </div>
                {/* Arrow */}
                {idx < 6 && (
                  <div className="hidden md:block shrink-0">
                    <ArrowRight className="h-4 w-4 text-slate-300" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Marketplace Preview Section */}
      <section id="marketplace" className="px-6 py-20 md:px-12 max-w-7xl mx-auto w-full space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-heading">
              Marketplace Live Listings
            </h2>
            <p className="text-xs text-slate-500 font-light max-w-xl">
              Inspect active carbon credits available for acquisition. Fully audited under strict compliance protocols.
            </p>
          </div>
          <Link
            to="/login"
            className="inline-flex h-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Access Live Market &rarr;
          </Link>
        </div>

        {/* Loop through first 3 mock projects */}
        <div className="grid gap-6 md:grid-cols-3">
          {mockProjects.slice(0, 3).map((proj) => (
            <div
              key={proj.id}
              className="bg-white border border-slate-100 rounded-2xl p-6 shadow-soft hover:shadow-premium transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[9px] bg-slate-50 border border-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    {proj.methodology}
                  </span>
                  <span className="inline-flex items-center text-[10px] text-emerald-600 font-bold gap-0.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {proj.standard}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 font-heading mb-1">{proj.name}</h3>
                <p className="text-[10px] text-slate-400 font-light flex items-center">
                  <Globe className="mr-1 h-3 w-3" /> {proj.country}
                </p>

                <p className="text-xs text-slate-500 font-light leading-relaxed mt-3.5 line-clamp-3">
                  {proj.description}
                </p>
              </div>

              <div className="mt-6 border-t border-slate-50 pt-4 flex items-center justify-between">
                <div>
                  <span className="text-[8px] text-slate-400 uppercase font-semibold tracking-wider block">Price per t</span>
                  <span className="text-lg font-extrabold text-slate-900">${proj.pricePerCredit.toFixed(2)}</span>
                </div>
                <div className="text-right">
                  <span className="text-[8px] text-slate-400 uppercase font-semibold tracking-wider block">Available</span>
                  <span className="text-xs font-bold text-slate-700">{proj.availableCredits.toLocaleString()} t</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Carbon Intelligence Preview Grid */}
      <section id="intelligence" className="bg-white border-y border-slate-100 py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-heading">
              Carbon Intelligence Preview
            </h2>
            <p className="text-xs text-slate-500 font-light max-w-xl mx-auto">
              Inspect how the system aggregates compliance trends, models forecasts, and compiles AI executive summaries.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Widget 1: Carbon Trends */}
            <div className="rounded-xl border border-slate-100 bg-[#F8FAFC] p-5 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-800">Carbon Abatement</span>
                <span className="text-[10px] text-emerald-600 font-semibold">-12.4%</span>
              </div>
              <div className="h-32 flex items-end justify-between gap-1 pt-3">
                {[45, 60, 48, 70, 85, 99].map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                    <div className="w-full bg-[#0F766E] rounded-t" style={{ height: `${val}px` }}></div>
                    <span className="text-[8px] text-slate-400 font-mono">M{i+1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget 2: Market Intelligence */}
            <div className="rounded-xl border border-slate-100 bg-[#F8FAFC] p-5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-slate-800">Market Intelligence</span>
                  <span className="text-[9px] bg-teal-50 text-[#0F766E] px-1.5 py-0.5 rounded font-bold">Puro.earth</span>
                </div>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  Price indices for basaltic rock weathering have stabilized at <span className="font-semibold text-slate-800">$340/tCO₂e</span>, driven by high long-term storage demand.
                </p>
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-light pt-4 border-t border-slate-100">
                <span>Avg. permanence: 1000 yrs</span>
                <span className="font-semibold text-slate-600">Secure Audit</span>
              </div>
            </div>

            {/* Widget 3: AI Executive Summary */}
            <div className="rounded-xl border border-[#0F766E]/15 bg-teal-50/10 p-5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-[#0F766E]">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs font-bold font-heading">AI Executive Summary</span>
                </div>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  "Based on Q2 acquisition logs, Acme has successfully offset 84% of Scope 1/2 liabilities. Recommend purchasing 2,500 biochar credits to cover remaining Q3 exposures before index hikes."
                </p>
              </div>
              <span className="text-[9px] text-[#0F766E] font-bold block mt-3">Node: Advisory-Core-01</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Interactive India Map Preview */}
      <section id="map" className="px-6 py-20 md:px-12 max-w-7xl mx-auto w-full grid md:grid-cols-3 gap-8 items-center">
        {/* Left Side Info */}
        <div className="space-y-5">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-heading">
            Live Project Location Registry
          </h2>
          <p className="text-xs text-slate-500 font-light leading-relaxed">
            The platform connects directly to registered carbon projects across the subcontinent, tracking verifications, capacity yields, and local ratings.
          </p>

          {/* Interactive filter keys */}
          <div className="flex flex-wrap gap-2 pt-2">
            {(['All', 'Biochar', 'Afforestation', 'DAC', 'Weathering', 'Renewable'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveMapFilter(filter)}
                className={`px-3 py-1 rounded-lg border text-[10px] font-semibold transition-all ${
                  activeMapFilter === filter
                    ? 'bg-[#0F766E] border-[#0F766E] text-white shadow-soft'
                    : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="rounded-lg bg-slate-50 p-4 border border-slate-100">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Registry Status</span>
            <span className="text-sm font-semibold text-slate-800 mt-1 block">5 Active Indian Nodes</span>
            <span className="text-xs text-slate-400 font-light block mt-0.5">Aggregate yield capacity: 200k tCO₂e/yr</span>
          </div>
        </div>

        {/* Right Side Map Display */}
        <div className="md:col-span-2 rounded-2xl border border-slate-100 bg-white p-6 shadow-soft relative h-[380px] flex items-center justify-center overflow-hidden">
          {/* Map Grid overlay */}
          <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-[0.02] pointer-events-none">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="border border-slate-900"></div>
            ))}
          </div>

          {/* Map Image SVG */}
          <svg className="w-5/6 h-5/6 text-slate-100" viewBox="0 0 100 100" fill="currentColor">
            <path d="M 45 10 Q 52 5 50 15 T 48 30 T 40 40 T 32 50 T 24 60 T 38 78 T 48 95 T 52 82 T 62 70 T 78 52 T 84 40 T 70 30 T 60 22 Z" />
          </svg>

          {/* Plotted Markers */}
          {filteredMapProjects.map((p) => (
            <div
              key={p.id}
              className="absolute group cursor-pointer"
              style={{ left: `${p.coords.x}%`, top: `${p.coords.y}%` }}
            >
              {/* Ripple */}
              <span className="relative flex h-3.5 w-3.5">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: p.color }}
                ></span>
                <span
                  className="relative inline-flex rounded-full h-3.5 w-3.5 border border-white shadow-soft"
                  style={{ backgroundColor: p.color }}
                ></span>
              </span>

              {/* Tooltip on hover */}
              <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all origin-bottom bg-slate-900 text-white rounded-lg p-2.5 shadow-premium text-[10px] min-w-[150px] z-20">
                <p className="font-bold">{p.name}</p>
                <p className="text-[8px] text-slate-300 font-light mt-0.5">{p.type} • Capacity: {p.capacity}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Why Choose Our Platform */}
      <section className="bg-white border-y border-slate-100 py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-heading">
              Why Choose Our Platform
            </h2>
            <p className="text-xs text-slate-500 font-light max-w-xl mx-auto">
              Engineered to meet the compliance audits and capacity demands of modern enterprise companies.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <div className="border border-slate-100 rounded-xl p-6 hover:shadow-premium hover:border-[#0F766E]/20 transition-all space-y-3">
              <div className="h-8 w-8 rounded-lg bg-teal-50 text-[#0F766E] flex items-center justify-center">
                <CheckCircle2 className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-sm font-bold text-slate-800 font-heading">Absolute Transparency</h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Review complete carbon credit lifecycles, transaction registries, and signed verifier certificates in our decentralized compliance database.
              </p>
            </div>

            {/* Card 2 */}
            <div className="border border-slate-100 rounded-xl p-6 hover:shadow-premium hover:border-[#0F766E]/20 transition-all space-y-3">
              <div className="h-8 w-8 rounded-lg bg-teal-50 text-[#0F766E] flex items-center justify-center">
                <Lock className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-sm font-bold text-slate-800 font-heading">Enterprise Security</h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Granular organizational permissions, strict KYC/AML verification procedures, and secure ledger locking prevent double-claiming risks.
              </p>
            </div>

            {/* Card 3 */}
            <div className="border border-slate-100 rounded-xl p-6 hover:shadow-premium hover:border-[#0F766E]/20 transition-all space-y-3">
              <div className="h-8 w-8 rounded-lg bg-teal-50 text-[#0F766E] flex items-center justify-center">
                <Sparkles className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-sm font-bold text-slate-800 font-heading">AI Actionable Insights</h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Receive suggestions, audit warnings, and pricing rebalancing tips based on Scope 1/2 liability inputs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Trusted By */}
      <section className="py-16 px-6 md:px-12 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto space-y-8">
          <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Connected Registry Networks & Partners
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center opacity-40 grayscale hover:grayscale-0 hover:opacity-75 transition-all duration-300">
            <span className="font-heading font-black text-slate-700 tracking-wider text-sm md:text-base">VERRA REGISTRY</span>
            <span className="font-heading font-black text-slate-700 tracking-wider text-sm md:text-base">GOLD STANDARD</span>
            <span className="font-heading font-black text-slate-700 tracking-wider text-sm md:text-base">PURO.EARTH</span>
            <span className="font-heading font-black text-slate-700 tracking-wider text-sm md:text-base">CLIMATE ACTION NODE</span>
          </div>
        </div>
      </section>

      {/* 11. Testimonials Section */}
      <section className="px-6 py-20 md:px-12 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-heading">
            Trusted by Sustainability Leaders
          </h2>
          <p className="text-xs text-slate-500 font-light max-w-xl mx-auto">
            See how corporate ESG leads use our platform to execute offset disclosures.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-soft space-y-4">
            <div className="flex gap-1 text-[#F59E0B]">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
            </div>
            <p className="text-xs text-slate-500 font-light leading-relaxed italic">
              "The level of verification and permanence tracing available on this platform is unmatched. We migrated our entire direct air capture procurement pipeline and verified our Q1 audit within days."
            </p>
            <div className="border-t border-slate-50 pt-3">
              <h4 className="text-xs font-bold text-slate-800">Marcus Vance</h4>
              <p className="text-[10px] text-slate-400 font-light">Director of ESG, Vance Industries</p>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-soft space-y-4">
            <div className="flex gap-1 text-[#F59E0B]">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
            </div>
            <p className="text-xs text-slate-500 font-light leading-relaxed italic">
              "The AI rebalancing suggestions prevented us from over-allocating into questionable soil offsets. The Puro.earth weathered rock integrations give us genuine audit trail compliance."
            </p>
            <div className="border-t border-slate-50 pt-3">
              <h4 className="text-xs font-bold text-slate-800">Elena Rostova</h4>
              <p className="text-[10px] text-slate-400 font-light">Sustainability Lead, Apex Logistics</p>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-soft space-y-4">
            <div className="flex gap-1 text-[#F59E0B]">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
            </div>
            <p className="text-xs text-slate-500 font-light leading-relaxed italic">
              "We registered our Scotland basalt weathering projects within hours. The automated issuance verification via Puro.earth APIs saved us months of auditing delays."
            </p>
            <div className="border-t border-slate-50 pt-3">
              <h4 className="text-xs font-bold text-slate-800">Dr. Hamish McLeod</h4>
              <p className="text-[10px] text-slate-400 font-light">Co-Founder, LithoOffset Labs</p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FAQ Section */}
      <section id="faq" className="bg-white border-y border-slate-100 py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3 mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-heading">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-500 font-light">
              Everything you need to know about our verifier integrations, pricing models, and compliance syncs.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            <FAQItem
              question="What is the difference between avoidance and carbon removal credits?"
              answer="Avoidance credits prevent new emissions from entering the atmosphere (e.g. protecting existing forest cover). Removal credits permanently capture and store existing carbon dioxide from the atmosphere (e.g. basaltic weathering or direct air capture), which guarantees high permanence scores."
            />
            <FAQItem
              question="How are project listings verified on the platform?"
              answer="All projects must sync through independent, certified registry nodes (Verra, Gold Standard, Puro.earth). Local verifiers upload MRV reports, and only after validation is completed are the credits issued into the developer's wallet."
            />
            <FAQItem
              question="Is double-counting of retired carbon credits prevented?"
              answer="Yes. Retired carbon credits are cryptographically locked on their respective public registries in real-time. Once locked, they cannot be resold, moved, or re-claimed."
            />
            <FAQItem
              question="Can we generate compliance disclosure reports directly?"
              answer="Yes. The reports panel compiles official ESG, CSRD, and SEC climate disclosure ledger receipts. These contain the registry transaction identifiers and verification node signatures."
            />
          </div>
        </div>
      </section>

      {/* 13. Public Footer */}
      <footer className="bg-slate-950 text-slate-400 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-8 border-b border-slate-800 pb-12">
          {/* Logo Brand */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Leaf className="h-6 w-6 text-[#0F766E]" />
              <span className="text-lg font-bold font-heading tracking-tight">Carbon Intelligence</span>
            </div>
            <p className="text-xs text-slate-500 font-light leading-relaxed max-w-xs">
              Unified platform to discover carbon projects, purchase verified carbon credits, monitor sustainability performance, and generate actionable carbon intelligence.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-light">
              <li><Link to="/login" className="hover:text-white transition-colors">Portals</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Analytics</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Reports</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Integrations</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Marketplace</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-light">
              <li><Link to="/login" className="hover:text-white transition-colors">Browse Projects</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Puro Index</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Escrows</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Developers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-light">
              <li><a href="#" className="hover:text-white transition-colors">ESG Library</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Methodologies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-light">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Settings</a></li>
              <li><a href="#" className="hover:text-white transition-colors">SLA Status</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row sm:justify-between items-center text-xs text-slate-600 gap-4">
          <span>&copy; {new Date().getFullYear()} Carbon Intelligence Platform. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-400 transition-colors">Twitter</a>
            <a href="#" className="hover:text-slate-400 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-slate-400 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>

    </div>
  );
};
