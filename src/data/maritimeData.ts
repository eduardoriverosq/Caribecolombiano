import { 
  MaritimePort, 
  TrendItem, 
  MicmacVariable, 
  ActorMactor, 
  MactorObjective, 
  SchwartzScenario, 
  DelphiQuestion, 
  IgoAction 
} from '../types';

export const PORTS_DATA: MaritimePort[] = [
  {
    id: 'cartagena',
    name: 'Cartagena de Indias',
    department: 'Bolívar',
    city: 'Cartagena',
    coordinates: [10.391, -75.479],
    type: 'Hub Transbordo',
    maxDraftMeters: 15.5,
    annualThroughputTEUs: 3400000,
    annualThroughputTons: 44000000,
    highlightStat: '#1 Hub de Transbordo del Caribe Sur',
    description: 'Principal complejo portuario de contenedores de Colombia y cuarto de América Latina. Conexión directa a más de 750 puertos en 150 países, parque industrial petroquímico en Mamonal y articulación al Canal del Dique.',
    strategicAdvantages: [
      'Posición geográfica equidistante sobre las rutas este-oeste del Canal de Panamá.',
      'Calado de 15.5m en canales de Bocachica con tecnología automatizada RTG y STS Super Post-Panamax.',
      'Sinergia con el clúster petroquímico de Mamonal y Refinería de Cartagena (Reficar).'
    ],
    criticalChallenges: [
      'Necesidad de dragado a 16.5m para atender buques Neo-Panamax de 18,000+ TEUs.',
      'Congestión terrestre en accesos viales urbanos hacia Mamonal.',
      'Presión por descarbonización y suministro de bunkering de metanol/GNL para navieras líderes.'
    ],
    keyTerminals: ['Sociedad Portuaria Regional de Cartagena (SPRC)', 'Terminal de Contenedores Contecar', 'Puerto Bahía (Líquidos y Ro-Ro)', 'Terminal de Mamonal'],
    conpesRole: 'Consolidación como Hub Internacional de Transbordo y clúster petroquímico marítimo.'
  },
  {
    id: 'barranquilla',
    name: 'Barranquilla (Fluvial-Marítimo)',
    department: 'Atlántico',
    city: 'Barranquilla',
    coordinates: [10.968, -74.781],
    type: 'Fluvial-Marítimo',
    maxDraftMeters: 10.2,
    annualThroughputTons: 12500000,
    highlightStat: '22 km de canal navegable sobre el Río Magdalena',
    description: 'Nodo estuario fluvial-marítimo con 22 km de ribera sobre el Río Magdalena. Enlace natural de la carga multimodal interior hacia el Atlántico, con terminales de graneles limpios, coque, acero y líquidos.',
    strategicAdvantages: [
      'Entrada directa a la hidrovía del Río Magdalena (1.500 km navegables hasta el interior del país).',
      'Clúster industrial de coque, fertilizantes, manufacturas y agroquímicos.',
      'Cercanía al proyecto de energía eólica marina costa afuera (Offshore Wind) de Barranquilla.'
    ],
    criticalChallenges: [
      'Inestabilidad recurrente del calado oficial en Bocas de Ceniza por sedimentación fluvial.',
      'Dependencia de dragado permanente y demoras en el contrato de largo plazo de Cormagdalena.',
      'Limitación de eslora y manga para buques de última generación sin puerto de aguas profundas.'
    ],
    keyTerminals: ['Sociedad Portuaria Regional de Barranquilla (SPRB)', 'Palermo Sociedad Portuaria', 'Puma Energy', 'Bimpex', 'Compas Barranquilla'],
    conpesRole: 'Eje de la multimodalidad fluvial-marítima e industrialización de exportación.'
  },
  {
    id: 'santa-marta',
    name: 'Santa Marta (Aguas Profundas)',
    department: 'Magdalena',
    city: 'Santa Marta',
    coordinates: [11.240, -74.211],
    type: 'Aguas Profundas',
    maxDraftMeters: 18.0,
    annualThroughputTons: 15200000,
    highlightStat: 'Calado natural de hasta 18m sin necesidad de dragado',
    description: 'Único puerto natural de aguas profundas de Colombia que no requiere dragado permanente de mantenimiento. Líder indiscutido en exportación de carbón directo, banano con atmósfera controlada, flores refrigeradas y graneles limpios.',
    strategicAdvantages: [
      'Calado natural excepcional de 60 pies (18.3 metros) a pie de muelle.',
      'Conexión con el corredor férreo del Magdalena / Cesar (Fenoco) para trenes carboníferos.',
      'Liderazgo en cadena de frío certificada para agroexportación hacia Europa y EE.UU.'
    ],
    criticalChallenges: [
      'Proyección de transición energética global que reducirá la exportación de carbón térmico al 2035.',
      'Limitación de área de expansión terrestre entre la bahía y el casco urbano patrimonial.',
      'Necesidad de diversificación urgente hacia contenedores y carga rodante Ro-Ro.'
    ],
    keyTerminals: ['Sociedad Portuaria de Santa Marta (SPSM)', 'Carbones del Cerrejón / Drummond (Ciénaga)', 'Puerto Brisa'],
    conpesRole: 'Diversificación de carga limpia y aprovechamiento del calado natural para buques Capesize.'
  },
  {
    id: 'morrosquillo',
    name: 'Golfo de Morrosquillo (Coveñas / Tolú)',
    department: 'Sucre / Córdoba',
    city: 'Coveñas - Tolú',
    coordinates: [9.524, -75.684],
    type: 'Terminal Energético',
    maxDraftMeters: 22.0,
    annualThroughputTons: 28000000,
    highlightStat: '#1 Terminal de Crudo y Monoboyas Offshore',
    description: 'El mayor nodo de exportación de hidrocarburos de Colombia mediante monoboyas mar adentro conectadas al oleoducto Ocensa. Cuenta además con terminales de cabotaje, cemento y graneles en Tolú.',
    strategicAdvantages: [
      'Profundidad ilimitada mar adentro para tanqueros VLCC (Very Large Crude Carriers).',
      'Extremo del oleoducto central Ocensa desde los Llanos Orientales.',
      'Ubicación estratégica para cabotaje con San Andrés y el Caribe occidental.'
    ],
    criticalChallenges: [
      'Vulnerabilidad directa a la descarbonización mundial y descenso de demanda de crudo fósil.',
      'Fragilidad ecológica de los ecosistemas coralinos y manglares de las islas de San Bernardo.',
      'Infraestructura vial de conexión secundaria hacia Antioquia y el Caribe.'
    ],
    keyTerminals: ['Terminal Marítimo de Coveñas (Ocensa / Ecopetrol)', 'Compas Tolú (Graneles y Cemento)'],
    conpesRole: 'Reconversión progresiva hacia energías renovables, gas natural licuado y cabotaje regional.'
  },
  {
    id: 'uraba',
    name: 'Urabá (Puerto Antioquia & Turbo)',
    department: 'Antioquia',
    city: 'Turbo / Bahía Colombia',
    coordinates: [7.931, -76.728],
    type: 'Bioceánico / Agroindustrial',
    maxDraftMeters: 14.5,
    annualThroughputTEUs: 1200000,
    highlightStat: 'Ahorro de hasta 350 km hacia Medellín, Bogotá y el Eje Cafetero',
    description: 'La gran transformación portuaria del Caribe sur. Puerto Antioquia en el Golfo de Urabá reduce de manera drástica el flete terrestre hacia el triángulo económico de Colombia (Medellín, Eje Cafetero, Bogotá) impulsando la agroexportación de banano, plátano y aguacate Hass.',
    strategicAdvantages: [
      'Es el puerto caribeño más cercano a los principales centros de producción y consumo de Colombia.',
      'Ahorro del 30% en costos de transporte terrestre mediante vías 4G (Túnel del Toyo y Mar 1/2).',
      'Diseño multipropósito moderno para contenedores refrigerados, graneles y vehículos.'
    ],
    criticalChallenges: [
      'Régimen hidrológico y sedimentación del Río Atrato en el Golfo de Urabá.',
      'Riesgos de conflictividad social y orden público en la subregión fronteriza.',
      'Sincronización con el Túnel del Toyo para garantizar la fluidez de carga pesada.'
    ],
    keyTerminals: ['Puerto Antioquia (Bahía Colombia)', 'Puerto Pisisí (Turbo)', 'Muelles bananeros de Zungo y Nueva Colonia (Unibán/Banacol)'],
    conpesRole: 'Descentralización portuaria y aceleración del comercio exterior del centro y occidente del país.'
  },
  {
    id: 'guajira',
    name: 'La Guajira (Puerto Bolívar & Brisa)',
    department: 'La Guajira',
    city: 'Uribia / Dibulla',
    coordinates: [12.203, -71.972],
    type: 'Terminal Energético',
    maxDraftMeters: 19.5,
    annualThroughputTons: 22000000,
    highlightStat: 'Mayor puerto de carbón del hemisferio y futuro polo offshore',
    description: 'Infraestructura de alta capacidad para exportación masiva de carbón térmico (Cerrejón) y multipropósito en Puerto Brisa. Posee las mejores condiciones de radiación y vientos alisios de Suramérica para el desarrollo de hidrógeno verde y eólica offshore.',
    strategicAdvantages: [
      'Capacidad para buques graneleros gigantes tipo Capesize de hasta 175.000 DWT.',
      'Potencial eólico y solar de clase mundial para plantas de amoníaco e hidrógeno verde.',
      'Línea férrea privada de 150 km operativa entre mina y puerto.'
    ],
    criticalChallenges: [
      'Declive programado del mercado del carbón hacia Europa por impuestos al carbono (CBAM).',
      'Consulta previa con comunidades Wayúu para cualquier proyecto de reconversión.',
      'Severo estrés hídrico y aislamiento de la red troncal nacional.'
    ],
    keyTerminals: ['Puerto Bolívar (Cerrejón / Glencore)', 'Puerto Brisa (Dibulla - Multipropósito)'],
    conpesRole: 'Transformación del enclave extractivo en nodo logístico de transición energética.'
  },
  {
    id: 'san-andres',
    name: 'San Andrés y Providencia (Insular)',
    department: 'San Andrés y Providencia',
    city: 'San Andrés',
    coordinates: [12.584, -81.700],
    type: 'Insular',
    maxDraftMeters: 7.2,
    annualThroughputTons: 380000,
    highlightStat: 'Soberanía marítima y línea de vida de abastecimiento insular',
    description: 'Nodo insular dependiente al 100% de la navegación de cabotaje desde Cartagena y Barranquilla para víveres, combustibles y materiales. Enclave de soberanía nacional marítima vigilado por la DIMAR y la Armada Nacional.',
    strategicAdvantages: [
      'Ubicación geoestratégica en la Reserva de Biosfera Seaflower.',
      'Control de tráfico marítimo internacional en aguas territoriales de Colombia.',
      'Potencial para turismo náutico y cruceros boutique de bajo impacto.'
    ],
    criticalChallenges: [
      'Calado restringido en el canal de acceso que impide buques comerciales estándar.',
      'Elevada vulnerabilidad ante ciclones y huracanes por el cambio climático (ej. Huracán Iota).',
      'Altos costos de flete marítimo por desbalance de retorno (barcos regresan vacíos).'
    ],
    keyTerminals: ['Sociedad Portuaria de San Andrés', 'Muelle de Providencia'],
    conpesRole: 'Garantía de seguridad alimentaria, soberanía nacional y resiliencia climática.'
  }
];

