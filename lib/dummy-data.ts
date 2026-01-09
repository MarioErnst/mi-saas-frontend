
export interface ProcessStep {
  id: string;
  label: string;
  role: string;
  duration: number; // in minutes
  type: "human" | "system" | "ai";
  description?: string;
  input?: string;
  output?: string;
  systems?: string[];
}

export interface ProcessMetrics {
  operationalTime: number; // HH - Active working time in minutes
  totalTime: number;       // E2E - Total elapsed time in minutes
  costPerExecution: number; // in USD
  efficiencyScore: number; // 0-100 (Overall Score)
  efficiencyHH?: number; // % improvement in Operational Hours
  efficiencyE2E?: number; // % improvement in End-to-End Time
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
    technicalDiagram?: string;
    solutionDetails?: {
      technologies: string[];
      licenses: string[];
      infrastructure: string[];
      notes: string;
    };
  };
}

export const DUMMY_PROCESSES: ProcessAnalysis[] = [
  {
    id: "proc-001",
    name: "Onboarding de Clientes Corporativos",
    description: "Proceso actual de alta de nuevos clientes B2B, revisión legal y configuración de cuenta.",
    status: "completed",
    lastUpdated: "2026-01-05",
    asIs: {
      steps: [
        { 
          id: "s1", 
          label: "Recepción de Solicitud", 
          role: "Ventas", 
          duration: 15, 
          type: "human", 
          description: "El ejecutivo recibe el correo y descarga adjuntos.",
          input: "Correo con PDF de solicitud",
          output: "Archivos en local",
          systems: ["Outlook", "Explorador de Archivos"]
        },
        { 
          id: "s2", 
          label: "Validación de Documentos", 
          role: "Compliance", 
          duration: 120, 
          type: "human", 
          description: "Revisión manual de escrituras y poderes.",
          input: "PDFs legales",
          output: "Visto bueno en email",
          systems: ["Adobe Acrobat", "Outlook"]
        },
        { 
          id: "s3", 
          label: "Ingreso a CRM", 
          role: "Back Office", 
          duration: 45, 
          type: "human", 
          description: "Data entry manual en Salesforce.",
          input: "Datos de solicitud aprobada",
          output: "Lead creado en CRM",
          systems: ["Salesforce"]
        },
        { 
          id: "s4", 
          label: "Aprobación de Crédito", 
          role: "Finanzas", 
          duration: 240, 
          type: "human", 
          description: "Análisis de riesgo crediticio.",
          input: "Reporte financiero del cliente",
          output: "Monto de línea de crédito",
          systems: ["Excel", "SAP"]
        },
        { 
          id: "s5", 
          label: "Creación de Cuenta", 
          role: "Sistemas", 
          duration: 10, 
          type: "system", 
          description: "Script nocturno de alta.",
          input: "Archivo CSV de altas",
          output: "Cuenta activa",
          systems: ["Mainframe Legacy"]
        },
      ],
      metrics: {
        operationalTime: 430, // ~7 hours active
        totalTime: 4320, // 3 days E2E
        costPerExecution: 150,
        efficiencyScore: 45,
        headcount: 4
      }
    },
    asIa: {
      steps: [
        { 
          id: "s1", 
          label: "Recepción Automática", 
          role: "Bot de Entrada", 
          duration: 0.1, 
          type: "ai", 
          description: "Webhook captura email y adjuntos.",
          input: "Incoming Email Webhook",
          output: "JSON payload estructurado",
          systems: ["Zapier", "Gmail API"]
        },
        { 
          id: "s2", 
          label: "Extracción OCR & NLP", 
          role: "Agente IA Documental", 
          duration: 2, 
          type: "ai", 
          description: "Extracción de datos de PDFs y validación contra fuentes públicas.",
          input: "PDFs en Base64",
          output: "Entidades validadas (JSON)",
          systems: ["OpenAI GPT-4", "Azure AI Document Intelligence"]
        },
        { 
          id: "s3", 
          label: "Ingreso a CRM", 
          role: "API Integration", 
          duration: 0.1, 
          type: "system", 
          description: "Sync automático.",
          input: "Datos validados",
          output: "Registro CRM ID",
          systems: ["Salesforce API"]
        },
        { 
          id: "s4", 
          label: "Scoring Predictivo", 
          role: "Modelo ML Riesgo", 
          duration: 1, 
          type: "ai", 
          description: "Evaluación instantánea basada en historial.",
          input: "Datos financieros históricos",
          output: "Score de Riesgo (0-100)",
          systems: ["Python Service", "TensorFlow Lite"]
        },
        { 
          id: "s5", 
          label: "Aprobación Humana (Excepciones)", 
          role: "Finanzas", 
          duration: 15, 
          type: "human", 
          description: "Solo revisa casos con score bajo.",
          input: "Alerta de revisión manual",
          output: "Decisión final",
          systems: ["Dashboard de Aprobaciones"]
        },
      ],
      metrics: {
        operationalTime: 18.2,
        totalTime: 25, // E2E slight overhead
        costPerExecution: 5,
        efficiencyScore: 98,
        efficiencyHH: 95.7, // (430 - 18.2) / 430 * 100
        efficiencyE2E: 99.4, // (4320 - 25) / 4320 * 100
        headcount: 1
      },
      roi: {
        savings: "175.000", // per execution
        timeReductionPercentage: 95.7,
        annualSavings: 520000, // Assuming volume
        breakevenPoint: "2.5 meses"
      },
      technicalDiagram: "/dcv.png",
      solutionDetails: {
        technologies: ["OpenAI GPT-4o API", "LangChain Framework", "Python FastAPI", "React Frontend"],
        licenses: ["Azure OpenAI Service (Pay-per-token)", "SaaS Platform Subscription", "Zapier Pro Plan"],
        infrastructure: ["Cloud Hosted (AWS/Azure)", "Docker Containers", "PostgreSQL Database"],
        notes: "La solución requiere una configuración inicial de 2 semanas para ajustar los prompts del sistema y conectar las APIs de los sistemas legados. Se recomienda un entorno de pruebas previo al despliegue productivo."
      }
    }
  },
  {
    id: "proc-002",
    name: "Gestión de Reembolsos de Gastos",
    description: "Flujo de aprobación y pago de rendiciones de gastos de empleados.",
    status: "in_progress",
    lastUpdated: "2026-01-05",
    asIs: {
      steps: [
        { 
          id: "r1", 
          label: "Envío de Planilla Excel", 
          role: "Empleado", 
          duration: 30, 
          type: "human",
          input: "Boletas físicas",
          output: "Excel con detalle",
          systems: ["Excel", "Email"]
        },
        { 
          id: "r2", 
          label: "Revisión de Montos", 
          role: "Jefe Directo", 
          duration: 15, 
          type: "human",
          input: "Excel adjunto",
          output: "Aprobación simple",
          systems: ["Outlook"]
        },
        { 
          id: "r3", 
          label: "Validación de Políticas", 
          role: "Contabilidad", 
          duration: 60, 
          type: "human",
          input: "Excel aprobado",
          output: "Validación OK/Rechazo",
          systems: ["ERP"]
        }
      ],
      metrics: {
        operationalTime: 105,
        totalTime: 2880, // 2 days
        costPerExecution: 45,
        efficiencyScore: 60,
        headcount: 3
      }
    },
    asIa: {
      steps: [
        { 
          id: "r1", 
          label: "Subida de Fotos", 
          role: "App Móvil", 
          duration: 2, 
          type: "system",
          input: "Foto de boleta",
          output: "Imagen en servidor",
          systems: ["App Corporativa"]
        },
        { 
          id: "r2", 
          label: "Extracción y Clasificación", 
          role: "Vision AI", 
          duration: 0.5, 
          type: "ai",
          input: "Imagen de boleta",
          output: "Datos estructurados (Monto, Fecha, Categoría)",
          systems: ["Azure Computer Vision"]
        },
        { 
          id: "r3", 
          label: "Auditoría Automática", 
          role: "Motor de Reglas", 
          duration: 0.1, 
          type: "system",
          input: "Datos de gasto",
          output: "Flag de aprobación",
          systems: ["Motor de Reglas Interno"]
        }
      ],
      metrics: {
        operationalTime: 2.6,
        totalTime: 5,
        costPerExecution: 1.5,
        efficiencyScore: 95,
        efficiencyHH: 98.2, // Added for completeness based on context
        efficiencyE2E: 99.8, // Added for completeness
        headcount: 0 // Fully automated ideal path
      },
      roi: {
        savings: 43.5,
        timeReductionPercentage: 97,
        annualSavings: 120000,
        breakevenPoint: "1.5 meses"
      }
    }
  }
];
