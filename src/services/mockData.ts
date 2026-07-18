export interface CarbonProject {
  id: string;
  name: string;
  developer: string;
  methodology: 'Afforestation' | 'Direct Air Capture' | 'Enhanced Rock Weathering' | 'Biochar' | 'Mangrove Restoration' | 'Soil Carbon';
  standard: 'Verra' | 'Gold Standard' | 'Puro.earth' | 'Climate Action Reserve';
  country: string;
  region: string;
  pricePerCredit: number;
  availableCredits: number;
  vintage: number;
  rating: 'AAA' | 'AA' | 'A' | 'BBB';
  description: string;
  co2AvoidedOrRemoved: number; // in tonnes
  status: 'active' | 'pending_verification' | 'fully_funded';
  sdgs: number[]; // UN Sustainable Development Goals numbers
}

export interface Transaction {
  id: string;
  projectId: string;
  projectName: string;
  type: 'buy' | 'sell' | 'retire';
  credits: number;
  pricePerCredit: number;
  totalValue: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  counterparty: string;
  certificateUrl?: string;
}

export interface OrganizationStats {
  name: string;
  type: 'buyer' | 'seller' | 'verifier' | 'broker';
  creditsRetired: number;
  creditsHeld: number;
  totalSpend: number;
  totalRevenue: number;
  netCarbonImpact: number; // in tonnes (negative is offset)
}

export interface MarketTrend {
  month: string;
  averagePrice: number;
  volumeTraded: number; // in thousand credits
}

// 1. Carbon Projects
export const mockProjects: CarbonProject[] = [
  {
    id: 'proj-001',
    name: 'Andean Cloud Forest Conservation',
    developer: 'EcoReserve Trust',
    methodology: 'Afforestation',
    standard: 'Verra',
    country: 'Peru',
    region: 'Amazonas',
    pricePerCredit: 19.50,
    availableCredits: 45000,
    vintage: 2024,
    rating: 'AA',
    description: 'Protecting and restoring critical cloud forest ecosystems in the Peruvian Andes, preventing deforestation while restoring degraded pastureland to native forest cover.',
    co2AvoidedOrRemoved: 120000,
    status: 'active',
    sdgs: [13, 15, 8, 6]
  },
  {
    id: 'proj-002',
    name: 'Basaltic Enhanced Weathering Initiative',
    developer: 'LithoOffset Labs',
    methodology: 'Enhanced Rock Weathering',
    standard: 'Puro.earth',
    country: 'United Kingdom',
    region: 'Scotland',
    pricePerCredit: 340.00,
    availableCredits: 8500,
    vintage: 2025,
    rating: 'AAA',
    description: 'Spreading finely crushed silicate rock on agricultural fields to accelerate natural weathering process, permanently locking carbon dioxide as mineral carbonates in soil.',
    co2AvoidedOrRemoved: 15000,
    status: 'active',
    sdgs: [13, 2, 9]
  },
  {
    id: 'proj-003',
    name: 'Nordic Direct Air Capture & Storage (DACS)',
    developer: 'AeroCapture Corp',
    methodology: 'Direct Air Capture',
    standard: 'Puro.earth',
    country: 'Iceland',
    region: 'Hellisheidi',
    pricePerCredit: 620.00,
    availableCredits: 2200,
    vintage: 2025,
    rating: 'AAA',
    description: 'Capturing carbon dioxide directly from ambient air using solid sorbent filters and permanently mineralizing it in deep basaltic formations.',
    co2AvoidedOrRemoved: 5000,
    status: 'active',
    sdgs: [13, 9, 11]
  },
  {
    id: 'proj-004',
    name: 'Madagascar Coastal Mangrove Restoration',
    developer: 'BlueCarbon Planet',
    methodology: 'Mangrove Restoration',
    standard: 'Gold Standard',
    country: 'Madagascar',
    region: 'Mahajanga',
    pricePerCredit: 24.00,
    availableCredits: 75000,
    vintage: 2024,
    rating: 'AA',
    description: 'Community-led restoration of degraded mangrove ecosystems along the coast of Madagascar, creating high-density blue carbon sinks and supporting coastal protection.',
    co2AvoidedOrRemoved: 280000,
    status: 'active',
    sdgs: [13, 14, 1, 8]
  },
  {
    id: 'proj-005',
    name: 'Sub-Saharan Biochar Soil Enrichment',
    developer: 'PyraCarbon Group',
    methodology: 'Biochar',
    standard: 'Gold Standard',
    country: 'Kenya',
    region: 'Nakuru',
    pricePerCredit: 110.00,
    availableCredits: 12000,
    vintage: 2024,
    rating: 'A',
    description: 'Converting crop residues into highly stable biochar via pyrolysis, which is then added to local agricultural soils to boost fertility and store carbon for centuries.',
    co2AvoidedOrRemoved: 35000,
    status: 'active',
    sdgs: [13, 15, 2, 1]
  },
  {
    id: 'proj-006',
    name: 'Great Plains Regenerative Agriculture',
    developer: 'AgriSoil Solutions',
    methodology: 'Soil Carbon',
    standard: 'Climate Action Reserve',
    country: 'United States',
    region: 'Nebraska',
    pricePerCredit: 32.50,
    availableCredits: 30000,
    vintage: 2024,
    rating: 'BBB',
    description: 'Transitioning large-scale farming properties to no-till practices and multi-species cover cropping to enhance carbon sequestration in soil organic matter.',
    co2AvoidedOrRemoved: 95000,
    status: 'active',
    sdgs: [13, 2, 15]
  }
];

