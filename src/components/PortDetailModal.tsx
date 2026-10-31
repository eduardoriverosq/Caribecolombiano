import React from 'react';
import { MaritimePort } from '../types';
import { X, Anchor, ArrowUpRight, AlertTriangle, CheckCircle2, Waves, Building2, FileText } from 'lucide-react';

interface PortDetailModalProps {
  port: MaritimePort | null;
  onClose: () => void;
  onConsultAi: (portName: string) => void;
}

export const PortDetailModal: React.FC<PortDetailModalProps> = ({
  port,
  onClose,
  onConsultAi,
}) => {
  if (!port) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 p-5 flex items-start justify-between z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                {port.type}
              </span>
              <span className="text-xs text-slate-400">
                {port.department} • {port.city}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <Anchor className="w-5 h-5 text-cyan-400" />
              {port.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 mb-1 flex items-center gap-1">
                <Waves className="w-3.5 h-3.5 text-cyan-400" />
                Calado Máximo
              </div>
              <div className="text-lg font-bold text-cyan-300">
                {port.maxDraftMeters} m
              </div>
              <div className="text-[11px] text-slate-500">
                {port.maxDraftMeters >= 15 ? 'Apto Neo-Panamax' : 'Requiere gestión calado'}
              </div>
            </div>

            {port.annualThroughputTEUs && (
              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">Capacidad / TEUs</div>
                <div className="text-lg font-bold text-teal-300">
                  {(port.annualThroughputTEUs / 1000000).toFixed(1)}M TEUs
                </div>
                <div className="text-[11px] text-slate-500">Contenedores anuales</div>
              </div>
            )}

            {port.annualThroughputTons && (
              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">Tonelaje Anual</div>
                <div className="text-lg font-bold text-amber-300">
                  {(port.annualThroughputTons / 1000000).toFixed(1)}M Tons
                </div>
                <div className="text-[11px] text-slate-500">Graneles y líquidos</div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Diagnóstico Operativo y Geográfico
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {port.description}
            </p>
          </div>

          {/* Strategic Advantages */}
          <div>
            <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Ventajas Estratégicas y Competitivas
            </div>
            <ul className="space-y-2">
              {port.strategicAdvantages.map((adv, i) => (
                <li key={i} className="text-xs sm:text-sm text-slate-300 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/60 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0" />
                  <span>{adv}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Critical Challenges */}
          <div>
            <div className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              Desafíos Críticos e Incertidumbres Prospectivas
            </div>
            <ul className="space-y-2">
              {port.criticalChallenges.map((chal, i) => (
                <li key={i} className="text-xs sm:text-sm text-slate-300 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/60 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                  <span>{chal}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Terminals & Conpes */}
          <div className="space-y-3 pt-2">
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                Principales Terminales Concesionados
              </div>
              <div className="flex flex-wrap gap-2">
                {port.keyTerminals.map((term, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                    {term}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-cyan-950/30 p-3 rounded-xl border border-cyan-800/40 text-xs text-cyan-200">
              <span className="font-semibold flex items-center gap-1.5 mb-1 text-cyan-300">
                <FileText className="w-3.5 h-3.5" />
                Rol en Política Portuaria Nacional (CONPES 3990):
              </span>
              {port.conpesRole}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="sticky bottom-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-4 flex items-center justify-between">
          <button
            onClick={() => onConsultAi(`¿Cuál es el análisis prospectivo al 2040 para el nodo de ${port.name} ante la descarbonización y el CONPES 3990?`)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-semibold text-xs transition-colors"
          >
            <span>Consultar Escenario para este Puerto</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
