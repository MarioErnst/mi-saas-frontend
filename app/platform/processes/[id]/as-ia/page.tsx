import { DUMMY_PROCESSES } from "@/lib/dummy-data"
import { ArrowRight, Sparkles, Bot, Zap, CheckCircle2, Clock, DollarSign } from "lucide-react"
import Link from "next/link"

export default async function AsIaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const process = DUMMY_PROCESSES.find(p => p.id === id) || DUMMY_PROCESSES[0]

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Fase 2: IA
            </span>
            <h1 className="text-3xl font-bold tracking-tight">Proceso Optimizado (AS-IA)</h1>
          </div>
          <p className="text-muted-foreground">
            Propuesta de reingeniería con Agentes IA integrados para "{process.name}".
          </p>
        </div>
        <Link
          href={`/platform/processes/${process.id}/results`}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all shadow-lg shadow-purple-500/20"
        >
          Ver Impacto Financiero <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Comparison Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl border bg-card/50 backdrop-blur relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-500" /> Reducción de Tiempo
          </h3>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-foreground">{process.asIs.metrics.totalTime}m</span>
            <ArrowRight className="w-5 h-5 mb-1.5 text-muted-foreground" />
            <span className="text-3xl font-bold text-green-500">{process.asIa.metrics.totalTime}m</span>
          </div>
          <p className="text-xs text-green-500 font-medium mt-2">-{process.asIa.roi.timeReductionPercentage}% más rápido</p>
        </div>

        <div className="p-6 rounded-xl border bg-card/50 backdrop-blur relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-blue-500" /> Costo por Ejecución
          </h3>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-foreground">${process.asIs.metrics.costPerExecution}</span>
            <ArrowRight className="w-5 h-5 mb-1.5 text-muted-foreground" />
            <span className="text-3xl font-bold text-green-500">${process.asIa.metrics.costPerExecution}</span>
          </div>
          <p className="text-xs text-green-500 font-medium mt-2">Ahorro de ${process.asIa.roi.savings} por caso</p>
        </div>

        <div className="p-6 rounded-xl border bg-card/50 backdrop-blur relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-orange-500" /> Eficiencia Global
          </h3>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-foreground">{process.asIs.metrics.efficiencyScore}%</span>
            <ArrowRight className="w-5 h-5 mb-1.5 text-muted-foreground" />
            <span className="text-3xl font-bold text-purple-500">{process.asIa.metrics.efficiencyScore}%</span>
          </div>
          <p className="text-xs text-purple-500 font-medium mt-2">Proceso altamente automatizado</p>
        </div>
      </div>

      {/* AI Enhanced Flow */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Bot className="w-5 h-5 text-purple-500" /> Flujo Automatizado
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {process.asIa.steps.map((step, index) => (
            <div key={step.id} className="relative group">
              {index < process.asIa.steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 w-full h-0.5 bg-border -z-10 translate-x-1/2"></div>
              )}
              
              <div className={`
                h-full p-4 rounded-xl border transition-all duration-300
                ${step.type === 'ai' 
                  ? 'bg-purple-500/5 border-purple-500/30 hover:bg-purple-500/10 hover:shadow-lg hover:shadow-purple-500/10' 
                  : 'bg-card border-border hover:border-primary/50'
                }
              `}>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-mono text-muted-foreground">0{index + 1}</span>
                  {step.type === 'ai' && <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />}
                </div>
                
                <h4 className="font-bold text-sm mb-2">{step.label}</h4>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                  {step.description}
                </p>

                <div className="flex items-center gap-2 mt-auto pt-2 border-t border-dashed border-border/50">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                    step.type === 'ai' ? 'bg-purple-500 text-white border-transparent' : 'bg-muted text-muted-foreground border-border'
                  }`}>
                    {step.type === 'ai' ? 'AGENTE IA' : step.role}
                  </span>
                  <span className="text-[10px] text-muted-foreground ml-auto">{step.duration}m</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Improvements */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/20">
        <h3 className="font-semibold mb-4">Mejoras Clave Implementadas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
            <div>
              <h4 className="font-medium text-sm">Extracción Inteligente de Documentos</h4>
              <p className="text-xs text-muted-foreground">Se eliminó la entrada manual de datos mediante OCR avanzado.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
            <div>
              <h4 className="font-medium text-sm">Validación en Tiempo Real</h4>
              <p className="text-xs text-muted-foreground">Reglas de negocio aplicadas instantáneamente por agentes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}