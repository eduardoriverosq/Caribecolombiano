import React, { useState } from 'react';
import { SCHWARTZ_SCENARIOS } from '../data/maritimeData';
import { SchwartzScenario } from '../types';
import { 
  GitFork, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Compass, 
  Ship, 
  ShieldCheck, 
  Flame,
  ArrowRight,
  Loader2
} from 'lucide-react';

interface SchwartzScenariosViewProps {
  onConsultAi: (prompt: string) => void;
}

export const SchwartzScenariosView: React.FC<SchwartzScenariosViewProps> = ({ onConsultAi }) => {
  const [scenarios, setScenarios] = useState<SchwartzScenario[]>(SCHWARTZ_SCENARIOS);
  const [selectedScenario, setSelectedScenario] = useState<SchwartzScenario>(scenarios[0]);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiStory, setAiStory] = useState<{
    narrative: string;
    keyMetrics?: { metric: string; value: string }[];
    earlyWarnings?: string[];
    strategicDirectives?: string[];
  } | null>(null);

  const getDesirabilityBadge = (des: SchwartzScenario['desirability']) => {
    switch (des) {
      case 'deseable':
        return { label: 'Escenario Apuesta (Deseable)', class: 'bg-emerald-950/80 text-emerald-300 border-emerald-800' };
      case 'alternativo':
        return { label: 'Escenario Alternativo', class: 'bg-cyan-950/80 text-cyan-300 border-cyan-800' };
      case 'tendencial':
        return { label: 'Escenario Tendencial', class: 'bg-amber-950/80 text-amber-300 border-amber-800' };
      case 'catastrofico':
        return { label: 'Escenario Catastrófico / Degradado', class: 'bg-rose-950/80 text-rose-300 border-rose-800' };
    }
  };

  const handleGenerateCustomNarrative = async () => {
    setIsGeneratingAi(true);
    setAiStory(null);
    try {
      const response = await fetch('/api/gemini/scenario-narrative', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioTitle: selectedScenario.name,
          axisX: 'Integración Intermodal y Gobernanza Portuaria',
          axisY: 'Inserción Global y Descarbonización Verde OMI',
          stateX: selectedScenario.axisXCondition,
          stateY: selectedScenario.axisYCondition,
          year: 2040,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setAiStory(data);
      }
    } catch (err) {
      console.error('Error generating narrative:', err);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-400 border border-amber-800/60 mb-2">
              <GitFork className="w-3.5 h-3.5" />
              <span>Escuela Anglo-Sajona de Escenarios • Ejes de Peter Schwartz (GBN)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
              Escenarios Prospectivos al 2040: El Futuro Marítimo del Caribe
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
              Cruce de dos incertidumbres críticas polares: 
              <strong> Eje X (Integración Intermodal y Gobernanza)</strong> vs. 
              <strong> Eje Y (Transición Verde e Inserción Global)</strong>. 
              Permite a los tomadores de decisiones anticipar riesgos, construir planes de contingencia y orientar las inversiones de la política portuaria CONPES 3990.
            </p>
          </div>

          <button
            onClick={() => onConsultAi(`Como experto en prospectiva marítima, compara el Escenario Apuesta (${scenarios[0].name}) con el Escenario Catastrófico (${scenarios[2].name}) para el Caribe colombiano. ¿Qué tres decisiones debe tomar el Ministerio de Transporte hoy para garantizar la ruta al escenario deseable?`)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-300 border border-amber-500/40 text-xs sm:text-sm font-semibold transition-all active:scale-95 shrink-0"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Comparar con Experto IA</span>
          </button>
        </div>
      </div>

      {/* 2x2 Schwartz Matrix Interactive Visualizer */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-6 flex items-center justify-between">
          <span>Matriz de Doble Incertidumbre 2x2 (Peter Schwartz)</span>
          <span className="text-xs font-normal text-slate-400">Haz clic en cualquier cuadrante para cargar su relato</span>
        </h3>

        {/* 2x2 Grid Container with Axes */}
        <div className="relative max-w-4xl mx-auto p-4 sm:p-8">
          {/* Top Axis Label (+Y) */}
          <div className="text-center mb-3">
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
              ▲ +Y: Hub Verde Descarbonizado & Nearshoring Global (Alta Inserción OMI)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
            {/* Quadrant Q2 (Top-Left): Fragmentado + Verde */}
            {(() => {
              const s = scenarios.find(x => x.quadrant === 'Q2')!;
              const isSelected = selectedScenario.id === s.id;
              return (
                <div
                  key={s.id}
                  onClick={() => setSelectedScenario(s)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected 
                      ? 'bg-slate-800/90 border-cyan-400 shadow-xl shadow-cyan-950/30 ring-2 ring-cyan-400/20'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        Cuadrante Q2
                      </span>
                      <span className="text-xs font-bold text-cyan-400">{s.probability}% Prob.</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-100 mb-1">{s.name}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{s.tagline}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Enclaves modernos</span>
                    <span className="text-cyan-400 font-semibold">Seleccionar &rarr;</span>
                  </div>
                </div>
              );
            })()}

            {/* Quadrant Q1 (Top-Right): Cohesionado + Verde (Deseable) */}
            {(() => {
              const s = scenarios.find(x => x.quadrant === 'Q1')!;
              const isSelected = selectedScenario.id === s.id;
              return (
                <div
                  key={s.id}
                  onClick={() => setSelectedScenario(s)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected 
                      ? 'bg-slate-800/90 border-emerald-400 shadow-xl shadow-emerald-950/30 ring-2 ring-emerald-400/20'
                      : 'bg-emerald-950/20 border-emerald-900/60 hover:border-emerald-700 hover:bg-slate-900'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                        Cuadrante Q1 (Apuesta)
                      </span>
                      <span className="text-xs font-bold text-emerald-400">{s.probability}% Prob.</span>
                    </div>
                    <h4 className="text-sm font-bold text-emerald-200 mb-1">{s.name}</h4>
                    <p className="text-xs text-slate-300 line-clamp-2">{s.tagline}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-emerald-900/50 text-[11px] text-emerald-400/90 flex items-center justify-between">
                    <span>Multimodalidad & Bunkering</span>
                    <span className="text-emerald-400 font-bold">Seleccionar &rarr;</span>
                  </div>
                </div>
              );
            })()}

            {/* Quadrant Q3 (Bottom-Left): Fragmentado + Fósil (Catastrófico) */}
            {(() => {
              const s = scenarios.find(x => x.quadrant === 'Q3')!;
              const isSelected = selectedScenario.id === s.id;
              return (
                <div
                  key={s.id}
                  onClick={() => setSelectedScenario(s)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected 
                      ? 'bg-slate-800/90 border-rose-400 shadow-xl shadow-rose-950/30 ring-2 ring-rose-400/20'
                      : 'bg-rose-950/20 border-rose-950/60 hover:border-rose-800 hover:bg-slate-900'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                        Cuadrante Q3 (Degradado)
                      </span>
                      <span className="text-xs font-bold text-rose-400">{s.probability}% Prob.</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-100 mb-1">{s.name}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{s.tagline}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-rose-400 flex items-center justify-between">
                    <span>Pérdida de escala y líneas</span>
                    <span className="text-rose-400 font-semibold">Seleccionar &rarr;</span>
                  </div>
                </div>
              );
            })()}

            {/* Quadrant Q4 (Bottom-Right): Cohesionado + Fósil (Alternativo B) */}
            {(() => {
              const s = scenarios.find(x => x.quadrant === 'Q4')!;
              const isSelected = selectedScenario.id === s.id;
              return (
                <div
                  key={s.id}
                  onClick={() => setSelectedScenario(s)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected 
                      ? 'bg-slate-800/90 border-amber-400 shadow-xl shadow-amber-950/30 ring-2 ring-amber-400/20'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        Cuadrante Q4
                      </span>
                      <span className="text-xs font-bold text-amber-400">{s.probability}% Prob.</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-100 mb-1">{s.name}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{s.tagline}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Cabotaje interno fuerte</span>
                    <span className="text-amber-400 font-semibold">Seleccionar &rarr;</span>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Bottom Axis Label (-Y) */}
          <div className="text-center mt-3">
            <span className="text-xs font-bold text-rose-400 bg-rose-950/80 px-3 py-1 rounded-full border border-rose-800">
              ▼ -Y: Rezago Fósil, Pérdida de Escalas Navieras & Aislamiento OMI
            </span>
          </div>

          {/* Horizontal Axis Indicators */}
          <div className="flex justify-between text-[11px] font-bold mt-2 text-slate-400 px-2">
            <span>◄ -X: Fragmentación Modal y Carretera Saturada</span>
            <span>+X: Intermodalidad Cohesionada (Río, Tren, PCS) ►</span>
          </div>
        </div>
      </div>

      {/* In-depth Scenario Dossier */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getDesirabilityBadge(selectedScenario.desirability).class}`}>
                {getDesirabilityBadge(selectedScenario.desirability).label}
              </span>
              <span className="text-xs text-slate-400">
                Horizonte de proyección: <strong className="text-slate-200">2040</strong>
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
              {selectedScenario.name}
            </h3>
            <p className="text-sm text-cyan-300 mt-0.5">
              {selectedScenario.subtitle}
            </p>
          </div>

          <button
            onClick={handleGenerateCustomNarrative}
            disabled={isGeneratingAi}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all active:scale-95 disabled:opacity-60"
          >
            {isGeneratingAi ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generando con IA...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generar Relato IA al 2040</span>
              </>
            )}
          </button>
        </div>

        {/* Narrative Section */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            Relato Prospectivo del Sistema Portuario
          </h4>
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800/80 text-sm text-slate-200 leading-relaxed font-normal">
            {aiStory ? aiStory.narrative : selectedScenario.narrative}
          </div>
        </div>

        {/* Dynamic AI metrics or default consequences */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Consequences */}
          <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
            <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
              Impactos en el Comercio
            </h5>
            <ul className="space-y-2">
              {selectedScenario.consequences.map((c, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Early warnings */}
          <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
            <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              Alertas Tempranas (Early Warnings)
            </h5>
            <ul className="space-y-2">
              {(aiStory?.earlyWarnings || selectedScenario.earlyWarnings).map((w, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Strategic actions */}
          <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
            <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Acciones de Política (CONPES 3990)
            </h5>
            <ul className="space-y-2">
              {(aiStory?.strategicDirectives || selectedScenario.strategicActions).map((a, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Port Status under this scenario */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Ship className="w-4 h-4 text-cyan-400" />
            Comportamiento por Nodo Portuario en este Escenario
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {selectedScenario.affectedPortsStatus.map((p, i) => (
              <div key={i} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-bold text-slate-200">{p.port}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                    p.vulnerabilityLevel === 'Baja' 
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                      : p.vulnerabilityLevel === 'Media'
                      ? 'bg-amber-950 text-amber-300 border-amber-800'
                      : 'bg-rose-950 text-rose-300 border-rose-800'
                  }`}>
                    Vuln: {p.vulnerabilityLevel}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-tight">
                  {p.condition}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
