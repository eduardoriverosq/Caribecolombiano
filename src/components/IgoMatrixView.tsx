import React, { useState } from 'react';
import { IGO_ACTIONS } from '../data/maritimeData';
import { IgoAction, IgoQuadrant } from '../types';
import { 
  Target, 
  Sparkles, 
  TrendingUp, 
  Sliders, 
  CheckCircle2, 
  Building2,
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';

interface IgoMatrixViewProps {
  onConsultAi: (prompt: string) => void;
}

export const IgoMatrixView: React.FC<IgoMatrixViewProps> = ({ onConsultAi }) => {
  const [actions, setActions] = useState<IgoAction[]>(IGO_ACTIONS);
  const [selectedAction, setSelectedAction] = useState<IgoAction | null>(actions[0]);
  const [filterQuadrant, setFilterQuadrant] = useState<string>('all');

  const calculateQuadrant = (imp: number, gov: number): IgoQuadrant => {
    if (imp >= 7.5 && gov >= 7.5) return 'inmediata';
    if (imp >= 7.5 && gov < 7.5) return 'reto';
    if (imp < 7.5 && gov >= 7.5) return 'secundaria';
    return 'descartable';
  };

  const handleImportanceChange = (id: string, newImp: number) => {
    setActions((prev) =>
      prev.map((act) => {
        if (act.id === id) {
          const updated: IgoAction = {
            ...act,
            importance: newImp,
            quadrant: calculateQuadrant(newImp, act.governability),
          };
          if (selectedAction?.id === id) setSelectedAction(updated);
          return updated;
        }
        return act;
      })
    );
  };

  const handleGovernabilityChange = (id: string, newGov: number) => {
    setActions((prev) =>
      prev.map((act) => {
        if (act.id === id) {
          const updated: IgoAction = {
            ...act,
            governability: newGov,
            quadrant: calculateQuadrant(act.importance, newGov),
          };
          if (selectedAction?.id === id) setSelectedAction(updated);
          return updated;
        }
        return act;
      })
    );
  };

  const getQuadrantDetails = (quad: IgoQuadrant) => {
    const q = quad.replace(/s$/, ''); // normalize plural
    switch (q) {
      case 'inmediata':
        return {
          title: 'Acciones Prioritarias (Alta Importancia & Alta Gobernabilidad)',
          short: '1. Inmediata',
          desc: 'Victorias tempranas (Quick Wins). El Estado y los operadores tienen el control directo y el impacto es transformador.',
          badgeClass: 'bg-emerald-950 text-emerald-300 border-emerald-800',
        };
      case 'reto':
        return {
          title: 'Retos Estratégicos (Alta Importancia & Baja Gobernabilidad)',
          short: '2. Reto Estratégico',
          desc: 'Requieren negociación política compleja, acuerdos multilaterales con navieras o grandes reformas normativas.',
          badgeClass: 'bg-amber-950 text-amber-300 border-amber-800',
        };
      case 'secundaria':
        return {
          title: 'Acciones Complementarias (Baja Importancia & Alta Gobernabilidad)',
          short: '3. Complementaria',
          desc: 'Fáciles de ejecutar pero con impacto incremental en la competitividad global.',
          badgeClass: 'bg-cyan-950 text-cyan-300 border-cyan-800',
        };
      default:
        return {
          title: 'Acciones de Reserva (Baja Importancia & Baja Gobernabilidad)',
          short: '4. De Reserva',
          desc: 'No justifican el gasto de capital político ni financiero en el corto plazo.',
          badgeClass: 'bg-slate-900 text-slate-400 border-slate-800',
        };
    }
  };

  const filteredActions = filterQuadrant === 'all'
    ? actions
    : actions.filter(a => a.quadrant === filterQuadrant || a.quadrant === `${filterQuadrant}s`);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60 mb-2">
              <Target className="w-3.5 h-3.5" />
              <span>Metodología IGO • Importancia y Gobernabilidad de Políticas Portuarias</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
              Matriz IGO: Priorización de Acciones del CONPES 3990
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
              Herramienta de la prospectiva estratégica en Colombia (Francisco José Mojica / Javier Medina Vásquez) para priorizar las acciones del Plan de Modernización Portuaria cruzando el impacto sistémico (Importancia) con el control institucional real (Gobernabilidad).
            </p>
          </div>

          <button
            onClick={() => onConsultAi("Como experto colombiano en prospectiva, evalúa la Matriz IGO del CONPES 3990. ¿Cuáles son las 3 acciones prioritarias inmediatas que el Gobierno Nacional debe licitar antes de 2027 para evitar que los puertos del Caribe queden rezagados?")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500/20 to-cyan-500/20 hover:from-teal-500/30 hover:to-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs sm:text-sm font-semibold transition-all active:scale-95 shrink-0"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Hoja de Ruta CONPES con IA</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap gap-2">
          {[
            { id: 'all', label: `Todas (${actions.length})` },
            { id: 'inmediata', label: '1. Inmediatas / Prioritarias' },
            { id: 'reto', label: '2. Retos Estratégicos' },
            { id: 'secundaria', label: '3. Complementarias' },
            { id: 'descartable', label: '4. De Reserva' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilterQuadrant(btn.id)}
              className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                filterQuadrant === btn.id
                  ? 'bg-cyan-600 text-slate-950 shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split: Cartesian Scatter Plot & Action Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scatter Plot 2D */}
        <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <Target className="w-4 h-4 text-cyan-400" />
                Plano IGO: Importancia vs. Gobernabilidad
              </h3>
              <p className="text-xs text-slate-400">
                Límite de corte: 7.5 / 10. Haz clic sobre cada punto para inspeccionar y calibrar.
              </p>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Escala: 0 a 10
            </div>
          </div>

          <div className="relative w-full aspect-[4/3] max-h-[460px] bg-slate-950 rounded-xl border border-slate-800 p-4">
            <svg className="w-full h-full" viewBox="0 0 500 400">
              {/* Top-Left: Retos */}
              <rect x="50" y="30" width="200" height="160" fill="rgba(245, 158, 11, 0.05)" />
              {/* Top-Right: Inmediatas */}
              <rect x="250" y="30" width="210" height="160" fill="rgba(16, 185, 129, 0.08)" />
              {/* Bottom-Left: Descartables */}
              <rect x="50" y="190" width="200" height="160" fill="rgba(148, 163, 184, 0.02)" />
              {/* Bottom-Right: Secundarias */}
              <rect x="250" y="190" width="210" height="160" fill="rgba(6, 182, 212, 0.04)" />

              {/* Main axes */}
              <line x1="50" y1="350" x2="460" y2="350" stroke="#475569" strokeWidth="1.5" />
              <line x1="50" y1="350" x2="50" y2="30" stroke="#475569" strokeWidth="1.5" />

              {/* Threshold lines (7.5/10) */}
              <line x1="250" y1="30" x2="250" y2="350" stroke="#06b6d4" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="50" y1="190" x2="460" y2="190" stroke="#06b6d4" strokeWidth="1" strokeDasharray="3 3" />

              {/* Labels */}
              <text x="180" y="380" fill="#94a3b8" fontSize="11" fontWeight="600">GOBERNABILIDAD (Control Político / Legal) &rarr;</text>
              <text x="20" y="240" fill="#94a3b8" fontSize="11" fontWeight="600" transform="rotate(-90 20,240)">IMPORTANCIA (Impacto Estratégico) &rarr;</text>

              {/* Quadrant Titles */}
              <text x="60" y="55" fill="#f59e0b" fontSize="10" fontWeight="bold">RETOS ESTRATÉGICOS (Negociar)</text>
              <text x="260" y="55" fill="#10b981" fontSize="10" fontWeight="bold">ACCIONES INMEDIATAS (Prioridad 1)</text>
              <text x="60" y="335" fill="#64748b" fontSize="10" fontWeight="bold">RESERVA / DESCARTABLES</text>
              <text x="260" y="335" fill="#38bdf8" fontSize="10" fontWeight="bold">COMPLEMENTARIAS (Oportunistas)</text>

              {/* Plotted actions */}
              {actions.map((act) => {
                const x = 50 + (act.governability / 10) * 400;
                const y = 350 - (act.importance / 10) * 320;
                const isSelected = selectedAction?.id === act.id;

                const q = act.quadrant.replace(/s$/, '');
                let fill = '#94a3b8';
                if (q === 'inmediata') fill = '#10b981';
                else if (q === 'reto') fill = '#f59e0b';
                else if (q === 'secundaria') fill = '#06b6d4';

                return (
                  <g
                    key={act.id}
                    className="cursor-pointer transition-transform hover:scale-125"
                    onClick={() => setSelectedAction(act)}
                  >
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 10 : 7}
                      fill={fill}
                      stroke={isSelected ? '#ffffff' : '#0f172a'}
                      strokeWidth={isSelected ? 2.5 : 1}
                      className={isSelected ? 'animate-pulse' : ''}
                    />
                    <text
                      x={x + 9}
                      y={y + 3}
                      fill={isSelected ? '#ffffff' : '#e2e8f0'}
                      fontSize="9"
                      fontWeight={isSelected ? 'bold' : '600'}
                      className="select-none pointer-events-none drop-shadow"
                    >
                      {act.title.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Selected Action Editor Panel */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          {selectedAction ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border ${getQuadrantDetails(selectedAction.quadrant).badgeClass}`}>
                  {getQuadrantDetails(selectedAction.quadrant).short}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedAction.timeframe || selectedAction.timeframeYears || '2026-2030'}
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-100">
                  {selectedAction.title}
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {selectedAction.description}
                </p>
              </div>

              {/* Sliders for Sensitivity Testing */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  Simulación de Gobernabilidad e Importancia
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Importancia Estratégica:</span>
                    <span className="font-bold text-emerald-400">{selectedAction.importance.toFixed(1)} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.1"
                    value={selectedAction.importance}
                    onChange={(e) => handleImportanceChange(selectedAction.id, parseFloat(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Gobernabilidad / Control:</span>
                    <span className="font-bold text-cyan-400">{selectedAction.governability.toFixed(1)} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.1"
                    value={selectedAction.governability}
                    onChange={(e) => handleGovernabilityChange(selectedAction.id, parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>
              </div>

              {/* Lead Agency & Pillar */}
              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block mb-0.5 flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-cyan-400" /> Responsable Institucional:
                  </span>
                  <span className="font-bold text-slate-200">
                    {selectedAction.responsibleEntity || selectedAction.leadAgency || 'Ministerio de Transporte / ANI'}
                  </span>
                </div>
                {selectedAction.pillar && (
                  <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block mb-0.5 flex items-center gap-1">
                      <Layers className="w-3 h-3 text-teal-400" /> Pilar CONPES:
                    </span>
                    <span className="font-bold text-slate-200">{selectedAction.pillar}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
              Selecciona una acción para inspeccionar su ficha de gobernabilidad.
            </div>
          )}

          <button
            onClick={() => onConsultAi(`Como consultor de prospectiva de transporte en Colombia, diseña la ficha de viabilidad política para la acción: "${selectedAction?.title}". Identifica los cuellos de botella normativos y la estrategia para elevar su gobernabilidad en el marco del CONPES 3990.`)}
            className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span>Elaborar Estrategia Política con IA</span>
          </button>
        </div>
      </div>

      {/* Filtered Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredActions.map((act) => {
          const details = getQuadrantDetails(act.quadrant);
          const isSelected = selectedAction?.id === act.id;

          return (
            <div
              key={act.id}
              onClick={() => setSelectedAction(act)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-800/90 border-cyan-400 shadow-md'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${details.badgeClass}`}>
                    {details.short}
                  </span>
                  <span className="text-[10px] text-slate-400">{act.timeframe || '2026-2030'}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-100 mb-1.5 leading-snug">
                  {act.title}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {act.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Imp: <strong className="text-emerald-400">{act.importance}</strong> | Gov: <strong className="text-cyan-400">{act.governability}</strong></span>
                <span className="text-cyan-400 font-semibold">Editar &rarr;</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
