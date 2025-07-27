"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import MapView from "@/components/map-view"
import RightPanel from "@/components/right-panel"
import ChartsView from "@/components/charts-view"
import AIAssistant from "@/components/ai-assistant"
import BookmarksView from "@/components/bookmarks-view"

interface DashboardProps {
  user: { name: string; email: string }
  onLogout: () => void
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["Theft", "Assault", "Burglary", "Vandalism"])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Navbar user={user} onLogout={onLogout} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="pt-16">
        {activeTab === "dashboard" && (
          <div className="flex h-[calc(100vh-4rem)]">
            {/* Main Map Area */}
            <div className="flex-1 relative">
              <MapView filters={selectedFilters} />
            </div>

            {/* Right Panel */}
            <div className="w-80 bg-black/20 backdrop-blur-md border-l border-white/10">
              <RightPanel selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="p-6">
            <ChartsView />
          </div>
        )}

        {activeTab === "bookmarks" && (
          <div className="p-6">
            <BookmarksView />
          </div>
        )}
      </div>

      <AIAssistant userName={user.name} />
    </div>
  )
}
