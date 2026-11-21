// TypeScript Domain Definitions for KrishiDrishti (Assam Agri-Price Sentinel - NESFIC-D-35)

export type CommodityCategory = 'CEREALS_PADDY' | 'OILSEEDS' | 'HORTICULTURE_VEGETABLES' | 'SPICES_GI' | 'FIBER_JUTE';

export type PerishabilityTier = 'HIGHLY_PERISHABLE' | 'SEMI_PERISHABLE' | 'DURABLE';

export type MarketAction = 'HOLD' | 'SELL_IMMEDIATELY' | 'ROUTE_ARBITRAGE' | 'COLD_STORE';

export type DataProvenanceTier = 'OBSERVED' | 'FORECAST' | 'SIMULATED';

export type AlertSeverity = 'CRITICAL' | 'WARNING' | 'OPPORTUNITY' | 'INFO';

export interface PricePoint {
  day: number;
  label: string;
  p10: number; // Downside floor (90% statistical safety)
  p50: number; // Median expected price
  p90: number; // Upside potential
  historicalActual?: number;
  provenance: DataProvenanceTier;
}

export interface Commodity {
  id: string;
  name: string;
  assameseName: string;
  category: CommodityCategory;
  perishability: PerishabilityTier;
  unit: string;
  mspPerQuintal: number | null; // null if no statutory MSP
  benchmarkCostPerQuintal: number;
  currentModalPrice: number;
  priceChange24hPct: number;
  dailyArrivalTonnes: number;
  majorDistricts: string[];
  shelfLifeDays: number;
  keyDrivers: string[];
}

export interface ForecastTrajectory {
  commodityId: string;
  mandiId: string;
  currentPrice: number;
  tactical7d: PricePoint[];
  storage30d: PricePoint[];
  preSowing90d: PricePoint[];
  recommendation: {
    action: MarketAction;
    optimalDays: number;
    expectedPriceDelta: number;
    confidencePct: number;
    rationale: string;
    assameseRationale: string;
  };
}

export interface Mandi {
  id: string;
  name: string;
  assameseName: string;
  district: string;
  latitude: number;
  longitude: number;
  type: 'APMC_REGULATED' | 'PRIMARY_RURAL_HAAT' | 'TERMINAL_MARKET';
  dailyArrivalTonnes: number;
  avgDailyTurnoverLakhs: number;
  coldStorageCapacityTonnes: number;
  connectedHighway: string;
  status: 'ACTIVE' | 'PEAK_GLUT' | 'PRICE_CRASH_ALERT' | 'NORMAL';
  commoditiesHandled: string[];
  contactSecretariat: string;
}

export interface ArbitrageOption {
  destinationMandiId: string;
  destinationName: string;
  district: string;
  distanceKm: number;
  transitHours: number;
  destinationPrice: number;
  freightCostPerQ: number;
  shrinkageLossPerQ: number;
  mandiCessPerQ: number;
  handlingCostPerQ: number;
  netRealizableValue: number;
  netProfitOverOriginPerQ: number;
  roiPct: number;
  recommended: boolean;
  transitRiskNote: string;
}

export interface ColdStorageFacility {
  id: string;
  name: string;
  district: string;
  capacityTonnes: number;
  occupancyPct: number;
  availableCapacityTonnes: number;
  dailyRentPerQ: number;
  certifiedWdra: boolean;
  enwrLoanEligible: boolean;
  maxSafeHoldingDays: number;
  temperatureCelsius: number;
  contactPhone: string;
  address: string;
}

export interface MarketAlert {
  id: string;
  timestamp: string;
  severity: AlertSeverity;
  title: string;
  titleAssamese: string;
  message: string;
  messageAssamese: string;
  district: string;
  commodity: string;
  provenance: DataProvenanceTier;
  actionableTarget?: string;
}

export interface AdminUser {
  name: string;
  email: string;
  role: 'DIRECTORATE' | 'ASAMB_SECRETARY' | 'FPO_MANAGER' | 'RESEARCH_AMIU';
  designation: string;
  department: string;
  district?: string;
}