export const TRENDS_DATA: TrendItem[] = [
  {
    id: 'trend-1',
    title: 'Descarbonización OMI 2050 y Corredores Marítimos Verdes',
    type: 'megatrend',
    category: 'ambiental',
    horizon: 'medio',
    horizonYears: '2027-2035',
    impactScore: 5,
    probabilityScore: 5,
    description: 'La Organización Marítima Internacional (Estrategia OMI 2023) exige alcanzar cero emisiones netas de GEI hacia 2050. Las navieras globales penalizan puertos sin suministro de combustibles verdes (metanol verde, amoníaco, electricidad de muelle OPS).',
    prospectiveImplication: 'Cartagena debe instalar suministro de bunker verde (metanol/bio-GNL) y electrificación de muelles antes de 2030 para evitar que las líneas troncales de Maersk y MSC prefieran Caucedo o Colón.',
    impactedPorts: ['cartagena', 'santa-marta', 'uraba'],
    earlySignals: [
      'Acuerdos de Maersk para entrega de portacontenedores propulsados por metanol verde.',
      'Tasa de carbono europea ETS aplicada a viajes marítimos internacionales con recalada en la UE.'
    ],
    conpesReference: 'CONPES 3990 Línea Estratégica 4: Sostenibilidad ambiental y eficiencia energética portuaria.'
  },
  {
    id: 'trend-2',
    title: 'Restricciones de Calado y Tarifas en el Canal de Panamá por Crisis Hídrica',
    type: 'heavy_trend',
    category: 'geopolitica',
    horizon: 'corto',
    horizonYears: '2026-2030',
    impactScore: 5,
    probabilityScore: 4,
    description: 'Las sequías periódicas por el fenómeno de El Niño en el Lago Gatún fuerzan a la Autoridad del Canal de Panamá (ACP) a reducir tránsitos diarios y calados máximos, disparando subastas de cruces y alterando los itinerarios.',
    prospectiveImplication: 'Cartagena se posiciona como estación de descarga y trasvase de carga o búfer de contingencia antes de entrar al Canal, incrementando el transbordo de contenedores en el Caribe colombiano.',
    impactedPorts: ['cartagena', 'uraba', 'barranquilla'],
    earlySignals: [
      'Cobro de recargos por agua dulce por parte de la ACP.',
      'Aumento del uso de puentes terrestres de ferrocarril en Panamá y evaluación de corredores bioceánicos en Colombia.'
    ],
    conpesReference: 'CONPES 3990: Análisis de competitividad frente a hubs de transbordo del Gran Caribe.'
  },
  {
    id: 'trend-3',
    title: 'Puerto Community System (PCS) Unificado y Automatización de Terminales',
    type: 'heavy_trend',
    category: 'tecnologica',
    horizon: 'corto',
    horizonYears: '2026-2029',
    impactScore: 4,
    probabilityScore: 5,
    description: 'Integración digital de ventanilla única marítima bajo CONPES 3990, conectando DIMAR, DIAN, ICA, Invima, Policía Antinarcóticos y terminales portuarios mediante blockchain y APIs estandarizadas.',
    prospectiveImplication: 'Reducción de tiempos de inspección de 48h a menos de 6h, eliminando sobrecostos logísticos que hoy representan el 13.5% del valor de la mercancía importada/exportada.',
    impactedPorts: ['cartagena', 'barranquilla', 'santa-marta', 'uraba'],
    earlySignals: [
      'Pilotos de PCS en Cartagena y Barranquilla liderados por MinTransporte y ANI.',
      'Mandato de la OMI de ventanilla única marítima digital obligatoria.'
    ],
    conpesReference: 'CONPES 3990 Línea Estratégica 1: Gobernanza digital, simplificación de trámites y PCS.'
  },
  {
    id: 'trend-4',
    title: 'Apertura Operativa de Puerto Antioquia y Nuevo Eje Logístico Urabá-Interior',
    type: 'heavy_trend',
    category: 'infraestructura',
    horizon: 'corto',
    horizonYears: '2025-2028',
    impactScore: 5,
    probabilityScore: 5,
    description: 'Entrada en operación comercial de Puerto Antioquia (Bahía Colombia) con capacidad de 1.2M de TEUs anuales, reorientando el flujo de carga del centro del país (Antioquia, Eje Cafetero, Bogotá) hacia Urabá.',
    prospectiveImplication: 'Guerra tarifaria y reconfiguración de cuotas de mercado con los puertos de Cartagena y Buenaventura por la carga del occidente y centro andino.',
    impactedPorts: ['uraba', 'cartagena', 'barranquilla'],
    earlySignals: [
      'Inversiones de navieras globales como CMA CGM en patios aduaneros en Urabá.',
      'Finalización de los tramos de autopistas 4G Mar 1, Mar 2 y Túnel del Toyo.'
    ],
    conpesReference: 'CONPES 3982 de Logística Nacional: Conexión multimodal de nodos de exportación.'
  },
  {
    id: 'trend-5',
    title: 'Reactivación Férrea La Dorada-Chiriguaná y Canal del Dique Multimodal',
    type: 'heavy_trend',
    category: 'infraestructura',
    horizon: 'medio',
    horizonYears: '2027-2032',
    impactScore: 4,
    probabilityScore: 4,
    description: 'Articulación del ferrocarril central hacia Santa Marta y del megaproyecto hidrológico del Canal del Dique que conectará la hidrovía del Magdalena con la Bahía de Cartagena sin sedimentar los corales.',
    prospectiveImplication: 'Baja del 25% en el costo del flete interno hacia Cartagena y Santa Marta, desafiando el monopolio del camión de carga pesada en Colombia.',
    impactedPorts: ['cartagena', 'santa-marta', 'barranquilla'],
    earlySignals: [
      'Contrato de concesión APP de 10 años para el corredor férreo La Dorada - Chiriguaná.',
      'Inicio de obras de las esclusas y compuertas del Canal del Dique en Calamar.'
    ],
    conpesReference: 'Plan Maestro Ferroviario y Plan Maestro Fluvial de Colombia.'
  },
  {
    id: 'trend-6',
    title: 'Nearshoring Industrial y Relocalización de Cadenas hacia el Caribe',
    type: 'megatrend',
    category: 'geopolitica',
    horizon: 'corto',
    horizonYears: '2026-2031',
    impactScore: 4,
    probabilityScore: 4,
    description: 'Empresas multinacionales estadounidenses y europeas reubican plantas manufactureras de Asia hacia países con acceso marítimo rápido a la costa este de EE.UU. (transit time de 3 a 5 días desde Barranquilla/Cartagena).',
    prospectiveImplication: 'Crecimiento de zonas francas marítimas en Barranquilla y Cartagena para manufacturas avanzadas, dispositivos médicos y agroindustria procesada.',
    impactedPorts: ['barranquilla', 'cartagena'],
    earlySignals: [
      'Llegada de inversiones en parques logísticos sobre la Circunvalar de la Prosperidad en Barranquilla.',
      'Incremento de exportaciones marítimas no minero-energéticas hacia Florida y Texas.'
    ],
    conpesReference: 'CONPES 3990: Aprovechamiento de zonas de expansión portuaria e inversión extranjera.'
  },
  {
    id: 'trend-7',
    title: 'Ocaso Acelerado del Carbón Térmico y Descarbonización en La Guajira y Santa Marta',
    type: 'heavy_trend',
    category: 'ambiental',
    horizon: 'medio',
    horizonYears: '2030-2038',
    impactScore: 5,
    probabilityScore: 5,
    description: 'El Mecanismo de Ajuste en Frontera por Carbono (CBAM) de la Unión Europea y el cierre de termoeléctricas en Europa y Norteamérica provocan una caída estructural en los volúmenes de exportación de carbón térmico desde Puerto Bolívar, Ciénaga y Puerto Brisa.',
    prospectiveImplication: 'Riesgo inminente de activos varados (stranded assets) en muelles carboníferos y necesidad de reconversión de infraestructura portuaria hacia graneles agrícolas, minerales estratégicos (cobre, níquel) y energía verde.',
    impactedPorts: ['guajira', 'santa-marta'],
    earlySignals: [
      'Devolución de títulos mineros de coque y carbón en el Cesar por multinacionales.',
      'Disminución del 18% en compras de carbón colombiano por parte de puertos europeos.'
    ],
    conpesReference: 'Plan de Transición Energética Justa del Gobierno Nacional y CONPES 3990.'
  },
  {
    id: 'trend-8',
    title: 'Cluster Eólico Offshore e Hidrógeno Verde en las Costas del Atlántico y Bolívar',
    type: 'weak_signal',
    category: 'tecnologica',
    horizon: 'largo',
    horizonYears: '2030-2042',
    impactScore: 4,
    probabilityScore: 3,
    description: 'Subasta de rondas eólicas costa afuera (Offshore Wind) de la ANH y MinEnergía. Los puertos de Barranquilla y Cartagena se postulan como bases de ensamblaje, instalación y mantenimiento marítimo de turbinas marinas.',
    prospectiveImplication: 'Creación de un nuevo sector portuario especializado en buques WTIV (Wind Turbine Installation Vessels) y plantas de síntesis de amoníaco verde para exportación marítima.',
    impactedPorts: ['barranquilla', 'cartagena', 'guajira'],
    earlySignals: [
      'Publicación de los pliegos de la primera ronda competitiva de eólica offshore en aguas de Bolívar y Atlántico.',
      'Memorandos de entendimiento entre la Alcaldía de Barranquilla y empresas de Dinamarca y Países Bajos.'
    ],
    conpesReference: 'Hoja de Ruta del Hidrógeno Verde y Hoja de Ruta Eólica Costa Afuera de Colombia.'
  },
  {
    id: 'trend-9',
    title: 'Megabuques Portacontenedores de 24,000 TEUs y Concentración en "Gemini Cooperation"',
    type: 'megatrend',
    category: 'geopolitica',
    horizon: 'corto',
    horizonYears: '2026-2030',
    impactScore: 4,
    probabilityScore: 5,
    description: 'La alianza "Gemini Cooperation" (Maersk y Hapag-Lloyd) redefine el modelo hub-and-spoke global, concentrando recaladas solo en puertos con calados superiores a 16m y productividad de grúa de 35+ movimientos/hora.',
    prospectiveImplication: 'Si Cartagena no garantiza 16.5m en Bocachica y ventanas de atraque garantizadas, perderá su condición de escala directa frente a los puertos de Freeport (Bahamas) o Kingston (Jamaica).',
    impactedPorts: ['cartagena'],
    earlySignals: [
      'Lanzamiento operativo de la red Gemini Cooperation con menos escalas directas y más alimentadores feeder.',
      'Entrega continua de megabuques serie megamax en astilleros asiáticos.'
    ],
    conpesReference: 'CONPES 3990: Competitividad tarifaria y estándares operativos internacionales.'
  },
  {
    id: 'trend-10',
    title: 'Aumento de Huracanes Categoría 5 y Afectación a la Navegación Insular y Costera',
    type: 'wild_card',
    category: 'ambiental',
    horizon: 'medio',
    horizonYears: '2027-2035',
    impactScore: 5,
    probabilityScore: 3,
    description: 'El calentamiento de las aguas superficiales del Mar Caribe intensifica ciclones tropicales fuera de las trayectorias históricas, amenazando la infraestructura de muelles en San Andrés, Cartagena y La Guajira con marejadas de tempestad.',
    prospectiveImplication: 'Exigencia de obras de protección costera, dragados de emergencia tras huracanes y protocolos de resiliencia climática marina dictados por la DIMAR.',
    impactedPorts: ['san-andres', 'cartagena', 'guajira'],
    earlySignals: [
      'Huracán Iota (categoría 5) destruyendo el 98% de la infraestructura de Providencia.',
      'Cierres de puertos más frecuentes por orden de Capitanía de Puerto durante temporada ciclónica.'
    ],
    conpesReference: 'Plan Nacional de Adaptación al Cambio Climático de Zonas Costeras.'
  },
  {
    id: 'trend-11',
    title: 'Adopción de Buques Autónomos y Navegación Inteligente (MASS) en el Caribe',
    type: 'weak_signal',
    category: 'tecnologica',
    horizon: 'largo',
    horizonYears: '2033-2045',
    impactScore: 3,
    probabilityScore: 3,
    description: 'Ensayos de buques de superficie no tripulados (Maritime Autonomous Surface Ships - MASS) para cabotaje costero entre Cartagena, Barranquilla y Urabá controlados desde centros VTS remotos.',
    prospectiveImplication: 'Transformación del perfil laboral portuario y de prácticos de puerto; necesidad de sistemas de ciberseguridad marítima certificados ante la DIMAR.',
    impactedPorts: ['cartagena', 'barranquilla'],
    earlySignals: [
      'Código MASS en desarrollo por la OMI para adopción legal en 2028.',
      'Sistemas de amarre automático y prácticos virtuales testeados en terminales europeas y asiáticas.'
    ],
    conpesReference: 'DIMAR: Desarrollo de capacidades tecnológicas navales y seguridad integral marítima.'
  },
  {
    id: 'trend-12',
    title: 'Gobernanza Fluvial del Magdalena con APP de Estabilidad y Dragado Inteligente',
    type: 'heavy_trend',
    category: 'gobernanza',
    horizon: 'corto',
    horizonYears: '2026-2029',
    impactScore: 4,
    probabilityScore: 4,
    description: 'Implementación del nuevo esquema contractual de Cormagdalena y MinTransporte con batimetría en tiempo real y dragado por niveles de servicio en el canal navegable de Barranquilla (Bocas de Ceniza).',
    prospectiveImplication: 'Estabilidad de calado a 10.2m los 365 días del año, reduciendo las pérdidas millonarias por desvíos forzosos de buques hacia Cartagena o Santa Marta.',
    impactedPorts: ['barranquilla'],
    earlySignals: [
      'Convenios entre Asoportuaria, Cormagdalena y Dimar para monitoreo batimétrico con drones marinos.',
      'Estructuración del proyecto de Puerto de Aguas Profundas en Barranquilla.'
    ],
    conpesReference: 'CONPES 3990: Coordinación institucional entre autoridades portuarias y fluviales.'
  }
];

