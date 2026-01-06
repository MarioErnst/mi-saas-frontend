import { DUMMY_PROCESSES } from "@/lib/dummy-data"
import Link from "next/link"
import { ArrowRight, FileText, Plus } from "lucide-react"

export default function ChooseProcess() {
  return (
    <main className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mis Procesos</h1>
          <p className="text-muted-foreground mt-2">Gestiona y selecciona tus procesos modelados.</p>
        </div>
        <Link 
          href="/platform/upload" 
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" /> Nuevo Proceso
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DUMMY_PROCESSES.map((process) => (
          <div key={process.id} className="flex flex-col p-6 rounded-xl border bg-card hover:border-primary/50 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <FileText className="w-6 h-6" />
              </div>
              <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                process.status === 'completed' 
                  ? 'bg-green-500/10 text-green-500' 
                  : 'bg-yellow-500/10 text-yellow-500'
              }`}>
                {process.status === 'completed' ? 'Optimizado' : 'Borrador'}
              </span>
            </div>
            
            <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{process.name}</h3>
            <p className="text-sm text-muted-foreground mb-6 line-clamp-2 flex-1">
              {process.description}
            </p>

            <div className="mt-auto pt-4 border-t flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                <span className="block font-medium text-foreground">{process.asIs.steps.length} pasos</span>
                detectados
              </div>
              <Link 
                href={`/platform/processes/${process.id}/as-is`}
                className="text-sm font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all"
              >
                Continuar <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}

        {/* Card para nuevo proceso */}
        <Link 
          href="/platform/upload"
          className="flex flex-col items-center justify-center p-6 rounded-xl border border-dashed hover:border-primary/50 hover:bg-muted/50 transition-all gap-4 text-muted-foreground hover:text-primary min-h-[250px]"
        >
          <div className="p-4 rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
            <Plus className="w-8 h-8" />
          </div>
          <span className="font-medium">Crear Nuevo Proceso</span>
        </Link>
      </div>
    </main>
  )
}
