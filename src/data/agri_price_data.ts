import { Commodity, Mandi, ColdStorageFacility, MarketAlert, ForecastTrajectory } from '../types/agri';

export const ASSAM_COMMODITIES: Commodity[] = [
  {
    id: 'mustard',
    name: 'Mustard / Rapeseed',
    assameseName: 'সৰিয়হ (Sarisoh)',
    category: 'OILSEEDS',
    perishability: 'DURABLE',
    unit: '₹ / Quintal',
    mspPerQuintal: 5650,
    benchmarkCostPerQuintal: 3120,
    currentModalPrice: 5850,
    priceChange24hPct: +1.8,
    dailyArrivalTonnes: 380,
    majorDistricts: ['Darrang', 'Nalbari', 'Barpeta', 'Nagaon', 'Morigaon'],
    shelfLifeDays: 365,
    keyDrivers: ['Domestic crushing mills demand', 'Edible oil import tariff revision', 'Delayed arrivals in northern plains']
  },
  {
    id: 'sali_paddy',
    name: 'Sali Paddy (Winter Rice)',
    assameseName: 'শালি ধান (Sali Dhan)',
    category: 'CEREALS_PADDY',
    perishability: 'DURABLE',
    unit: '₹ / Quintal',
    mspPerQuintal: 2300,
    benchmarkCostPerQuintal: 1480,
    currentModalPrice: 2240, // Below MSP - Distress alert
    priceChange24hPct: -2.4,
    dailyArrivalTonnes: 1250,
    majorDistricts: ['Nagaon', 'Golaghat', 'Sonitpur', 'Kamrup', 'Cachar'],
    shelfLifeDays: 730,
    keyDrivers: ['FCI procurement pacing', 'Peak harvest post-monsoon flush', 'Local mill liquidity']
  },
  {
    id: 'boro_paddy',
    name: 'Boro Paddy (Summer Rice)',
    assameseName: 'বৰো ধান (Boro Dhan)',
    category: 'CEREALS_PADDY',
    perishability: 'DURABLE',
    unit: '₹ / Quintal',
    mspPerQuintal: 2300,
    benchmarkCostPerQuintal: 1520,
    currentModalPrice: 2380,
    priceChange24hPct: +0.8,
    dailyArrivalTonnes: 820,
    majorDistricts: ['Barpeta', 'Dhubri', 'Goalpara', 'Nalbari'],
    shelfLifeDays: 730,
    keyDrivers: ['Irrigated riverine yields', 'Pre-monsoon storage demand', 'Inter-state grain movement']
  },
  {
    id: 'joha_rice',
    name: 'Joha Aromatic Rice',
    assameseName: 'জোহা চাউল (Joha Saul)',
    category: 'CEREALS_PADDY',
    perishability: 'DURABLE',
    unit: '₹ / Quintal',
    mspPerQuintal: null, // Specialty GI crop
    benchmarkCostPerQuintal: 3800,
    currentModalPrice: 6450,
    priceChange24hPct: +3.2,
    dailyArrivalTonnes: 140,
    majorDistricts: ['Golaghat', 'Jorhat', 'Sivasagar', 'Darrang'],
    shelfLifeDays: 540,
    keyDrivers: ['Premium urban festival demand (Magh Bihu)', 'Export inquiries to Middle East', 'Limited geographical acreage']
  },
  {
    id: 'kaji_nemu',
    name: 'Kaji Nemu (Assam Lemon - GI)',
    assameseName: 'কাজী নেমু (Kazi Nemu)',
    category: 'HORTICULTURE_VEGETABLES',
    perishability: 'SEMI_PERISHABLE',
    unit: '₹ / 1000 Pieces',
    mspPerQuintal: null,
    benchmarkCostPerQuintal: 1800,
    currentModalPrice: 4200,
    priceChange24hPct: +4.5,
    dailyArrivalTonnes: 65,
    majorDistricts: ['Baksa', 'Kamrup Rural', 'Tinsukia', 'Dibrugarh'],
    shelfLifeDays: 21,
    keyDrivers: ['Summer beverage demand', 'Beverage processing contracts', 'London / Dubai air freight exports']
  },
  {
    id: 'ginger',
    name: 'Karbi Anglong Organic Ginger (GI)',
    assameseName: 'কাৰ্বি আদা (Karbi Ada)',
    category: 'SPICES_GI',
    perishability: 'SEMI_PERISHABLE',
    unit: '₹ / Quintal',
    mspPerQuintal: null,
    benchmarkCostPerQuintal: 2800,
    currentModalPrice: 5600,
    priceChange24hPct: +2.1,
    dailyArrivalTonnes: 190,
    majorDistricts: ['Karbi Anglong', 'Dima Hasao', 'West Karbi Anglong'],
    shelfLifeDays: 90,
    keyDrivers: ['Pharma & oleoresin extraction demand', 'Siliguri & Kolkata terminal buying', 'Organic certification premiums']
  },
  {
    id: 'turmeric',
    name: 'Lakadong / Assam Turmeric',
    assameseName: 'হালধি (Halodhi)',
    category: 'SPICES_GI',
    perishability: 'DURABLE',
    unit: '₹ / Quintal',
    mspPerQuintal: null,
    benchmarkCostPerQuintal: 3400,
    currentModalPrice: 7800,
    priceChange24hPct: +1.1,
    dailyArrivalTonnes: 85,
    majorDistricts: ['West Karbi Anglong', 'Dima Hasao', 'Kokrajhar'],
    shelfLifeDays: 730,
    keyDrivers: ['Curcumin content (>5.5%) testing', 'Ayurvedic formulations demand', 'Steady spice mandi clearance']
  },
  {
    id: 'tomato',
    name: 'Kharupetia Hybrid Tomato',
    assameseName: 'বিলাহী (Bilahi)',
    category: 'HORTICULTURE_VEGETABLES',
    perishability: 'HIGHLY_PERISHABLE',
    unit: '₹ / Quintal',
    mspPerQuintal: null,
    benchmarkCostPerQuintal: 850,
    currentModalPrice: 620, // Acute distress crash!
    priceChange24hPct: -14.2,
    dailyArrivalTonnes: 450,
    majorDistricts: ['Darrang', 'Barpeta', 'Nagaon', 'Sonitpur'],
    shelfLifeDays: 7,
    keyDrivers: ['Synchronized winter flush glut', 'Lack of refrigerated reefer transport', 'High transit rot vulnerability']
  },
  {
    id: 'cabbage',
    name: 'Winter Cabbage',
    assameseName: 'বন্ধাকবি (Bondhakobi)',
    category: 'HORTICULTURE_VEGETABLES',
    perishability: 'HIGHLY_PERISHABLE',
    unit: '₹ / Quintal',
    mspPerQuintal: null,
    benchmarkCostPerQuintal: 700,
    currentModalPrice: 850,
    priceChange24hPct: -6.5,
    dailyArrivalTonnes: 340,
    majorDistricts: ['Darrang', 'Barpeta', 'Kamrup', 'Morigaon'],
    shelfLifeDays: 14,
    keyDrivers: ['Inter-state supply from Meghalaya', 'Mandi arrival surges', 'Local catering demand']
  },
  {
    id: 'potato',
    name: 'Potato (Jyoti / Pukhraj)',
    assameseName: 'আলু (Aloo)',
    category: 'HORTICULTURE_VEGETABLES',
    perishability: 'SEMI_PERISHABLE',
    unit: '₹ / Quintal',
    mspPerQuintal: null,
    benchmarkCostPerQuintal: 950,
    currentModalPrice: 1420,
    priceChange24hPct: +1.4,
    dailyArrivalTonnes: 620,
    majorDistricts: ['Darrang', 'Nalbari', 'Goalpara', 'Dhubri'],
    shelfLifeDays: 120,
    keyDrivers: ['Cold storage loading window', 'West Bengal inbound border tariffs', 'Seed potato requirement']
  },
  {
    id: 'chilli',
    name: 'Green Chilli / Bhoot Jolokia',
    assameseName: 'কেঁচা জলকীয়া / ভূত জলকীয়া',
    category: 'SPICES_GI',
    perishability: 'SEMI_PERISHABLE',
    unit: '₹ / Quintal',
    mspPerQuintal: null,
    benchmarkCostPerQuintal: 2500,
    currentModalPrice: 5100,
    priceChange24hPct: +5.2,
    dailyArrivalTonnes: 95,
    majorDistricts: ['Nagaon', 'Tezpur', 'Golaghat', 'Jorhat'],
    shelfLifeDays: 12,
    keyDrivers: ['Processing oleoresin defense contracts', 'Capsaicin rating testing', 'Export consignments']
  },
  {
    id: 'raw_jute',
    name: 'Raw Jute (TD-5 Grade)',
    assameseName: 'মৰাপাট (Morapaat)',
    category: 'FIBER_JUTE',
    perishability: 'DURABLE',
    unit: '₹ / Quintal',
    mspPerQuintal: 5335,
    benchmarkCostPerQuintal: 3200,
    currentModalPrice: 5450,
    priceChange24hPct: +0.6,
    dailyArrivalTonnes: 290,
    majorDistricts: ['Dhubri', 'Barpeta', 'Nalbari', 'Goalpara'],
    shelfLifeDays: 730,
    keyDrivers: ['Jute Corporation of India (JCI) MSP buying', 'Packaging bag mandatory quotas', 'Kolkata gunny mills']
  }
];