export const MICMAC_VARIABLES: MicmacVariable[] = [
  {
    id: 'var-1',
    code: 'CAL_OP',
    name: 'Calado Operativo y Dragado',
    category: 'infraestructura',
    description: 'Profundidad garantizada en canales de acceso y muelles de Bocachica, Bocas de Ceniza y Santa Marta.',
    motricity: 88,
    dependency: 74,
    quadrant: 'clave',
    prospectiveRole: 'Variable Clave: Altamente influyente e inestable. Si cae el calado, el puerto queda fuera de las rutas de buques ULCV.',
    keyIndicators: ['Calado oficial DIMAR (metros)', 'Volumen anual de dragado (m³)', 'Número de buques desviados por calado']
  },
  {
    id: 'var-2',
    code: 'PCS_DIG',
    name: 'Port Community System (PCS) y Ventanilla Única',
    category: 'tecnologica',
    description: 'Nivel de interoperabilidad digital entre autoridades aduaneras, sanitarias, marítimas y operadores portuarios.',
    motricity: 82,
    dependency: 68,
    quadrant: 'clave',
    prospectiveRole: 'Variable Clave: Eslabón neurálgico para la competitividad frente a Panamá y Jamaica según CONPES 3990.',
    keyIndicators: ['Tiempo medio de levante aduanero (horas)', '% de trámites 100% digitales', 'Índice LPI Banco Mundial']
  },
  {
    id: 'var-3',
    code: 'DES_OMI',
    name: 'Descarbonización y Combustibles Verdes OMI',
    category: 'ambiental',
    description: 'Capacidad de oferta de bunkering de cero emisiones (metanol verde, amoníaco, electricidad de muelle OPS).',
    motricity: 92,
    dependency: 42,
    quadrant: 'determinante',
    prospectiveRole: 'Variable Determinante / Motriz: Impulsada por regulaciones globales de la OMI. Condiciona las recaladas futuras de navieras.',
    keyIndicators: ['Terminales con Onshore Power Supply (OPS)', 'Volumen de bunkering verde despachado (toneladas)', 'Huella de carbono portuaria']
  },
  {
    id: 'var-4',
    code: 'INT_HINT',
    name: 'Conectividad Intermodal con el Hinterland',
    category: 'infraestructura',
    description: 'Integración fluida con trenes (Chiriguaná), hidrovías (Magdalena/Dique) y autopistas 4G al interior.',
    motricity: 85,
    dependency: 79,
    quadrant: 'clave',
    prospectiveRole: 'Variable Clave: Define si el ahorro marítimo se pierde en el flete carretero colombiano.',
    keyIndicators: ['Costo logístico por tonelada/km', '% de carga movilizada por modo férreo y fluvial', 'Tiempo de tránsito interior-costa']
  },
  {
    id: 'var-5',
    code: 'EST_CANAL',
    name: 'Situación Hídrica y Tarifaria del Canal de Panamá',
    category: 'geopolitica',
    description: 'Comportamiento de restricciones de calado, peajes y cuellos de botella en el paso interoceánico.',
    motricity: 95,
    dependency: 15,
    quadrant: 'determinante',
    prospectiveRole: 'Variable Exógena / Motriz: Factor externo incontrolable por Colombia pero con impacto masivo en transbordo.',
    keyIndicators: ['Tránsitos diarios promedio Canal de Panamá', 'Tarifas de peaje ACP', 'Demora de fondeo en aguas panameñas']
  },
  {
    id: 'var-6',
    code: 'VOL_CARB',
    name: 'Demanda Internacional de Carbón Térmico',
    category: 'ambiental',
    description: 'Trayectoria de disminución de exportaciones de carbón desde La Guajira y Santa Marta.',
    motricity: 78,
    dependency: 20,
    quadrant: 'determinante',
    prospectiveRole: 'Variable Motriz: Fuerza de cambio disruptiva para los puertos del norte del Caribe.',
    keyIndicators: ['Millones de toneladas de carbón exportadas', 'Precio internacional FOB carbón', 'Impuesto al carbono fronterizo europeo CBAM']
  },
  {
    id: 'var-7',
    code: 'ALI_NAV',
    name: 'Estrategia de Alianzas Navieras Globales',
    category: 'geopolitica',
    description: 'Decisiones de itinerarios y concentración de servicios de Gemini, 2M, Ocean Alliance y THE Alliance.',
    motricity: 89,
    dependency: 35,
    quadrant: 'determinante',
    prospectiveRole: 'Variable Motriz: Dicta qué puertos sobreviven como Hubs o quedan relegados a puertos feeder secundarios.',
    keyIndicators: ['Número de servicios de línea regulares directos', 'Capacidad media de buques asignados (TEUs)', 'Fletes spot Caribe']
  },
  {
    id: 'var-8',
    code: 'GOB_PORT',
    name: 'Gobernanza y Concesiones Portuarias (ANI/MinTrans)',
    category: 'gobernanza',
    description: 'Estabilidad jurídica, prórrogas de contratos de concesión y tarifas de contraprestación portuaria.',
    motricity: 74,
    dependency: 62,
    quadrant: 'enlace',
    prospectiveRole: 'Variable de Enlace: Articula la inversión de los operadores privados con las políticas del Estado colombiano.',
    keyIndicators: ['Monto anual de inversión privada ejecutada', 'Vigencia media de contratos de concesión', 'Conflictividad regulatoria']
  },
  {
    id: 'var-9',
    code: 'TEU_TRANS',
    name: 'Volumen de TEUs y Carga Movilizada',
    category: 'infraestructura',
    description: 'Tráfico total de contenedores, graneles y carga rodante en los puertos del Caribe.',
    motricity: 32,
    dependency: 94,
    quadrant: 'resultado',
    prospectiveRole: 'Variable Resultado: Consecuencia directa del calado, las alianzas navieras y la eficiencia del hinterland.',
    keyIndicators: ['Total TEUs movilizados por año', 'Ratio transbordo vs carga nacional', 'Productividad de grúa (movimientos/hora)']
  },
  {
    id: 'var-10',
    code: 'SEG_MAR',
    name: 'Seguridad Integral Marítima y Control DIMAR',
    category: 'gobernanza',
    description: 'Capacidad de vigilancia VTS, señalización marítima, seguridad antinarcóticos y rescate.',
    motricity: 58,
    dependency: 48,
    quadrant: 'autonoma',
    prospectiveRole: 'Variable Reguladora / Autónoma: Indispensable para la reputación de los terminales pero de menor motricidad global.',
    keyIndicators: ['Índice de incidentes marítimos en canales', 'Inspecciones no intrusivas escáner %', 'Certificación ISPS de terminales']
  },
  {
    id: 'var-11',
    code: 'VUL_CLIM',
    name: 'Vulnerabilidad Climática y Nivel del Mar',
    category: 'ambiental',
    description: 'Exposición de muelles y canales a huracanes, erosión costera, intrusión salina y mareas de tempestad.',
    motricity: 72,
    dependency: 30,
    quadrant: 'determinante',
    prospectiveRole: 'Variable Motriz Ambiental: Riesgo físico acumulativo que obliga a readecuar los puertos en 2030-2050.',
    keyIndicators: ['Días de cierre de puerto por mal tiempo', 'Elevación del nivel medio del mar (mm/año)', 'Inversión en defensas costeras']
  },
  {
    id: 'var-12',
    code: 'REL_COMUN',
    name: 'Licenciamiento Social y Comunidades Étnicas',
    category: 'gobernanza',
    description: 'Relación de los puertos con pescadores tradicionales, comunidades afrodescendientes e indígenas.',
    motricity: 45,
    dependency: 72,
    quadrant: 'resultado',
    prospectiveRole: 'Variable Resultado / Social: Impactada por el dragado, la ocupación del borde costero y el empleo local.',
    keyIndicators: ['Consultas previas concluidas con acuerdo', 'Índice de conflictividad comunitaria', 'Empleo local directo e indirecto']
  }
];

