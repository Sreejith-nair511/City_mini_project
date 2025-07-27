"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, BarChart3, Bookmark, LogOut, Menu } from "lucide-react"
import { useState } from "react"

interface NavbarProps {
  user: { name: string; email: string }
  onLogout: () => void
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function Navbar({ user, onLogout, activeTab, setActiveTab }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: MapPin },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "bookmarks", label: "Bookmarks", icon: Bookmark },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600/20 rounded-lg backdrop-blur-sm border border-blue-500/30">
              <MapPin className="h-6 w-6 text-blue-400" />
            </div>
            <span className="text-xl font-bold text-white">City Explorer</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                    activeTab === item.id
                      ? "bg-blue-600/30 text-blue-300 border border-blue-500/30"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>

          {/* City Selector & User Menu */}
          <div className="flex items-center space-x-4">
            <Select defaultValue="bangalore">
              <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bangalore">🇮🇳 Bangalore</SelectItem>
                <SelectItem value="mumbai" disabled>
                  🇮🇳 Mumbai (Soon)
                </SelectItem>
                <SelectItem value="delhi" disabled>
                  🇮🇳 Delhi (Soon)
                </SelectItem>
              </SelectContent>
            </Select>

            <div className="hidden md:flex items-center space-x-3">
              <span className="text-sm text-gray-300">Hi, {user.name}</span>
              <Button
                onClick={onLogout}
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white hover:bg-white/10"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              variant="ghost"
              size="sm"
              className="md:hidden text-white"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg transition-all ${
                      activeTab === item.id
                        ? "bg-blue-600/30 text-blue-300"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                )
              })}
              <div className="pt-2 border-t border-white/10">
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-sm text-gray-300">{user.name}</span>
                  <Button onClick={onLogout} variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
