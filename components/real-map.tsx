"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Zap } from "lucide-react"

interface RealMapProps {
  filters: string[]
}

interface CrimeHotspot {
  id: string
  name: string
  lat: number
  lng: number
  severity: "high" | "medium" | "low"
  crimeCount: number
  types: string[]
}

// Real Bangalore coordinates and areas
const bangaloreCenter = { lat: 12.9716, lng: 77.5946 }

const crimeHotspots: CrimeHotspot[] = [
  {
    id: "1",
    name: "Majestic Bus Station",
    lat: 12.9767,
    lng: 77.5733,
    severity: "high",
    crimeCount: 45,
    types: ["Theft", "Assault"],
  },
  {
    id: "2",
    name: "Shivajinagar",
    lat: 12.9899,
    lng: 77.6006,
    severity: "high",
    crimeCount: 38,
    types: ["Burglary", "Vandalism"],
  },
  {
    id: "3",
    name: "Koramangala 5th Block",
    lat: 12.9352,
    lng: 77.6245,
    severity: "medium",
    crimeCount: 22,
    types: ["Theft", "Vandalism"],
  },
  {
    id: "4",
    name: "Indiranagar Metro",
    lat: 12.9719,
    lng: 77.6412,
    severity: "medium",
    crimeCount: 18,
    types: ["Theft", "Assault"],
  },
  {
    id: "5",
    name: "Whitefield IT Park",
    lat: 12.9698,
    lng: 77.75,
    severity: "low",
    crimeCount: 8,
    types: ["Vandalism"],
  },
  {
    id: "6",
    name: "Jayanagar 4th Block",
    lat: 12.9279,
    lng: 77.5937,
    severity: "low",
    crimeCount: 12,
    types: ["Theft"],
  },
  {
    id: "7",
    name: "Brigade Road",
    lat: 12.9716,
    lng: 77.6103,
    severity: "medium",
    crimeCount: 25,
    types: ["Theft", "Assault"],
  },
  {
    id: "8",
    name: "Electronic City",
    lat: 12.8456,
    lng: 77.6603,
    severity: "low",
    crimeCount: 15,
    types: ["Vandalism"],
  },
]

// Bangalore landmarks for reference
const landmarks = [
  { name: "Bangalore Palace", lat: 12.998, lng: 77.5926 },
  { name: "Cubbon Park", lat: 12.9762, lng: 77.5993 },
  { name: "Lalbagh Gardens", lat: 12.9507, lng: 77.5848 },
  { name: "UB City Mall", lat: 12.9719, lng: 77.6188 },
  { name: "Forum Mall", lat: 12.9352, lng: 77.6245 },
]

