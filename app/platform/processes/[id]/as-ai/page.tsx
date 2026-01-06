import { DUMMY_PROCESSES } from "@/lib/dummy-data"
import { ArrowRight, Sparkles, Bot, Zap, CheckCircle2, Clock, DollarSign, FileInput, FileOutput, Database, Layers, Network, Server, Code2, CreditCard, Info, Cpu } from "lucide-react"
import Link from "next/link"

export default async function AsAiPage({ params }: { params: Promise<{ id: string }> }) {
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
            <h1 className="text-3xl font-bold tracking-tight">Proceso Optimizado (AS-AI)</h1>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-xl border bg-card/50 backdrop-blur relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-500" /> Tiempo Operativo (HH)
          </h3>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-foreground">{(process.asIs.metrics.operationalTime / 60).toFixed(1)}h</span>
            <ArrowRight className="w-4 h-4 mb-1.5 text-muted-foreground" />
            <span className="text-2xl font-bold text-green-500">{(process.asIa.metrics.operationalTime / 60).toFixed(1)}h</span>
          </div>
          <p className="text-xs text-green-500 font-medium mt-2">Reducción de carga laboral</p>
        </div>

        <div className="p-6 rounded-xl border bg-card/50 backdrop-blur relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-500" /> Tiempo Total (E2E)
          </h3>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-foreground">{(process.asIs.metrics.totalTime / 60).toFixed(1)}h</span>
            <ArrowRight className="w-4 h-4 mb-1.5 text-muted-foreground" />
            <span className="text-2xl font-bold text-green-500">{(process.asIa.metrics.totalTime / 60).toFixed(1)}h</span>
          </div>
          <p className="text-xs text-green-500 font-medium mt-2">-{process.asIa.roi.timeReductionPercentage}% más rápido</p>
        </div>

        <div className="p-6 rounded-xl border bg-card/50 backdrop-blur relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-blue-500" /> Costo por Ejecución
          </h3>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-foreground">${process.asIs.metrics.costPerExecution}</span>
            <ArrowRight className="w-4 h-4 mb-1.5 text-muted-foreground" />
            <span className="text-2xl font-bold text-green-500">${process.asIa.metrics.costPerExecution}</span>
          </div>
          <p className="text-xs text-green-500 font-medium mt-2">Ahorro de ${process.asIa.roi.savings} por caso</p>
        </div>

        <div className="p-6 rounded-xl border bg-card/50 backdrop-blur relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-orange-500" /> Eficiencia Global
          </h3>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-foreground">{process.asIs.metrics.efficiencyScore}%</span>
            <ArrowRight className="w-4 h-4 mb-1.5 text-muted-foreground" />
            <span className="text-2xl font-bold text-purple-500">{process.asIa.metrics.efficiencyScore}%</span>
          </div>
          <p className="text-xs text-purple-500 font-medium mt-2">Proceso altamente automatizado</p>
        </div>
      </div>

      {/* AI Enhanced Flow */}
      <div className="rounded-xl border bg-card/50 overflow-hidden">
        <div className="p-4 border-b bg-muted/30 flex justify-between items-center">
          <h3 className="font-semibold flex items-center gap-2">
            <Bot className="w-5 h-5 text-purple-500" /> Flujo Automatizado
          </h3>
        </div>
        <div className="p-8 relative">
          {/* Vertical Timeline */}
          <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-border md:left-1/2 md:-ml-0.5"></div>
          
          <div className="space-y-8 relative">
            {process.asIa.steps.map((step, index) => (
              <div key={step.id} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Content Side */}
                <div className={`flex-1 w-full md:w-1/2 p-6 rounded-xl border shadow-sm transition-all duration-300 ${
                  step.type === 'ai' 
                    ? 'bg-purple-500/5 border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10' 
                    : 'bg-card border-border hover:border-primary/50'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-mono text-xs text-muted-foreground">Paso {index + 1}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                      step.type === 'ai' ? 'bg-purple-500 text-white border-transparent' : 
                      step.type === 'system' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                      'bg-muted text-muted-foreground border-border'
                    }`}>
                      {step.type === 'ai' ? 'AGENTE IA' : step.role}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-lg">{step.label}</h4>
                    {step.type === 'ai' && <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                  
                  {/* Detailed Input/Output/Systems */}
                  <div className={`grid grid-cols-1 gap-2 mb-4 p-3 rounded-lg text-xs ${
                    step.type === 'ai' ? 'bg-purple-500/10 border border-purple-500/10' : 'bg-muted/30 border border-border/30'
                  }`}>
                    {(step.input || step.output) && (
                      <div className="grid grid-cols-2 gap-2">
                        {step.input && (
                          <div className="flex flex-col gap-1">
                            <span className={`text-[10px] uppercase font-bold flex items-center gap-1 ${step.type === 'ai' ? 'text-purple-600 dark:text-purple-400' : 'text-muted-foreground'}`}>
                              <FileInput className="w-3 h-3" /> Input
                            </span>
                            <span className="font-medium text-foreground">{step.input}</span>
                          </div>
                        )}
                        {step.output && (
                          <div className="flex flex-col gap-1">
                            <span className={`text-[10px] uppercase font-bold flex items-center gap-1 ${step.type === 'ai' ? 'text-purple-600 dark:text-purple-400' : 'text-muted-foreground'}`}>
                              <FileOutput className="w-3 h-3" /> Output
                            </span>
                            <span className="font-medium text-foreground">{step.output}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {step.systems && step.systems.length > 0 && (
                      <div className={`flex flex-col gap-1 mt-1 pt-2 border-t ${step.type === 'ai' ? 'border-purple-500/20' : 'border-border/50'}`}>
                        <span className={`text-[10px] uppercase font-bold flex items-center gap-1 ${step.type === 'ai' ? 'text-purple-600 dark:text-purple-400' : 'text-muted-foreground'}`}>
                          <Database className="w-3 h-3" /> Sistemas / Plataformas
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {step.systems.map((sys, i) => (
                            <span key={i} className={`px-1.5 py-0.5 border rounded text-[10px] font-medium flex items-center gap-1 ${
                              step.type === 'ai' 
                                ? 'bg-purple-500/10 border-purple-500/20 text-purple-700 dark:text-purple-300' 
                                : 'bg-background border-border text-foreground'
                            }`}>
                              <Layers className="w-2.5 h-2.5 opacity-70" /> {sys}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground border-t pt-3 border-dashed border-border/50">
                    <div className="flex items-center gap-1">
                      {step.type === 'ai' ? <Bot className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
                      {step.type === 'ai' ? 'Automático' : step.role}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {step.duration} min
                    </div>
                  </div>
                </div>

                {/* Center Point */}
                <div className={`absolute left-8 md:left-1/2 w-4 h-4 rounded-full border-4 border-background -translate-x-1/2 z-10 ${
                  step.type === 'ai' ? 'bg-purple-500' : 'bg-primary'
                }`}></div>

                {/* Empty Side for layout balance */}
                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
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

      {/* Technical Architecture Diagram */}
      <div className="rounded-xl border bg-card/50 overflow-hidden">
        <div className="p-4 border-b bg-muted/30 flex justify-between items-center">
          <h3 className="font-semibold flex items-center gap-2">
            <Network className="w-5 h-5 text-blue-500" /> Arquitectura Técnica

          </h3>
        </div>
        <div className="p-8 bg-background/50">
          <div className="w-full aspect-video min-h-[400px] bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20 flex flex-col items-center justify-center text-muted-foreground gap-4 overflow-hidden relative group">
             {process.asIa.technicalDiagram ? (
               <div className="relative w-full h-full flex items-center justify-center p-4">
                  {/* In a real app, use next/image. Here using img for external/placeholder URL */}
                  <img 
                    src={process.asIa.technicalDiagram} 
                    alt="Arquitectura Técnica" 
                    className="max-w-full max-h-full object-contain rounded shadow-lg" 
                  />
               </div>
             ) : (
               <>
                  <Server className="w-16 h-16 opacity-20" />
                  <p>Diagrama técnico no disponible</p>
                  <p className="text-xs opacity-60">Pegar imagen aquí (Futura implementación)</p>
               </>
             )}
          </div>
        </div>
      </div>

      {/* Solution Details */}
      {process.asIa.solutionDetails && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl border bg-card shadow-sm">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-purple-500" /> Stack Tecnológico
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                  <Cpu className="w-4 h-4" /> Tecnologías
                </h4>
                <div className="flex flex-wrap gap-2">
                  {process.asIa.solutionDetails.technologies.map((tech, i) => (
                    <span key={i} className="px-2 py-1 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-medium border border-purple-500/20">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                  <Server className="w-4 h-4" /> Infraestructura
                </h4>
                <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
                  {process.asIa.solutionDetails.infrastructure.map((inf, i) => (
                    <li key={i}>{inf}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-xl border bg-card shadow-sm">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-500" /> Licencias y Costos
              </h3>
              <ul className="space-y-2">
                {process.asIa.solutionDetails.licenses.map((lic, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>{lic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-xl border bg-amber-500/5 border-amber-500/20 shadow-sm">
              <h3 className="font-semibold mb-2 flex items-center gap-2 text-amber-600 dark:text-amber-500">
                <Info className="w-5 h-5" /> Notas de Implementación
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {process.asIa.solutionDetails.notes}
              </p>
              
              <div className="mt-4 pt-4 border-t border-amber-500/10">
                 <p className="text-xs text-muted-foreground italic">
                 </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
