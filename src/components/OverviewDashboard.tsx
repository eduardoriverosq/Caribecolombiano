import React, { useState } from 'react';
import { 
  PORTS_DATA, 
  TRENDS_DATA, 
  SCHWARTZ_SCENARIOS 
} from '../data/maritimeData';
import { MaritimePort } from '../types';
import { PortDetailModal } from './PortDetailModal';
import { 
  Anchor, 
  TrendingUp, 
  AlertCircle, 
  GitFork, 
  Compass, 
  ChevronRight, 
  Waves, 
  Ship, 
  FileSpreadsheet,
  ArrowRight,
  Sparkles,
  MapPin,
  ShieldAlert
} from 'lucide-react';
import { TabId } from './Navbar';

interface OverviewDashboardProps {
  onNavigateTab: (tab: TabId) => void;
  onOpenAiConsultantWithPrompt: (prompt: string) => void;
  selectedHorizon: '2030' | '2040';
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  onNavigateTab,
  onOpenAiConsultantWithPrompt,
  selectedHorizon,
}) => {
  const [selectedPort, setSelectedPort] = useState<MaritimePort | null>(null);
  const [activePortFilter, setActivePortFilter] = useState<string>('all');

  const weakSignals = TRENDS_DATA.filter(t => t.type === 'weak_signal' || t.type === 'wild_card');
  const heavyTrends = TRENDS_DATA.filter(t => t.type === 'heavy_trend' || t.type === 'megatrend');

  const filteredPorts = activePortFilter === 'all' 
    ? PORTS_DATA 
    : PORTS_DATA.filter(p => p.id === activePortFilter);

  return (
    <div className="space-y-8 pb-12">
      {/* Hero / Strategic Statement */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-medium">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Sistema Integrado de Prospectiva Portuaria y Comercio Marítimo al {selectedHorizon}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight leading-tight">
            Observatorio Estratégico del Caribe Colombiano
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            Plataforma analítica basada en las principales escuelas de la prospectiva estratégica 
            (<span className="text-cyan-300 font-semibold">Escuela Francesa de Michel Godet:</span> MICMAC y MACTOR; 
            <span className="text-teal-300 font-semibold"> Escuela Anglo-Sajona de Peter Schwartz:</span> Escenarios 2x2; 
            <span className="text-amber-300 font-semibold"> Método Delphi:</span> Consenso de expertos portuarios; y 
            <span className="text-emerald-300 font-semibold"> Matriz IGO:</span> Planes de acción para el <span className="text-slate-100 font-medium">CONPES 3990</span>).
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigateTab('schwartz')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95"
            >
              <GitFork className="w-4 h-4" />
              <span>Explorar 4 Escenarios al 2040</span>
            </button>
            <button
              onClick={() => onNavigateTab('micmac')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 transition-all active:scale-95"
            >
              <span>Matriz Estructural MICMAC</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenAiConsultantWithPrompt("Realiza un diagnóstico prospectivo resumido del Caribe colombiano enfocado en los retos de calado, el Canal de Panamá y la descarbonización OMI 2050.")}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-teal-500/10 to-cyan-500/10 hover:from-teal-500/20 hover:to-cyan-500/20 text-cyan-300 font-medium text-xs sm:text-sm border border-cyan-500/30 transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Diagnóstico con Experto IA</span>
            </button>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Key Strategic Metrics Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1.5">
            <span>Volumen Contenedores</span>
            <Ship className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-100">3.4M+ TEUs</div>
          <div className="text-xs text-teal-400 font-medium mt-1">Cartagena nodo #1 transbordo</div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1.5">
            <span>Calado Natural Récord</span>
            <Waves className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-100">18.0 m</div>
          <div className="text-xs text-cyan-400 font-medium mt-1">Santa Marta (Sin dragado)</div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1.5">
            <span>Nuevo Polo Logístico</span>
            <Anchor className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-100">-350 km</div>
          <div className="text-xs text-amber-400 font-medium mt-1">Ahorro flete Urabá / Antioquia</div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1.5">
            <span>Transición OMI 2050</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-100">Cero Emisiones</div>
          <div className="text-xs text-rose-400 font-medium mt-1">Demanda de bunker metanol</div>
        </div>
      </div>

      {/* Interactive Map & Port Nodes Navigator */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-400" />
              Nodos Portuarios Estratégicos del Litoral Caribe
            </h3>
            <p className="text-xs text-slate-400">
              Selecciona un puerto para visualizar su perfil operativo, calado, ventajas competitivas y amenazas prospectivas.
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setActivePortFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activePortFilter === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              Todos ({PORTS_DATA.length})
            </button>
            {PORTS_DATA.map(p => (
              <button
                key={p.id}
                onClick={() => setActivePortFilter(p.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  activePortFilter === p.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                {p.city}
              </button>
            ))}
          </div>
        </div>

        {/* Coastal Schematic Map */}
        <div className="relative w-full h-72 sm:h-80 bg-slate-950/80 rounded-xl border border-slate-800/80 p-4 overflow-hidden mb-6 flex flex-col justify-between">
          <div className="absolute top-3 left-4 text-xs font-bold text-slate-500 uppercase tracking-widest pointer-events-none">
            Mar Caribe / Cuenca Suramericana
          </div>
          <div className="absolute bottom-3 right-4 text-[11px] text-slate-500 pointer-events-none">
            Territorio Continental & Marítimo de Colombia (DIMAR)
          </div>

          {/* Simulated Caribbean Coastline Graphic */}
          <svg className="w-full h-full absolute inset-0 opacity-40 pointer-events-none" viewBox="0 0 800 350" preserveAspectRatio="none">
            {/* Water ripples */}
            <path d="M 0 60 Q 200 40 400 70 T 800 50 L 800 0 L 0 0 Z" fill="rgba(6, 182, 212, 0.05)" />
            {/* Coastline curve */}
            <path 
              d="M 50 320 Q 120 280 180 260 T 260 220 T 360 200 T 480 180 T 600 140 T 750 90 L 800 350 L 0 350 Z" 
              fill="rgba(15, 23, 42, 0.9)" 
              stroke="rgba(56, 189, 248, 0.4)" 
              strokeWidth="2" 
              strokeDasharray="4 4"
            />
          </svg>

          {/* Interactive Port Pins overlay positioned geographically */}
          <div className="relative w-full h-full">
            {/* San Andrés (Insular top-left) */}
            <div 
              onClick={() => setSelectedPort(PORTS_DATA.find(p => p.id === 'san-andres')!)}
              className="absolute top-6 left-6 cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 bg-slate-900/90 hover:bg-cyan-950 p-1.5 rounded-lg border border-cyan-800/80 shadow-lg transition-transform group-hover:scale-105">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-300">San Andrés</span>
                <span className="text-[10px] text-slate-400 bg-slate-800 px-1 rounded">7.2m</span>
              </div>
            </div>

            {/* Urabá (South-West) */}
            <div 
              onClick={() => setSelectedPort(PORTS_DATA.find(p => p.id === 'uraba')!)}
              className="absolute bottom-10 left-16 sm:left-24 cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 bg-slate-900/90 hover:bg-cyan-950 p-1.5 rounded-lg border border-teal-800/80 shadow-lg transition-transform group-hover:scale-105">
                <div className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                <span className="text-xs font-bold text-slate-200 group-hover:text-teal-300">Puerto Antioquia (Urabá)</span>
                <span className="text-[10px] text-teal-400 bg-slate-800 px-1 rounded">14.5m</span>
              </div>
            </div>

            {/* Morrosquillo (Center-South) */}
            <div 
              onClick={() => setSelectedPort(PORTS_DATA.find(p => p.id === 'morrosquillo')!)}
              className="absolute bottom-16 left-48 sm:left-64 cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 bg-slate-900/90 hover:bg-cyan-950 p-1.5 rounded-lg border border-slate-700 shadow-lg transition-transform group-hover:scale-105">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-xs font-bold text-slate-200 group-hover:text-amber-300">Golfo Morrosquillo</span>
                <span className="text-[10px] text-slate-400 bg-slate-800 px-1 rounded">22m</span>
              </div>
            </div>

            {/* Cartagena (Center Hub) */}
            <div 
              onClick={() => setSelectedPort(PORTS_DATA.find(p => p.id === 'cartagena')!)}
              className="absolute top-36 left-72 sm:left-96 cursor-pointer group z-10"
            >
              <div className="flex items-center gap-2 bg-cyan-950/90 hover:bg-cyan-900 p-2 rounded-xl border-2 border-cyan-400 shadow-xl shadow-cyan-950 transition-transform group-hover:scale-110">
                <div className="w-3 h-3 rounded-full bg-cyan-300 animate-pulse" />
                <div>
                  <div className="text-xs font-extrabold text-cyan-200 flex items-center gap-1">
                    Cartagena de Indias
                    <span className="text-[9px] bg-cyan-500 text-slate-950 font-black px-1 rounded">HUB #1</span>
                  </div>
                  <div className="text-[10px] text-cyan-300/80">15.5m calado • 3.4M TEU</div>
                </div>
              </div>
            </div>

            {/* Barranquilla (Estuary) */}
            <div 
              onClick={() => setSelectedPort(PORTS_DATA.find(p => p.id === 'barranquilla')!)}
              className="absolute top-24 right-52 sm:right-72 cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 bg-slate-900/90 hover:bg-cyan-950 p-1.5 rounded-lg border border-slate-700 shadow-lg transition-transform group-hover:scale-105">
                <div className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                <span className="text-xs font-bold text-slate-200 group-hover:text-sky-300">Barranquilla</span>
                <span className="text-[10px] text-sky-400 bg-slate-800 px-1 rounded">10.2m</span>
              </div>
            </div>

            {/* Santa Marta (Deep Water) */}
            <div 
              onClick={() => setSelectedPort(PORTS_DATA.find(p => p.id === 'santa-marta')!)}
              className="absolute top-16 right-32 sm:right-44 cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 bg-slate-900/90 hover:bg-cyan-950 p-1.5 rounded-lg border border-teal-700/80 shadow-lg transition-transform group-hover:scale-105">
                <div className="w-2.5 h-2.5 rounded-full bg-teal-300" />
                <span className="text-xs font-bold text-slate-200 group-hover:text-teal-300">Santa Marta</span>
                <span className="text-[10px] text-teal-300 bg-slate-800 px-1 rounded">18.0m natural</span>
              </div>
            </div>

            {/* La Guajira (North-East) */}
            <div 
              onClick={() => setSelectedPort(PORTS_DATA.find(p => p.id === 'guajira')!)}
              className="absolute top-8 right-6 cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 bg-slate-900/90 hover:bg-cyan-950 p-1.5 rounded-lg border border-slate-700 shadow-lg transition-transform group-hover:scale-105">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                <span className="text-xs font-bold text-slate-200 group-hover:text-purple-300">La Guajira (Pto. Bolívar)</span>
                <span className="text-[10px] text-purple-300 bg-slate-800 px-1 rounded">19.5m</span>
              </div>
            </div>
          </div>
        </div>

        {/* Port Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPorts.map((port) => (
            <div
              key={port.id}
              onClick={() => setSelectedPort(port)}
              className="bg-slate-900/90 hover:bg-slate-850 p-4 rounded-xl border border-slate-800 hover:border-cyan-700/60 transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {port.type}
                  </span>
                  <span className="text-xs text-cyan-400 font-bold">
                    Calado: {port.maxDraftMeters}m
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                  {port.name}
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1" />
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1.5">
                  {port.description}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">
                  {port.highlightStat}
                </span>
                <span className="text-cyan-400 font-medium">Ver detalles &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prospective Methodologies Matrix Section */}
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-100">
            Metodologías de Prospectiva Integradas en el Observatorio
          </h3>
          <p className="text-xs text-slate-400">
            Articulación rigurosa de herramientas cuantitativas y cualitativas de la literatura de prospectiva estratégica:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: MICMAC */}
          <div 
            onClick={() => onNavigateTab('micmac')}
            className="bg-slate-900/80 hover:bg-slate-850 p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-cyan-800">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
              Escuela Francesa (Godet)
            </div>
            <h4 className="text-sm font-bold text-slate-100 mb-1.5">
              Análisis Estructural (MICMAC)
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Mapea el plano de <strong>Motricidad vs. Dependencia</strong> para aislar las variables clave (calado, OMI, intermodalidad) de las de resultado.
            </p>
            <span className="text-xs text-cyan-400 font-semibold inline-flex items-center gap-1 group-hover:underline">
              Abrir Cuadrantes de Godet &rarr;
            </span>
          </div>

          {/* Card 2: MACTOR */}
          <div 
            onClick={() => onNavigateTab('mactor')}
            className="bg-slate-900/80 hover:bg-slate-850 p-5 rounded-2xl border border-slate-800 hover:border-teal-500/50 cursor-pointer transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-teal-950 text-teal-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-teal-800">
              <Ship className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">
              Juego de Actores (Godet)
            </div>
            <h4 className="text-sm font-bold text-slate-100 mb-1.5">
              Método MACTOR
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Matriz de alianzas y conflictos entre <strong>DIMAR, Navieras Globales, Operadores, Gremios y Comunidades</strong> frente a objetivos 2030.
            </p>
            <span className="text-xs text-teal-400 font-semibold inline-flex items-center gap-1 group-hover:underline">
              Examinar Posiciones &rarr;
            </span>
          </div>

          {/* Card 3: Schwartz Scenarios */}
          <div 
            onClick={() => onNavigateTab('schwartz')}
            className="bg-slate-900/80 hover:bg-slate-850 p-5 rounded-2xl border border-slate-800 hover:border-amber-500/50 cursor-pointer transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-950 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-amber-800">
              <GitFork className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              Escuela Anglo-Sajona (GBN)
            </div>
            <h4 className="text-sm font-bold text-slate-100 mb-1.5">
              Ejes de Peter Schwartz (2x2)
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Cruce de incertidumbres críticas: Gobernanza e Intermodalidad vs. Transición Verde Global. <strong>4 Escenarios Contrastados al 2040</strong>.
            </p>
            <span className="text-xs text-amber-400 font-semibold inline-flex items-center gap-1 group-hover:underline">
              Explorar Escenarios &rarr;
            </span>
          </div>

          {/* Card 4: Delphi & IGO */}
          <div 
            onClick={() => onNavigateTab('delphi')}
            className="bg-slate-900/80 hover:bg-slate-850 p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-emerald-800">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
              Consenso & Priorización
            </div>
            <h4 className="text-sm font-bold text-slate-100 mb-1.5">
              Delphi & Matriz IGO
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Consultas iterativas a expertos de DIMAR y gremios, más la priorización de acciones para el <strong>CONPES 3990</strong> según gobernabilidad.
            </p>
            <span className="text-xs text-emerald-400 font-semibold inline-flex items-center gap-1 group-hover:underline">
              Votar en Delphi & IGO &rarr;
            </span>
          </div>
        </div>
      </div>

      {/* Critical Early Warning Signals Ticker */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              Vigilancia Prospectiva: Señales Débiles y Cisnes Negros
            </h3>
          </div>
          <button
            onClick={() => onNavigateTab('radar')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-medium"
          >
            Ver radar completo ({TRENDS_DATA.length}) &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {weakSignals.slice(0, 4).map((sig) => (
            <div key={sig.id} className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                  sig.type === 'wild_card' 
                    ? 'bg-rose-950 text-rose-300 border border-rose-800' 
                    : 'bg-amber-950 text-amber-300 border border-amber-800'
                }`}>
                  {sig.type === 'wild_card' ? 'Cisne Negro (Wild Card)' : 'Señal Débil'}
                </span>
                <span className="text-[11px] text-slate-400">{sig.horizonYears}</span>
              </div>
              <h4 className="text-xs font-bold text-slate-200 mb-1">{sig.title}</h4>
              <p className="text-xs text-slate-400 line-clamp-2">{sig.prospectiveImplication}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Port Detail Modal */}
      <PortDetailModal
        port={selectedPort}
        onClose={() => setSelectedPort(null)}
        onConsultAi={(prompt) => {
          setSelectedPort(null);
          onOpenAiConsultantWithPrompt(prompt);
        }}
      />
    </div>
  );
};
