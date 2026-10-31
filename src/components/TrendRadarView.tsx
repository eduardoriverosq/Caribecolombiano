import React, { useState } from 'react';
import { TRENDS_DATA, PORTS_DATA } from '../data/maritimeData';
import { TrendItem, TrendType, TrendCategory } from '../types';
import { 
  Radar, 
  Filter, 
  Sparkles, 
  AlertTriangle, 
  Compass, 
  Anchor, 
  ExternalLink, 
  Info,
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';

interface TrendRadarViewProps {
  onConsultAi: (prompt: string) => void;
}

export const TrendRadarView: React.FC<TrendRadarViewProps> = ({ onConsultAi }) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTrend, setActiveTrend] = useState<TrendItem | null>(null);

  const filteredTrends = TRENDS_DATA.filter((t) => {
    const matchesType = selectedType === 'all' || t.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    return matchesType && matchesCategory;
  });

  const getCategoryColor = (cat: TrendCategory) => {
    switch (cat) {
      case 'geopolitica': return 'text-purple-400 bg-purple-950/60 border-purple-800/80';
      case 'tecnologica': return 'text-cyan-400 bg-cyan-950/60 border-cyan-800/80';
      case 'ambiental': return 'text-emerald-400 bg-emerald-950/60 border-emerald-800/80';
      case 'infraestructura': return 'text-amber-400 bg-amber-950/60 border-amber-800/80';
      case 'gobernanza': return 'text-blue-400 bg-blue-950/60 border-blue-800/80';
      default: return 'text-slate-400 bg-slate-800 border-slate-700';
    }
  };

  const getTypeBadge = (type: TrendType) => {
    switch (type) {
      case 'megatrend':
        return { label: 'Megatendencia', class: 'bg-indigo-950/80 text-indigo-300 border-indigo-800' };
      case 'heavy_trend':
        return { label: 'Tendencia Pesada', class: 'bg-cyan-950/80 text-cyan-300 border-cyan-800' };
      case 'weak_signal':
        return { label: 'Señal Débil', class: 'bg-amber-950/80 text-amber-300 border-amber-800' };
      case 'wild_card':
        return { label: 'Cisne Negro (Wild Card)', class: 'bg-rose-950/80 text-rose-300 border-rose-800' };
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60 mb-2">
              <Radar className="w-3.5 h-3.5" />
              <span>Vigilancia Prospectiva y Escaneo del Entorno (Horizon Scanning)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
              Radar de Tendencias del Comercio Marítimo en el Caribe
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Factores de cambio clasificados según la metodología de prospectiva: Megatendencias globales, Tendencias pesadas estructurales, Señales débiles emergentes y Cisnes negros (Wild Cards).
            </p>
          </div>

          <button
            onClick={() => onConsultAi("¿Cuáles son las 3 principales señales débiles del Caribe marítimo colombiano que podrían convertirse en tendencias pesadas antes del 2035?")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500/20 to-cyan-500/20 hover:from-teal-500/30 hover:to-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs sm:text-sm font-semibold transition-all active:scale-95 shrink-0"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Consultar Señales con IA</span>
          </button>
        </div>

        {/* Filters */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mr-1">
              <Filter className="w-3.5 h-3.5" />
              Tipo de Tendencia:
            </span>
            {[
              { id: 'all', label: 'Todas' },
              { id: 'megatrend', label: 'Megatendencias' },
              { id: 'heavy_trend', label: 'Tendencias Pesadas' },
              { id: 'weak_signal', label: 'Señales Débiles' },
              { id: 'wild_card', label: 'Cisnes Negros' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setSelectedType(btn.id)}
                className={`text-xs px-3 py-1 rounded-lg font-medium transition-colors ${
                  selectedType === btn.id
                    ? 'bg-cyan-600 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium mr-1">
              Dimensión:
            </span>
            {[
              { id: 'all', label: 'Todas' },
              { id: 'geopolitica', label: 'Geopolítica' },
              { id: 'tecnologica', label: 'Tecnológica' },
              { id: 'ambiental', label: 'Ambiental' },
              { id: 'infraestructura', label: 'Infraestructura' },
              { id: 'gobernanza', label: 'Gobernanza' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-slate-700 text-slate-100 font-semibold border border-slate-600'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Graphical Radar Component */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            Visualizador Polar de Horizontes (Radar)
          </h3>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-400" /> Corto (2026-2028)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-teal-400" /> Medio (2029-2034)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-400" /> Largo (2035-2045)</span>
          </div>
        </div>

        {/* SVG Circular Radar Map */}
        <div className="relative w-full max-w-2xl mx-auto aspect-square max-h-96 flex items-center justify-center p-4">
          <svg className="w-full h-full" viewBox="0 0 400 400">
            {/* Concentric rings */}
            <circle cx="200" cy="200" r="180" fill="none" stroke="rgba(51, 65, 85, 0.4)" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="200" cy="200" r="120" fill="none" stroke="rgba(51, 65, 85, 0.6)" strokeWidth="1" />
            <circle cx="200" cy="200" r="60" fill="none" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1.5" />
            <circle cx="200" cy="200" r="6" fill="#06b6d4" />

            {/* Axes */}
            <line x1="20" y1="200" x2="380" y2="200" stroke="rgba(51, 65, 85, 0.5)" strokeWidth="1" />
            <line x1="200" y1="20" x2="200" y2="380" stroke="rgba(51, 65, 85, 0.5)" strokeWidth="1" />

            {/* Labels for rings */}
            <text x="205" y="195" fill="#06b6d4" fontSize="9" fontWeight="bold">PRESENTE</text>
            <text x="205" y="145" fill="#38bdf8" fontSize="8">CORTO PLAZO (2026-2028)</text>
            <text x="205" y="85" fill="#2dd4bf" fontSize="8">MEDIO PLAZO (2029-2034)</text>
            <text x="205" y="25" fill="#a855f7" fontSize="8">LARGO PLAZO (2035-2045)</text>

            {/* Quadrant categories labels */}
            <text x="310" y="45" fill="#94a3b8" fontSize="9" fontWeight="bold">GEOPOLÍTICA</text>
            <text x="40" y="45" fill="#94a3b8" fontSize="9" fontWeight="bold">TECNOLOGÍA</text>
            <text x="40" y="365" fill="#94a3b8" fontSize="9" fontWeight="bold">AMBIENTAL</text>
            <text x="290" y="365" fill="#94a3b8" fontSize="9" fontWeight="bold">INFRAESTRUCTURA</text>

            {/* Plotted Trend Items on the Radar */}
            {filteredTrends.map((t, idx) => {
              // Deterministic polar positioning based on id and category
              let baseAngle = 0;
              if (t.category === 'geopolitica') baseAngle = 30 + (idx * 22) % 60;
              else if (t.category === 'tecnologica') baseAngle = 110 + (idx * 22) % 60;
              else if (t.category === 'ambiental') baseAngle = 200 + (idx * 22) % 60;
              else if (t.category === 'infraestructura') baseAngle = 280 + (idx * 22) % 50;
              else baseAngle = 340 + (idx * 15) % 30;

              let radius = 45;
              if (t.horizon === 'corto') radius = 50 + (t.impactScore * 10);
              else if (t.horizon === 'medio') radius = 100 + (t.impactScore * 8);
              else radius = 145 + (t.impactScore * 6);

              const rad = (baseAngle * Math.PI) / 180;
              const x = 200 + radius * Math.cos(rad);
              const y = 200 + radius * Math.sin(rad);

              const isSelected = activeTrend?.id === t.id;
              const isWild = t.type === 'wild_card';

              return (
                <g 
                  key={t.id} 
                  className="cursor-pointer transition-transform hover:scale-125"
                  onClick={() => setActiveTrend(t)}
                >
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 10 : isWild ? 8 : 6}
                    fill={isWild ? '#f43f5e' : t.horizon === 'corto' ? '#06b6d4' : t.horizon === 'medio' ? '#2dd4bf' : '#c084fc'}
                    stroke={isSelected ? '#ffffff' : '#0f172a'}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                    className={isWild ? 'animate-ping opacity-75' : ''}
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 7 : isWild ? 6 : 5}
                    fill={isWild ? '#e11d48' : t.horizon === 'corto' ? '#0891b2' : t.horizon === 'medio' ? '#0d9488' : '#9333ea'}
                  />
                  <text
                    x={x + 9}
                    y={y + 3}
                    fill="#e2e8f0"
                    fontSize="8"
                    fontWeight="600"
                    className="select-none pointer-events-none drop-shadow"
                  >
                    {t.title.split(' ')[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <p className="text-center text-[11px] text-slate-500 mt-2">
          Haz clic en cualquier punto del radar para enfocar la tendencia y analizar sus implicaciones estratégicas.
        </p>
      </div>

      {/* Grid of Trend Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTrends.map((trend) => {
          const badge = getTypeBadge(trend.type);
          const isSelected = activeTrend?.id === trend.id;

          return (
            <div
              key={trend.id}
              onClick={() => setActiveTrend(trend)}
              className={`bg-slate-900/90 rounded-xl border p-5 transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-cyan-400 bg-slate-850 shadow-lg shadow-cyan-950/40'
                  : 'border-slate-800 hover:border-slate-700 hover:bg-slate-850/80'
              }`}
            >
              <div>
                {/* Header tags */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${badge.class}`}>
                    {badge.label}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border capitalize ${getCategoryColor(trend.category)}`}>
                    {trend.category}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-100 mb-2 leading-snug">
                  {trend.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 mb-3 leading-relaxed">
                  {trend.description}
                </p>

                {/* Scores */}
                <div className="grid grid-cols-2 gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 mb-3 text-[11px]">
                  <div>
                    <span className="text-slate-400">Impacto: </span>
                    <span className="font-bold text-cyan-300">{'★'.repeat(trend.impactScore)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Probabilidad: </span>
                    <span className="font-bold text-teal-300">{'●'.repeat(trend.probabilityScore)}</span>
                  </div>
                  <div className="col-span-2 text-slate-400 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>Horizonte: <strong className="text-slate-200">{trend.horizonYears}</strong></span>
                  </div>
                </div>
              </div>

              {/* Ports impacted & action */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Anchor className="w-3 h-3 text-cyan-400" />
                  <span>{trend.impactedPorts.length} puertos impactados</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onConsultAi(`Analiza detalladamente la tendencia: "${trend.title}". ¿Cómo impacta a los puertos de Cartagena, Barranquilla y Santa Marta según el CONPES 3990?`);
                  }}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                >
                  <span>Evaluar con IA</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Trend Detailed Drawer/Modal */}
      {activeTrend && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getTypeBadge(activeTrend.type).class}`}>
                    {getTypeBadge(activeTrend.type).label}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    Horizonte: {activeTrend.horizonYears}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-100">
                  {activeTrend.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveTrend(null)}
                className="text-slate-400 hover:text-slate-200 p-1 rounded-lg bg-slate-800"
              >
                ✕
              </button>
            </div>

            {/* Description */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-slate-200 block mb-1">Descripción del Fenómeno:</span>
              {activeTrend.description}
            </div>

            {/* Prospective Implication */}
            <div className="bg-cyan-950/30 p-4 rounded-xl border border-cyan-800/40 text-xs text-cyan-200 leading-relaxed">
              <span className="font-bold text-cyan-300 flex items-center gap-1.5 mb-1">
                <Compass className="w-4 h-4" />
                Implicación Prospectiva para el Caribe Colombiano:
              </span>
              {activeTrend.prospectiveImplication}
            </div>

            {/* Early warning signals */}
            <div>
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Señales Tempranas en Observación
              </div>
              <ul className="space-y-1.5">
                {activeTrend.earlySignals.map((sig, i) => (
                  <li key={i} className="text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>{sig}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Impacted ports list */}
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Nodos Portuarios Directamente Afectados
              </div>
              <div className="flex flex-wrap gap-2">
                {activeTrend.impactedPorts.map((pid) => {
                  const port = PORTS_DATA.find(p => p.id === pid);
                  return (
                    <span key={pid} className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 flex items-center gap-1">
                      <Anchor className="w-3 h-3 text-cyan-400" />
                      {port?.name || pid}
                    </span>
                  );
                })}
              </div>
            </div>

            {activeTrend.conpesReference && (
              <div className="text-xs text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800">
                <strong className="text-slate-200">Alineación Política: </strong>
                {activeTrend.conpesReference}
              </div>
            )}

            <div className="pt-3 border-t border-slate-800 flex justify-between gap-3">
              <button
                onClick={() => {
                  const prompt = `Como experto colombiano en prospectiva, profundiza en el impacto de la tendencia: "${activeTrend.title}" sobre la competitividad de los puertos del Caribe colombiano frente a los puertos de Panamá y el Caribe insular (Kingston/Caucedo). Proporciona 3 recomendaciones de política portuaria.`;
                  setActiveTrend(null);
                  onConsultAi(prompt);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generar Informe Prospectivo con IA</span>
              </button>
              <button
                onClick={() => setActiveTrend(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
