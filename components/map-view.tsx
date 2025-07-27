import RealMap from "@/components/real-map"

interface MapViewProps {
  filters: string[]
}

export default function MapView({ filters }: MapViewProps) {
  return <RealMap filters={filters} />
}