export const ASSAM_MANDIS: Mandi[] = [
  {
    id: 'kharupetia',
    name: 'Kharupetia Regulated Market',
    assameseName: 'খাৰুপেটীয়া বজাৰ',
    district: 'Darrang',
    latitude: 26.5186,
    longitude: 92.1332,
    type: 'APMC_REGULATED',
    dailyArrivalTonnes: 850,
    avgDailyTurnoverLakhs: 78.5,
    coldStorageCapacityTonnes: 12000,
    connectedHighway: 'NH-15 (North Bank Corridor)',
    status: 'PEAK_GLUT',
    commoditiesHandled: ['tomato', 'cabbage', 'mustard', 'potato', 'sali_paddy'],
    contactSecretariat: 'Secretary, Kharupetia Market Committee (+91 3713 252114)'
  },
  {
    id: 'pamohi',
    name: 'Pamohi Wholesale Terminal Market (Guwahati)',
    assameseName: 'পামহী পাইকাৰী বজাৰ (গুৱাহাটী)',
    district: 'Kamrup Metropolitan',
    latitude: 26.1158,
    longitude: 91.6854,
    type: 'TERMINAL_MARKET',
    dailyArrivalTonnes: 1650,
    avgDailyTurnoverLakhs: 245.0,
    coldStorageCapacityTonnes: 28000,
    connectedHighway: 'NH-27 / Asian Highway 1',
    status: 'ACTIVE',
    commoditiesHandled: ['tomato', 'mustard', 'sali_paddy', 'joha_rice', 'kaji_nemu', 'ginger', 'potato'],
    contactSecretariat: 'ASAMB Central Market Directorate, Pamohi (+91 361 2271890)'
  },
  {
    id: 'howly',
    name: 'Howly Regulated Market Yard',
    assameseName: 'হাওলী বজাৰ',
    district: 'Barpeta',
    latitude: 26.4312,
    longitude: 90.9687,
    type: 'APMC_REGULATED',
    dailyArrivalTonnes: 720,
    avgDailyTurnoverLakhs: 64.2,
    coldStorageCapacityTonnes: 8500,
    connectedHighway: 'NH-27 / NH-127B',
    status: 'ACTIVE',
    commoditiesHandled: ['boro_paddy', 'mustard', 'raw_jute', 'cabbage', 'potato'],
    contactSecretariat: 'Barpeta District Regulated Market Committee (+91 3666 288341)'
  },
  {
    id: 'silchar',
    name: 'Silchar APMC Mandi (Barak Valley)',
    assameseName: 'শিলচৰ বজাৰ (বৰাক উপত্যকা)',
    district: 'Cachar',
    latitude: 24.8333,
    longitude: 92.7789,
    type: 'TERMINAL_MARKET',
    dailyArrivalTonnes: 540,
    avgDailyTurnoverLakhs: 92.0,
    coldStorageCapacityTonnes: 6000,
    connectedHighway: 'NH-37 / NH-306',
    status: 'ACTIVE',
    commoditiesHandled: ['tomato', 'sali_paddy', 'mustard', 'potato', 'kaji_nemu'],
    contactSecretariat: 'Cachar APMC Committee (+91 3842 260412)'
  },
  {
    id: 'nagaon',
    name: 'Nagaon Central Regulated Market',
    assameseName: 'নগাঁও বজাৰ',
    district: 'Nagaon',
    latitude: 26.3475,
    longitude: 92.6841,
    type: 'APMC_REGULATED',
    dailyArrivalTonnes: 890,
    avgDailyTurnoverLakhs: 88.0,
    coldStorageCapacityTonnes: 15000,
    connectedHighway: 'NH-27 / NH-127',
    status: 'PRICE_CRASH_ALERT',
    commoditiesHandled: ['sali_paddy', 'mustard', 'chilli', 'jute', 'tomato'],
    contactSecretariat: 'Nagaon Regulated Market Board (+91 3672 233105)'
  },
  {
    id: 'jorhat',
    name: 'Jorhat APMC Mandi (Upper Assam Hub)',
    assameseName: 'যোৰহাট বজাৰ',
    district: 'Jorhat',
    latitude: 26.7509,
    longitude: 94.2037,
    type: 'TERMINAL_MARKET',
    dailyArrivalTonnes: 480,
    avgDailyTurnoverLakhs: 56.0,
    coldStorageCapacityTonnes: 7500,
    connectedHighway: 'NH-715',
    status: 'NORMAL',
    commoditiesHandled: ['joha_rice', 'sali_paddy', 'mustard', 'ginger', 'chilli'],
    contactSecretariat: 'Jorhat Market Secretariat (+91 376 2320140)'
  },
  {
    id: 'dhubri',
    name: 'Bilasipara & Dhubri Jute & Grain Market',
    assameseName: 'বিলাসীপাৰা / ধুবুৰী বজাৰ',
    district: 'Dhubri',
    latitude: 26.0194,
    longitude: 89.9744,
    type: 'APMC_REGULATED',
    dailyArrivalTonnes: 610,
    avgDailyTurnoverLakhs: 51.5,
    coldStorageCapacityTonnes: 4500,
    connectedHighway: 'NH-17 (South Bank)',
    status: 'ACTIVE',
    commoditiesHandled: ['raw_jute', 'boro_paddy', 'mustard', 'potato'],
    contactSecretariat: 'Dhubri Jute & Grain Marketing Yard (+91 3662 230219)'
  },
  {
    id: 'nalbari',
    name: 'Nalbari Regulated Market Committee',
    assameseName: 'নলবাৰী বজাৰ',
    district: 'Nalbari',
    latitude: 26.4442,
    longitude: 91.4398,
    type: 'APMC_REGULATED',
    dailyArrivalTonnes: 390,
    avgDailyTurnoverLakhs: 39.0,
    coldStorageCapacityTonnes: 5000,
    connectedHighway: 'NH-27',
    status: 'NORMAL',
    commoditiesHandled: ['mustard', 'boro_paddy', 'potato', 'cabbage'],
    contactSecretariat: 'Nalbari APMC Secretary (+91 3624 220199)'
  }
];

