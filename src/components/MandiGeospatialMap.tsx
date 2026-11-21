import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Warehouse, 
  Layers, 
  Filter, 
  Sparkles, 
  Navigation, 
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Info,
  Globe,
  Moon,
  Sun,
  Compass,
  Check,
  Radio
} from 'lucide-react';
import L from 'leaflet';
import { ASSAM_MANDIS, ASSAM_COLD_STORAGES, ASSAM_COMMODITIES } from '../data/agri_price_data';
import { Mandi, ColdStorageFacility } from '../types/agri';

// Free digital map layers configurations (100% Free / Generous Free Tier, no credit card required)
interface FreeMapLayer {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  category: 'satellite' | 'dark' | 'street' | 'light';
  url: string;
  attribution: string;
  subdomains?: string[];
  maxZoom: number;
  hasReferenceLabels?: boolean;
  referenceUrl?: string;
  description: string;
}

const FREE_MAP_LAYERS: FreeMapLayer[] = [
  {
    id: 'esri-satellite',
    name: 'ESRI World Imagery (Satellite)',
    shortName: 'Satellite HD',
    badge: '100% Free • Field-Level Satellite',
    category: 'satellite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, GIS User Community',
    maxZoom: 18,
    hasReferenceLabels: true,
    referenceUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
    description: 'High-resolution true-color satellite imagery showing agricultural cropland, Brahmaputra sandbars, and rural roads.'
  },
  {
    id: 'carto-dark',
    name: 'CARTO Dark Matter',
    shortName: 'Tactical Dark',
    badge: 'Free Tier • Night Operations',
    category: 'dark',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    subdomains: ['a', 'b', 'c', 'd'],
    maxZoom: 18,
    description: 'Sleek dark theme optimized for viewing highlighted mandi pins, price vectors, and glut warnings.'
  },
  {
    id: 'osm-standard',
    name: 'OpenStreetMap (OSM Standard)',
    shortName: 'Street & Rural Roads',
    badge: '100% Free • Open Community Data',
    category: 'street',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors (ODbL)',
    maxZoom: 19,
    description: 'Unrestricted open-source street map with rich rural road networks, bridges, and local village haats.'
  },
  {
    id: 'carto-voyager',
    name: 'CARTO Voyager (Clean Day)',
    shortName: 'Clean Light',
    badge: 'Free Tier • Field Administration',
    category: 'light',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    subdomains: ['a', 'b', 'c', 'd'],
    maxZoom: 18,
    description: 'Balanced light cartography suited for daytime agricultural officer review and presentations.'
  }
];