// 2. Transactions History
export const mockTransactions: Transaction[] = [
  {
    id: 'tx-1001',
    projectId: 'proj-003',
    projectName: 'Nordic Direct Air Capture & Storage (DACS)',
    type: 'buy',
    credits: 150,
    pricePerCredit: 620.00,
    totalValue: 93000.00,
    status: 'completed',
    date: '2026-07-10',
    counterparty: 'AeroCapture Corp',
    certificateUrl: '/certificates/cert-1001.pdf'
  },
  {
    id: 'tx-1002',
    projectId: 'proj-001',
    projectName: 'Andean Cloud Forest Conservation',
    type: 'buy',
    credits: 5000,
    pricePerCredit: 19.50,
    totalValue: 97500.00,
    status: 'completed',
    date: '2026-06-28',
    counterparty: 'EcoReserve Trust',
    certificateUrl: '/certificates/cert-1002.pdf'
  },
  {
    id: 'tx-1003',
    projectId: 'proj-002',
    projectName: 'Basaltic Enhanced Weathering Initiative',
    type: 'buy',
    credits: 200,
    pricePerCredit: 340.00,
    totalValue: 68000.00,
    status: 'completed',
    date: '2026-06-15',
    counterparty: 'LithoOffset Labs',
    certificateUrl: '/certificates/cert-1003.pdf'
  },
  {
    id: 'tx-1004',
    projectId: 'proj-004',
    projectName: 'Madagascar Coastal Mangrove Restoration',
    type: 'retire',
    credits: 2500,
    pricePerCredit: 24.00,
    totalValue: 60000.00,
    status: 'completed',
    date: '2026-05-30',
    counterparty: 'Gold Standard Registry',
    certificateUrl: '/certificates/cert-1004.pdf'
  },
  {
    id: 'tx-1005',
    projectId: 'proj-005',
    projectName: 'Sub-Saharan Biochar Soil Enrichment',
    type: 'buy',
    credits: 500,
    pricePerCredit: 110.00,
    totalValue: 55000.00,
    status: 'pending',
    date: '2026-07-14',
    counterparty: 'PyraCarbon Group'
  }
];

// 3. Organization Portfolio
export const mockOrganizationStats: OrganizationStats = {
  name: 'Acme Global Holdings',
  type: 'buyer',
  creditsRetired: 12450,
  creditsHeld: 7850,
  totalSpend: 548200.00,
  totalRevenue: 0.00,
  netCarbonImpact: -20300.00 // tonnes offset
};

// 4. Analytics Market Trends
export const mockMarketTrends: MarketTrend[] = [
  { month: 'Jan', averagePrice: 42.10, volumeTraded: 180 },
  { month: 'Feb', averagePrice: 44.50, volumeTraded: 210 },
  { month: 'Mar', averagePrice: 43.80, volumeTraded: 195 },
  { month: 'Apr', averagePrice: 48.00, volumeTraded: 250 },
  { month: 'May', averagePrice: 52.30, volumeTraded: 290 },
  { month: 'Jun', averagePrice: 56.40, volumeTraded: 320 },
  { month: 'Jul', averagePrice: 59.90, volumeTraded: 310 }
];

// 5. User Profile
export interface UserProfile {
  name: string;
  email: string;
  role: 'buyer_admin' | 'seller_admin' | 'platform_admin';
  avatarUrl?: string;
  organization: string;
}

export const mockUserProfile: UserProfile = {
  name: 'Sarah Jenkins',
  email: 's.jenkins@acme-global.com',
  role: 'buyer_admin',
  organization: 'Acme Global Holdings',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120'
};
