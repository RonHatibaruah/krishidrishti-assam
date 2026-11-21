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
  Info
} from 'lucide-react';
import L from 'leaflet';
import { ASSAM_MANDIS, ASSAM_COLD_STORAGES, ASSAM_COMMODITIES } from '../data/agri_price_data';
import { Mandi, ColdStorageFacility } from '../types/agri';

export const MandiGeospatialMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const [selectedMandi, setSelectedMandi] = useState<Mandi | null>(ASSAM_MANDIS[0]);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [showColdStorages, setShowColdStorages] = useState<boolean>(true);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Center on Assam (Dispur / Central Brahmaputra Valley)
    const map = L.map(mapContainerRef.current, {
      center: [26.2006, 92.5378],
      zoom: 8,
      zoomControl: true
    });

    // Dark Tactical CARTO tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      subdomains: ['a', 'b', 'c', 'd'],
      maxZoom: 18
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update map markers when filters or dependencies change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.CircleMarker || layer instanceof L.Polyline) {
        map.removeLayer(layer);
      }
    });

    // Filter mandis
    const filteredMandis = ASSAM_MANDIS.filter(m => 
      filterType === 'ALL' ? true : m.type === filterType
    );

    // Add Mandi Markers
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
            box-shadow: 0 0 12px ${markerColor}99;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 11px;
            font-weight: bold;
          ">
            M
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker([mandi.latitude, mandi.longitude], { icon: customIcon }).addTo(map);
      marker.on('click', () => {
        setSelectedMandi(mandi);
      });
      marker.bindTooltip(`<b>${mandi.name}</b><br/>${mandi.district} • ${mandi.dailyArrivalTonnes} MT/day`);
    });

    // Add Cold Storages Markers
    if (showColdStorages) {
      ASSAM_COLD_STORAGES.forEach((cs) => {
        // Approximate coordinates offset near district centres
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
              box-shadow: 0 0 10px #06b6d4aa;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 10px;
              font-weight: bold;
            ">
              CS
            </div>
          `,
          iconSize: [22, 22],
          iconAnchor: [11, 11]
        });

        const csMarker = L.marker([lat, lng], { icon: csIcon }).addTo(map);
        csMarker.bindTooltip(`<b>${cs.name}</b><br/>Capacity: ${cs.capacityTonnes} MT (${cs.occupancyPct}% full)`);
      });
    }

    // Draw main Arterial Transit Corridors (NH-27 / NH-15)
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
      opacity: 0.7,
      dashArray: '6, 6'
    }).addTo(map).bindTooltip('NH-27 Primary Agricultural Transit Corridor');

  }, [filterType, showColdStorages]);

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/60 text-emerald-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Spatial WebGIS Layer • PostGIS 3.4 Integration</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">
              Assam Statewide Mandi & Cold Storage Geospatial Intelligence Map
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Interactive geospatial tracking across 35 districts: Regulated APMC markets, primary assembly haats, cold storage networks, and National Highway transit corridors
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                filterType === 'ALL'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              All Mandis
            </button>
            <button
              onClick={() => setFilterType('TERMINAL_MARKET')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                filterType === 'TERMINAL_MARKET'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              Terminal Markets
            </button>
            <button
              onClick={() => setFilterType('APMC_REGULATED')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                filterType === 'APMC_REGULATED'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              APMC Regulated
            </button>
            <button
              onClick={() => setShowColdStorages(!showColdStorages)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border ${
                showColdStorages
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-800'
                  : 'bg-slate-950 text-slate-500 border-slate-800'
              }`}
            >
              {showColdStorages ? 'Cold Storages: ON' : 'Cold Storages: OFF'}
            </button>
          </div>
        </div>
      </div>

      {/* Map & Detail Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* WebGIS Leaflet Container */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow-xl flex flex-col">
          <div 
            ref={mapContainerRef} 
            className="w-full h-[520px] rounded-xl overflow-hidden z-10"
          />

          <div className="mt-3 px-2 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>Terminal Market</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
                <span>APMC Regulated</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span>Peak Glut / Price Crash</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-cyan-400"></span>
                <span>Cold Storage</span>
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              Coordinates: EPSG:4326 (WGS84)
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
