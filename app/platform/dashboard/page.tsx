import { DUMMY_PROCESSES } from "@/lib/dummy-data"
import { BadgeCheck, Clock, ArrowRight, Activity, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Bienvenido de nuevo. Aquí tienes un resumen de tus procesos de transformación.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Ahorro Potencial Estimado</h3>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <div className="text-2xl font-bold">$640,000 / año</div>
          <p className="text-xs text-muted-foreground mt-1">+12% desde el mes pasado</p>
        </div>
        <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Procesos Analizados</h3>
            <Activity className="h-4 w-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold">2</div>
          <p className="text-xs text-muted-foreground mt-1"></p>
        </div>
        <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Horas Potenciales de Ahorro</h3>
            <Clock className="h-4 w-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold">1,250 h</div>
          <p className="text-xs text-muted-foreground mt-1">Equivalente a 8 FTEs</p>
        </div>
      </div>

      {/* Process List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Análisis Recientes</h2>
        <div className="grid gap-4">
          {DUMMY_PROCESSES.map((process) => (
            <div
              key={process.id}
              className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-xl border bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="space-y-1 mb-4 sm:mb-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {process.name}
                  </h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                    process.status === 'completed' 
                      ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                      : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                  }`}>
                    {process.status === 'completed' ? 'Completado' : 'En Progreso'}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground max-w-xl">
                  {process.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Actualizado: {process.lastUpdated}
                  </span>
                  {process.status === 'completed' && (
                    <span className="flex items-center gap-1 text-green-500">
                      <TrendingUp className="w-3 h-3" /> ROI: {process.asIa.roi.timeReductionPercentage}%
                    </span>
                  )}
                </div>
              </div>

              <Link 
                href={`/platform/processes/${process.id}/as-is`}
                className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-lg"
              >
                Ver Análisis <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}