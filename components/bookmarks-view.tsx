"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Instagram,
  Twitter,
  ExternalLink,
  Heart,
  Share2,
  Bookmark,
  Search,
  Filter,
  Clock,
  Star,
} from "lucide-react"

interface BookmarkItem {
  id: string
  title: string
  type: "location" | "instagram" | "twitter" | "article"
  url: string
  description: string
  image: string
  tags: string[]
  savedAt: string
  rating?: number
  isVerified?: boolean
}

const bookmarkData: BookmarkItem[] = [
  {
    id: "1",
    title: "Cubbon Park Safety Report",
    type: "location",
    url: "/location/cubbon-park",
    description: "Comprehensive safety analysis of Cubbon Park area with real-time crime data and visitor reviews.",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Safe Zone", "Park", "Family Friendly"],
    savedAt: "2 hours ago",
    rating: 4.8,
  },
  {
    id: "2",
    title: "@BangaloreCityPolice",
    type: "twitter",
    url: "https://twitter.com/BangaloreCityPolice",
    description:
      "Official Twitter account of Bangalore City Police. Get real-time updates on traffic, safety alerts, and community initiatives.",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Official", "Safety Updates", "Traffic"],
    savedAt: "5 hours ago",
    isVerified: true,
  },
  {
    id: "3",
    title: "@explorebangalore",
    type: "instagram",
    url: "https://instagram.com/explorebangalore",
    description:
      "Discover the best and safest spots in Bangalore. Beautiful photography and safety tips for tourists and locals.",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Tourism", "Photography", "Local Tips"],
    savedAt: "1 day ago",
    rating: 4.6,
  },
  {
    id: "4",
    title: "Koramangala Night Safety Guide",
    type: "article",
    url: "/articles/koramangala-safety",
    description:
      "Complete guide to staying safe in Koramangala during night hours. Includes safe routes, well-lit areas, and emergency contacts.",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Night Safety", "Koramangala", "Guide"],
    savedAt: "2 days ago",
    rating: 4.9,
  },
  {
    id: "5",
    title: "@bangaloreweather",
    type: "twitter",
    url: "https://twitter.com/bangaloreweather",
    description:
      "Accurate weather updates for Bangalore. Plan your safe travels with real-time weather conditions and forecasts.",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Weather", "Planning", "Updates"],
    savedAt: "3 days ago",
    isVerified: true,
  },
  {
    id: "6",
    title: "@bangalorefoodie",
    type: "instagram",
    url: "https://instagram.com/bangalorefoodie",
    description:
      "Safe dining spots in Bangalore. Reviews of restaurants in secure areas with good lighting and crowd presence.",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Food", "Dining", "Safe Spots"],
    savedAt: "4 days ago",
    rating: 4.7,
  },
  {
    id: "7",
    title: "Electronic City Safety Map",
    type: "location",
    url: "/location/electronic-city",
    description:
      "Detailed safety map of Electronic City with crime statistics, safe parking areas, and emergency services locations.",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["IT Hub", "Safe Parking", "Emergency"],
    savedAt: "1 week ago",
    rating: 4.5,
  },
  {
    id: "8",
    title: "@bangaloretraffic",
    type: "twitter",
    url: "https://twitter.com/bangaloretraffic",
    description:
      "Real-time traffic updates and route suggestions. Avoid congested areas and find safer, faster routes across the city.",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Traffic", "Routes", "Real-time"],
    savedAt: "1 week ago",
    isVerified: true,
  },
]

