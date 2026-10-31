import React, { useState } from 'react';
import { MACTOR_ACTORS, MACTOR_OBJECTIVES } from '../data/maritimeData';
import { ActorMactor, MactorObjective } from '../types';
import { 
  Users2, 
  Target, 
  Sparkles, 
  Handshake, 
  Swords, 
  Info, 
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Minus
} from 'lucide-react';

interface MactorViewProps {
  onConsultAi: (prompt: string) => void;
}

export const MactorView: React.FC<MactorViewProps> = ({ onConsultAi }) => {
  const [actors, setActors] = useState<ActorMactor[]>(MACTOR_ACTORS);
  const [objectives] = useState<MactorObjective[]>(MACTOR_OBJECTIVES);
  const [selectedActor, setSelectedActor] = useState<ActorMactor | null>(actors[0]);
  const [selectedObjective, setSelectedObjective] = useState<MactorObjective | null>(objectives[0]);

  // Handle changing stance of an actor on an objective
  const handleStanceChange = (actorId: string, objId: string, val: number) => {
    const updated = actors.map((act) => {
      if (act.id === actorId) {
        return {
          ...act,
          stances: {
            ...act.stances,
            [objId]: val,
          },
        };
      }
      return act;
    });
    setActors(updated);
    if (selectedActor?.id === actorId) {
      const refreshed = updated.find(a => a.id === actorId);
      if (refreshed) setSelectedActor(refreshed);
    }
  };

  // Compute convergence & divergence between actors
  const calculateAlliances = (actA: ActorMactor, actB: ActorMactor) => {
    let agreements = 0;
    let conflicts = 0;

    objectives.forEach((obj) => {
      const sA = actA.stances[obj.id] || 0;
      const sB = actB.stances[obj.id] || 0;

      if (sA !== 0 && sB !== 0) {
        if ((sA > 0 && sB > 0) || (sA < 0 && sB < 0)) {
          agreements += Math.min(Math.abs(sA), Math.abs(sB));
        } else {
          conflicts += (Math.abs(sA) + Math.abs(sB));
        }
      }
    });

    return { agreements, conflicts };
  };

  const getStanceDisplay = (val: number) => {
    if (val === 2) return { text: '+2 Muy a favor', bg: 'bg-teal-950 text-teal-300 border-teal-800' };
    if (val === 1) return { text: '+1 A favor', bg: 'bg-cyan-950 text-cyan-300 border-cyan-800' };
    if (val === -1) return { text: '-1 Opuesto', bg: 'bg-amber-950 text-amber-300 border-amber-800' };
    if (val === -2) return { text: '-2 Muy opuesto', bg: 'bg-rose-950 text-rose-300 border-rose-800' };
    return { text: '0 Neutro', bg: 'bg-slate-900 text-slate-400 border-slate-800' };
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-950 text-teal-400 border border-teal-800/60 mb-2">
              <Users2 className="w-3.5 h-3.5" />
              <span>Escuela Francesa de Prospectiva • Método MACTOR (Juego de Actores)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
              Juego de Actores, Objetivos y Relaciones de Fuerza
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
              Análisis de convergencias estratégicas, alianzas potenciales y conflictos latentes entre el Estado colombiano (DIMAR, MinTransporte), las navieras globales, los concesionarios portuarios, los gremios y las comunidades costeras.
            </p>
          </div>

          <button
            onClick={() => onConsultAi("Como experto prospectivista del Caribe colombiano, analiza las tensiones del Método MACTOR entre las Navieras Globales (que exigen 16.5m de calado y bajas tarifas), los Operadores Portuarios (que demandan prórrogas de concesión) y las Comunidades Costeras de pescadores. ¿Qué acuerdos ganar-ganar propone el CONPES 3990?")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500/20 to-cyan-500/20 hover:from-teal-500/30 hover:to-cyan-500/30 text-teal-300 border border-teal-500/40 text-xs sm:text-sm font-semibold transition-all active:scale-95 shrink-0"
          >
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Consultar Alianzas con IA</span>
          </button>
        </div>
      </div>

      {/* 2MAO Stances Matrix Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
              <Target className="w-4 h-4 text-teal-400" />
              Matriz de Posición de los Actores sobre los Objetivos (Matriz 2MAO)
            </h3>
            <p className="text-xs text-slate-400">
              Posición valorada: <strong>+2</strong> (Muy a favor), <strong>+1</strong> (A favor), <strong>0</strong> (Neutro), <strong>-1</strong> (Opuesto), <strong>-2</strong> (Muy opuesto).
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 text-slate-400">
                <th className="p-3 border border-slate-800 text-left">Actor Estratégico</th>
                <th className="p-3 border border-slate-800">Tipo</th>
                <th className="p-3 border border-slate-800">Poder</th>
                {objectives.map((obj) => (
                  <th key={obj.id} className="p-3 border border-slate-800 font-mono text-teal-300" title={obj.description}>
                    {obj.code}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {actors.map((act) => {
                const isSelected = selectedActor?.id === act.id;
                return (
                  <tr 
                    key={act.id} 
                    onClick={() => setSelectedActor(act)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-slate-800/80' : 'hover:bg-slate-850'
                    }`}
                  >
                    <td className="p-3 border border-slate-800 text-left font-semibold text-slate-100 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-teal-400" />
                        <span>{act.name}</span>
                      </div>
                    </td>
                    <td className="p-2 border border-slate-800 text-slate-400">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-medium">
                        {act.type}
                      </span>
                    </td>
                    <td className="p-2 border border-slate-800 font-bold text-amber-400">
                      {act.powerScore}/10
                    </td>
                    {objectives.map((obj) => {
                      const val = act.stances[obj.id] ?? 0;
                      const badge = getStanceDisplay(val);
                      return (
                        <td key={obj.id} className="p-1 border border-slate-800">
                          <select
                            value={val}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => handleStanceChange(act.id, obj.id, parseInt(e.target.value))}
                            className={`w-full py-1 text-center font-bold text-xs rounded border cursor-pointer ${badge.bg}`}
                          >
                            <option value={2} className="bg-slate-900 text-teal-300">+2 Muy a favor</option>
                            <option value={1} className="bg-slate-900 text-cyan-300">+1 A favor</option>
                            <option value={0} className="bg-slate-900 text-slate-400">0 Neutro</option>
                            <option value={-1} className="bg-slate-900 text-amber-300">-1 Opuesto</option>
                            <option value={-2} className="bg-slate-900 text-rose-300">-2 Muy opuesto</option>
                          </select>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Analysis Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Convergence & Divergence Network */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
              <Handshake className="w-4 h-4 text-teal-400" />
              Alianzas Críticas vs Conflictos Latentes
            </h3>
            <span className="text-xs text-slate-400">
              Para: <strong className="text-teal-300">{selectedActor?.name}</strong>
            </span>
          </div>

          <div className="space-y-3">
            {selectedActor && actors.filter(a => a.id !== selectedActor.id).map((other) => {
              const { agreements, conflicts } = calculateAlliances(selectedActor, other);
              const isPartner = agreements > conflicts;

              return (
                <div key={other.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold text-slate-200">{other.name}</span>
                      <span className="text-[10px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                        {other.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{other.strategicMission}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right text-xs">
                      <div className="text-teal-400 font-bold flex items-center gap-1 justify-end">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>+{agreements} acuerdos</span>
                      </div>
                      <div className="text-rose-400 font-bold flex items-center gap-1 justify-end">
                        <Swords className="w-3 h-3" />
                        <span>-{conflicts} tensión</span>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-1 rounded border ${
                      isPartner 
                        ? 'bg-teal-950/60 text-teal-300 border-teal-800' 
                        : 'bg-rose-950/60 text-rose-300 border-rose-800'
                    }`}>
                      {isPartner ? 'Aliado Natural' : 'Frente de Tensión'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Objectives Technical Cards */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <Target className="w-4 h-4 text-cyan-400" />
            Objetivos Estratégicos del Sistema Portuario
          </h3>

          <div className="space-y-2.5">
            {objectives.map((obj) => {
              // Count actors in favor vs against
              let inFavor = 0;
              let against = 0;
              actors.forEach(a => {
                const s = a.stances[obj.id] || 0;
                if (s > 0) inFavor++;
                if (s < 0) against++;
              });

              return (
                <div 
                  key={obj.id} 
                  onClick={() => setSelectedObjective(obj)}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-cyan-400">{obj.code}</span>
                    <span className="text-[11px] text-slate-400">Meta: {obj.horizonYear}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-200 mb-1">{obj.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed mb-2.5">{obj.description}</p>
                  
                  <div className="flex items-center justify-between text-[10px] pt-2 border-t border-slate-800/80">
                    <span className="text-teal-400 font-semibold">{inFavor} actores a favor</span>
                    <span className="text-rose-400 font-semibold">{against} actores en contra</span>
                    <span className="text-slate-400">{actors.length - inFavor - against} neutrales</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
