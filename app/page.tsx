"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from 'react'
import { AuthForm } from '@/components/ui/premium-auth'

export default function LandingPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // Check if logged in
    const isLogged = localStorage.getItem('isLogged') === 'true'
    if (isLogged) {
      router.push('/platform/dashboard')
    } else {
      setChecking(false)
    }
  }, [router])

  if (checking) {
    return <div className="min-h-screen bg-neutral-950" />
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-neutral-950 text-white relative overflow-hidden">
      <div className="w-full max-w-lg">
         <AuthForm
            onSuccess={() => {
              router.push('/platform/dashboard')
            }}
            onClose={() => {
              // Cannot close if this is the main page content
            }}
          />
      </div>
    </main>
  )
}
