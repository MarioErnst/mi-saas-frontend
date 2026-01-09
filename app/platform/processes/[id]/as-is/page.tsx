import { DUMMY_PROCESSES } from "@/lib/dummy-data"
import { ArrowRight, Clock, Users, User, Monitor, AlertCircle, FileInput, FileOutput, Database, Layers } from "lucide-react"
import Link from "next/link"

export default async function AsIsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const process = DUMMY_PROCESSES.find(p => p.id === id) || DUMMY_PROCESSES[0]

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground border">
              Fase 1
            </span>
            <h1 className="text-3xl font-bold tracking-tight">Estado Actual (AS-IS)</h1>
          </div>
          <p className="text-muted-foreground">
            Mapeo del proceso "{process.name}" tal como se ejecuta hoy.
          </p>
        </div>
        <Link
          href={`/platform/processes/${process.id}/as-ai`}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all shadow-lg shadow-primary/20"
        >
          Ver Optimización IA <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Metrics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="p-4 rounded-xl bg-card border shadow-sm">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Clock className="w-4 h-4" /> <span className="text-xs font-medium uppercase">Horas Operativas (HH)</span>
          </div>
          <div className="text-2xl font-bold">{(process.asIs.metrics.operationalTime / 60).toFixed(1)} h</div>
        </div>
        <div className="p-4 rounded-xl bg-card border shadow-sm">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Clock className="w-4 h-4" /> <span className="text-xs font-medium uppercase">Tiempo Total (E2E)</span>
          </div>
          <div className="text-2xl font-bold">{(process.asIs.metrics.totalTime / 60).toFixed(1)} h</div>
        </div>
        <div className="p-4 rounded-xl bg-card border shadow-sm">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Users className="w-4 h-4" /> <span className="text-xs font-medium uppercase">Involucrados</span>
          </div>
          <div className="text-2xl font-bold">{process.asIs.metrics.headcount} Personas</div>
        </div>
        <div className="p-4 rounded-xl bg-card border shadow-sm">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <AlertCircle className="w-4 h-4" /> <span className="text-xs font-medium uppercase">Eficiencia</span>
          </div>
          <div className="text-2xl font-bold text-yellow-500">{process.asIs.metrics.efficiencyScore}/100</div>
        </div>
        <div className="p-4 rounded-xl bg-card border shadow-sm">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <span className="text-xs font-medium uppercase">Costo / Ejecución</span>
          </div>
          <div className="text-2xl font-bold">180.000 CLP</div>
        </div>
      </div>

      {/* Diagram / Flow Visualization */}
      <div className="rounded-xl border bg-card/50 overflow-hidden">
        <div className="p-4 border-b bg-muted/30">
          <h3 className="font-semibold">Flujo del Proceso</h3>
        </div>
        <div className="p-8 relative">
          {/* Vertical Timeline */}
          <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-border md:left-1/2 md:-ml-0.5"></div>
          
          <div className="space-y-8 relative">
            {process.asIs.steps.map((step, index) => (
              <div key={step.id} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Content Side */}
                <div className="flex-1 w-full md:w-1/2 p-6 rounded-xl border bg-card shadow-sm hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-mono text-xs text-muted-foreground">Paso {index + 1}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                      step.type === 'human' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : 
                      step.type === 'system' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 
                      'bg-purple-500/10 text-purple-500 border-purple-500/20'
                    }`}>
                      {step.type}
                    </span>
                  </div>
                  <h4 className="font-bold text-lg mb-1">{step.label}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                  
                  {/* Detailed Input/Output/Systems */}
                  <div className="grid grid-cols-1 gap-2 mb-4 p-3 bg-muted/20 rounded-lg text-xs">
                    {(step.input || step.output) && (
                      <div className="grid grid-cols-2 gap-2">
                        {step.input && (
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                              <FileInput className="w-3 h-3" /> Input
                            </span>
                            <span className="font-medium text-foreground">{step.input}</span>
                          </div>
                        )}
                        {step.output && (
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                              <FileOutput className="w-3 h-3" /> Output
                            </span>
                            <span className="font-medium text-foreground">{step.output}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {step.systems && step.systems.length > 0 && (
                      <div className="flex flex-col gap-1 mt-1 pt-2 border-t border-border/50">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                          <Database className="w-3 h-3" /> Sistemas / Plataformas
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {step.systems.map((sys, i) => (
                            <span key={i} className="px-1.5 py-0.5 bg-background border rounded text-[10px] font-medium flex items-center gap-1">
                              <Layers className="w-2.5 h-2.5 text-muted-foreground" /> {sys}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground border-t pt-3">
                    <div className="flex items-center gap-1">
                      {step.type === 'human' ? <User className="w-3 h-3" /> : <Monitor className="w-3 h-3" />}
                      {step.role}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {step.duration} min
                    </div>
                  </div>
                </div>

                {/* Center Point */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 z-10"></div>

                {/* Empty Side for layout balance */}
                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
