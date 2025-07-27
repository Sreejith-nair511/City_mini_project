"use client"

import { useState } from "react"
import LoginForm from "@/components/login-form"
import Dashboard from "@/components/dashboard"

export default function Home() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  const handleLogin = (userData: { name: string; email: string }) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {!user ? <LoginForm onLogin={handleLogin} /> : <Dashboard user={user} onLogout={handleLogout} />}
    </div>
  )
}
