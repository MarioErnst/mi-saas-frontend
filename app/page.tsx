"use client"

import { useRouter } from "next/navigation" // Usamos router.push para navegar
import { useEffect, useState } from 'react'
import { AuthForm } from '@/components/ui/premium-auth'
import { Home, User, Briefcase, FileText, Zap, ShieldCheck, BarChart3, ArrowRight } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"
import { NeonButton } from "@/components/ui/neon-button" // Importamos tu nuevo botón

export default function LandingPage() {
  const router = useRouter();
  const [showAuth, setShowAuth] = useState(false)

  useEffect(() => {
    // show login modal automatically if not logged
    const isLogged = localStorage.getItem('isLogged') === 'true'
    if (!isLogged) setShowAuth(true)
  }, [])
  const navItems = [
    { name: 'Inicio', url: '#', icon: Home },
    { name: 'Procesos', url: '#', icon: Zap },
    { name: 'Resultados', url: '#', icon: FileText },
    { name: 'Perfil', url: '#', icon: User }
  ]

  if (showAuth) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
        <div className="max-w-lg w-full bg-background/80 rounded-xl p-6">
          <AuthForm
            onSuccess={() => {
              setShowAuth(false)
              router.push('/platform/landing')
            }}
            onClose={() => setShowAuth(false)}
          />
        </div>
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-neutral-950 text-white relative overflow-hidden">
      
      <NavBar items={navItems} />

      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex flex-col gap-10">
        
        {/* HERO SECTION */}
        <div className="text-center space-y-6 pt-20">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 pb-2">
              IA Process Optimizer
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Transforma la operatividad de tu empresa. Sube tus procesos y deja que nuestra IA rediseñe la eficiencia.
            </p>

            {/* AQUI ESTÁ TU NUEVO BOTÓN: usamos router.push en onClick */}
            <div className="pt-4 flex justify-center">
              <NeonButton
                onClick={() => router.push('/platform/dashboard')}
                variant="default"
                size="lg"
                className="text-lg font-semibold flex items-center gap-2"
              >
                Entrar a la Plataforma <ArrowRight className="w-4 h-4" />
              </NeonButton>
            </div>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-16">
            
            <div className="group h-64 rounded-xl border border-neutral-800 bg-neutral-900/50 p-8 hover:border-blue-500/50 transition-all cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="h-12 w-12 rounded-full bg-blue-500/10 mb-6 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <Zap className="text-blue-400 w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-neutral-100">Optimización Flash</h3>
                <p className="text-gray-500 leading-relaxed">
                  Detecta cuellos de botella en segundos y recibe una reingeniería del proceso instantánea.
                </p>
            </div>

            <div className="group h-64 rounded-xl border border-neutral-800 bg-neutral-900/50 p-8 hover:border-purple-500/50 transition-all cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="h-12 w-12 rounded-full bg-purple-500/10 mb-6 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                  <BarChart3 className="text-purple-400 w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-neutral-100">ROI Proyectado</h3>
                <p className="text-gray-500 leading-relaxed">
                  Calcula exactamente cuánto dinero y tiempo ahorrarás antes de implementar cualquier cambio.
                </p>
            </div>

            <div className="group h-64 rounded-xl border border-neutral-800 bg-neutral-900/50 p-8 hover:border-green-500/50 transition-all cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="h-12 w-12 rounded-full bg-green-500/10 mb-6 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <ShieldCheck className="text-green-400 w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-neutral-100">Seguridad Enterprise</h3>
                <p className="text-gray-500 leading-relaxed">
                  Tus datos están protegidos con estándares bancarios. La IA trabaja en un entorno aislado y seguro.
                </p>
            </div>

        </div>
      </div>
    </main>
  )
}