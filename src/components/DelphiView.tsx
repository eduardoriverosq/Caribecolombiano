import React, { useState } from 'react';
import { DELPHI_QUESTIONS } from '../data/maritimeData';
import { DelphiQuestion, DelphiResponse } from '../types';
import { 
  Vote, 
  Sparkles, 
  Users, 
  CheckCircle2, 
  TrendingUp, 
  MessageSquare,
  Loader2,
  Calendar,
  Layers,
  Send,
  Building2
} from 'lucide-react';

interface DelphiViewProps {
  onConsultAi: (prompt: string) => void;
}

export const DelphiView: React.FC<DelphiViewProps> = ({ onConsultAi }) => {
  const [questions, setQuestions] = useState<DelphiQuestion[]>(DELPHI_QUESTIONS);
  const [selectedQuestion, setSelectedQuestion] = useState<DelphiQuestion>(questions[0]);
  const [activeRound, setActiveRound] = useState<number>(1);
  const [userEstimates, setUserEstimates] = useState<Record<string, { year: number; prob: number; argument: string }>>({});
  const [hasVoted, setHasVoted] = useState<Record<string, boolean>>({});
  const [isSimulatingRound, setIsSimulatingRound] = useState(false);
  const [userArgumentInput, setUserArgumentInput] = useState('');
  const [userSelectedYear, setUserSelectedYear] = useState<number>(2030);
  const [userSelectedProb, setUserSelectedProb] = useState<number>(75);

  const handleUserVoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserEstimates(prev => ({
      ...prev,
      [selectedQuestion.id]: {
        year: userSelectedYear,
        prob: userSelectedProb,
        argument: userArgumentInput || 'Estimación basada en análisis de capacidad y competitividad de puertos del Caribe.'
      }
    }));
    setHasVoted(prev => ({ ...prev, [selectedQuestion.id]: true }));
  };

  const handleSimulateDelphiRound = async () => {
    setIsSimulatingRound(true);
    try {
      const response = await fetch('/api/gemini/delphi-round', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: selectedQuestion.question,
          round: activeRound + 1,
          previousConsensus: `${selectedQuestion.consensusScore}% de probabilidad, año estimado ${selectedQuestion.expectedMedianYear}`,
          expertProfiles: [
            'Capitán de Navío DIMAR - Seguridad de Canales',
            'Director de Operaciones Concesión Portuaria SPRC',
            'Presidente de Gremio Exportador ANALDEX',
            'Investigador de Prospectiva Marítima (Univ. del Norte)',
            'Consultor Internacional en Descarbonización OMI 2050',
          ],
        }),
      });

      const data = await response.json();
      if (data.success && data.delphiRound) {
        const nextRoundNum = activeRound + 1;
        setActiveRound(nextRoundNum);

        const newResponses: DelphiResponse[] = (data.delphiRound.expertQuotes || []).map((eq: { role: string; quote: string }) => ({
          expertName: eq.role,
          organization: 'Panel Delphi Caribe',
          estimatedYear: data.delphiRound.adjustedHorizon ? parseInt(data.delphiRound.adjustedHorizon) || selectedQuestion.expectedMedianYear : selectedQuestion.expectedMedianYear,
          probability: data.delphiRound.consensusPercentage || selectedQuestion.probabilityAvg,
          stance: 'Muy Probable' as const,
          argument: eq.quote,
        }));

        const updated = questions.map((q) => {
          if (q.id === selectedQuestion.id) {
            return {
              ...q,
              consensusScore: data.delphiRound.consensusPercentage || Math.min(95, q.consensusScore + 6),
              probabilityAvg: data.delphiRound.consensusPercentage || q.probabilityAvg,
              responses: [...newResponses, ...q.responses].slice(0, 6),
            };
          }
          return q;
        });

        setQuestions(updated);
        setSelectedQuestion(updated.find(u => u.id === selectedQuestion.id)!);
      }
    } catch (err) {
      console.error('Error simulating Delphi round:', err);
    } finally {
      setIsSimulatingRound(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60 mb-2">
              <Vote className="w-3.5 h-3.5" />
              <span>Método Delphi • Panel Prospectivo de Consenso de Expertos Portuarios</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
              Panel Delphi del Comercio Marítimo del Caribe
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
              Consulta iterativa estructurada para reducir la incertidumbre y dispersión de opiniones de expertos 
              (DIMAR, Operadores Portuarios, Gremios, Academia y Navieras) sobre eventos clave del sistema marítimo regional.
            </p>
          </div>

          <button
            onClick={() => onConsultAi(`Como experto en prospectiva colombiana, sintetiza las conclusiones del Panel Delphi sobre: "${selectedQuestion.title}". ¿Qué probabilidades de éxito y qué horizontes temporales de convergencia se observan?`)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500/20 to-emerald-500/20 hover:from-teal-500/30 hover:to-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs sm:text-sm font-semibold transition-all active:scale-95 shrink-0"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Consultar Consenso con IA</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Questions List & Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Questions list */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Preguntas en Consulta Estratégica ({questions.length})
          </div>

          {questions.map((q) => {
            const isSelected = selectedQuestion.id === q.id;
            const voted = hasVoted[q.id];

            return (
              <div
                key={q.id}
                onClick={() => setSelectedQuestion(q)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800 border-cyan-400 shadow-md shadow-cyan-950/40'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-800">
                    {q.theme}
                  </span>
                  <span className="text-xs font-bold text-emerald-400">
                    {q.consensusScore}% Consenso
                  </span>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-slate-100 mb-2 leading-snug">
                  {q.title}
                </h4>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-cyan-400" />
                    Horizonte: {q.expectedMedianYear}
                  </span>
                  {voted ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Voto registrado
                    </span>
                  ) : (
                    <span className="text-cyan-400 font-medium">Participar &rarr;</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Question Deep Dive */}
        <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Ronda Delphi Activa: {activeRound}
                </span>
                <span className="text-xs text-slate-400">
                  Tema: <strong className="text-slate-200">{selectedQuestion.theme}</strong>
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-100">
                {selectedQuestion.question}
              </h3>
            </div>

            <button
              onClick={handleSimulateDelphiRound}
              disabled={isSimulatingRound}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-slate-950 font-bold text-xs shrink-0 transition-all active:scale-95 disabled:opacity-50"
            >
              {isSimulatingRound ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Iterando Ronda...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Simular Ronda {activeRound + 1} con IA</span>
                </>
              )}
            </button>
          </div>

          {/* Context & Description */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <span className="font-semibold text-slate-200 block mb-1">Fundamento del Debate Prospectivo:</span>
            {selectedQuestion.context}
          </div>

          {/* Consensus Metrics Bar */}
          <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-medium">Grado de Consenso del Panel:</span>
              <span className="text-sm font-bold text-emerald-400">{selectedQuestion.consensusScore}% de convergencia</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-700 rounded-full"
                style={{ width: `${selectedQuestion.consensusScore}%` }}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center text-xs">
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Año Mediano Esperado</span>
                <span className="font-bold text-cyan-300">{selectedQuestion.expectedMedianYear}</span>
              </div>
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Probabilidad Media</span>
                <span className="font-bold text-teal-300">{selectedQuestion.probabilityAvg}%</span>
              </div>
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Ronda en Curso</span>
                <span className="font-bold text-amber-300">Ronda {activeRound}</span>
              </div>
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Expertos Registrados</span>
                <span className="font-bold text-slate-200">{selectedQuestion.responses.length}</span>
              </div>
            </div>
          </div>

          {/* User Participation / Voting Box */}
          <div className="bg-gradient-to-br from-slate-900 to-cyan-950/30 p-4 rounded-xl border border-cyan-800/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <Vote className="w-4 h-4" />
                Tu Veredicto como Experto en Prospectiva:
              </span>
              {hasVoted[selectedQuestion.id] && (
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Voto registrado: Año {userEstimates[selectedQuestion.id].year} ({userEstimates[selectedQuestion.id].prob}%)
                </span>
              )}
            </div>

            <form onSubmit={handleUserVoteSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">
                    Año Estimado de Ocurrencia: <strong>{userSelectedYear}</strong>
                  </label>
                  <input
                    type="range"
                    min="2026"
                    max="2040"
                    value={userSelectedYear}
                    onChange={(e) => setUserSelectedYear(parseInt(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">
                    Probabilidad Asignada: <strong>{userSelectedProb}%</strong>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={userSelectedProb}
                    onChange={(e) => setUserSelectedProb(parseInt(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={userArgumentInput}
                  onChange={(e) => setUserArgumentInput(e.target.value)}
                  placeholder="Justificación técnica de tu estimación (opcional)..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Emitir Voto</span>
                </button>
              </div>
            </form>
          </div>

          {/* Expert Responses / Qualitative feedback */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
              Juicios y Argumentaciones Cualitativas del Panel
            </h4>
            <div className="space-y-2.5">
              {selectedQuestion.responses.map((resp, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                      <Users className="w-3 h-3 text-slate-400" />
                      {resp.expertName}
                    </span>
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="text-slate-400">{resp.organization}</span>
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-teal-300 border border-slate-800 font-semibold">
                        Año {resp.estimatedYear} • {resp.probability}%
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    "{resp.argument}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