export default function BookmarksView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [bookmarks, setBookmarks] = useState(bookmarkData)

  const filterOptions = [
    { value: "all", label: "All Bookmarks", count: bookmarks.length },
    { value: "location", label: "Locations", count: bookmarks.filter((b) => b.type === "location").length },
    { value: "instagram", label: "Instagram", count: bookmarks.filter((b) => b.type === "instagram").length },
    { value: "twitter", label: "Twitter", count: bookmarks.filter((b) => b.type === "twitter").length },
    { value: "article", label: "Articles", count: bookmarks.filter((b) => b.type === "article").length },
  ]

  const filteredBookmarks = bookmarks.filter((bookmark) => {
    const matchesSearch =
      bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesFilter = selectedFilter === "all" || bookmark.type === selectedFilter

    return matchesSearch && matchesFilter
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "location":
        return <MapPin className="h-4 w-4" />
      case "instagram":
        return <Instagram className="h-4 w-4" />
      case "twitter":
        return <Twitter className="h-4 w-4" />
      default:
        return <Bookmark className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "location":
        return "bg-blue-600/20 text-blue-400 border-blue-500/30"
      case "instagram":
        return "bg-pink-600/20 text-pink-400 border-pink-500/30"
      case "twitter":
        return "bg-sky-600/20 text-sky-400 border-sky-500/30"
      default:
        return "bg-gray-600/20 text-gray-400 border-gray-500/30"
    }
  }

  const removeBookmark = (id: string) => {
    setBookmarks(bookmarks.filter((b) => b.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Your Bookmarks</h1>
        <p className="text-gray-300">Saved locations, social feeds, and safety resources</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search bookmarks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              onClick={() => setSelectedFilter(option.value)}
              variant={selectedFilter === option.value ? "default" : "outline"}
              size="sm"
              className={`whitespace-nowrap ${
                selectedFilter === option.value
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-white/10 hover:bg-white/20 text-gray-300 border-white/20"
              }`}
            >
              <Filter className="h-3 w-3 mr-1" />
              {option.label} ({option.count})
            </Button>
          ))}
        </div>
      </div>

      {/* Bookmarks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBookmarks.map((bookmark) => (
          <Card
            key={bookmark.id}
            className="bg-black/30 backdrop-blur-md border-white/20 hover:bg-black/40 transition-all duration-300 group"
          >
            <div className="relative">
              <img
                src={bookmark.image || "/placeholder.svg"}
                alt={bookmark.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute top-3 left-3">
                <Badge className={`${getTypeColor(bookmark.type)} border`}>
                  {getTypeIcon(bookmark.type)}
                  <span className="ml-1 capitalize">{bookmark.type}</span>
                </Badge>
              </div>
              {bookmark.isVerified && (
                <div className="absolute top-3 right-3">
                  <Badge className="bg-green-600/20 text-green-400 border-green-500/30">✓ Verified</Badge>
                </div>
              )}
            </div>

            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-white text-lg group-hover:text-blue-400 transition-colors">
                  {bookmark.title}
                </CardTitle>
                <button
                  onClick={() => removeBookmark(bookmark.id)}
                  className="text-gray-400 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Heart className="h-4 w-4 fill-current" />
                </button>
              </div>
              {bookmark.rating && (
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(bookmark.rating!) ? "text-yellow-400 fill-current" : "text-gray-600"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-400 ml-1">{bookmark.rating}</span>
                </div>
              )}
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-gray-300 text-sm line-clamp-3">{bookmark.description}</p>

              <div className="flex flex-wrap gap-1">
                {bookmark.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs bg-white/5 border-white/20 text-gray-400">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="flex items-center space-x-1 text-xs text-gray-400">
                  <Clock className="h-3 w-3" />
                  <span>{bookmark.savedAt}</span>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-1 h-8 w-8">
                    <Share2 className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-gray-400 hover:text-white p-1 h-8 w-8"
                    onClick={() => window.open(bookmark.url, "_blank")}
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredBookmarks.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bookmark className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-white text-lg font-medium mb-2">No bookmarks found</h3>
          <p className="text-gray-400">
            {searchTerm ? "Try adjusting your search terms" : "Start exploring and save your favorite places!"}
          </p>
        </div>
      )}

      {/* Quick Actions */}
      <Card className="bg-black/30 backdrop-blur-md border-white/20 p-6">
        <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30">
            <MapPin className="h-4 w-4 mr-2" />
            Add Location
          </Button>
          <Button className="bg-pink-600/20 hover:bg-pink-600/30 text-pink-400 border border-pink-500/30">
            <Instagram className="h-4 w-4 mr-2" />
            Follow Instagram
          </Button>
          <Button className="bg-sky-600/20 hover:bg-sky-600/30 text-sky-400 border border-sky-500/30">
            <Twitter className="h-4 w-4 mr-2" />
            Follow Twitter
          </Button>
        </div>
      </Card>
    </div>
  )
}
