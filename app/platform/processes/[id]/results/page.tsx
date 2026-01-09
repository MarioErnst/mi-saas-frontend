import { DUMMY_PROCESSES } from "@/lib/dummy-data"
import { ArrowRight, BarChart3, Clock, Download, Share2, Target, Timer, TrendingUp, Trophy } from "lucide-react"
import Link from "next/link"

export default async function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const process = DUMMY_PROCESSES.find(p => p.id === id) || DUMMY_PROCESSES[0]
  const roi = process.asIa.roi
  const metrics = process.asIa.metrics
  const asIsMetrics = process.asIs.metrics

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resultados de Negocio</h1>
          <p className="text-muted-foreground mt-2">
            Proyección de impacto para la implementación en "{process.name}".
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-muted hover:bg-muted/80 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Share2 className="w-4 h-4" /> Compartir
          </button>
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            <Download className="w-4 h-4" /> Exportar PDF
          </button>
        </div>
      </div>

      {/* Main ROI Card */}
      <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 text-center md:text-left">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"></div>
        
        <div className="relative grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-500 border border-green-500/20 text-sm font-medium">
              <Trophy className="w-4 h-4" /> Retorno de Inversión Proyectado
            </div>
            <div className="space-y-1">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                ${roi.annualSavings.toLocaleString()} USD
                <span className="text-lg md:text-2xl font-normal text-muted-foreground ml-2">/ año</span>
              </h2>
              <p className="text-2xl md:text-3xl font-semibold text-green-400">
                ≈ ${(roi.annualSavings * 950).toLocaleString('es-CL')} CLP
              </p>
            </div>
            <p className="text-muted-foreground max-w-md text-lg">
              Ahorro anual estimado implementando la arquitectura de agentes IA propuesta, considerando reducción de horas hombre y costos operativos.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <Clock className="w-12 h-12 text-green-500" />
              </div>
              <p className="text-sm text-gray-400 mb-1">Eficiencia HH</p>
              <p className="text-2xl font-bold text-green-400">+{metrics.efficiencyHH?.toFixed(1)}%</p>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                {(metrics.operationalTime / 60).toFixed(1)}h <span className="text-gray-600">vs</span> {(asIsMetrics.operationalTime / 60).toFixed(1)}h
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <Timer className="w-12 h-12 text-green-500" />
              </div>
              <p className="text-sm text-gray-400 mb-1">Eficiencia E2E</p>
              <p className="text-2xl font-bold text-green-400">+{metrics.efficiencyE2E?.toFixed(1)}%</p>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                {(metrics.totalTime / 60).toFixed(1)}h <span className="text-gray-600">vs</span> {(asIsMetrics.totalTime / 60).toFixed(1)}h
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
              <p className="text-sm text-gray-400 mb-1">Punto de Equilibrio</p>
              <p className="text-2xl font-bold text-white">{roi.breakevenPoint}</p>
            </div>
            
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
              <p className="text-sm text-gray-400 mb-1">Costo Implementación</p>
              <p className="text-xl font-bold text-white">Bajo Demanda</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 gap-8">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Target className="w-5 h-5" /> Desglose de Impacto
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4 p-6 bg-card/50 rounded-xl border">
               <div className="flex justify-between items-center mb-2">
                 <span className="font-medium">Reducción de Tareas Manuales</span>
                 <span className="font-bold text-primary text-xl">95%</span>
               </div>
               <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                 <div className="h-full bg-primary w-[95%]"></div>
               </div>
               <p className="text-sm text-muted-foreground mt-2">Automatización de ingreso de datos y validaciones.</p>
            </div>

            <div className="space-y-4 p-6 bg-card/50 rounded-xl border">
               <div className="flex justify-between items-center mb-2">
                 <span className="font-medium">Velocidad</span>
                 <span className="font-bold text-blue-500 text-xl">20x</span>
               </div>
               <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                 <div className="h-full bg-blue-500 w-[92%]"></div>
               </div>
               <p className="text-sm text-muted-foreground mt-2">Reducción drástica en tiempos de ciclo end-to-end.</p>
            </div>

            <div className="space-y-4 p-6 bg-card/50 rounded-xl border">
               <div className="flex justify-between items-center mb-2">
                 <span className="font-medium">Precisión</span>
                 <span className="font-bold text-purple-500 text-xl">99.9%</span>
               </div>
               <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                 <div className="h-full bg-purple-500 w-[99%]"></div>
               </div>
               <p className="text-sm text-muted-foreground mt-2">Eliminación virtual de errores humanos y reprocesos.</p>
            </div>
          </div>

          <div className="p-6 rounded-xl border bg-card mt-6">
            <h4 className="font-medium mb-4">Próximos Pasos Recomendados</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="flex gap-3 items-start">
                 <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</div>
                 <span className="text-sm text-muted-foreground">Validar propuesta técnica con equipo de IT y Seguridad.</span>
               </div>
               <div className="flex gap-3 items-start">
                 <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</div>
                 <span className="text-sm text-muted-foreground">Definir alcance de piloto (MVP) de 4 semanas.</span>
               </div>
               <div className="flex gap-3 items-start">
                 <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</div>
                 <span className="text-sm text-muted-foreground">Aprobar presupuesto de implementación y roadmap.</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}