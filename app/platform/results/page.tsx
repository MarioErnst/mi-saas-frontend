import { DUMMY_PROCESSES } from "@/lib/dummy-data"
import { ArrowRight, BarChart3, Download, Share2, Target, TrendingUp, Trophy } from "lucide-react"
import Link from "next/link"

export default function ResultsPage() {
  const process = DUMMY_PROCESSES[0]
  const roi = process.asIa.roi

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
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              ${roi.annualSavings.toLocaleString()}
              <span className="text-lg md:text-xl font-normal text-muted-foreground ml-2">/ año</span>
            </h2>
            <p className="text-muted-foreground max-w-md">
              Ahorro anual estimado implementando la arquitectura de agentes IA propuesta, considerando reducción de horas hombre y costos operativos.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
              <p className="text-sm text-gray-400 mb-1">Punto de Equilibrio</p>
              <p className="text-2xl font-bold text-white">{roi.breakevenPoint}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
              <p className="text-sm text-gray-400 mb-1">Eficiencia Operativa</p>
              <p className="text-2xl font-bold text-green-400">+{roi.timeReductionPercentage}%</p>
            </div>
            <div className="col-span-2 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Costo de Implementación</p>
                <p className="text-xl font-bold text-white">Bajo Demanda</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500 opacity-50" />
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Target className="w-5 h-5" /> Desglose de Impacto
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Reducción de Tareas Manuales</span>
                <span className="font-bold">95%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary w-[95%]"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Velocidad de Procesamiento</span>
                <span className="font-bold">20x Más Rápido</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-blue-500 w-[92%]"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Reducción de Errores</span>
                <span className="font-bold">99.9% Precisión</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-purple-500 w-[99%]"></div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border bg-card mt-6">
            <h4 className="font-medium mb-2">Próximos Pasos Recomendados</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                Validar propuesta técnica con equipo de IT.
              </li>
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                Definir alcance de piloto (MVP) de 4 semanas.
              </li>
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                Aprobar presupuesto de implementación.
              </li>
            </ul>
          </div>
        </div>

        {/* Visual Chart Placeholder */}
        <div className="rounded-xl border bg-card p-6 flex flex-col">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" /> Comparativa de Costos Acumulados
          </h3>
          <div className="flex-1 flex items-end justify-between gap-4 min-h-[300px] px-4 pb-4 border-b border-l relative">
            {/* Chart Bars Mock */}
            <div className="w-1/4 bg-muted/30 rounded-t-lg h-[80%] relative group">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold">AS-IS</div>
              <div className="w-full h-full bg-red-500/20 rounded-t-lg"></div>
            </div>
            <div className="w-1/4 bg-muted/30 rounded-t-lg h-[60%] relative">
               {/* Month 3 */}
            </div>
            <div className="w-1/4 bg-muted/30 rounded-t-lg h-[40%] relative">
               {/* Month 6 */}
            </div>
            <div className="w-1/4 bg-green-500/20 rounded-t-lg h-[15%] relative group">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-green-500">AS-IA</div>
            </div>
            
            {/* Chart Labels */}
            <div className="absolute bottom-4 right-8 text-xs text-muted-foreground">Proyección a 12 Meses</div>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4">
            La línea base (rojo) muestra el costo acumulado actual vs. la solución IA (verde).
          </p>
        </div>
      </div>
    </div>
  )
}