export const MACTOR_OBJECTIVES: MactorObjective[] = [
  {
    id: 'obj-1',
    code: 'OBJ_DRAG',
    title: 'Profundización de Calados a 16.5m+ en Nodos Estratégicos',
    description: 'Financiar y ejecutar el dragado profundo en Cartagena y calado garantizado en Barranquilla con tecnología moderna.',
    horizonYear: 2028
  },
  {
    id: 'obj-2',
    code: 'OBJ_PCS',
    title: 'Implantación Obligatoria del Port Community System Unificado',
    description: 'Ventanilla digital única para agilizar trámites y trazabilidad de carga bajo supervisión de MinTransporte.',
    horizonYear: 2027
  },
  {
    id: 'obj-3',
    code: 'OBJ_VERDE',
    title: 'Infraestructura de Bunkering Verde y Conexión OPS en Muelle',
    description: 'Electrificación de muelles y suministro de metanol verde / amoníaco para cumplir metas OMI 2030.',
    horizonYear: 2030
  },
  {
    id: 'obj-4',
    code: 'OBJ_HINT',
    title: 'Inversión Férrea y Fluvial de Conexión al Hinterland',
    description: 'Priorizar el Tren La Dorada-Chiriguaná y las obras de navegabilidad del Canal del Dique y Río Magdalena.',
    horizonYear: 2029
  },
  {
    id: 'obj-5',
    code: 'OBJ_PRORR',
    title: 'Ampliación de Plazos de Concesión Portuaria a Cambio de Inversión',
    description: 'Garantizar seguridad jurídica a 20+ años para que los operadores privados inviertan en grúas y muelles.',
    horizonYear: 2026
  },
  {
    id: 'obj-6',
    code: 'OBJ_JUST',
    title: 'Canon Social y Regalías Portuarias para Comunidades Ribereñas',
    description: 'Destinar porcentaje directo de contraprestaciones portuarias al desarrollo social de pescadores y municipios.',
    horizonYear: 2027
  }
];