export const ASSAM_COLD_STORAGES: ColdStorageFacility[] = [
  {
    id: 'cs_darrang_01',
    name: 'Darrang Agro Cold Storage & Logistics Ltd.',
    district: 'Darrang',
    capacityTonnes: 5000,
    occupancyPct: 40,
    availableCapacityTonnes: 3000,
    dailyRentPerQ: 3.0,
    certifiedWdra: true,
    enwrLoanEligible: true,
    maxSafeHoldingDays: 180,
    temperatureCelsius: 3.5,
    contactPhone: '+91 94350 21455',
    address: 'Near Kharupetia Bypass, NH-15, Darrang 784115'
  },
  {
    id: 'cs_kamrup_01',
    name: 'Guwahati Agri-Logistics Mega Cold Chain Hub',
    district: 'Kamrup Metropolitan',
    capacityTonnes: 12000,
    occupancyPct: 75,
    availableCapacityTonnes: 3000,
    dailyRentPerQ: 3.8,
    certifiedWdra: true,
    enwrLoanEligible: true,
    maxSafeHoldingDays: 240,
    temperatureCelsius: 2.0,
    contactPhone: '+91 98640 19283',
    address: 'Pamohi Wholesale Complex, Garchuk, Guwahati 781035'
  },
  {
    id: 'cs_nagaon_01',
    name: 'Central Assam Farmers Multipurpose Cold Storage',
    district: 'Nagaon',
    capacityTonnes: 6000,
    occupancyPct: 55,
    availableCapacityTonnes: 2700,
    dailyRentPerQ: 3.2,
    certifiedWdra: true,
    enwrLoanEligible: true,
    maxSafeHoldingDays: 210,
    temperatureCelsius: 4.0,
    contactPhone: '+91 94351 88472',
    address: 'Samaguri Industrial Estate, Nagaon 782140'
  },
  {
    id: 'cs_barpeta_01',
    name: 'Barpeta Rural Agribusiness Cold Godown',
    district: 'Barpeta',
    capacityTonnes: 4500,
    occupancyPct: 35,
    availableCapacityTonnes: 2925,
    dailyRentPerQ: 2.8,
    certifiedWdra: true,
    enwrLoanEligible: true,
    maxSafeHoldingDays: 150,
    temperatureCelsius: 4.5,
    contactPhone: '+91 94352 66311',
    address: 'Howly APMC Yard, Barpeta 781316'
  }
];

