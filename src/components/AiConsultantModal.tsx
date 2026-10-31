import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Loader2, 
  Compass, 
  FileText, 
  Copy, 
  Check, 
  RotateCcw,
  BookOpen
} from 'lucide-react';

interface AiConsultantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
  selectedHorizon: '2030' | '2040';
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  methodologyUsed?: string;
  timestamp: string;
}

export const AiConsultantModal: React.FC<AiConsultantModalProps> = ({
  isOpen,
  onClose,
  initialPrompt,
  selectedHorizon,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      content: `Hola. Soy tu consultor colombiano experto en prospectiva marítima y portuaria del Caribe. Integro las escuelas de Michel Godet (MICMAC y MACTOR), Peter Schwartz (Escenarios 2x2), el Método Delphi y la Matriz IGO aplicada a la política portuaria CONPES 3990. ¿En qué tema estratégico o incertidumbre crítica deseas profundizar hoy?`,
      methodologyUsed: 'Prospectiva Estratégica Integral (Mojica / Godet)',
      timestamp: 'Ahora',
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPrompt) {
      setInputPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const prompt = textToSend || inputPrompt;
    if (!prompt.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          methodology: 'Prospectiva Integral (Godet, Schwartz, Delphi, IGO)',
          horizon: selectedHorizon,
          regionFocus: 'Caribe Colombiano',
        }),
      });

      const data = await response.json();

      if (data.success && data.analysis) {
        const assistantMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          content: data.analysis,
          methodologyUsed: data.methodology || 'Análisis Prospectivo Estratégico',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        throw new Error(data.error || 'No se pudo generar respuesta');
      }
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        content: `Error al procesar la consulta: ${err.message || 'Servicio ocupado'}. Por favor intenta de nuevo.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const promptSuggestions = [
    "¿Cómo afectará el calado de 16.5m en Cartagena frente a buques New Panamax de 18,000 TEU?",
    "¿Qué impacto tendrá Puerto Antioquia (Urabá) en los fletes hacia Medellín y el Eje Cafetero?",
    "¿Cómo deben prepararse Barranquilla y Santa Marta ante la descarbonización OMI 2050?",
    "Sintetiza las 3 mayores alertas tempranas para el CONPES 3990 en el Caribe."
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900/95 border-b border-slate-800 p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-teal-500 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-cyan-500/20">
              <Bot className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-slate-100">
                  Consultor Colombiano en Prospectiva Marítima
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-semibold">
                  IA Especializada
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Basado en CONPES 3990, DIMAR, Godet, Schwartz, Delphi e IGO (Horizonte {selectedHorizon})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-cyan-600 text-slate-950 font-semibold rounded-tr-none'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none space-y-2'
                }`}
              >
                {msg.sender === 'assistant' && msg.methodologyUsed && (
                  <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-2 mb-2">
                    <span className="text-[11px] font-bold text-cyan-400 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5" />
                      {msg.methodologyUsed}
                    </span>
                    <button
                      onClick={() => handleCopy(msg.content, msg.id)}
                      className="text-slate-400 hover:text-slate-200 p-1"
                      title="Copiar texto"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}

                <div className="whitespace-pre-wrap font-sans">
                  {msg.content}
                </div>

                <div className={`text-[10px] text-right mt-1 ${msg.sender === 'user' ? 'text-cyan-950' : 'text-slate-500'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-2">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl rounded-tl-none p-4 text-xs text-slate-300 flex items-center gap-3">
                <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                <span>Estructurando diagnóstico prospectivo con metodologías de Godet y Schwartz...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-slate-950/60 border-t border-slate-800/80 overflow-x-auto no-scrollbar flex items-center gap-2 shrink-0">
          <span className="text-[11px] text-slate-500 font-semibold shrink-0">Sugerencias:</span>
          {promptSuggestions.map((sug, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(sug)}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 whitespace-nowrap transition-colors shrink-0"
            >
              {sug.slice(0, 45)}...
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Pregunta al experto en prospectiva portuaria..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !inputPrompt.trim()}
              className="p-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-slate-950 font-bold transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