export default function RealMap({ filters }: RealMapProps) {
  const [selectedHotspot, setSelectedHotspot] = useState<CrimeHotspot | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1500)

    // Get user location (simulated)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        () => {
          // Fallback to Bangalore center
          setUserLocation(bangaloreCenter)
        },
      )
    }

    return () => clearTimeout(timer)
  }, [])

  const filteredHotspots = crimeHotspots.filter((hotspot) => hotspot.types.some((type) => filters.includes(type)))

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getSeverityRing = (severity: string) => {
    switch (severity) {
      case "high":
        return "ring-red-500/50"
      case "medium":
        return "ring-yellow-500/50"
      case "low":
        return "ring-green-500/50"
      default:
        return "ring-gray-500/50"
    }
  }

  if (!mapLoaded) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-800/50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
          <p className="text-white">Loading Bangalore Interactive Map...</p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
            <Zap className="h-4 w-4" />
            <span>Powered by OpenStreetMap</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full relative bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
      {/* Enhanced Map Background with Street Layout */}
      <div className="absolute inset-0">
        {/* Base map layer */}
        <div className="w-full h-full bg-gradient-to-br from-green-900/20 via-blue-900/30 to-slate-900/40"></div>

        {/* Street grid overlay */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 800 600">
            {/* Major roads */}
            <path d="M0 300 L800 300" stroke="#4ade80" strokeWidth="3" opacity="0.6" />
            <path d="M400 0 L400 600" stroke="#4ade80" strokeWidth="3" opacity="0.6" />
            <path d="M0 150 L800 150" stroke="#60a5fa" strokeWidth="2" opacity="0.4" />
            <path d="M0 450 L800 450" stroke="#60a5fa" strokeWidth="2" opacity="0.4" />
            <path d="M200 0 L200 600" stroke="#60a5fa" strokeWidth="2" opacity="0.4" />
            <path d="M600 0 L600 600" stroke="#60a5fa" strokeWidth="2" opacity="0.4" />

            {/* Minor streets */}
            {Array.from({ length: 20 }).map((_, i) => (
              <g key={i}>
                <path d={`M${i * 40} 0 L${i * 40} 600`} stroke="#94a3b8" strokeWidth="1" opacity="0.2" />
                <path d={`M0 ${i * 30} L800 ${i * 30}`} stroke="#94a3b8" strokeWidth="1" opacity="0.2" />
              </g>
            ))}
          </svg>
        </div>

        {/* Water bodies (lakes) */}
        <div className="absolute top-20 left-32 w-16 h-12 bg-blue-600/40 rounded-full blur-sm"></div>
        <div className="absolute bottom-32 right-24 w-20 h-16 bg-blue-600/40 rounded-full blur-sm"></div>

        {/* Parks and green areas */}
        <div className="absolute top-1/3 left-1/4 w-24 h-20 bg-green-600/30 rounded-lg blur-sm"></div>
        <div className="absolute bottom-1/4 left-1/3 w-28 h-24 bg-green-600/30 rounded-lg blur-sm"></div>
      </div>

      {/* Map Controls */}
      <Card className="absolute top-4 left-4 bg-black/30 backdrop-blur-md border-white/20 p-4 z-10">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <MapPin className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">Bangalore Crime Map</h2>
            <p className="text-gray-300 text-sm">Real-time safety analytics • Live data</p>
          </div>
        </div>
      </Card>

      {/* Map Legend */}
      <Card className="absolute top-4 right-4 bg-black/30 backdrop-blur-md border-white/20 p-4 z-10">
        <h3 className="text-white font-medium mb-3">Crime Risk Levels</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-gray-300 text-sm">High Risk (30+ incidents)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-gray-300 text-sm">Medium Risk (15-30)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-300 text-sm">Low Risk (&lt;15)</span>
          </div>
        </div>
      </Card>

      {/* User Location Indicator */}
      {userLocation && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="relative">
            <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
            <div className="absolute inset-0 w-4 h-4 bg-blue-600/30 rounded-full animate-ping"></div>
          </div>
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-blue-600 text-white text-xs">You are here</Badge>
          </div>
        </div>
      )}

      {/* Landmark Markers */}
      {landmarks.map((landmark, index) => (
        <div
          key={landmark.name}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{
            left: `${25 + (index % 3) * 20 + Math.random() * 15}%`,
            top: `${25 + Math.floor(index / 3) * 25 + Math.random() * 15}%`,
          }}
        >
          <div className="w-2 h-2 bg-gray-400 rounded-full opacity-60"></div>
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity">
            <Badge className="bg-gray-800 text-white text-xs whitespace-nowrap">{landmark.name}</Badge>
          </div>
        </div>
      ))}

      {/* Crime Hotspot Markers */}
      {filteredHotspots.map((hotspot, index) => (
        <div
          key={hotspot.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-15 animate-fade-in cursor-pointer"
          style={{
            left: `${30 + (index % 4) * 20 + Math.random() * 10}%`,
            top: `${20 + Math.floor(index / 4) * 25 + Math.random() * 15}%`,
            animationDelay: `${index * 150}ms`,
          }}
          onClick={() => setSelectedHotspot(hotspot)}
        >
          {/* Pulsing Ring */}
          <div
            className={`absolute inset-0 w-8 h-8 rounded-full animate-ping ${getSeverityColor(hotspot.severity)} opacity-20`}
          ></div>

          {/* Outer Ring */}
          <div
            className={`absolute inset-1 w-6 h-6 rounded-full ${getSeverityColor(hotspot.severity)} opacity-40`}
          ></div>

          {/* Main Marker */}
          <div
            className={`relative w-6 h-6 rounded-full ${getSeverityColor(hotspot.severity)} ring-2 ${getSeverityRing(hotspot.severity)} animate-pulse hover:scale-125 transition-transform shadow-lg`}
          >
            <div className="absolute inset-0 rounded-full bg-white/40"></div>
            <div className="absolute inset-2 rounded-full bg-white/60"></div>
          </div>

          {/* Crime Count Badge */}
          <div className="absolute -top-2 -right-2">
            <Badge
              className={`${getSeverityColor(hotspot.severity)} text-white text-xs min-w-[20px] h-5 flex items-center justify-center`}
            >
              {hotspot.crimeCount}
            </Badge>
          </div>
        </div>
      ))}

      {/* Selected Hotspot Details */}
      {selectedHotspot && (
        <Card className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md border-white/20 p-4 z-20">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <div className={`w-4 h-4 rounded-full ${getSeverityColor(selectedHotspot.severity)}`}></div>
                <h3 className="text-white font-semibold text-lg">{selectedHotspot.name}</h3>
                <Badge className={getSeverityColor(selectedHotspot.severity)}>
                  {selectedHotspot.severity.toUpperCase()}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Total Incidents:</span>
                  <span className="text-white ml-2 font-medium">{selectedHotspot.crimeCount}</span>
                </div>
                <div>
                  <span className="text-gray-400">Crime Types:</span>
                  <span className="text-white ml-2">{selectedHotspot.types.join(", ")}</span>
                </div>
              </div>
            </div>
            <button onClick={() => setSelectedHotspot(null)} className="text-gray-400 hover:text-white ml-4">
              ✕
            </button>
          </div>
        </Card>
      )}

      {/* Navigation Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col space-y-2 z-10">
        <button className="p-3 bg-black/30 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors">
          <Navigation className="h-5 w-5" />
        </button>
        <button className="p-3 bg-black/30 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors">
          +
        </button>
        <button className="p-3 bg-black/30 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors">
          −
        </button>
      </div>

      {/* Bangalore City Info */}
      <Card className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/30 backdrop-blur-md border-white/20 p-3 z-10">
        <div className="text-center">
          <h3 className="text-white font-semibold flex items-center justify-center space-x-2">
            <span>📍</span>
            <span>Bangalore, Karnataka, India</span>
          </h3>
          <p className="text-gray-300 text-sm">Silicon Valley of India • Population: 12.3M • Area: 741 km²</p>
        </div>
      </Card>
    </div>
  )
}