export const MandiGeospatialMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const baseTileLayerRef = useRef<L.TileLayer | null>(null);
  const labelsTileLayerRef = useRef<L.TileLayer | null>(null);
  const featureGroupRef = useRef<L.FeatureGroup | null>(null);

  const [selectedLayerId, setSelectedLayerId] = useState<string>('esri-satellite');
  const [selectedMandi, setSelectedMandi] = useState<Mandi | null>(ASSAM_MANDIS[0]);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [showColdStorages, setShowColdStorages] = useState<boolean>(true);
  const [showCatchmentRadii, setShowCatchmentRadii] = useState<boolean>(true);
  const [showHighwayCorridors, setShowHighwayCorridors] = useState<boolean>(true);

  const activeLayerConfig = FREE_MAP_LAYERS.find(l => l.id === selectedLayerId) || FREE_MAP_LAYERS[0];

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Center on Assam (Dispur / Central Brahmaputra Valley)
    const map = L.map(mapContainerRef.current, {
      center: [26.2006, 92.5378],
      zoom: 8,
      zoomControl: false // Custom placement below
    });

    // Add zoom control at bottom right to prevent collision with layer picker
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Feature group for interactive pins, lines, and catchment circles
    const featureGroup = L.featureGroup().addTo(map);
    featureGroupRef.current = featureGroup;

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Base Tile Layer dynamically whenever selectedLayerId changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove prior base layer
    if (baseTileLayerRef.current) {
      map.removeLayer(baseTileLayerRef.current);
      baseTileLayerRef.current = null;
    }
    // Remove prior label overlay layer
    if (labelsTileLayerRef.current) {
      map.removeLayer(labelsTileLayerRef.current);
      labelsTileLayerRef.current = null;
    }

    // Add new base layer
    const newBaseLayer = L.tileLayer(activeLayerConfig.url, {
      attribution: activeLayerConfig.attribution,
      subdomains: activeLayerConfig.subdomains || ['a', 'b', 'c', 'd'],
      maxZoom: activeLayerConfig.maxZoom
    }).addTo(map);

    baseTileLayerRef.current = newBaseLayer;

    // If layer has hybrid labels (e.g., satellite mode), add boundary & label overlay on top
    if (activeLayerConfig.hasReferenceLabels && activeLayerConfig.referenceUrl) {
      const refLabels = L.tileLayer(activeLayerConfig.referenceUrl, {
        pane: 'overlayPane',
        maxZoom: activeLayerConfig.maxZoom,
        opacity: 0.85
      }).addTo(map);
      labelsTileLayerRef.current = refLabels;
    }
  }, [selectedLayerId]);

  // Update Map Markers, Catchments, and Highway Corridors
  useEffect(() => {
    const featureGroup = featureGroupRef.current;
    if (!featureGroup) return;

    featureGroup.clearLayers();

    // Filter mandis
    const filteredMandis = ASSAM_MANDIS.filter(m => 
      filterType === 'ALL' ? true : m.type === filterType
    );

    // 1. Draw 30km Farmer Catchment Radii (if enabled)
    if (showCatchmentRadii) {
      filteredMandis.forEach((mandi) => {
        const isTerminal = mandi.type === 'TERMINAL_MARKET';
        const radiusMeters = isTerminal ? 35000 : 20000; // 35km for terminal, 20km for APMC
        const circleColor = isTerminal ? '#10b981' : '#0284c7';

        const circle = L.circle([mandi.latitude, mandi.longitude], {
          radius: radiusMeters,
          color: circleColor,
          fillColor: circleColor,
          fillOpacity: 0.08,
          weight: 1,
          dashArray: '3, 4'
        }).addTo(featureGroup);

        circle.bindTooltip(`${mandi.name}: ${radiusMeters / 1000}km Farmer Procurement Catchment Zone`, {
          sticky: true,
          className: 'bg-slate-900 text-xs text-white border border-slate-700 px-2 py-1 rounded shadow'
        });
      });
    }

    // 2. Add Mandi Markers
    filteredMandis.forEach((mandi) => {
      const isTerminal = mandi.type === 'TERMINAL_MARKET';
      const isGlut = mandi.status === 'PEAK_GLUT';
      const markerColor = isGlut ? '#ef4444' : isTerminal ? '#10b981' : '#0284c7';

      const customIcon = L.divIcon({
        className: 'custom-mandi-pin',
        html: `
          <div style="
            background: ${markerColor};
            width: 28px;
            height: 28px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 0 14px ${markerColor}cc;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 11px;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.2s ease;
          " onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">
            M
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker([mandi.latitude, mandi.longitude], { icon: customIcon }).addTo(featureGroup);
      marker.on('click', () => {
        setSelectedMandi(mandi);
      });
      marker.bindTooltip(`
        <div style="font-family: sans-serif; font-size: 12px; line-height: 1.4;">
          <strong style="color: #10b981;">${mandi.name}</strong> (${mandi.assameseName})<br/>
          <span>${mandi.district} • ${mandi.dailyArrivalTonnes} MT/day</span><br/>
          <span style="color: #94a3b8; font-size: 10px;">Status: ${mandi.status.replace('_', ' ')}</span>
        </div>
      `, { sticky: true });
    });

    // 3. Add Cold Storages Markers
    if (showColdStorages) {
      ASSAM_COLD_STORAGES.forEach((cs) => {
        const districtMandi = ASSAM_MANDIS.find(m => m.district === cs.district) || ASSAM_MANDIS[0];
        const lat = districtMandi.latitude + 0.04;
        const lng = districtMandi.longitude + 0.03;

        const csIcon = L.divIcon({
          className: 'custom-cs-pin',
          html: `
            <div style="
              background: #06b6d4;
              width: 22px;
              height: 22px;
              border-radius: 6px;
              border: 1.5px solid white;
              box-shadow: 0 0 10px #06b6d4cc;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 10px;
              font-weight: bold;
              cursor: pointer;
            ">
              CS
            </div>
          `,
          iconSize: [22, 22],
          iconAnchor: [11, 11]
        });

        const csMarker = L.marker([lat, lng], { icon: csIcon }).addTo(featureGroup);
        csMarker.bindTooltip(`
          <div style="font-family: sans-serif; font-size: 12px; line-height: 1.3;">
            <strong style="color: #06b6d4;">${cs.name}</strong><br/>
            <span>Capacity: ${cs.capacityTonnes} MT (${cs.occupancyPct}% full)</span><br/>
            <span style="color: #10b981; font-weight: 600;">e-NWR Accredited • ₹${cs.dailyRentPerQ}/Q/day</span>
          </div>
        `, { sticky: true });
      });
    }

    // 4. Draw NH-27 & NH-15 Arterial Agricultural Transit Corridors
    if (showHighwayCorridors) {
      const nh27Coords: [number, number][] = [
        [26.0194, 89.9744], // Dhubri
        [26.4312, 90.9687], // Howly
        [26.4442, 91.4398], // Nalbari
        [26.1158, 91.6854], // Guwahati Pamohi
        [26.3475, 92.6841], // Nagaon
        [26.7509, 94.2037]  // Jorhat
      ];

      L.polyline(nh27Coords, {
        color: '#10b981',
        weight: 3.5,
        opacity: 0.85,
        dashArray: '6, 6'
      }).addTo(featureGroup).bindTooltip('NH-27 East-West Agro Logistics Expressway');

      const nh15Coords: [number, number][] = [
        [26.4442, 91.4398], // Nalbari
        [26.6338, 92.7926], // Tezpur
        [27.4728, 94.9120]  // Dibrugarh
      ];

      L.polyline(nh15Coords, {
        color: '#f59e0b',
        weight: 3,
        opacity: 0.85,
        dashArray: '4, 4'
      }).addTo(featureGroup).bindTooltip('NH-15 North Bank Agricultural Arterial Route');
    }

  }, [filterType, showColdStorages, showCatchmentRadii, showHighwayCorridors]);

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/60 text-emerald-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Multi-Layer Free WebGIS • PostGIS 3.4 Integration</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">
              Assam Statewide Mandi & Cold Storage Geospatial Intelligence Map
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Interactive geospatial tracking across 35 districts with switchable free digital map layers (ESRI High-Res Satellite, CARTO Dark Matter, OpenStreetMap, CARTO Voyager).
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                filterType === 'ALL'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
              }`}
            >
              All Mandis
            </button>
            <button
              onClick={() => setFilterType('TERMINAL_MARKET')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                filterType === 'TERMINAL_MARKET'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
              }`}
            >
              Terminal Markets
            </button>
            <button
              onClick={() => setFilterType('APMC_REGULATED')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                filterType === 'APMC_REGULATED'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
              }`}
            >
              APMC Regulated
            </button>
            <button
              onClick={() => setShowColdStorages(!showColdStorages)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border transition-all ${
                showColdStorages
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-800'
                  : 'bg-slate-950 text-slate-500 border-slate-800'
              }`}
            >
              {showColdStorages ? 'Cold Storages: ON' : 'Cold Storages: OFF'}
            </button>
          </div>
        </div>

        {/* Digital Map Layer Selector Ribbon */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Digital Basemap Layer:</span>
            <span className="text-[11px] font-normal text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full">
              {activeLayerConfig.badge}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {FREE_MAP_LAYERS.map((layer) => {
              const isSelected = layer.id === selectedLayerId;
              return (
                <button
                  key={layer.id}
                  onClick={() => setSelectedLayerId(layer.id)}
                  title={layer.description}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {layer.category === 'satellite' && <Globe className="w-3.5 h-3.5" />}
                  {layer.category === 'dark' && <Moon className="w-3.5 h-3.5" />}
                  {layer.category === 'street' && <Compass className="w-3.5 h-3.5" />}
                  {layer.category === 'light' && <Sun className="w-3.5 h-3.5" />}
                  <span>{layer.shortName}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-white ml-0.5" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Map & Detail Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* WebGIS Leaflet Container */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow-xl flex flex-col">
          {/* Layer Quick Toggles Bar */}
          <div className="mb-2 px-1 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider">Overlays:</span>
              <button
                onClick={() => setShowCatchmentRadii(!showCatchmentRadii)}
                className={`px-2 py-1 rounded text-[11px] font-medium border cursor-pointer transition-all ${
                  showCatchmentRadii
                    ? 'bg-emerald-950/70 border-emerald-700 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
              >
                30km Catchment Buffers
              </button>
              <button
                onClick={() => setShowHighwayCorridors(!showHighwayCorridors)}
                className={`px-2 py-1 rounded text-[11px] font-medium border cursor-pointer transition-all ${
                  showHighwayCorridors
                    ? 'bg-amber-950/70 border-amber-700 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
              >
                NH Arterial Expressways
              </button>
            </div>

            <div className="text-[11px] text-slate-400 italic">
              {activeLayerConfig.name}
            </div>
          </div>

          <div 
            ref={mapContainerRef} 
            className="w-full h-[520px] rounded-xl overflow-hidden z-10 border border-slate-800"
          />

          {/* Map Legend and Coordinate Reference Info */}
          <div className="mt-3 px-2 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>Terminal Market (35km Catchment)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
                <span>APMC Regulated (20km Catchment)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span>Peak Glut / Price Crash</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-cyan-400"></span>
                <span>Cold Storage</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 bg-emerald-400 border-dashed"></span>
                <span>NH-27</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 bg-amber-400 border-dashed"></span>
                <span>NH-15</span>
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              CRS: EPSG:3857 / WGS84
            </span>
          </div>

          {/* Description of Current Layer */}
          <div className="mt-2.5 pt-2 border-t border-slate-800/80 px-2 flex items-center justify-between text-[11px] text-slate-400">
            <span className="truncate mr-2">
              <strong className="text-slate-300">Active Map Source:</strong> {activeLayerConfig.description}
            </span>
            <span className="shrink-0 text-emerald-400 font-medium">
              Zero-Cost / Public Domain
            </span>
          </div>
        </div>

        {/* Selected Mandi Intelligence Sidebar */}
        {selectedMandi && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-lg font-bold text-white">{selectedMandi.name}</h2>
                  <p className="text-xs text-emerald-400 font-medium">{selectedMandi.assameseName}</p>
                  <p className="text-xs text-slate-400 mt-1">District: {selectedMandi.district}</p>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                  selectedMandi.status === 'PEAK_GLUT' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                  selectedMandi.status === 'PRICE_CRASH_ALERT' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                  'bg-emerald-950 text-emerald-300 border border-emerald-800'
                }`}>
                  {selectedMandi.status.replace('_', ' ')}
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Daily Arrival Volume:</span>
                  <span className="font-bold text-white font-mono">{selectedMandi.dailyArrivalTonnes} MT / day</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Average Daily Turnover:</span>
                  <span className="font-bold text-emerald-400 font-mono">₹{selectedMandi.avgDailyTurnoverLakhs} Lakhs</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Cold Storage Proximity:</span>
                  <span className="font-bold text-cyan-300 font-mono">{selectedMandi.coldStorageCapacityTonnes} MT Capacity</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Connected Highway:</span>
                  <span className="font-bold text-slate-200">{selectedMandi.connectedHighway}</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-xs font-semibold text-slate-300 mb-2">Key Commodities Handled:</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedMandi.commoditiesHandled.map(cid => {
                    const c = ASSAM_COMMODITIES.find(item => item.id === cid);
                    return (
                      <span key={cid} className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg">
                        {c ? c.name : cid}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                <span className="font-semibold text-slate-300">Secretariat Contact:</span><br/>
                {selectedMandi.contactSecretariat}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-xs text-emerald-300">
                <span className="font-bold">Spatial Mandi Arbitrage Active:</span> Live rate differences are continuously computed between this hub and 7 other regional markets.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
