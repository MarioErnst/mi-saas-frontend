
export interface ProcessStep {
  id: string;
  label: string;
  role: string;
  duration: number; // in minutes
  type: "human" | "system" | "ai";
  description?: string;
}

export interface ProcessMetrics {
  totalTime: number; // in minutes
  costPerExecution: number; // in USD
  efficiencyScore: number; // 0-100
  headcount: number;
}

export interface ProcessAnalysis {
  id: string;
  name: string;
  description: string;
  status: "completed" | "in_progress" | "draft";
  lastUpdated: string;
  thumbnail?: string; // Optional URL for card image
  asIs: {
    steps: ProcessStep[];
    metrics: ProcessMetrics;
  };
  asIa: {
    steps: ProcessStep[];
    metrics: ProcessMetrics;
    roi: {
      savings: number; // USD per year or execution
      timeReductionPercentage: number;
      breakevenPoint: string; // e.g. "3 months"
      annualSavings: number;
    };
  };
}

export const DUMMY_PROCESSES: ProcessAnalysis[] = [
  {
    id: "proc-001",
    name: "Onboarding de Clientes Corporativos",
    description: "Proceso actual de alta de nuevos clientes B2B, revisión legal y configuración de cuenta.",
    status: "completed",
    lastUpdated: "2024-03-10",
    asIs: {
      steps: [
        { id: "s1", label: "Recepción de Solicitud", role: "Ventas", duration: 15, type: "human", description: "El ejecutivo recibe el correo y descarga adjuntos." },
        { id: "s2", label: "Validación de Documentos", role: "Compliance", duration: 120, type: "human", description: "Revisión manual de escrituras y poderes." },
        { id: "s3", label: "Ingreso a CRM", role: "Back Office", duration: 45, type: "human", description: "Data entry manual en Salesforce." },
        { id: "s4", label: "Aprobación de Crédito", role: "Finanzas", duration: 240, type: "human", description: "Análisis de riesgo crediticio." },
        { id: "s5", label: "Creación de Cuenta", role: "Sistemas", duration: 10, type: "system", description: "Script nocturno de alta." },
      ],
      metrics: {
        totalTime: 430, // minutes
        costPerExecution: 150,
        efficiencyScore: 45,
        headcount: 4
      }
    },
    asIa: {
      steps: [
        { id: "s1", label: "Recepción Automática", role: "Bot de Entrada", duration: 0.1, type: "ai", description: "Webhook captura email y adjuntos." },
        { id: "s2", label: "Extracción OCR & NLP", role: "Agente IA Documental", duration: 2, type: "ai", description: "Extracción de datos de PDFs y validación contra fuentes públicas." },
        { id: "s3", label: "Ingreso a CRM", role: "API Integration", duration: 0.1, type: "system", description: "Sync automático." },
        { id: "s4", label: "Scoring Predictivo", role: "Modelo ML Riesgo", duration: 1, type: "ai", description: "Evaluación instantánea basada en historial." },
        { id: "s5", label: "Aprobación Humana (Excepciones)", role: "Finanzas", duration: 15, type: "human", description: "Solo revisa casos con score bajo." },
      ],
      metrics: {
        totalTime: 18.2, // minutes
        costPerExecution: 5,
        efficiencyScore: 98,
        headcount: 1
      },
      roi: {
        savings: 145, // per execution
        timeReductionPercentage: 95.7,
        annualSavings: 520000, // Assuming volume
        breakevenPoint: "2.5 meses"
      }
    }
  },
  {
    id: "proc-002",
    name: "Gestión de Reembolsos de Gastos",
    description: "Flujo de aprobación y pago de rendiciones de gastos de empleados.",
    status: "in_progress",
    lastUpdated: "2024-03-12",
    asIs: {
      steps: [
        { id: "r1", label: "Envío de Planilla Excel", role: "Empleado", duration: 30, type: "human" },
        { id: "r2", label: "Revisión de Tickets Físicos", role: "Jefe Directo", duration: 60, type: "human" },
        { id: "r3", label: "Validación Políticas", role: "Contabilidad", duration: 90, type: "human" },
        { id: "r4", label: "Programación de Pago", role: "Tesorería", duration: 20, type: "system" },
      ],
      metrics: {
        totalTime: 200,
        costPerExecution: 45,
        efficiencyScore: 30,
        headcount: 3
      }
    },
    asIa: {
      steps: [
        { id: "r1", label: "Subida de Fotos App", role: "Empleado", duration: 2, type: "human" },
        { id: "r2", label: "Auditoría IA", role: "Agente de Gastos", duration: 0.5, type: "ai", description: "Valida montos, categorías y duplicados." },
        { id: "r3", label: "Aprobación Automática", role: "Reglas de Negocio", duration: 0, type: "system" },
        { id: "r4", label: "Pago Inmediato", role: "API Bancaria", duration: 1, type: "system" },
      ],
      metrics: {
        totalTime: 3.5,
        costPerExecution: 2,
        efficiencyScore: 95,
        headcount: 0
      },
      roi: {
        savings: 43,
        timeReductionPercentage: 98,
        annualSavings: 120000,
        breakevenPoint: "1 mes"
      }
    }
  },
  {
    id: "proc-003",
    name: "Atención de Tickets Nivel 1",
    description: "Resolución de incidencias técnicas básicas reportadas por usuarios internos.",
    status: "completed",
    lastUpdated: "2024-02-28",
    asIs: {
      steps: [],
      metrics: { totalTime: 0, costPerExecution: 0, efficiencyScore: 0, headcount: 0 }
    },
    asIa: {
      steps: [],
      metrics: { totalTime: 0, costPerExecution: 0, efficiencyScore: 0, headcount: 0 },
      roi: { savings: 0, timeReductionPercentage: 0, annualSavings: 0, breakevenPoint: "N/A" }
    }
  }
];