export const MACTOR_ACTORS: ActorMactor[] = [
  {
    id: 'act-dimar',
    code: 'DIMAR_GOB',
    name: 'DIMAR / Autoridad Marítima Nacional',
    fullName: 'Dirección General Marítima (Ministerio de Defensa)',
    type: 'Estado',
    powerScore: 9,
    influenceScore: 8,
    strategicMission: 'Garantizar la seguridad integral marítima, soberanía, señalización náutica y control del tráfico marítimo en Colombia.',
    stances: {
      'obj-1': 1,
      'obj-2': 2,
      'obj-3': 2,
      'obj-4': 1,
      'obj-5': 0,
      'obj-6': 0
    }
  },
  {
    id: 'act-operadores',
    code: 'CONCES_PRIV',
    name: 'Operadores de Terminales Privados',
    fullName: 'SPRC, Contecar, SPSM, SPRB, Puerto Antioquia, Compas',
    type: 'Operador',
    powerScore: 9,
    influenceScore: 9,
    strategicMission: 'Maximizar rentabilidad, productividad operativa y retención de líneas navieras internacionales con calados competitivos.',
    stances: {
      'obj-1': 2,
      'obj-2': 1,
      'obj-3': 1,
      'obj-4': 2,
      'obj-5': 2,
      'obj-6': -1
    }
  },
  {
    id: 'act-navieras',
    code: 'NAV_GLOBAL',
    name: 'Grandes Navieras Globales',
    fullName: 'Maersk, MSC, CMA CGM, Hapag-Lloyd, Cosco',
    type: 'Naviera',
    powerScore: 10,
    influenceScore: 9,
    strategicMission: 'Optimizar rutas globales con escalas mínimas, alta velocidad de operación, suministro de combustibles verdes y tarifas bajas.',
    stances: {
      'obj-1': 2,
      'obj-2': 2,
      'obj-3': 2,
      'obj-4': 1,
      'obj-5': 0,
      'obj-6': 0
    }
  },
  {
    id: 'act-gob-central',
    code: 'MINT_ANI',
    name: 'Gobierno Nacional (MinTransporte / ANI)',
    fullName: 'Ministerio de Transporte y Agencia Nacional de Infraestructura',
    type: 'Estado',
    powerScore: 9,
    influenceScore: 8,
    strategicMission: 'Implementar el CONPES 3990, balancear recaudo de contraprestaciones, multimodalidad y descarbonización nacional.',
    stances: {
      'obj-1': 1,
      'obj-2': 2,
      'obj-3': 2,
      'obj-4': 2,
      'obj-5': -1,
      'obj-6': 2
    }
  },
  {
    id: 'act-gremios',
    code: 'GREM_EXP',
    name: 'Gremios Exportadores e Importadores',
    fullName: 'Analdex, FITAC, Colfecar, Andi',
    type: 'Gremio',
    powerScore: 7,
    influenceScore: 7,
    strategicMission: 'Reducir el costo logístico país, eliminar demoras aduaneras y garantizar alternativas multimodales seguras.',
    stances: {
      'obj-1': 1,
      'obj-2': 2,
      'obj-3': 0,
      'obj-4': 2,
      'obj-5': 0,
      'obj-6': 0
    }
  },
  {
    id: 'act-comunidades',
    code: 'COM_PESC',
    name: 'Comunidades Costeras y Pescadores',
    fullName: 'Asociaciones de Pescadores Artesanales y Consejos Comunitarios Étnicos',
    type: 'Comunidad',
    powerScore: 5,
    influenceScore: 6,
    strategicMission: 'Proteger la soberanía alimentaria, ecosistemas de manglar y exigir compensaciones reales por obras de dragado y puertos.',
    stances: {
      'obj-1': -2,
      'obj-2': 0,
      'obj-3': 1,
      'obj-4': -1,
      'obj-5': -1,
      'obj-6': 2
    }
  },
  {
    id: 'act-omi',
    code: 'OMI_INT',
    name: 'Organismo Marítimo Internacional (OMI)',
    fullName: 'Organización Marítima Internacional / Agencias ONU',
    type: 'Internacional',
    powerScore: 8,
    influenceScore: 7,
    strategicMission: 'Garantizar normas globales de seguridad marítima (SOLAS), prevención de contaminación (MARPOL) y descarbonización 2050.',
    stances: {
      'obj-1': 0,
      'obj-2': 2,
      'obj-3': 2,
      'obj-4': 1,
      'obj-5': 0,
      'obj-6': 1
    }
  }
];

