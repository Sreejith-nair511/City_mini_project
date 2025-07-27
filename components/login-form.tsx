"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Shield, TrendingUp } from "lucide-react"

interface LoginFormProps {
  onLogin: (userData: { name: string; email: string }) => void
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    onLogin({ name, email })
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Title */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-blue-600/20 rounded-full backdrop-blur-sm border border-blue-500/30">
              <MapPin className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white">City Explorer</h1>
          <p className="text-blue-200">Discover safe routes and explore cities with confidence</p>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
            <Shield className="h-6 w-6 text-green-400 mx-auto mb-2" />
            <p className="text-xs text-gray-300">Safety Analytics</p>
          </div>
          <div className="p-3 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
            <TrendingUp className="h-6 w-6 text-blue-400 mx-auto mb-2" />
            <p className="text-xs text-gray-300">Crime Trends</p>
          </div>
          <div className="p-3 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
            <MapPin className="h-6 w-6 text-purple-400 mx-auto mb-2" />
            <p className="text-xs text-gray-300">Interactive Maps</p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-white">Get Started</CardTitle>
            <CardDescription className="text-blue-200">Enter your details to explore Bangalore safely</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Connecting...</span>
                  </div>
                ) : (
                  "Start Exploring"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
