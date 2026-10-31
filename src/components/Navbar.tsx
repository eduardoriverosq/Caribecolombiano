import React from 'react';
import { 
  Compass, 
  Layers, 
  Radar, 
  Grid3X3, 
  Users2, 
  GitFork, 
  Vote, 
  Target, 
  Bot, 
  Anchor,
  Sparkles
} from 'lucide-react';

export type TabId = 
  | 'overview' 
  | 'radar' 
  | 'micmac' 
  | 'mactor' 
  | 'schwartz' 
  | 'delphi' 
  | 'igo';

interface NavbarProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  onOpenAiConsultant: () => void;
  selectedHorizon: '2030' | '2040';
  onSelectHorizon: (horizon: '2030' | '2040') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenAiConsultant,
  selectedHorizon,
  onSelectHorizon
}) => {
  const tabs = [
    { id: 'overview' as TabId, label: 'Visión General & Nodos', icon: Anchor, desc: 'Mapa estratégico y panorama' },
    { id: 'radar' as TabId, label: 'Radar de Tendencias', icon: Radar, desc: 'Megatendencias & Señales Débiles' },
    { id: 'micmac' as TabId, label: 'Análisis MICMAC', icon: Grid3X3, desc: 'Motricidad vs Dependencia (Godet)' },
    { id: 'mactor' as TabId, label: 'Juego Actores MACTOR', icon: Users2, desc: 'Convergencias y Alianzas' },
    { id: 'schwartz' as TabId, label: 'Escenarios Schwartz', icon: GitFork, desc: 'Matriz 2x2 al 2040' },
    { id: 'delphi' as TabId, label: 'Panel Delphi', icon: Vote, desc: 'Consenso de Expertos' },
    { id: 'igo' as TabId, label: 'Matriz IGO / CONPES', icon: Target, desc: 'Importancia y Gobernabilidad' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar with title and quick actions */}
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-teal-500 flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/20 border border-cyan-400/30">
              <Compass className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
                  Caribe Colombiano
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline-block">
                  CONPES 3990 • DIMAR • OMI
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-slate-100 tracking-tight flex items-center gap-1.5">
                Observatorio de Tendencias Marítimas
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Horizon toggle */}
            <div className="hidden md:flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
              <span className="text-slate-400 px-2 font-medium">Horizonte:</span>
              <button
                id="btn-horizon-2030"
                onClick={() => onSelectHorizon('2030')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                  selectedHorizon === '2030'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                2030 (Corto)
              </button>
              <button
                id="btn-horizon-2040"
                onClick={() => onSelectHorizon('2040')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                  selectedHorizon === '2040'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                2040 (Estratégico)
              </button>
            </div>

            {/* AI Foresight Consultant Trigger */}
            <button
              id="btn-ai-consultant"
              onClick={onOpenAiConsultant}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-teal-500/20 to-cyan-500/20 hover:from-teal-500/30 hover:to-cyan-500/30 text-cyan-200 border border-cyan-500/40 text-xs sm:text-sm font-semibold shadow-sm transition-all hover:shadow-cyan-500/10 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>Experto IA Prospectivista</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <nav className="flex space-x-1 overflow-x-auto no-scrollbar py-2 border-t border-slate-900/60">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-slate-800 text-cyan-400 border border-slate-700 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/70'
                }`}
                title={tab.desc}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