export const SCHWARTZ_SCENARIOS: SchwartzScenario[] = [
  {
    id: 'scen-q1',
    quadrant: 'Q1',
    title: 'Escenario Apuesta (Deseable)',
    name: 'Faro Verde del Caribe y Multimodalidad Plena',
    subtitle: 'Alta Integración Multimodal + Inserción en Cadenas Verdes Globales',
    tagline: 'El Caribe colombiano se consolida como el hub logístico y verde líder entre el Atlántico y el Canal de Panamá.',
    axisXCondition: 'Integración Multimodal Cohesionada y PCS Digitalizado',
    axisYCondition: 'Hub Marítimo Verde Descarbonizado y Nearshoring de Alto Valor',
    probability: 32,
    desirability: 'deseable',
    narrative: 'Hacia 2040, el Caribe colombiano ha consolidado una red portuaria inteligente e intermodal. El Canal del Dique y el Ferrocarril La Dorada-Chiriguaná operan en sinergia con los muelles de Cartagena y Santa Marta, movilizando más del 35% de la carga del interior del país por vías limpias. Cartagena ofrece bunkering de metanol verde y energía de muelle (OPS) a las navieras de la alianza Gemini, reteniendo su posición como el 4to hub de América Latina con 5.5M de TEUs anuales. Puerto Antioquia se erige como la plataforma agroindustrial más eficiente de Suramérica, mientras Barranquilla estabiliza su calado gracias al nuevo esquema de aguas profundas y se convierte en la capital de servicios eólicos marinos. La digitalización total con el Port Community System reduce a 4 horas los trámites de comercio exterior.',
    consequences: [
      'Reducción del 28% en el costo logístico de exportación de Colombia.',
      'Atracción de más de USD $4.500 millones en inversión extranjera de manufactura cerca al mar.',
      'Cero desvíos de buques de última generación hacia Kingston o Caucedo.'
    ],
    earlyWarnings: [
      'Entrada en vigor del PCS unificado antes de 2027.',
      'Inauguración de la primera estación de bunkering de metanol verde en Cartagena.',
      'Puesta en marcha puntual de Puerto Antioquia con vías 4G operativas.'
    ],
    strategicActions: [
      'Acelerar el CONPES de financiamiento para dragado continuo y profundización a 16.5m.',
      'Concretar la APP férrea de La Dorada a Santa Marta con patios de transferencia.',
      'Incentivos tributarios para electrificación de muelles y grúas 100% eléctricas.'
    ],
    affectedPortsStatus: [
      { port: 'Cartagena', condition: 'Líder en transbordo verde y hub petroquímico limpio', vulnerabilityLevel: 'Baja' },
      { port: 'Barranquilla', condition: 'Hub de ensamble offshore y puerto multimodal activo', vulnerabilityLevel: 'Media' },
      { port: 'Santa Marta', condition: 'Plataforma agroexportadora de frío y graneles limpios', vulnerabilityLevel: 'Baja' },
      { port: 'Urabá', condition: 'Puerta bioceánica del centro de Colombia a plena capacidad', vulnerabilityLevel: 'Baja' }
    ]
  },
  {
    id: 'scen-q2',
    quadrant: 'Q2',
    title: 'Escenario Alternativo A',
    name: 'Archipiélago de Enclaves Globales',
    subtitle: 'Fragmentación Interna + Alta Inserción en Rutas Globales',
    tagline: 'Puertos hipermodernos mirando al mar exterior pero desconectados del hinterland andino colombiano.',
    axisXCondition: 'Fragmentación Modal, Carretera Saturada y Trámites Dispersos',
    axisYCondition: 'Terminales Marítimas Verdes y Fuertes Alianzas con Navieras Internacionales',
    probability: 28,
    desirability: 'alternativo',
    narrative: 'En 2040, las terminales de Cartagena y Puerto Antioquia cuentan con tecnología de clase mundial, grúas automatizadas y suministro de combustibles limpios. Sin embargo, el interior de Colombia no logró reactivar sus trenes ni la navegación por el Río Magdalena. Más del 85% de la carga nacional continúa transportándose por camión en carreteras congestionadas y vulnerables a deslizamientos climáticos. Como resultado, Cartagena sobrevive casi exclusivamente como hub de transbordo internacional internacional ("cajas que tocan el muelle y se van sin entrar a Colombia"), mientras que los exportadores de Bucaramanga, Bogotá y Cali sufren sobrecostos terrestres que anulan la competitividad portuaria.',
    consequences: [
      'Enclaves portuarios prósperos con escaso derrame económico en la economía real colombiana.',
      'El transbordo internacional representa el 85% del tráfico en Cartagena, pero la carga nacional paga altos fletes.',
      'Conflictos permanentes entre transportadores de carga pesada, gremios y puertos.'
    ],
    earlyWarnings: [
      'Estancamiento de las licitaciones férreas de la ANI por desacuerdos de financiación.',
      'Crecimiento del transbordo puro sin aumento del valor agregado en zonas francas.',
      'Sobrecostos de fletes terrestres superando el 65% del costo logístico total.'
    ],
    strategicActions: [
      'Creación de corredores viales logísticos dedicados con peajes preferenciales nocturnos.',
      'Establecimiento de zonas de actividades logísticas (ZAL) en puertos para consolidación de carga.',
      'Alianzas público-privadas urgentes para patios de transferencia de camión a barcaza.'
    ],
    affectedPortsStatus: [
      { port: 'Cartagena', condition: 'Hub de transbordo internacional eficiente pero isla logística', vulnerabilityLevel: 'Media' },
      { port: 'Barranquilla', condition: 'Afectada por costos terrestres y competencia de puertos oceánicos', vulnerabilityLevel: 'Alta' },
      { port: 'Santa Marta', condition: 'Limitada por saturación vial urbana al perder el tren de carga limpia', vulnerabilityLevel: 'Alta' },
      { port: 'Urabá', condition: 'Opera principalmente banano local; menor penetración en carga del centro', vulnerabilityLevel: 'Media' }
    ]
  },
  {
    id: 'scen-q3',
    quadrant: 'Q3',
    title: 'Escenario Tendencial Degradado',
    name: 'La Bahía Estancada y Pérdida de Escala',
    subtitle: 'Fragmentación Modal + Rezago Fósil y Pérdida de Competitividad',
    tagline: 'Colombia pierde su rol marítimo regional ante la falta de calado, lentitud digital y el ocaso no planificado del carbón.',
    axisXCondition: 'Fragmentación Modal, Carretera Saturada y Trámites Dispersos',
    axisYCondition: 'Rezago en Transición Energética y Salida de Líneas Navieras Troncales',
    probability: 22,
    desirability: 'catastrofico',
    narrative: 'Para 2040, el Caribe colombiano ha caído en una trampa de estancamiento. La falta de dragados profundos en Cartagena (quedándose en 14.8m) llevó a que la alianza Gemini y MSC trasladaran sus escalas troncales a Kingston (Jamaica) y Manzanillo (Panamá). El cese abrupto de la demanda de carbón térmico en Europa dejó a Puerto Bolívar y las terminales de Ciénaga con muelles semiabandonados, destruyendo miles de empleos sin que existiera una reconversión industrial. Barranquilla continúa enfrentando crisis mensuales de calado por falta de dragas propias, y Puerto Antioquia opera por debajo del 40% de su capacidad debido a litigios en los túneles viales. Colombia se convierte en un país de cabotaje secundario dependiente de barcos pequeños con fletes exorbitantes.',
    consequences: [
      'Pérdida de más de 2 millones de TEUs de transbordo en favor de puertos vecinos del Caribe.',
      'Aumento del 45% en los fletes marítimos de importación para el consumidor colombiano.',
      'Crisis de regalías e ingresos fiscales en los departamentos de Bolívar, Magdalena y La Guajira.'
    ],
    earlyWarnings: [
      'Navieras suprimiendo escalas directas semanales en puertos del Caribe.',
      'Retraso indefinido en las obras del Canal del Dique y sedimentación en bahías.',
      'Caída en la calificación del Índice de Conectividad del Transporte Marítimo (LSCI).'
    ],
    strategicActions: [
      'Declaratoria de emergencia portuaria para dragado urgente en accesos marítimos.',
      'Plan de rescate y reconversión de terminales de carbón hacia agroalimentos y minerales de transición.',
      'Reducción de contraprestaciones portuarias para evitar desbandada de operadores.'
    ],
    affectedPortsStatus: [
      { port: 'Cartagena', condition: 'Degradado a puerto alimentador secundario sin escala directa', vulnerabilityLevel: 'Crítica' },
      { port: 'Barranquilla', condition: 'Cierres periódicos de puerto y pérdida de industrias químicas', vulnerabilityLevel: 'Crítica' },
      { port: 'Santa Marta', condition: 'Colapso de muelles de carbón y pérdida de ingresos', vulnerabilityLevel: 'Crítica' },
      { port: 'La Guajira', condition: 'Activo varado masivo en Puerto Bolívar sin diversificación', vulnerabilityLevel: 'Crítica' }
    ]
  },
  {
    id: 'scen-q4',
    quadrant: 'Q4',
    title: 'Escenario Alternativo B',
    name: 'Fortaleza Ribereña y Cabotaje Doméstico',
    subtitle: 'Alta Integración Multimodal Interna + Aislamiento de Redes Verdes Globales',
    tagline: 'Excelente articulación interna pero atrapados en la matriz fósil y sin oferta para las navieras del futuro.',
    axisXCondition: 'Integración Multimodal Cohesionada y PCS Digitalizado',
    axisYCondition: 'Rezago en Transición Energética y Combustibles Limpios OMI',
    probability: 18,
    desirability: 'alternativo',
    narrative: 'En 2040, Colombia logró con éxito articular el tren de La Dorada, el Canal del Dique y las autopistas 4G, convirtiendo a los puertos en un nodo muy bien conectado con el mercado interno andino. Sin embargo, los terminales no invirtieron a tiempo en electrificación de muelles ni en capacidad de abastecimiento de metanol o amoníaco verde. Como las regulaciones OMI y de la Unión Europea imponen duras multas a los buques que tocan puertos sin bunker cero emisiones, las navieras globales más avanzadas evitan el Caribe colombiano para sus naves insignia, prefiriendo terminales en República Dominicana o Panamá. El país domina su logística doméstica pero queda aislado de los corredores verdes internacionales.',
    consequences: [
      'Comercio exterior nacional bien articulado pero con sobrecostos por penalizaciones de carbono.',
      'Concentración en cabotaje regional y comercio con el norte de Suramérica.',
      'Dificultad para exportar a Europa y EE.UU. bajo normativas de huella de carbono de alcance 3.'
    ],
    earlyWarnings: [
      'Inversiones en trenes y vías funcionando pero sin proyectos de hidrógeno o bunkering verde.',
      'Navieras exigiendo certificados de energía renovable en muelle que los puertos no poseen.',
      'Caída en el índice de sostenibilidad portuaria según la CEPAL.'
    ],
    strategicActions: [
      'Crear una alianza estratégica con Ecopetrol y Reficar para acelerar producción de bunker verde.',
      'Implementar tarifas portuarias verdes bonificadas para buques con bajas emisiones.',
      'Sincronizar la matriz eléctrica regional con parques eólicos y solares del Caribe.'
    ],
    affectedPortsStatus: [
      { port: 'Cartagena', condition: 'Eficiencia interna alta pero marginado de rutas verdes transcontinentales', vulnerabilityLevel: 'Media' },
      { port: 'Barranquilla', condition: 'Sólido en tráfico fluvial pero sin demanda de transbordo verde', vulnerabilityLevel: 'Media' },
      { port: 'Santa Marta', condition: 'Conectado por tren pero forzado a reconvertir carbón a granel agrícola', vulnerabilityLevel: 'Media' },
      { port: 'Urabá', condition: 'Excelente para agroexportación con destino a mercados no regulados', vulnerabilityLevel: 'Baja' }
    ]
  }
];

