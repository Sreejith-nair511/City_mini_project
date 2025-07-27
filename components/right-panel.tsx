"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Droplets, Wind, AlertTriangle, Clock, MapPin } from "lucide-react"

interface RightPanelProps {
  selectedFilters: string[]
  setSelectedFilters: (filters: string[]) => void
}

const weatherData = {
  temperature: 26,
  condition: "Mostly Cloudy",
  humidity: 78,
  windSpeed: 12,
  icon: "🌤️",
}

const crimeReports = [
  { id: "1", type: "Theft", location: "MG Road", time: "2 hours ago", severity: "medium" },
  { id: "2", type: "Assault", location: "Brigade Road", time: "4 hours ago", severity: "high" },
  { id: "3", type: "Burglary", location: "Koramangala 5th Block", time: "6 hours ago", severity: "high" },
  { id: "4", type: "Vandalism", location: "Indiranagar", time: "8 hours ago", severity: "low" },
  { id: "5", type: "Theft", location: "Whitefield", time: "12 hours ago", severity: "low" },
  { id: "6", type: "Assault", location: "Jayanagar", time: "1 day ago", severity: "medium" },
]

const crimeTypes = ["Theft", "Assault", "Burglary", "Vandalism"]

export default function RightPanel({ selectedFilters, setSelectedFilters }: RightPanelProps) {
  const [isWeatherLoading, setIsWeatherLoading] = useState(false)

  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter))
    } else {
      setSelectedFilters([...selectedFilters, filter])
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-400 bg-red-500/20"
      case "medium":
        return "text-yellow-400 bg-yellow-500/20"
      case "low":
        return "text-green-400 bg-green-500/20"
      default:
        return "text-gray-400 bg-gray-500/20"
    }
  }

  const filteredReports = useMemo(
    () => crimeReports.filter((report) => selectedFilters.includes(report.type)),
    [selectedFilters],
  )

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      {/* Weather Widget */}
      <Card className="bg-black/30 backdrop-blur-md border-white/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center space-x-2">
            <span>{weatherData.icon}</span>
            <span>Weather</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">{weatherData.temperature}°C</div>
            <div className="text-gray-300">{weatherData.condition}</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-2 text-sm">
              <Droplets className="h-4 w-4 text-blue-400" />
              <span className="text-gray-300">{weatherData.humidity}%</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Wind className="h-4 w-4 text-gray-400" />
              <span className="text-gray-300">{weatherData.windSpeed} km/h</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Crime Filters */}
      <Card className="bg-black/30 backdrop-blur-md border-white/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-white">Crime Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {crimeTypes.map((type) => (
              <Button
                key={type}
                onClick={() => toggleFilter(type)}
                variant={selectedFilters.includes(type) ? "default" : "outline"}
                size="sm"
                className={`${
                  selectedFilters.includes(type)
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-white/10 hover:bg-white/20 text-gray-300 border-white/20"
                }`}
              >
                {type}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Crime Reports */}
      <Card className="bg-black/30 backdrop-blur-md border-white/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-400" />
            <span>Recent Reports</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <Badge className={getSeverityColor(report.severity)}>{report.type}</Badge>
                  <span className="text-xs text-gray-400 flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{report.time}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-300">
                  <MapPin className="h-3 w-3" />
                  <span>{report.location}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="bg-black/30 backdrop-blur-md border-white/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-white">Today's Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">23</div>
              <div className="text-xs text-gray-400">High Risk</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">45</div>
              <div className="text-xs text-gray-400">Medium Risk</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">12</div>
              <div className="text-xs text-gray-400">Low Risk</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">80</div>
              <div className="text-xs text-gray-400">Total Reports</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