export const MOCK_FORECASTS: Record<string, ForecastTrajectory> = {
  mustard: {
    commodityId: 'mustard',
    mandiId: 'kharupetia',
    currentPrice: 5850,
    tactical7d: [
      { day: 1, label: 'Today (Observed)', p10: 5800, p50: 5850, p90: 5900, historicalActual: 5850, provenance: 'OBSERVED' },
      { day: 2, label: 'Tomorrow (TFT)', p10: 5820, p50: 5890, p90: 5960, provenance: 'FORECAST' },
      { day: 3, label: 'Day +3 (TFT)', p10: 5870, p50: 5970, p90: 6080, provenance: 'FORECAST' },
      { day: 4, label: 'Day +4 (TFT)', p10: 5910, p50: 6030, p90: 6150, provenance: 'FORECAST' },
      { day: 5, label: 'Day +5 (TFT)', p10: 5950, p50: 6090, p90: 6220, provenance: 'FORECAST' },
      { day: 6, label: 'Day +6 (TFT)', p10: 6000, p50: 6140, p90: 6290, provenance: 'FORECAST' },
      { day: 7, label: 'Day +7 (TFT)', p10: 6030, p50: 6200, p90: 6360, provenance: 'FORECAST' }
    ],
    storage30d: [
      { day: 7, label: 'Week 1', p10: 6030, p50: 6200, p90: 6360, provenance: 'FORECAST' },
      { day: 14, label: 'Week 2', p10: 6120, p50: 6320, p90: 6510, provenance: 'FORECAST' },
      { day: 21, label: 'Week 3', p10: 6180, p50: 6410, p90: 6640, provenance: 'FORECAST' },
      { day: 30, label: 'Week 4', p10: 6240, p50: 6520, p90: 6790, provenance: 'FORECAST' }
    ],
    preSowing90d: [
      { day: 30, label: 'Month 1', p10: 6240, p50: 6520, p90: 6790, provenance: 'SIMULATED' },
      { day: 60, label: 'Month 2', p10: 6350, p50: 6680, p90: 7010, provenance: 'SIMULATED' },
      { day: 90, label: 'Month 3', p10: 6400, p50: 6750, p90: 7120, provenance: 'SIMULATED' }
    ],
    recommendation: {
      action: 'HOLD',
      optimalDays: 14,
      expectedPriceDelta: +470,
      confidencePct: 91.2,
      rationale: 'Wholesale crushing demand is surging. Holding in certified warehouse for 14-20 days yields estimated +₹470/q extra, comfortably beating storage rent of ₹45/q.',
      assameseRationale: 'উত্তৰ ভাৰতৰ চাহিদা বৃদ্ধি পাইছে। ১৪-২০ দিন শীতল ভঁৰালত ৰাখিলে গুদাম খৰচ বাদ দিও প্ৰতি কুইণ্টলত প্ৰায় ₹৪২৫ অতিৰিক্ত লাভ হ’ব। বিক্ৰী নকৰি ৰাখক।'
    }
  },
  tomato: {
    commodityId: 'tomato',
    mandiId: 'kharupetia',
    currentPrice: 620,
    tactical7d: [
      { day: 1, label: 'Today (Observed)', p10: 590, p50: 620, p90: 650, historicalActual: 620, provenance: 'OBSERVED' },
      { day: 2, label: 'Tomorrow (TFT)', p10: 560, p50: 590, p90: 630, provenance: 'FORECAST' },
      { day: 3, label: 'Day +3 (TFT)', p10: 520, p50: 560, p90: 610, provenance: 'FORECAST' },
      { day: 4, label: 'Day +4 (TFT)', p10: 500, p50: 540, p90: 590, provenance: 'FORECAST' },
      { day: 5, label: 'Day +5 (TFT)', p10: 510, p50: 560, p90: 620, provenance: 'FORECAST' },
      { day: 6, label: 'Day +6 (TFT)', p10: 540, p50: 600, p90: 660, provenance: 'FORECAST' },
      { day: 7, label: 'Day +7 (TFT)', p10: 580, p50: 650, p90: 720, provenance: 'FORECAST' }
    ],
    storage30d: [
      { day: 7, label: 'Week 1', p10: 580, p50: 650, p90: 720, provenance: 'FORECAST' },
      { day: 14, label: 'Week 2', p10: 720, p50: 840, p90: 960, provenance: 'FORECAST' },
      { day: 21, label: 'Week 3', p10: 850, p50: 1020, p90: 1190, provenance: 'FORECAST' },
      { day: 30, label: 'Week 4', p10: 980, p50: 1200, p90: 1420, provenance: 'FORECAST' }
    ],
    preSowing90d: [
      { day: 30, label: 'Month 1', p10: 980, p50: 1200, p90: 1420, provenance: 'SIMULATED' },
      { day: 60, label: 'Month 2', p10: 1250, p50: 1550, p90: 1850, provenance: 'SIMULATED' },
      { day: 90, label: 'Month 3', p10: 1400, p50: 1750, p90: 2100, provenance: 'SIMULATED' }
    ],
    recommendation: {
      action: 'ROUTE_ARBITRAGE',
      optimalDays: 1,
      expectedPriceDelta: +595,
      confidencePct: 88.4,
      rationale: 'Severe local glut in Kharupetia (₹620/q). Route immediately to Guwahati Pamohi (₹1,450/q) for net realizable value of ₹1,215/q (+₹595/q net profit after transit & shrinkage).',
      assameseRationale: 'খাৰুপেটীয়াত তীব্ৰ আৱকৰ বাবে দাম ₹৬২০ লৈ নামিছে। ততাতৈয়াকৈ গুৱাহাটী পামহী বজাৰলৈ প্ৰেৰণ কৰক, খৰচ বাদ দিও প্ৰতি কুইণ্টলত ₹৫৯৫ অতিৰিক্ত লাভ হ’ব।'
    }
  },
  sali_paddy: {
    commodityId: 'sali_paddy',
    mandiId: 'nagaon',
    currentPrice: 2240,
    tactical7d: [
      { day: 1, label: 'Today (Observed)', p10: 2210, p50: 2240, p90: 2270, historicalActual: 2240, provenance: 'OBSERVED' },
      { day: 2, label: 'Tomorrow (TFT)', p10: 2220, p50: 2250, p90: 2280, provenance: 'FORECAST' },
      { day: 3, label: 'Day +3 (TFT)', p10: 2230, p50: 2265, p90: 2300, provenance: 'FORECAST' },
      { day: 4, label: 'Day +4 (TFT)', p10: 2240, p50: 2280, p90: 2320, provenance: 'FORECAST' },
      { day: 5, label: 'Day +5 (TFT)', p10: 2250, p50: 2300, p90: 2340, provenance: 'FORECAST' },
      { day: 6, label: 'Day +6 (TFT)', p10: 2260, p50: 2315, p90: 2360, provenance: 'FORECAST' },
      { day: 7, label: 'Day +7 (TFT)', p10: 2270, p50: 2330, p90: 2380, provenance: 'FORECAST' }
    ],
    storage30d: [
      { day: 7, label: 'Week 1', p10: 2270, p50: 2330, p90: 2380, provenance: 'FORECAST' },
      { day: 14, label: 'Week 2', p10: 2300, p50: 2370, p90: 2430, provenance: 'FORECAST' },
      { day: 21, label: 'Week 3', p10: 2320, p50: 2410, p90: 2480, provenance: 'FORECAST' },
      { day: 30, label: 'Week 4', p10: 2350, p50: 2450, p90: 2540, provenance: 'FORECAST' }
    ],
    preSowing90d: [
      { day: 30, label: 'Month 1', p10: 2350, p50: 2450, p90: 2540, provenance: 'SIMULATED' },
      { day: 60, label: 'Month 2', p10: 2420, p50: 2540, p90: 2650, provenance: 'SIMULATED' },
      { day: 90, label: 'Month 3', p10: 2480, p50: 2610, p90: 2750, provenance: 'SIMULATED' }
    ],
    recommendation: {
      action: 'COLD_STORE',
      optimalDays: 30,
      expectedPriceDelta: +210,
      confidencePct: 89.5,
      rationale: 'Current market (₹2,240/q) is ₹60 below statutory MSP (₹2,300/q). Store in WDRA godown and pledge under e-NWR for 7% credit rather than selling below MSP.',
      assameseRationale: 'বৰ্তমানৰ দাম চৰকাৰী সমৰ্থন মূল্য (MSP ₹২,৩০০) তকৈ কম। এতিয়া বিক্ৰী নকৰি গুদামত ৰাখি e-NWR ৰ জৰিয়তে সুলভ ৭% সুতত ঋণ লওক।'
    }
  }
};

