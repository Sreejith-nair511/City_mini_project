"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { useState, useEffect } from "react"

const weeklyData = [
  { day: "Mon", crimes: 12 },
  { day: "Tue", crimes: 19 },
  { day: "Wed", crimes: 8 },
  { day: "Thu", crimes: 15 },
  { day: "Fri", crimes: 22 },
  { day: "Sat", crimes: 28 },
  { day: "Sun", crimes: 16 },
]

const monthlyTrend = [
  { week: "Week 1", crimes: 45 },
  { week: "Week 2", crimes: 52 },
  { week: "Week 3", crimes: 38 },
  { week: "Week 4", crimes: 61 },
]

const crimeTypeData = [
  { name: "Theft", value: 35, color: "#ef4444" },
  { name: "Assault", value: 25, color: "#f97316" },
  { name: "Burglary", value: 20, color: "#eab308" },
  { name: "Vandalism", value: 20, color: "#22c55e" },
]

const areaData = [
  { area: "Majestic", crimes: 45, safety: 2 },
  { area: "Shivajinagar", crimes: 38, safety: 2 },
  { area: "Koramangala", crimes: 22, safety: 6 },
  { area: "Indiranagar", crimes: 18, safety: 7 },
  { area: "Whitefield", crimes: 8, safety: 9 },
  { area: "Jayanagar", crimes: 12, safety: 8 },
]

export default function ChartsView() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
          <p className="text-white">Loading Analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Crime Analytics Dashboard</h1>
        <p className="text-gray-300">Comprehensive crime data analysis for Bangalore</p>
      </div>

      {/* Top Row - Weekly and Monthly Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/30 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Weekly Crime Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="crimes" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-black/30 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Monthly Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="week" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="crimes"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row - Crime Types and Area Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/30 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Crime Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={crimeTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {crimeTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-black/30 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Area Safety Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={areaData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9ca3af" />
                <YAxis dataKey="area" type="category" stroke="#9ca3af" width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="crimes" fill="#ef4444" name="Crime Count" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-black/30 backdrop-blur-md border-white/20">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-red-400 mb-2">196</div>
            <div className="text-gray-300">Total Crimes This Month</div>
          </CardContent>
        </Card>
        <Card className="bg-black/30 backdrop-blur-md border-white/20">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">-12%</div>
            <div className="text-gray-300">Change from Last Month</div>
          </CardContent>
        </Card>
        <Card className="bg-black/30 backdrop-blur-md border-white/20">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">73%</div>
            <div className="text-gray-300">Cases Resolved</div>
          </CardContent>
        </Card>
        <Card className="bg-black/30 backdrop-blur-md border-white/20">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">4.2</div>
            <div className="text-gray-300">Avg Safety Score</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