export const DELPHI_QUESTIONS: DelphiQuestion[] = [
  {
    id: 'delphi-1',
    title: 'Bypass y Desvío del Canal de Panamá hacia el Caribe Colombiano',
    theme: 'Geopolítica y Rutas Transoceánicas',
    question: '¿En qué año y con qué probabilidad las restricciones hídricas crónicas del Canal de Panamá consolidarán a Cartagena y Urabá como centro neurálgico de trasvase y transbordo terrestre o marítimo en el Caribe sur?',
    context: 'Las sequías periódicas obligan a la ACP a restringir calados a 44 pies. Varias navieras analizan dejar carga pesada en puertos caribeños antes de cruzar el istmo.',
    consensusScore: 82,
    expectedMedianYear: 2029,
    probabilityAvg: 76,
    responses: [
      {
        expertName: 'Cap. Carlos A. Gómez',
        organization: 'Capitanía de Puerto / DIMAR',
        estimatedYear: 2028,
        probability: 80,
        stance: 'Muy Probable',
        argument: 'El aumento de esloras y las subastas de cupos en Panamá ya están provocando que los buques dejen de 1.500 a 2.500 TEUs en Cartagena para aligerar calado antes de transitar.'
      },
      {
        expertName: 'Dra. Marcela Mendoza',
        organization: 'UniNorte - Observatorio de Logística',
        estimatedYear: 2030,
        probability: 72,
        stance: 'Moderado',
        argument: 'Panamá construirá el embalse del Río Indio antes de 2032, lo que mitigará parte del problema; sin embargo, la ventana 2026-2030 es la gran oportunidad para capturar transbordo.'
      },
      {
        expertName: 'Ing. Felipe Restrepo',
        organization: 'Gerencia de Operaciones Terminal Contenedores',
        estimatedYear: 2029,
        probability: 85,
        stance: 'Muy Probable',
        argument: 'Es un hecho operativo en marcha. El transbordo internacional en Contecar y SPRC crecerá más por saturación de Panamá que por el PIB colombiano.'
      }
    ]
  },
  {
    id: 'delphi-2',
    title: 'Adopción Plena de Bunkering Verde (Metanol / Amoníaco) en Cartagena',
    theme: 'Transición Energética y OMI',
    question: '¿En qué horizonte temporal Cartagena ofrecerá suministro comercial regular de metanol verde o amoníaco para buques portacontenedores de las grandes alianzas marítimas?',
    context: 'La OMI estableció metas de reducción del 30% al 2030 y 80% al 2040. Las navieras líderes están recibiendo decenas de buques dual-fuel que exigen puertos con bunkering limpio.',
    consensusScore: 68,
    expectedMedianYear: 2032,
    probabilityAvg: 64,
    responses: [
      {
        expertName: 'Dra. Elena Villamil',
        organization: 'Ministerio de Minas y Energía - Transición Justa',
        estimatedYear: 2033,
        probability: 60,
        stance: 'Moderado',
        argument: 'La producción de hidrógeno y metanol verde en Colombia requiere la maduración de los proyectos eólicos en La Guajira y Atlántico; no habrá escala comercial antes de 2032.'
      },
      {
        expertName: 'Dr. Santiago Morales',
        organization: 'Ecopetrol / Reficar Marítimo',
        estimatedYear: 2031,
        probability: 75,
        stance: 'Muy Probable',
        argument: 'Reficar ya tiene la infraestructura de blending y muelle de Mamonal. Se pueden realizar pilotos con bio-metanol antes de 2030 si la OMI fija el impuesto al carbono.'
      },
      {
        expertName: 'Cap. Jorge L. Pineda',
        organization: 'Asociación de Líneas Navieras Internacionales',
        estimatedYear: 2034,
        probability: 55,
        stance: 'Poco Probable',
        argument: 'Sin subsidios cruzados y seguridad jurídica, los buques repostarán en Houston o Rotterdam antes que en el Caribe sur.'
      }
    ]
  },
  {
    id: 'delphi-3',
    title: 'Garantía Continua de 10.2m de Calado en Barranquilla con Draga Propia',
    theme: 'Gobernanza Fluvial e Infraestructura',
    question: '¿Logrará el sistema portuario de Barranquilla y Cormagdalena estabilizar un calado operativo de 10.2 metros los 365 días del año mediante un esquema contractual o draga permanente?',
    context: 'La sedimentación de Bocas de Ceniza ha causado crisis históricas que han costado más de USD $40M anuales a los terminales fluviales y desvíos constantes de buques.',
    consensusScore: 74,
    expectedMedianYear: 2028,
    probabilityAvg: 70,
    responses: [
      {
        expertName: 'Ing. Lucas Barreto',
        organization: 'Asoportuaria Barranquilla',
        estimatedYear: 2027,
        probability: 80,
        stance: 'Muy Probable',
        argument: 'El esquema de contratación por niveles de servicio de 3 a 5 años y monitoreo batimétrico multihaz continuo por fin está eliminando los vacíos de contratación entre dragados.'
      },
      {
        expertName: 'Dra. Carmen Saavedra',
        organization: 'Cormagdalena',
        estimatedYear: 2028,
        probability: 70,
        stance: 'Moderado',
        argument: 'El cambio climático provoca avenidas torrenciales y cuñas salinas impredecibles. Se requiere además construir el tajamar oriental y obras rígidas de encauzamiento.'
      }
    ]
  },
  {
    id: 'delphi-4',
    title: 'Migración del 30% de la Carga de Antioquia y Bogotá hacia Puerto Antioquia',
    theme: 'Intermodalidad y Cuotas de Mercado',
    question: '¿En qué año Puerto Antioquia (Urabá) logrará capturar al menos el 30% de la carga de contenedores y refrigerados provenientes de Antioquia, Caldas y Risaralda que hoy usan Buenaventura o Cartagena?',
    context: 'El ahorro de 350 km en carretera representa una reducción de cerca de USD $800 por contenedor para los exportadores del triángulo cafetero e industrial.',
    consensusScore: 88,
    expectedMedianYear: 2027,
    probabilityAvg: 85,
    responses: [
      {
        expertName: 'Dr. Alejandro Posada',
        organization: 'Cámara de Comercio de Medellín para Antioquia',
        estimatedYear: 2027,
        probability: 90,
        stance: 'Muy Probable',
        argument: 'La ecuación económica del flete terrestre es implacable. Tan pronto el Túnel del Toyo y las autopistas Mar 1 y 2 empalmen, el flete a Urabá será imbatible.'
      },
      {
        expertName: 'Ing. Roberto De la Espriella',
        organization: 'Operador Logístico Multimodal',
        estimatedYear: 2028,
        probability: 80,
        stance: 'Muy Probable',
        argument: 'Cartagena mantendrá la ventaja en buques directos a Asia y Europa por volumen de escalas, pero la carga perecedera (aguacate, banano, flores) migrará masivamente a Urabá.'
      }
    ]
  }
];