export const MOCK_ALERTS: MarketAlert[] = [
  {
    id: 'alt_01',
    timestamp: '10 Mins Ago',
    severity: 'CRITICAL',
    title: 'Severe Tomato Price Crash in Kharupetia (Darrang)',
    titleAssamese: 'খাৰুপেটীয়াত বিলাহীৰ দাম তীব্ৰ হ্ৰাস (সতৰ্কবাৰ্তা)',
    message: 'Wholesale arrivals hit 450 tonnes; modal price plummeted to ₹620/q (cost: ₹850/q). FPOs advised to initiate immediate spatial arbitrage to Guwahati Pamohi.',
    messageAssamese: 'দৈনিক আৱক বৃদ্ধি পাই ৪৫০ টন হৈছে; দাম ₹৬২০ লৈ নামিছে। কৃষকসকলক গুৱাহাটী পামহী বজাৰলৈ প্ৰেৰণ কৰিবলৈ পৰামৰ্শ দিয়া হৈছে।',
    district: 'Darrang',
    commodity: 'Tomato',
    provenance: 'OBSERVED',
    actionableTarget: 'arbitrage'
  },
  {
    id: 'alt_02',
    timestamp: '42 Mins Ago',
    severity: 'WARNING',
    title: 'Sali Paddy Below Statutory MSP in Nagaon & Morigaon',
    titleAssamese: 'নগাঁৱত শালি ধানৰ দাম MSP তকৈ তললৈ',
    message: 'Prevailing wholesale rate ₹2,240/q is below GOI MSP ₹2,300/q. ASAMB procurement intervention and warehouse pledge advised.',
    messageAssamese: 'বৰ্তমান বজাৰ দৰ ₹২,২৪০/কুইণ্টল চৰকাৰী MSP ₹২,৩০০ তকৈ কম। গুদাম সংৰক্ষণৰ জৰিয়তে লোকচান ৰোধ কৰক।',
    district: 'Nagaon',
    commodity: 'Sali Paddy',
    provenance: 'OBSERVED',
    actionableTarget: 'storage'
  },
  {
    id: 'alt_03',
    timestamp: '2 Hours Ago',
    severity: 'OPPORTUNITY',
    title: 'Mustard 14-Day Price Surge Predicted (+₹470/q)',
    titleAssamese: 'সৰিয়হৰ দাম ১৪ দিনত বৃদ্ধিৰ পূৰ্বাভাস (+₹৪৭০)',
    message: 'TFT Model forecasts mustard to rise from ₹5,850/q to ₹6,320/q. Hold recommendation active across Darrang and Nalbari production clusters.',
    messageAssamese: 'আমাৰ AI পূৰ্বাভাস মতে সৰিয়হৰ দাম ₹৬,৩২০ লৈ বৃদ্ধি পাব। গুদামত ৰাখিলে অধিক লাভ হ’ব।',
    district: 'Darrang',
    commodity: 'Mustard',
    provenance: 'FORECAST',
    actionableTarget: 'forecast'
  },
  {
    id: 'alt_04',
    timestamp: '3 Hours Ago',
    severity: 'INFO',
    title: 'Copernicus Sentinel-2 Harvest Phenology Signal',
    titleAssamese: 'উপগ্ৰহ চিত্ৰত আলু চপোৱাৰ সংকেত',
    message: 'District NDVI decline in Goalpara & Dhubri indicates potato harvesting will peak in 10 days (+35% arrival surge expected).',
    messageAssamese: 'গোলপাৰা আৰু ধুবুৰীত ১০ দিনৰ ভিতৰত আলু চপোৱা সৰ্বাধিক হ’ব; শীতল ভঁৰাল সাজু ৰাখক।',
    district: 'Goalpara',
    commodity: 'Potato',
    provenance: 'SIMULATED',
    actionableTarget: 'storage'
  }
];

export const MOCK_ADMIN_LOGS = [
  { id: 'tx_981', timestamp: '2026-11-21 18:45:10', admin: 'DAO Darrang', action: 'Triggered MSP Deficit Alert to ASAMB', hash: '8f7a9c2...4e1d' },
  { id: 'tx_982', timestamp: '2026-11-21 17:30:22', admin: 'Secretary Kharupetia', action: 'Approved FPO Aggregation Dispatch (120 MT)', hash: '3d91b8a...7c22' },
  { id: 'tx_983', timestamp: '2026-11-21 16:15:05', admin: 'Directorate Agri, Dispur', action: 'Issued Paddy Procurement Order (FCI / ASAMB)', hash: 'e45fa01...99bc' },
  { id: 'tx_984', timestamp: '2026-11-21 14:02:40', admin: 'AAU Jorhat AMIU', action: 'Updated Weekly Regional Exogenous Price Features', hash: 'c12de45...66aa' }
];
