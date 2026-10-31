import React, { useState } from 'react';
import { MICMAC_VARIABLES } from '../data/maritimeData';
import { MicmacVariable, MicmacQuadrant } from '../types';
import { 
  Grid3X3, 
  TrendingUp, 
  Info, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  RotateCcw
} from 'lucide-react';

interface MicmacViewProps {
  onConsultAi: (prompt: string) => void;
}

export const MicmacView: React.FC<MicmacViewProps> = ({ onConsultAi }) => {
  const [variables, setVariables] = useState<MicmacVariable[]>(MICMAC_VARIABLES);
  const [selectedVariable, setSelectedVariable] = useState<MicmacVariable | null>(variables[0]);
  const [activeTabSub, setActiveTabSub] = useState<'cartesian' | 'matrix' | 'ranking'>('cartesian');

  // Matrix state initialized from variables
  // 12x12 matrix with values 0 to 3
  const [influenceMatrix, setInfluenceMatrix] = useState<number[][]>(() => {
    const size = MICMAC_VARIABLES.length;
    const matrix: number[][] = Array(size).fill(0).map(() => Array(size).fill(0));
    
    // Seed realistic structural values
    // Row i influences Col j
    matrix[0] = [0, 2, 1, 3, 0, 0, 3, 2, 3, 2, 1, 2]; // Calado
    matrix[1] = [1, 0, 1, 3, 0, 0, 2, 2, 3, 2, 0, 1]; // PCS
    matrix[2] = [2, 1, 0, 1, 0, 3, 3, 2, 2, 1, 2, 1]; // Descarb OMI
    matrix[3] = [3, 2, 1, 0, 0, 1, 2, 3, 3, 1, 0, 2]; // Hinterland
    matrix[4] = [2, 0, 1, 1, 0, 0, 3, 0, 3, 1, 0, 0]; // Canal Panamá
    matrix[5] = [0, 0, 2, 1, 0, 0, 1, 1, 3, 0, 0, 2]; // Carbón
    matrix[6] = [2, 2, 2, 1, 1, 0, 0, 1, 3, 1, 0, 0]; // Navieras
    matrix[7] = [3, 3, 2, 3, 0, 1, 2, 0, 2, 2, 1, 3]; // Gobernanza ANI
    matrix[8] = [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 2]; // TEUs (Resultado)
    matrix[9] = [1, 2, 1, 0, 0, 0, 1, 2, 1, 0, 0, 1]; // Seguridad DIMAR
    matrix[10]= [2, 0, 1, 2, 0, 0, 1, 2, 2, 2, 0, 2]; // Vulnerabilidad Climática
    matrix[11]= [1, 1, 1, 1, 0, 1, 0, 2, 1, 1, 0, 0]; // Comunidades
    return matrix;
  });

  const handleCellChange = (rowIndex: number, colIndex: number, val: number) => {
    if (rowIndex === colIndex) return;
    const newMatrix = influenceMatrix.map((row, r) => 
      row.map((cell, c) => (r === rowIndex && c === colIndex ? val : cell))
    );
    setInfluenceMatrix(newMatrix);

    // Recalculate Motricity & Dependency
    const updated = variables.map((v, idx) => {
      const rowSum = newMatrix[idx].reduce((a, b) => a + b, 0);
      let colSum = 0;
      for (let r = 0; r < newMatrix.length; r++) {
        colSum += newMatrix[r][idx];
      }
      
      const maxPossible = (variables.length - 1) * 3;
      const motricityNormalized = Math.round((rowSum / maxPossible) * 100);
      const dependencyNormalized = Math.round((colSum / maxPossible) * 100);

      let quad: MicmacQuadrant = 'autonoma';
      if (motricityNormalized >= 50 && dependencyNormalized >= 50) quad = 'clave';
      else if (motricityNormalized >= 50 && dependencyNormalized < 50) quad = 'determinante';
      else if (motricityNormalized < 50 && dependencyNormalized >= 50) quad = 'resultado';
      else quad = 'autonoma';

      return {
        ...v,
        motricity: motricityNormalized,
        dependency: dependencyNormalized,
        quadrant: quad,
      };
    });

    setVariables(updated);
    if (selectedVariable) {
      const current = updated.find(u => u.id === selectedVariable.id);
      if (current) setSelectedVariable(current);
    }
  };

  const getQuadrantInfo = (quad: MicmacQuadrant) => {
    switch (quad) {
      case 'clave':
        return {
          title: 'Variables Clave (Reto Estratégico)',
          desc: 'Alta motricidad y alta dependencia. Son variables altamente inestables donde cualquier acción desata reacciones en cadena.',
          color: 'text-amber-400 border-amber-500/40 bg-amber-950/20'
        };
      case 'determinante':
        return {
          title: 'Variables Determinantes (Fuerzas Motrices / Entrada)',
          desc: 'Alta motricidad y baja dependencia. Condicionan el comportamiento del sistema; se deben vigilar estrechamente.',
          color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/20'
        };
      case 'resultado':
        return {
          title: 'Variables Resultado (Salida / Impactos)',
          desc: 'Baja motricidad y alta dependencia. Son indicadores finales del éxito o fracaso del sistema marítimo.',
          color: 'text-rose-400 border-rose-500/40 bg-rose-950/20'
        };
      case 'autonoma':
        return {
          title: 'Variables Autónomas / Reguladoras',
          desc: 'Baja motricidad y baja dependencia. Evolucionan de forma más aislada y no condicionan el futuro del sistema.',
          color: 'text-slate-400 border-slate-700 bg-slate-900/40'
        };
      default:
        return { title: 'Variable', desc: '', color: 'text-slate-300' };
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60 mb-2">
              <Grid3X3 className="w-3.5 h-3.5" />
              <span>Escuela Francesa de Prospectiva • Método MICMAC (Michel Godet)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
              Análisis Estructural del Comercio Marítimo
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
              Identificación de las variables clave del Caribe colombiano mediante la matriz de impactos cruzados. 
              Permite distinguir los factores motrices (motores de cambio) de las variables de resultado y enlace según la teoría de sistemas prospectivos de Francisco José Mojica y Michel Godet.
            </p>
          </div>

          <button
            onClick={() => onConsultAi("Como experto en prospectiva colombiana, analiza los resultados del plano MICMAC para el comercio marítimo del Caribe: ¿Por qué el Calado Operativo, el Port Community System (PCS) y la Conectividad con el Hinterland son las variables clave más inestables y críticas para el CONPES 3990?")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500/20 to-cyan-500/20 hover:from-teal-500/30 hover:to-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs sm:text-sm font-semibold transition-all active:scale-95 shrink-0"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Diagnóstico MICMAC con IA</span>
          </button>
        </div>

        {/* View Switcher Tabs */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2">
          <button
            onClick={() => setActiveTabSub('cartesian')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTabSub === 'cartesian'
                ? 'bg-cyan-600 text-slate-950 shadow-sm'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Plano Cartesiano de Godet (Motricidad vs Dependencia)
          </button>
          <button
            onClick={() => setActiveTabSub('matrix')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTabSub === 'matrix'
                ? 'bg-cyan-600 text-slate-950 shadow-sm'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Matriz de Influencias Directas (12x12)
          </button>
          <button
            onClick={() => setActiveTabSub('ranking')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTabSub === 'ranking'
                ? 'bg-cyan-600 text-slate-950 shadow-sm'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Jerarquía y Clasificación
          </button>
        </div>
      </div>

      {/* Main View Mode: Cartesian Plot */}
      {activeTabSub === 'cartesian' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* SVG Cartesian Plot */}
          <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  Plano de Influencias y Dependencias Directas
                </h3>
                <p className="text-xs text-slate-400">
                  Haz clic en un punto para inspeccionar el rol prospectivo de la variable.
                </p>
              </div>
              <div className="text-xs text-slate-400">
                Línea de corte: <strong className="text-slate-200">50%</strong>
              </div>
            </div>

            {/* SVG Plot */}
            <div className="relative w-full aspect-[4/3] max-h-[480px] bg-slate-950 rounded-xl border border-slate-800 p-4">
              <svg className="w-full h-full" viewBox="0 0 500 400">
                {/* Background Quadrants Tint */}
                {/* Q2 Top-Left: Determinantes */}
                <rect x="50" y="30" width="200" height="160" fill="rgba(6, 182, 212, 0.04)" />
                {/* Q1 Top-Right: Clave */}
                <rect x="250" y="30" width="210" height="160" fill="rgba(245, 158, 11, 0.06)" />
                {/* Q4 Bottom-Left: Autónomas */}
                <rect x="50" y="190" width="200" height="160" fill="rgba(148, 163, 184, 0.02)" />
                {/* Q3 Bottom-Right: Resultado */}
                <rect x="250" y="190" width="210" height="160" fill="rgba(244, 63, 94, 0.04)" />

                {/* Main Axis lines */}
                <line x1="50" y1="350" x2="460" y2="350" stroke="#475569" strokeWidth="1.5" />
                <line x1="50" y1="350" x2="50" y2="30" stroke="#475569" strokeWidth="1.5" />

                {/* Mid Threshold lines (50%) */}
                <line x1="250" y1="30" x2="250" y2="350" stroke="#06b6d4" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="50" y1="190" x2="460" y2="190" stroke="#06b6d4" strokeWidth="1" strokeDasharray="3 3" />

                {/* Diagonal Bisector (Direct link line) */}
                <line x1="50" y1="350" x2="450" y2="40" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="2 2" />

                {/* Labels */}
                <text x="210" y="380" fill="#94a3b8" fontSize="11" fontWeight="600">DEPENDENCIA &rarr;</text>
                <text x="20" y="210" fill="#94a3b8" fontSize="11" fontWeight="600" transform="rotate(-90 20,210)">MOTRICIDAD &rarr;</text>

                {/* Quadrant Titles inside plot */}
                <text x="60" y="50" fill="#38bdf8" fontSize="10" fontWeight="bold" opacity="0.8">DETERMINANTES (Entrada)</text>
                <text x="260" y="50" fill="#f59e0b" fontSize="10" fontWeight="bold" opacity="0.9">VARIABLES CLAVE (Estratégicas)</text>
                <text x="60" y="335" fill="#64748b" fontSize="10" fontWeight="bold" opacity="0.8">AUTÓNOMAS (Reguladoras)</text>
                <text x="260" y="335" fill="#f43f5e" fontSize="10" fontWeight="bold" opacity="0.8">RESULTADO (Impactos / Salida)</text>

                {/* Plotted Variables */}
                {variables.map((v) => {
                  // Map dependency (0..100) to x (50..450)
                  // Map motricity (0..100) to y (350..30)
                  const x = 50 + (v.dependency / 100) * 400;
                  const y = 350 - (v.motricity / 100) * 320;
                  const isSelected = selectedVariable?.id === v.id;

                  let dotColor = '#94a3b8';
                  if (v.quadrant === 'clave') dotColor = '#f59e0b';
                  else if (v.quadrant === 'determinante') dotColor = '#06b6d4';
                  else if (v.quadrant === 'resultado') dotColor = '#f43f5e';

                  return (
                    <g
                      key={v.id}
                      className="cursor-pointer transition-transform hover:scale-125"
                      onClick={() => setSelectedVariable(v)}
                    >
                      <circle
                        cx={x}
                        cy={y}
                        r={isSelected ? 9 : 6}
                        fill={dotColor}
                        stroke={isSelected ? '#ffffff' : '#0f172a'}
                        strokeWidth={isSelected ? 2.5 : 1}
                        className={isSelected ? 'animate-pulse' : ''}
                      />
                      <text
                        x={x + 7}
                        y={y - 3}
                        fill={isSelected ? '#ffffff' : '#cbd5e1'}
                        fontSize="9"
                        fontWeight={isSelected ? 'bold' : '600'}
                        className="select-none pointer-events-none drop-shadow"
                      >
                        {v.code}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Selected Variable Panel */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            {selectedVariable ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                    {selectedVariable.code}
                  </span>
                  <span className="text-xs text-slate-400 capitalize">
                    {selectedVariable.category}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-slate-100">
                    {selectedVariable.name}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {selectedVariable.description}
                  </p>
                </div>

                {/* Quadrant badge */}
                <div className={`p-3 rounded-xl border text-xs ${getQuadrantInfo(selectedVariable.quadrant).color}`}>
                  <div className="font-bold flex items-center gap-1.5 mb-1">
                    <Info className="w-3.5 h-3.5" />
                    {getQuadrantInfo(selectedVariable.quadrant).title}
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    {selectedVariable.prospectiveRole}
                  </p>
                </div>

                {/* Motricity vs Dependency stats */}
                <div className="grid grid-cols-2 gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-0.5">Motricidad (Influencia):</span>
                    <span className="text-lg font-bold text-cyan-400">{selectedVariable.motricity}%</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Dependencia:</span>
                    <span className="text-lg font-bold text-teal-400">{selectedVariable.dependency}%</span>
                  </div>
                </div>

                {/* Key indicators */}
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Indicadores de Seguimiento Portuario:
                  </span>
                  <ul className="space-y-1">
                    {selectedVariable.keyIndicators.map((ind, i) => (
                      <li key={i} className="text-xs text-slate-300 bg-slate-950/60 p-2 rounded border border-slate-800/80 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                        <span>{ind}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 text-xs">
                Selecciona una variable en el plano cartesiano para ver su ficha técnica.
              </div>
            )}

            <button
              onClick={() => onConsultAi(`Como prospectivista del Caribe colombiano, profundiza en el rol de la variable "${selectedVariable?.name}" (${selectedVariable?.code}) dentro del sistema marítimo y cómo debe articularse en el plan de acción del CONPES 3990.`)}
              className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Analizar Variable con Experto IA</span>
            </button>
          </div>
        </div>
      )}

      {/* Sub-View: 12x12 Matrix */}
      {activeTabSub === 'matrix' && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                Matriz de Impactos Cruzados Directos (MID)
              </h3>
              <p className="text-xs text-slate-400">
                La fila <em>i</em> influye sobre la columna <em>j</em>. Escala: <strong>0</strong> = Sin influencia, <strong>1</strong> = Débil, <strong>2</strong> = Media, <strong>3</strong> = Fuerte. Puedes editar cualquier celda para recalcular los cuadrantes en vivo.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-center text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-400">
                  <th className="p-2 border border-slate-800 text-left">Variable</th>
                  {variables.map((v) => (
                    <th key={v.id} className="p-2 border border-slate-800 font-mono text-cyan-300" title={v.name}>
                      {v.code}
                    </th>
                  ))}
                  <th className="p-2 border border-slate-800 bg-cyan-950/40 text-cyan-300 font-bold">Motr.</th>
                </tr>
              </thead>
              <tbody>
                {variables.map((rowVar, rIdx) => (
                  <tr key={rowVar.id} className="hover:bg-slate-800/40">
                    <td className="p-2 border border-slate-800 text-left font-medium text-slate-200 whitespace-nowrap">
                      <span className="font-mono text-cyan-400 mr-2">{rowVar.code}</span>
                      <span className="text-slate-400 hidden sm:inline">{rowVar.name.slice(0, 20)}...</span>
                    </td>
                    {variables.map((colVar, cIdx) => {
                      const isDiag = rIdx === cIdx;
                      const val = influenceMatrix[rIdx][cIdx];
                      return (
                        <td 
                          key={colVar.id} 
                          className={`p-1 border border-slate-800 ${isDiag ? 'bg-slate-950 text-slate-600' : ''}`}
                        >
                          {isDiag ? (
                            <span>0</span>
                          ) : (
                            <select
                              value={val}
                              onChange={(e) => handleCellChange(rIdx, cIdx, parseInt(e.target.value))}
                              className="bg-transparent text-center font-bold text-slate-200 cursor-pointer focus:outline-none focus:bg-cyan-900 rounded"
                            >
                              <option value={0} className="bg-slate-900">0</option>
                              <option value={1} className="bg-slate-900">1</option>
                              <option value={2} className="bg-slate-900">2</option>
                              <option value={3} className="bg-slate-900">3</option>
                            </select>
                          )}
                        </td>
                      );
                    })}
                    <td className="p-2 border border-slate-800 bg-cyan-950/30 font-bold text-cyan-300">
                      {rowVar.motricity}%
                    </td>
                  </tr>
                ))}
                {/* Footer row: Dependencies */}
                <tr className="bg-slate-950 font-bold text-teal-300">
                  <td className="p-2 border border-slate-800 text-left text-slate-300">Dependencia:</td>
                  {variables.map((v) => (
                    <td key={v.id} className="p-2 border border-slate-800">
                      {v.dependency}%
                    </td>
                  ))}
                  <td className="p-2 border border-slate-800 bg-slate-900 text-slate-400">---</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sub-View: Ranking */}
      {activeTabSub === 'ranking' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Motricity ranking */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Ranking por Motricidad Directa (Fuerza de Arrastre)
            </h3>
            <div className="space-y-2">
              {[...variables].sort((a, b) => b.motricity - a.motricity).map((v, i) => (
                <div key={v.id} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 font-mono text-slate-500 font-bold">{i + 1}.</span>
                    <span className="font-mono text-cyan-300 font-bold">{v.code}</span>
                    <span className="text-slate-300">{v.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded font-semibold border ${getQuadrantInfo(v.quadrant).color}`}>
                      {v.quadrant}
                    </span>
                    <span className="font-bold text-cyan-400 w-10 text-right">{v.motricity}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dependency ranking */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-teal-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Ranking por Dependencia (Sensibilidad del Sistema)
            </h3>
            <div className="space-y-2">
              {[...variables].sort((a, b) => b.dependency - a.dependency).map((v, i) => (
                <div key={v.id} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 font-mono text-slate-500 font-bold">{i + 1}.</span>
                    <span className="font-mono text-teal-300 font-bold">{v.code}</span>
                    <span className="text-slate-300">{v.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded font-semibold border ${getQuadrantInfo(v.quadrant).color}`}>
                      {v.quadrant}
                    </span>
                    <span className="font-bold text-teal-400 w-10 text-right">{v.dependency}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