export const IGO_ACTIONS: IgoAction[] = [
  {
    id: 'igo-1',
    code: 'ACT_DRAG_CART',
    title: 'Profundización de Bocachica a 16.5m en Cartagena',
    description: 'Asegurar calado oficial de 16.5m para garantizar atraque de buques Neo-Panamax de 18.000+ TEUs sin restricciones de marea.',
    importance: 9.5,
    governability: 8.2,
    quadrant: 'inmediata',
    pillar: 'Infraestructura Portuaria de Escala',
    responsibleEntity: 'ANI / DIMAR / SPRC / Contecar',
    timeframe: '2026-2028'
  },
  {
    id: 'igo-2',
    code: 'ACT_PCS_CONPES',
    title: 'Implementación del PCS Único Nacional (CONPES 3990)',
    description: 'Ventanilla Única Marítima digital que integre DIAN, DIMAR, ICA, Invima y operadores con trazabilidad en tiempo real.',
    importance: 9.2,
    governability: 8.8,
    quadrant: 'inmediata',
    pillar: 'Gobernanza Digital y Facilitación',
    responsibleEntity: 'MinTransporte / MinTIC / DIAN / DIMAR',
    timeframe: '2026-2027'
  },
  {
    id: 'igo-3',
    code: 'ACT_CORR_FERREO',
    title: 'Reactivación del Tren La Dorada - Chiriguaná - Santa Marta',
    description: 'Consolidar la APP de 10 años para transporte de contenedores y graneles limpios por ferrocarril hacia el Caribe.',
    importance: 8.8,
    governability: 6.5,
    quadrant: 'reto',
    pillar: 'Multimodalidad e Interconexión',
    responsibleEntity: 'ANI / MinTransporte / Fenoco',
    timeframe: '2027-2030'
  },
  {
    id: 'igo-4',
    code: 'ACT_BUNKER_VERDE',
    title: 'Hub de Bunkering Verde y Onshore Power Supply (OPS)',
    description: 'Instalar tomas eléctricas de muelle en Cartagena y estaciones piloto de suministro de metanol verde marino.',
    importance: 8.5,
    governability: 5.5,
    quadrant: 'reto',
    pillar: 'Sostenibilidad Ambiental OMI',
    responsibleEntity: 'MinMinas / Ecopetrol / Terminales Privados / DIMAR',
    timeframe: '2028-2033'
  },
  {
    id: 'igo-5',
    code: 'ACT_DRAGA_FLUV',
    title: 'Draga Propia o Contrato Fijo de 5 Años para Bocas de Ceniza',
    description: 'Eliminar los vacíos contractuales que dejan a Barranquilla sin dragado y con restricciones de calado recurrentes.',
    importance: 8.9,
    governability: 7.8,
    quadrant: 'inmediata',
    pillar: 'Gobernanza Fluvial',
    responsibleEntity: 'Cormagdalena / Asoportuaria / MinTransporte',
    timeframe: '2026-2027'
  },
  {
    id: 'igo-6',
    code: 'ACT_RECONV_CARB',
    title: 'Plan de Reconversión de Terminales Carboníferos del Magdalena y Guajira',
    description: 'Transformar patios e infraestructura marítima de carbón hacia graneles agrícolas, minerales de transición y eólica marina.',
    importance: 7.9,
    governability: 4.8,
    quadrant: 'reto',
    pillar: 'Transición Justa y Resiliencia',
    responsibleEntity: 'MinEnergía / MinComercio / Cerrejón / Drummond',
    timeframe: '2029-2035'
  },
  {
    id: 'igo-7',
    code: 'ACT_SEGURO_CYCLON',
    title: 'Fondo de Resiliencia Climática y Dragado de Emergencia ante Huracanes',
    description: 'Fondo de contingencia público-privado para obras inmediatas post-huracanes en San Andrés, Cartagena y La Guajira.',
    importance: 6.8,
    governability: 7.2,
    quadrant: 'secundaria',
    pillar: 'Adaptación Climática',
    responsibleEntity: 'UNGRD / DIMAR / Gobernaciones del Caribe',
    timeframe: '2027-2029'
  },
  {
    id: 'igo-8',
    code: 'ACT_ZAL_URABA',
    title: 'Zona de Actividades Logísticas (ZAL) y Agroindustrial en Urabá',
    description: 'Parque industrial con atmósfera controlada para empaque y consolidación de frutas de exportación junto a Puerto Antioquia.',
    importance: 8.0,
    governability: 7.5,
    quadrant: 'inmediata',
    pillar: 'Desarrollo Regional y Empleo',
    responsibleEntity: 'Gobernación de Antioquia / Puerto Antioquia / ProColombia',
    timeframe: '2026-2028'
  },
  {
    id: 'igo-9',
    code: 'ACT_INTEL_ARTIF',
    title: 'Gemelo Digital y VTS Inteligente para Tráfico en Bahías del Caribe',
    description: 'Simulador en tiempo real con IA para optimización de atraques, fondeos y reducción de emisiones en espera de buques.',
    importance: 6.9,
    governability: 8.4,
    quadrant: 'secundaria',
    pillar: 'Tecnología Operativa',
    responsibleEntity: 'DIMAR / Universidades del Caribe (UniNorte/UniCartagena)',
    timeframe: '2027-2030'
  },
  {
    id: 'igo-10',
    code: 'ACT_CANON_SOCIAL',
    title: 'Mesas Permanentes de Concertación con Comunidades de Pescadores',
    description: 'Garantizar licenciamiento social y programas de acuicultura y empleo portuario para pescadores de bahías intervenidas.',
    importance: 7.2,
    governability: 6.2,
    quadrant: 'secundaria',
    pillar: 'Inclusión Social y Licencia Comunitaria',
    responsibleEntity: 'Ministerio del Interior / Autoridades Portuarias Locales',
    timeframe: '2026-2030'
  }
];
