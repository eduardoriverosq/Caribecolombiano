export type TrendType = 'megatrend' | 'heavy_trend' | 'weak_signal' | 'wild_card';

export type TrendCategory = 
  | 'geopolitica' 
  | 'tecnologica' 
  | 'ambiental' 
  | 'infraestructura' 
  | 'gobernanza';

export type TimeHorizon = 'corto' | 'medio' | 'largo'; // corto: 2026-2028, medio: 2029-2034, largo: 2035-2045

export interface TrendItem {
  id: string;
  title: string;
  type: TrendType;
  category: TrendCategory;
  horizon: TimeHorizon;
  horizonYears: string;
  impactScore: number; // 1 to 5
  probabilityScore: number; // 1 to 5
  description: string;
  prospectiveImplication: string;
  impactedPorts: string[];
  earlySignals: string[];
  conpesReference?: string;
}

export type MicmacQuadrant = 
  | 'clave' // High Motricity, High Dependency (Enlace/Estratégicas)
  | 'determinante' // High Motricity, Low Dependency (Entrada/Fuerzas Motrices)
  | 'resultado' // Low Motricity, High Dependency (Salida/Impactos)
  | 'autonoma' // Low Motricity, Low Dependency (Reguladoras/Secundarias)
  | 'objetivo'
  | 'enlace'; // High Motricity, High Dependency

export interface MicmacVariable {
  id: string;
  code: string;
  name: string;
  category: TrendCategory;
  description: string;
  motricity: number; // 0 to 100
  dependency: number; // 0 to 100
  quadrant: MicmacQuadrant;
  prospectiveRole: string;
  keyIndicators: string[];
}

export interface ActorMactor {
  id: string;
  code: string;
  name: string;
  fullName: string;
  type: 'Estado' | 'Naviera' | 'Operador' | 'Gremio' | 'Comunidad' | 'Internacional';
  powerScore: number; // 1 to 10
  influenceScore: number; // 1 to 10
  strategicMission: string;
  stances: Record<string, number>; // objectiveId -> -2 to +2
}

export interface MactorObjective {
  id: string;
  code: string;
  title: string;
  description: string;
  horizonYear: number;
}

export interface SchwartzScenario {
  id: string;
  quadrant: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  title: string;
  name: string;
  subtitle: string;
  tagline: string;
  axisXCondition: string; // e.g. "Integración Multimodal y PCS Pleno" vs "Fragmentación Modal"
  axisYCondition: string; // e.g. "Hub Verde y Nearshoring Global" vs "Rezago Fósil y Aislamiento"
  probability: number; // %
  desirability: 'deseable' | 'tendencial' | 'catastrofico' | 'alternativo';
  narrative: string;
  consequences: string[];
  earlyWarnings: string[];
  strategicActions: string[];
  affectedPortsStatus: {
    port: string;
    condition: string;
    vulnerabilityLevel: 'Baja' | 'Media' | 'Alta' | 'Crítica';
  }[];
}

export interface DelphiResponse {
  expertName: string;
  organization: string;
  estimatedYear: number;
  probability: number;
  stance: 'Muy Probable' | 'Moderado' | 'Poco Probable' | 'Inviable';
  argument: string;
}

export interface DelphiQuestion {
  id: string;
  title: string;
  theme: string;
  question: string;
  context: string;
  consensusScore: number; // 0 to 100
  expectedMedianYear: number;
  probabilityAvg: number; // 0 to 100
  responses: DelphiResponse[];
  userVote?: {
    estimatedYear: number;
    probability: number;
    argument: string;
  };
}

export type IgoQuadrant = 
  | 'inmediata' 
  | 'reto' 
  | 'secundaria' 
  | 'descartable'
  | 'inmediatas' 
  | 'retos' 
  | 'secundarias' 
  | 'descartables';

export interface IgoAction {
  id: string;
  code: string;
  title: string;
  description: string;
  importance: number; // 1 to 10 (Eje Y)
  governability: number; // 1 to 10 (Eje X)
  quadrant: IgoQuadrant;
  pillar?: string;
  responsibleEntity?: string;
  timeframe?: string;
  timeframeYears?: string;
  leadAgency?: string;
  estimatedCostUSD?: string;
  expectedImpact?: string;
}

export interface MaritimePort {
  id: string;
  name: string;
  department: string;
  city: string;
  coordinates: [number, number]; // lat, lng
  type: 'Hub Transbordo' | 'Fluvial-Marítimo' | 'Aguas Profundas' | 'Terminal Energético' | 'Bioceánico / Agroindustrial' | 'Insular';
  maxDraftMeters: number;
  annualThroughputTEUs?: number;
  annualThroughputTons?: number;
  highlightStat: string;
  description: string;
  strategicAdvantages: string[];
  criticalChallenges: string[];
  keyTerminals: string[];
  conpesRole: string;
}
