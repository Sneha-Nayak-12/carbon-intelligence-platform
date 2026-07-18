import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Bookmark,
  Layers,
  CheckCircle2,
  Globe,
  TrendingUp,
  MapPin,
  Building,
  DollarSign,
  Plus,
  Coins,
  Eye,
  Check,
  Sparkles
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { mockProjects, mockTransactions, CarbonProject, Transaction } from '../services/mockData';

export const Marketplace: React.FC = () => {
  // Global listing states (initialized from mocks, supports additions from seller portal)
  const [listings, setListings] = useState<CarbonProject[]>(mockProjects);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  
  // Tab states: 'buy' for Buyer Order Book, 'sell' for Seller Developer Portal
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');

  // Wishlist & Compare states
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Buyer Filtering states
  const [search, setSearch] = useState('');
  const [methodologyFilter, setMethodologyFilter] = useState('All');
  const [registryFilter, setRegistryFilter] = useState('All');
  const [ratingFilter, setRatingFilter] = useState('All');
  const [sortBy, setSortBy] = useState('price_asc');
  const [selectedMapProject, setSelectedMapProject] = useState<string | null>(null);

  // Purchase modal states
  const [buyProject, setBuyProject] = useState<CarbonProject | null>(null);
  const [buyQty, setBuyQty] = useState<number>(100);
  const [isRetireImmediately, setIsRetireImmediately] = useState(false);
  const [beneficiary, setBeneficiary] = useState('');
  const [retirementReason, setRetirementReason] = useState('');
  const [purchaseStep, setPurchaseStep] = useState<'input' | 'success'>('input');
  const [generatedCert, setGeneratedCert] = useState<{ serialNumber: string; hash: string } | null>(null);

  // Seller Portal: Add Batch form states
  const [newBatchName, setNewBatchName] = useState('');
  const newBatchDeveloper = 'Acme Ecological Labs';
  const [newBatchMethodology, setNewBatchMethodology] = useState<'Afforestation' | 'Direct Air Capture' | 'Enhanced Rock Weathering' | 'Biochar' | 'Mangrove Restoration' | 'Soil Carbon'>('Biochar');
  const [newBatchRegistry, setNewBatchRegistry] = useState<'Verra' | 'Gold Standard' | 'Puro.earth' | 'Climate Action Reserve'>('Puro.earth');
  const newBatchCountry = 'India';
  const newBatchRegion = 'Maharashtra';
  const [newBatchPrice, setNewBatchPrice] = useState<number>(115.00);
  const [newBatchQty, setNewBatchQty] = useState<number>(15000);
  const [newBatchVintage, setNewBatchVintage] = useState<number>(2025);
  const newBatchRating = 'AAA';
  const [newBatchDescription, setNewBatchDescription] = useState('');
  const [newBatchCapacity, setNewBatchCapacity] = useState<number>(25000);

  // India map locations specifically for the Marketplace Page
  const mapLocations = [
    { id: 'proj-001', coords: { x: 78, y: 53 }, color: '#4A5568' }, // Andean Cloud (represented differently)
    { id: 'proj-002', coords: { x: 42, y: 60 }, color: '#0D9488' }, // Basaltic Weathering (UK represented locally)
    { id: 'proj-003', coords: { x: 26, y: 38 }, color: '#0F766E' }, // Nordic DACS (represented locally)
    { id: 'proj-004', coords: { x: 38, y: 78 }, color: '#22C55E' }, // Madagascar
    { id: 'proj-005', coords: { x: 30, y: 64 }, color: '#14B8A6' }, // Sub-Saharan
    { id: 'proj-006', coords: { x: 35, y: 44 }, color: '#2563EB' }  // Great Plains
  ];

  // Toggle wishlist
  const toggleWishlist = (id: string) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Toggle compare
  const toggleCompare = (id: string) => {
    setCompareList(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 carbon projects side-by-side.');
        return prev;
      }
      return [...prev, id];
    });
  };

  // Handle purchase processing
  const handleConfirmPurchase = () => {
    if (!buyProject) return;
    if (buyQty < (buyProject.availableCredits < 50 ? buyProject.availableCredits : 50)) {
      alert('Purchase quantity is lower than the minimum limit.');
      return;
    }
    if (buyQty > buyProject.availableCredits) {
      alert('Requested quantity exceeds available credits.');
      return;
    }

    // Process: subtract credits
    setListings(prev => 
      prev.map(p => p.id === buyProject.id 
        ? { ...p, availableCredits: p.availableCredits - buyQty } 
        : p
      )
    );

    // Create a transaction record
    const newTx: Transaction = {
      id: `tx-${Math.floor(10000 + Math.random() * 90000)}`,
      projectId: buyProject.id,
      projectName: buyProject.name,
      type: isRetireImmediately ? 'retire' : 'buy',
      credits: buyQty,
      pricePerCredit: buyProject.pricePerCredit,
      totalValue: buyQty * buyProject.pricePerCredit,
      status: 'completed',
      date: new Date().toISOString().split('T')[0],
      counterparty: buyProject.developer,
      certificateUrl: '/certificates/compliance-receipt.pdf'
    };

    setTransactions(prev => [newTx, ...prev]);

    // Generate simulated serial key
    const serial = `CIP-${buyProject.standard.substring(0, 3).toUpperCase()}-${Math.floor(1000000 + Math.random() * 9000000)}-2026`;
    const hash = '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setGeneratedCert({ serialNumber: serial, hash });

    setPurchaseStep('success');
  };

  // Handle seller register batch
  const handleRegisterBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBatchName || !newBatchDescription) {
      alert('Please fill out the Project Name and Description.');
      return;
    }

    const newProject: CarbonProject = {
      id: `proj-${Math.floor(100 + Math.random() * 900)}`,
      name: newBatchName,
      developer: newBatchDeveloper,
      methodology: newBatchMethodology,
      standard: newBatchRegistry,
      country: newBatchCountry,
      region: newBatchRegion,
      pricePerCredit: newBatchPrice,
      availableCredits: newBatchQty,
      vintage: newBatchVintage,
      rating: newBatchRating,
      description: newBatchDescription,
      co2AvoidedOrRemoved: newBatchCapacity,
      status: 'active',
      sdgs: [13, 15]
    };

    setListings(prev => [newProject, ...prev]);
    alert('Carbon credit batch registered and placed on live marketplace order book.');
    
    // Clear form
    setNewBatchName('');
    setNewBatchDescription('');
    setActiveTab('buy');
  };

  // Delete/Pause listing toggle (Seller Portal helper)
  const handleToggleListingStatus = (id: string) => {
    setListings(prev => 
      prev.map(p => p.id === id 
        ? { ...p, status: p.status === 'active' ? 'fully_funded' : 'active' }
        : p
      )
    );
  };

  // Filter listings
  const filteredListings = listings.filter(proj => {
    const matchesSearch = proj.name.toLowerCase().includes(search.toLowerCase()) || 
                          proj.developer.toLowerCase().includes(search.toLowerCase());
    const matchesMethodology = methodologyFilter === 'All' || proj.methodology === methodologyFilter;
    const matchesRegistry = registryFilter === 'All' || proj.standard === registryFilter;
    const matchesRating = ratingFilter === 'All' || proj.rating === ratingFilter;
    const matchesMap = !selectedMapProject || proj.id === selectedMapProject;
    return matchesSearch && matchesMethodology && matchesRegistry && matchesRating && matchesMap;
  }).sort((a, b) => {
    if (sortBy === 'price_asc') return a.pricePerCredit - b.pricePerCredit;
    if (sortBy === 'price_desc') return b.pricePerCredit - a.pricePerCredit;
    if (sortBy === 'credits_desc') return b.availableCredits - a.availableCredits;
    return 0;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <PageHeader
        title="Institutional Carbon Order Book"
        description="Unified B2B trading registry linking carbon offset developers with corporate compliance buyers."
        breadcrumbs={[{ label: 'Marketplace' }]}
        action={
          <div className="flex rounded-lg border border-slate-200 bg-white p-0.5 shadow-soft shrink-0">
            <button
              onClick={() => setActiveTab('buy')}
              className={`flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'buy'
                  ? 'bg-[#0F766E] text-white shadow-soft'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Coins className="h-3.5 w-3.5" />
              Buy Credits
            </button>
            <button
              onClick={() => setActiveTab('sell')}
              className={`flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'sell'
                  ? 'bg-[#0F766E] text-white shadow-soft'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Building className="h-3.5 w-3.5" />
              Sell Credits (Developer)
            </button>
          </div>
        }
      />

      {/* Global Analytics Banner */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 bg-white border border-slate-100 p-4 rounded-xl shadow-soft">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-teal-50 text-[#0F766E] flex items-center justify-center">
            <TrendingUp className="h-4.5 w-4.5" />
          </div>
          <div>
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block">Pool Liquidity</span>
            <span className="text-sm font-bold text-slate-900">$5,420,800.00</span>
          </div>
        </div>

        <div className="flex items-center gap-3 border-l border-slate-100 pl-4">
          <div className="h-9 w-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <DollarSign className="h-4.5 w-4.5" />
          </div>
          <div>
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block">Average Credit Price</span>
            <span className="text-sm font-bold text-slate-900">$189.50 / tCO₂e</span>
          </div>
        </div>

        <div className="flex items-center gap-3 border-l border-slate-100 pl-4">
          <div className="h-9 w-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="h-4.5 w-4.5" />
          </div>
          <div>
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block">Verifier Nodes Synced</span>
            <span className="text-sm font-bold text-emerald-600">Verra / Puro.earth Sync</span>
          </div>
        </div>

        <div className="flex items-center gap-3 border-l border-slate-100 pl-4">
          <div className="h-9 w-9 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
            <Layers className="h-4.5 w-4.5" />
          </div>
          <div>
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block">Active Batches Listed</span>
            <span className="text-sm font-bold text-slate-900">{listings.length} Batches</span>
          </div>
        </div>
      </div>

      {activeTab === 'buy' ? (
        // ---------------- BUYER WORKSPACE ----------------
        <div className="space-y-6">
          
          {/* Filters & Map section */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Advanced Filters Panel */}
            <div className="bg-white border border-slate-100 p-5 rounded-xl shadow-soft space-y-4">
              <div className="flex items-center gap-1.5 border-b border-slate-50 pb-2">
                <Filter className="h-4 w-4 text-[#0F766E]" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Advanced Filters</h3>
              </div>

              {/* Search */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Search Keywords</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search project name..."
                    className="w-full h-8 rounded bg-slate-50 border border-slate-200 pl-8 pr-3 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
                  />
                </div>
              </div>

              {/* Methodology */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Methodology</label>
                <select
                  value={methodologyFilter}
                  onChange={(e) => setMethodologyFilter(e.target.value)}
                  className="w-full h-8 rounded bg-slate-50 border border-slate-200 px-2 text-xs focus:bg-white focus:outline-none"
                >
                  <option value="All">All Methodologies</option>
                  <option value="Afforestation">Afforestation</option>
                  <option value="Direct Air Capture">Direct Air Capture</option>
                  <option value="Enhanced Rock Weathering">Enhanced Weathering</option>
                  <option value="Biochar">Biochar</option>
                  <option value="Mangrove Restoration">Mangrove Restoration</option>
                  <option value="Soil Carbon">Soil Carbon</option>
                </select>
              </div>

              {/* Registry Standard */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Registry Standard</label>
                <select
                  value={registryFilter}
                  onChange={(e) => setRegistryFilter(e.target.value)}
                  className="w-full h-8 rounded bg-slate-50 border border-slate-200 px-2 text-xs focus:bg-white focus:outline-none"
                >
                  <option value="All">All Registries</option>
                  <option value="Verra">Verra</option>
                  <option value="Gold Standard">Gold Standard</option>
                  <option value="Puro.earth">Puro.earth</option>
                  <option value="Climate Action Reserve">Climate Action Reserve</option>
                </select>
              </div>

              {/* Risk Rating */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Risk Rating</label>
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                  className="w-full h-8 rounded bg-slate-50 border border-slate-200 px-2 text-xs focus:bg-white focus:outline-none"
                >
                  <option value="All">All Ratings</option>
                  <option value="AAA">AAA (Extremely Safe)</option>
                  <option value="AA">AA (Very High Permanence)</option>
                  <option value="A">A (Verified Sequestration)</option>
                  <option value="BBB">BBB (Standard Offset)</option>
                </select>
              </div>

              {/* Sorting */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Sort order</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full h-8 rounded bg-slate-50 border border-slate-200 px-2 text-xs focus:bg-white focus:outline-none"
                >
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="credits_desc">Available Volume: High to Low</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setSearch('');
                  setMethodologyFilter('All');
                  setRegistryFilter('All');
                  setRatingFilter('All');
                  setSelectedMapProject(null);
                }}
                className="w-full text-center text-[10px] font-semibold text-[#0F766E] hover:underline pt-2 block"
              >
                Clear all filters
              </button>
            </div>

            {/* India Map Coordinates Selector */}
            <div className="bg-white border border-slate-100 p-5 rounded-xl shadow-soft lg:col-span-2 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-[#0F766E]" />
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">India Registry Nodes Map</h3>
                </div>
                {selectedMapProject && (
                  <button
                    onClick={() => setSelectedMapProject(null)}
                    className="text-[9px] bg-red-50 text-red-700 px-1.5 py-0.5 rounded font-bold"
                  >
                    Clear Map Pin Selection
                  </button>
                )}
              </div>

              {/* Map SVG */}
              <div className="relative h-48 w-full bg-slate-50 border border-slate-100 rounded-lg overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-[0.02] pointer-events-none" />
                <svg className="w-40 h-40 text-slate-200" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M 45 10 Q 52 5 50 15 T 48 30 T 40 40 T 32 50 T 24 60 T 38 78 T 48 95 T 52 82 T 62 70 T 78 52 T 84 40 T 70 30 T 60 22 Z" />
                </svg>

                {mapLocations.map((loc) => {
                  const active = selectedMapProject === loc.id;
                  const item = listings.find(p => p.id === loc.id);
                  if (!item) return null;
                  return (
                    <button
                      key={loc.id}
                      className="absolute"
                      style={{ left: `${loc.coords.x}%`, top: `${loc.coords.y}%` }}
                      onClick={() => setSelectedMapProject(loc.id)}
                    >
                      <span className="relative flex h-3 w-3">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75`} style={{ backgroundColor: loc.color }}></span>
                        <span className={`relative inline-flex rounded-full h-3 w-3 ${active ? 'scale-125 ring-2 ring-white' : ''}`} style={{ backgroundColor: loc.color }}></span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="text-[10px] text-slate-400 font-light flex items-center justify-between">
                <span>Filter listings by clicking coordinates on the map.</span>
                <span className="font-semibold text-slate-600">{mapLocations.length} registry mappings</span>
              </div>
            </div>
          </div>

          {/* Featured & AI recommendation banner */}
          <div className="bg-teal-50/20 border border-[#0F766E]/15 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex gap-2.5 items-start">
              <div className="h-8 w-8 bg-[#0F766E]/10 text-[#0F766E] rounded-lg flex items-center justify-center shrink-0">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 font-heading">AI Abatement Recommendation</h4>
                <p className="text-[11px] text-slate-500 font-light mt-0.5">
                  Secure Puro.earth Basaltic Weathering batches to balance nature-based risks. Complies with EU CSRD disclosure standards.
                </p>
              </div>
            </div>
            {listings.length > 0 && (
              <button
                onClick={() => setBuyProject(listings[1] || listings[0])}
                className="inline-flex h-8 items-center justify-center rounded bg-[#0F766E] px-3.5 text-[10px] font-bold text-white shadow-soft transition-all hover:bg-[#0F766E]/95 shrink-0 self-start sm:self-center"
              >
                Inspect Recommendation
              </button>
            )}
          </div>

          {/* Active Listings Grid */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-heading">
                Marketplace Order Book ({filteredListings.length})
              </h3>
              {compareList.length > 0 && (
                <button
                  onClick={() => setIsCompareOpen(true)}
                  className="bg-white border border-[#0F766E] text-[#0F766E] rounded-lg px-3 py-1.5 text-xs font-bold shadow-soft flex items-center gap-1.5 hover:bg-teal-50/30 transition-all"
                >
                  <Eye className="h-3.5 w-3.5" />
                  Compare ({compareList.length} / 3 selected)
                </button>
              )}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredListings.map((project) => {
                const wishlisted = wishlist.includes(project.id);
                const compared = compareList.includes(project.id);
                
                return (
                  <div
                    key={project.id}
                    className={`flex flex-col justify-between bg-white rounded-xl border p-5 shadow-soft transition-all ${
                      project.status !== 'active' ? 'opacity-65 grayscale' : 'hover:shadow-premium hover:border-[#0F766E]/30'
                    }`}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[9px] bg-slate-50 border border-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                          {project.methodology}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => toggleWishlist(project.id)}
                            className={`p-1 rounded hover:bg-slate-50 transition-colors ${
                              wishlisted ? 'text-[#0F766E]' : 'text-slate-300'
                            }`}
                          >
                            <Bookmark className={`h-4 w-4 ${wishlisted ? 'fill-current' : ''}`} />
                          </button>
                          <span className="text-[10px] font-bold text-slate-600 bg-teal-50/50 px-1.5 py-0.5 rounded text-emerald-800">
                            Rating: {project.rating}
                          </span>
                        </div>
                      </div>

                      {/* Title & Developer */}
                      <h4 className="text-sm font-bold text-slate-900 font-heading leading-snug">{project.name}</h4>
                      <p className="text-[10px] text-slate-400 font-light flex items-center gap-1 mt-0.5">
                        <Building className="h-3 w-3" /> {project.developer} • <Globe className="h-3 w-3" /> {project.country}
                      </p>

                      {/* Batch Specifications Grid */}
                      <div className="grid grid-cols-2 gap-2.5 mt-4 p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-[10px]">
                        <div>
                          <span className="text-slate-400 uppercase tracking-wider text-[8px] block">Batch ID</span>
                          <span className="font-mono text-slate-700 font-semibold">{project.id.toUpperCase()}-2026</span>
                        </div>
                        <div>
                          <span className="text-slate-400 uppercase tracking-wider text-[8px] block">Registry Standard</span>
                          <span className="font-semibold text-slate-700">{project.standard}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 uppercase tracking-wider text-[8px] block">Vintage</span>
                          <span className="font-semibold text-slate-700">Year {project.vintage}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 uppercase tracking-wider text-[8px] block">Min Purchase</span>
                          <span className="font-semibold text-slate-700">50 credits</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 font-light leading-relaxed mt-4 line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Bottom Pricing & CTA */}
                    <div className="mt-6 border-t border-slate-100 pt-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-[9px] text-slate-400 uppercase font-semibold block">Price per credit</span>
                          <span className="text-lg font-extrabold text-slate-900">${project.pricePerCredit.toFixed(2)}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] text-slate-400 uppercase font-semibold block">Available</span>
                          <span className="text-xs font-bold text-slate-700">{project.availableCredits.toLocaleString()} tCO₂e</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {/* Compare checkbox */}
                        <button
                          onClick={() => toggleCompare(project.id)}
                          className={`flex items-center justify-center gap-1 rounded border text-[10px] font-semibold px-2.5 py-2 transition-all ${
                            compared 
                              ? 'bg-teal-50 border-[#0F766E] text-[#0F766E]' 
                              : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={compared}
                            onChange={() => {}} // handled by button click
                            className="h-3 w-3 accent-[#0F766E] pointer-events-none"
                          />
                          Compare
                        </button>
                        
                        {/* Buy Button */}
                        <button
                          disabled={project.status !== 'active' || project.availableCredits <= 0}
                          onClick={() => {
                            setBuyProject(project);
                            setBuyQty(project.availableCredits < 50 ? project.availableCredits : 50);
                            setPurchaseStep('input');
                            setIsRetireImmediately(false);
                            setBeneficiary('');
                            setRetirementReason('');
                          }}
                          className={`flex-1 inline-flex items-center justify-center rounded bg-[#0F766E] text-white text-[10px] font-bold shadow-soft transition-all hover:bg-[#0F766E]/95 active:scale-95 disabled:opacity-40 disabled:pointer-events-none`}
                        >
                          {project.availableCredits <= 0 ? 'Fully Transacted' : 'Buy Batch Credits'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        // ---------------- SELLER DEVELOPER WORKSPACE ----------------
        <div className="grid gap-6 lg:grid-cols-3">
          
          {/* List New Batch Form */}
          <div className="bg-white border border-slate-100 p-6 rounded-xl shadow-soft space-y-5 h-fit">
            <div className="flex items-center gap-1.5 border-b border-slate-100 pb-3">
              <Plus className="h-4.5 w-4.5 text-[#0F766E]" />
              <h3 className="text-sm font-bold text-slate-900 font-heading">Register Credit Batch</h3>
            </div>

            <form onSubmit={handleRegisterBatch} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Western Ghats Soil Sequestration"
                  value={newBatchName}
                  onChange={(e) => setNewBatchName(e.target.value)}
                  className="w-full h-9 rounded border border-slate-200 bg-white px-3 text-xs focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Methodology</label>
                  <select
                    value={newBatchMethodology}
                    onChange={(e) => setNewBatchMethodology(e.target.value as any)}
                    className="w-full h-9 rounded border border-slate-200 bg-white px-2 text-xs focus:outline-none"
                  >
                    <option value="Biochar">Biochar</option>
                    <option value="Direct Air Capture">Direct Air Capture</option>
                    <option value="Enhanced Rock Weathering">Enhanced Rock Weathering</option>
                    <option value="Afforestation">Afforestation</option>
                    <option value="Mangrove Restoration">Mangrove Restoration</option>
                    <option value="Soil Carbon">Soil Carbon</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Registry Standard</label>
                  <select
                    value={newBatchRegistry}
                    onChange={(e) => setNewBatchRegistry(e.target.value as any)}
                    className="w-full h-9 rounded border border-slate-200 bg-white px-2 text-xs focus:outline-none"
                  >
                    <option value="Verra">Verra</option>
                    <option value="Gold Standard">Gold Standard</option>
                    <option value="Puro.earth">Puro.earth</option>
                    <option value="Climate Action Reserve">Climate Action Reserve</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Batch Capacity (t)</label>
                  <input
                    type="number"
                    required
                    value={newBatchCapacity}
                    onChange={(e) => setNewBatchCapacity(Number(e.target.value))}
                    className="w-full h-9 rounded border border-slate-200 bg-white px-3 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Available Credits (t)</label>
                  <input
                    type="number"
                    required
                    value={newBatchQty}
                    onChange={(e) => setNewBatchQty(Number(e.target.value))}
                    className="w-full h-9 rounded border border-slate-200 bg-white px-3 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Price per credit ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newBatchPrice}
                    onChange={(e) => setNewBatchPrice(Number(e.target.value))}
                    className="w-full h-9 rounded border border-slate-200 bg-white px-3 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Vintage Year</label>
                  <input
                    type="number"
                    required
                    value={newBatchVintage}
                    onChange={(e) => setNewBatchVintage(Number(e.target.value))}
                    className="w-full h-9 rounded border border-slate-200 bg-white px-3 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Description & Methodology Audits</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Detail MRV audit stages and permanence guarantees..."
                  value={newBatchDescription}
                  onChange={(e) => setNewBatchDescription(e.target.value)}
                  className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-xs focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex h-10 items-center justify-center rounded bg-[#0F766E] text-white text-xs font-bold shadow-soft transition-all hover:bg-[#0F766E]/95 active:scale-95"
              >
                Register & List Batch
              </button>
            </form>
          </div>

          {/* Active Listings / Sales Ledger */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Active Listings manager */}
            <div className="bg-white border border-slate-100 p-6 rounded-xl shadow-soft">
              <h3 className="text-sm font-bold text-slate-900 font-heading mb-4">My Active Listings</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-500">
                  <thead className="bg-slate-50 text-[10px] font-semibold uppercase text-slate-400 border-b border-slate-100">
                    <tr>
                      <th className="px-4 py-3">Project Batch</th>
                      <th className="px-4 py-3 text-right">Credits Available</th>
                      <th className="px-4 py-3 text-right">Price</th>
                      <th className="px-4 py-3 text-center">Status</th>
                      <th className="px-4 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {listings.slice(0, 3).map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50">
                        <td className="px-4 py-3 font-semibold text-slate-800">{item.name}</td>
                        <td className="px-4 py-3 text-right font-medium text-slate-900">
                          {item.availableCredits.toLocaleString()} t
                        </td>
                        <td className="px-4 py-3 text-right font-mono">${item.pricePerCredit.toFixed(2)}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold ${
                            item.status === 'active' ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-50 text-slate-500'
                          }`}>
                            {item.status === 'active' ? 'Active' : 'Paused'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => handleToggleListingStatus(item.id)}
                            className="text-xs font-semibold text-[#0F766E] hover:underline"
                          >
                            {item.status === 'active' ? 'Pause' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sales Ledger */}
            <div className="bg-white border border-slate-100 p-6 rounded-xl shadow-soft">
              <h3 className="text-sm font-bold text-slate-900 font-heading mb-4">Customer Orders & Settled Trades</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-500">
                  <thead className="bg-slate-50 text-[10px] font-semibold uppercase text-slate-400 border-b border-slate-100">
                    <tr>
                      <th className="px-4 py-3">Order ID</th>
                      <th className="px-4 py-3">Customer Entity</th>
                      <th className="px-4 py-3 text-right">Credits Traded</th>
                      <th className="px-4 py-3 text-right">Total Settlement</th>
                      <th className="px-4 py-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-50/50">
                        <td className="px-4 py-3 font-mono font-semibold text-slate-700">{tx.id.toUpperCase()}</td>
                        <td className="px-4 py-3 font-medium text-slate-800">Acme Global Holdings Inc.</td>
                        <td className="px-4 py-3 text-right font-medium text-slate-900">{tx.credits.toLocaleString()} t</td>
                        <td className="px-4 py-3 text-right font-bold text-slate-900">${tx.totalValue.toLocaleString()}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-[#0F766E]">
                            Settled
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ---------------- PROJECT COMPARE DRAWER / MODAL ---------------- */}
      <AnimatePresence>
        {isCompareOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-premium w-full max-w-4xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">Ecosystem Project Comparison Matrix</h3>
                  <p className="text-[10px] text-slate-400 font-light mt-0.5">Side-by-side audit of credit methodologies and verification ratings</p>
                </div>
                <button
                  onClick={() => setIsCompareOpen(false)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600 focus:outline-none"
                >
                  Close Matrix
                </button>
              </div>

              <div className="p-6 overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50">
                      <th className="p-3 text-slate-400 uppercase font-semibold tracking-wider text-[10px]">Specifications</th>
                      {compareList.map(id => {
                        const item = listings.find(p => p.id === id);
                        return (
                          <th key={id} className="p-3 font-bold text-slate-900 font-heading text-sm max-w-[200px]">
                            {item?.name}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3 font-semibold text-slate-400 text-[10px] uppercase">Methodology</td>
                      {compareList.map(id => (
                        <td key={id} className="p-3 text-slate-800 font-semibold">
                          {listings.find(p => p.id === id)?.methodology}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-400 text-[10px] uppercase">Registry Standard</td>
                      {compareList.map(id => (
                        <td key={id} className="p-3 text-slate-800 font-semibold">
                          {listings.find(p => p.id === id)?.standard}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-400 text-[10px] uppercase">Vintage Year</td>
                      {compareList.map(id => (
                        <td key={id} className="p-3 text-slate-800">
                          {listings.find(p => p.id === id)?.vintage}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-400 text-[10px] uppercase">Price per credit</td>
                      {compareList.map(id => (
                        <td key={id} className="p-3 text-slate-900 font-bold font-mono">
                          ${listings.find(p => p.id === id)?.pricePerCredit.toFixed(2)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-400 text-[10px] uppercase">Available volume</td>
                      {compareList.map(id => (
                        <td key={id} className="p-3 text-slate-800">
                          {listings.find(p => p.id === id)?.availableCredits.toLocaleString()} t
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-400 text-[10px] uppercase">Verifier Rating</td>
                      {compareList.map(id => (
                        <td key={id} className="p-3">
                          <span className="bg-teal-50 text-[#0F766E] font-bold px-2 py-0.5 rounded text-[10px]">
                            {listings.find(p => p.id === id)?.rating}
                          </span>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                <button
                  onClick={() => setCompareList([])}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Clear Matrix list
                </button>
                <button
                  onClick={() => setIsCompareOpen(false)}
                  className="rounded-lg bg-[#0F766E] text-white px-4 py-2 text-xs font-bold"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ---------------- ORDER ENTRY TRANSACTION MODAL ---------------- */}
      <AnimatePresence>
        {buyProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-premium w-full max-w-lg overflow-hidden"
            >
              {purchaseStep === 'input' ? (
                <>
                  {/* Step 1: Order Input form */}
                  <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 font-heading">Secure Credit Batch</h3>
                      <p className="text-[10px] text-slate-400 font-light mt-0.5">Order Book Bid: {buyProject.id.toUpperCase()}</p>
                    </div>
                    <button onClick={() => setBuyProject(null)} className="text-slate-400 hover:text-slate-600">Close</button>
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Project overview */}
                    <div className="rounded-xl border border-slate-100 p-4 bg-slate-50 space-y-1">
                      <h4 className="font-bold text-slate-800">{buyProject.name}</h4>
                      <p className="text-[10px] text-slate-400">{buyProject.developer} • {buyProject.standard} Registry</p>
                      <div className="flex justify-between items-center pt-2 mt-2 border-t border-slate-100 text-xs">
                        <span>Price Index: <span className="font-bold text-slate-900">${buyProject.pricePerCredit.toFixed(2)}</span></span>
                        <span>Available: <span className="font-bold text-slate-800">{buyProject.availableCredits.toLocaleString()} t</span></span>
                      </div>
                    </div>

                    {/* Order Entry Volume */}
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Quantity (Metric Tonnes)</label>
                      <input
                        type="number"
                        min="50"
                        max={buyProject.availableCredits}
                        value={buyQty}
                        onChange={(e) => setBuyQty(Number(e.target.value))}
                        className="w-full h-9 rounded border border-slate-200 bg-white px-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
                      />
                      <span className="text-[9px] text-slate-400 mt-1 block">
                        Minimum purchase volume: <span className="font-bold">50 credits</span>
                      </span>
                    </div>

                    {/* Checkbox for Immediate Retirement */}
                    <div className="flex items-start gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="retire"
                        checked={isRetireImmediately}
                        onChange={(e) => setIsRetireImmediately(e.target.checked)}
                        className="h-4 w-4 rounded border-slate-300 text-[#0F766E] accent-[#0F766E] mt-0.5"
                      />
                      <div className="space-y-1">
                        <label htmlFor="retire" className="text-xs font-bold text-slate-800 block cursor-pointer">
                          Retire Credits Immediately
                        </label>
                        <p className="text-[10px] text-slate-400 font-light leading-relaxed">
                          Permanently remove these credits from circulation on the public ledger. Locked tokens generate compliance ESG offsets.
                        </p>
                      </div>
                    </div>

                    {isRetireImmediately && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-3.5 border-t border-slate-100 pt-3"
                      >
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Beneficiary Legal Entity</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Acme Global Holdings Inc."
                            value={beneficiary}
                            onChange={(e) => setBeneficiary(e.target.value)}
                            className="w-full h-8 rounded border border-slate-200 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Offset Retirement Reason</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Offsetting Q1 corporate air travel emissions"
                            value={retirementReason}
                            onChange={(e) => setRetirementReason(e.target.value)}
                            className="w-full h-8 rounded border border-slate-200 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Settlement Cost breakdown */}
                    <div className="border-t border-slate-100 pt-4 text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Subtotal</span>
                        <span className="font-semibold text-slate-900">${(buyQty * buyProject.pricePerCredit).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Registry clearing fee (1.5%)</span>
                        <span className="font-semibold text-slate-900">${(buyQty * buyProject.pricePerCredit * 0.015).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between border-t border-slate-50 pt-2 text-sm">
                        <span className="font-bold text-slate-800">Total Settlement Cost</span>
                        <span className="font-extrabold text-[#0F766E]">${(buyQty * buyProject.pricePerCredit * 1.015).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                    <button
                      onClick={() => setBuyProject(null)}
                      className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      Cancel Order
                    </button>
                    <button
                      disabled={buyQty < (buyProject.availableCredits < 50 ? buyProject.availableCredits : 50) || buyQty > buyProject.availableCredits}
                      onClick={handleConfirmPurchase}
                      className="rounded-lg bg-[#0F766E] text-white px-4 py-2 text-xs font-bold shadow-soft hover:bg-[#0F766E]/95 disabled:opacity-40 disabled:pointer-events-none"
                    >
                      Confirm Trade Settlement
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Step 2: Success Screen with Certificate Details */}
                  <div className="p-6 text-center space-y-6">
                    <div className="mx-auto h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                      <Check className="h-6 w-6" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-slate-900 font-heading">Transaction Settled In Full</h3>
                      <p className="text-xs text-slate-500 font-light max-w-sm mx-auto">
                        Your purchase of <span className="font-bold text-slate-700">{buyQty.toLocaleString()} tCO₂e</span> carbon credits from {buyProject.developer} has cleared standard registry validation.
                      </p>
                    </div>

                    {/* Cryptographic Node verification box */}
                    <div className="rounded-xl border border-slate-100 p-4 bg-slate-50 text-left text-[10px] space-y-2.5 font-mono">
                      <div>
                        <span className="text-slate-400 uppercase text-[9px] block">Registry Identifier</span>
                        <span className="text-slate-800 font-semibold">{generatedCert?.serialNumber}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 uppercase text-[9px] block">IPFS Cryptographic Hash</span>
                        <span className="text-slate-800 block truncate">{generatedCert?.hash}</span>
                      </div>
                      <div className="flex justify-between border-t border-slate-100 pt-2 text-slate-500">
                        <span>Ledger Sync</span>
                        <span className="text-emerald-700 font-bold">Synchronized</span>
                      </div>
                    </div>

                    {/* Custom inline printable certificate template preview */}
                    {isRetireImmediately && (
                      <div className="rounded-xl border border-teal-100/50 bg-teal-50/10 p-5 text-left border-dashed space-y-2 max-w-sm mx-auto">
                        <span className="text-[9px] font-bold text-[#0F766E] uppercase tracking-wider block">Official Retirement Certificate</span>
                        <h4 className="text-xs font-bold text-slate-800">{buyProject.name}</h4>
                        <p className="text-[9px] text-slate-500 font-light">Retired on behalf of: <span className="font-semibold text-slate-700">{beneficiary || 'Acme Global Holdings'}</span></p>
                        <p className="text-[9px] text-slate-400 italic">"{retirementReason || 'Corporate carbon footprint offset'}"</p>
                      </div>
                    )}
                  </div>

                  <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                    <button
                      onClick={() => {
                        // Triggers raw text copy of details to simulate file download
                        navigator.clipboard.writeText(JSON.stringify({ project: buyProject.name, qty: buyQty, serial: generatedCert?.serialNumber, hash: generatedCert?.hash }));
                        alert('Certificate details copied to clipboard. (PDF compliance file exported).');
                      }}
                      className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Download Certificate
                    </button>
                    <button
                      onClick={() => setBuyProject(null)}
                      className="rounded-lg bg-[#0F766E] text-white px-4 py-2 text-xs font-bold shadow-soft"
                    >
                      Return to Marketplace
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
