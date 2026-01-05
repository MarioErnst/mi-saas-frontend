"use client"

import { NeonButton } from '@/components/ui/neon-button'
import { useRouter } from 'next/navigation'

export default function PlatformLanding() {
  const router = useRouter()

  return (
    <main className="min-h-screen flex items-center justify-center p-8 bg-black text-white">
      <div className="max-w-2xl w-full text-center space-y-6">
        <h1 className="text-4xl font-bold">Bienvenido a la Plataforma</h1>
        <p className="text-muted-foreground">Empieza a mapear tus procesos y selecciona uno para continuar.</p>
        <NeonButton onClick={() => router.push('/platform/choose-process')} variant="solid" size="lg">Empezar</NeonButton>
      </div>
    </main>
  )
}
