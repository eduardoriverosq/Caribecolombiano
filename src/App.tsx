import React, { useState } from 'react';
import { Navbar, TabId } from './components/Navbar';
import { OverviewDashboard } from './components/OverviewDashboard';
import { TrendRadarView } from './components/TrendRadarView';
import { MicmacView } from './components/MicmacView';
import { MactorView } from './components/MactorView';
import { SchwartzScenariosView } from './components/SchwartzScenariosView';
import { DelphiView } from './components/DelphiView';
import { IgoMatrixView } from './components/IgoMatrixView';
import { AiConsultantModal } from './components/AiConsultantModal';
import { 
  Compass, 
  BookOpen, 
  Ship, 
  Anchor, 
  FileCheck, 
  ExternalLink,
  Shield
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [selectedHorizon, setSelectedHorizon] = useState<'2030' | '2040'>('2040');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiModalInitialPrompt, setAiModalInitialPrompt] = useState<string | undefined>(undefined);

  const handleOpenAiWithPrompt = (prompt: string) => {
    setAiModalInitialPrompt(prompt);
    setIsAiModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        selectedHorizon={selectedHorizon}
        onSelectHorizon={setSelectedHorizon}
        onOpenAiConsultant={() => {
          setAiModalInitialPrompt(undefined);
          setIsAiModalOpen(true);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'overview' && (
          <OverviewDashboard
            onNavigateTab={setActiveTab}
            onOpenAiConsultantWithPrompt={handleOpenAiWithPrompt}
            selectedHorizon={selectedHorizon}
          />
        )}

        {activeTab === 'radar' && (
          <TrendRadarView
            onConsultAi={handleOpenAiWithPrompt}
          />
        )}

        {activeTab === 'micmac' && (
          <MicmacView
            onConsultAi={handleOpenAiWithPrompt}
          />
        )}

        {activeTab === 'mactor' && (
          <MactorView
            onConsultAi={handleOpenAiWithPrompt}
          />
        )}

        {activeTab === 'schwartz' && (
          <SchwartzScenariosView
            onConsultAi={handleOpenAiWithPrompt}
          />
        )}

        {activeTab === 'delphi' && (
          <DelphiView
            onConsultAi={handleOpenAiWithPrompt}
          />
        )}

        {activeTab === 'igo' && (
          <IgoMatrixView
            onConsultAi={handleOpenAiWithPrompt}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/80 backdrop-blur-sm py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-slate-300">
              Observatorio de Tendencias Marítimas — Caribe Colombiano
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <span>CONPES 3990 (Política Portuaria)</span>
            <span>•</span>
            <span>DIMAR</span>
            <span>•</span>
            <span>Escuela Francesa (Godet) & Anglo-Sajona (Schwartz)</span>
            <span>•</span>
            <span>Horizonte 2030 - 2040</span>
          </div>

          <div className="text-slate-500 text-[11px]">
            República de Colombia • Prospectiva y Vigilancia Estratégica
          </div>
        </div>
      </footer>

      {/* AI Foresight Consultant Modal */}
      <AiConsultantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        initialPrompt={aiModalInitialPrompt}
        selectedHorizon={selectedHorizon}
      />
    </div>
  );
}
