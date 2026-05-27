"use client"
import { useState } from 'react'
import dynamic from 'next/dynamic'
import type { Venue } from '@/types/database'

const RouteMap = dynamic(
  () => import('./RouteMap'),
  {
    ssr: false,
    loading: () => (
      <div className="
        h-[350px]
        md:h-[500px]
        rounded-xl
        bg-gray-200
        animate-pulse
        flex
        items-center
        justify-center
        text-gray-500
      ">
        Loading map...
      </div>
    ),
  }
)

interface MapToggleProps {
  venues: Array<Venue & { role?: string }>
  routePath: Array<Venue & { role?: string }>
  startVenueId?: number
  finishVenueId?: number
}

export default function MapToggle({
  venues,
  routePath,
  startVenueId,
  finishVenueId,
}: MapToggleProps) {
  const [show, setShow] = useState(false)

  return (
    <div className="mb-6">
      {!show ? (
        <button
          className="btn"
          onClick={() => setShow(true)}
        >
          Show Map
        </button>
      ) : (
        <RouteMap
          venues={venues}
          routePath={routePath ?? []}
          startVenueId={startVenueId}
          finishVenueId={finishVenueId}
          
        />
      )}
    </div>
  )
}