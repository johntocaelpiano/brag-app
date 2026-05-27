'use client'

import '@/lib/leaflet'

import { useEffect, useRef } from 'react'
import L, {Polyline} from 'leaflet'

import type {
  Venue,
} from '@/types/database'

interface MapVenue extends Venue {
  role?: string
}

interface RouteMapProps {
  venues: MapVenue[]
  routePath: MapVenue[]
  startVenueId?: number
  finishVenueId?: number
}

export default function RouteMap({
  venues,
  startVenueId,
  finishVenueId,
  routePath,
}: RouteMapProps) {

  const validVenues = venues.filter(
    (venue): venue is Venue =>
      !!venue &&
      venue.latitude !== null &&
      venue.longitude !== null
  )

  const firstVenue = validVenues[0]

  if (!firstVenue) return null

  const center: [number, number] = [
    firstVenue.latitude!,
    firstVenue.longitude!,
  ]

  const mapRef = useRef<HTMLDivElement | null>(null)

  const mapInstanceRef = useRef<L.Map | null>(
    null
  )

  useEffect(() => {

    if (!mapRef.current) return

    // Prevent duplicate maps

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove()
      mapInstanceRef.current = null
    }

    const map = L.map(mapRef.current, {
      center,
      zoom: 10,
      scrollWheelZoom: false,
    })

    // Base tiles

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; OpenStreetMap contributors',
      }
    ).addTo(map)

    // Marker icon factory

    function createMarkerIcon(
      color: string
    ) {
      return L.divIcon({
        className: '',
        html: `
          <div style="
            background:${color};
            width:18px;
            height:18px;
            border-radius:50%;
            border:3px solid white;
            box-shadow:0 0 4px rgba(0,0,0,0.4);
          "></div>
        `,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      })
    }

    // Resolve marker color based on route role first,
    // then fall back to venue_type.
    // This is necessary because start/finish venues
    // have venue_type = 'camp' in the database —
    // their role in a given route is what determines
    // their color on the map.

    function isStartVenue(venue: MapVenue) {
      return venue.role === 'start' || venue.id === startVenueId
    }

    function isFinishVenue(venue: MapVenue) {
      return venue.role === 'finish' || venue.id === finishVenueId
    }

    function getVenueIcon(venue: MapVenue) {

      if (isStartVenue(venue))
        return createMarkerIcon('#0f766e')

      if (isFinishVenue(venue))
        return createMarkerIcon('#7c3aed')

      switch (venue.venue_type) {

        case 'camp':
          return createMarkerIcon('#2563eb')

        case 'rest_stop':
          return createMarkerIcon('#dc2626')

        case 'restaurant':
          return createMarkerIcon('#16a34a')

        case 'activity':
          return createMarkerIcon('#ca8a04')

        case 'parking':
          return createMarkerIcon('#6b7280')

        default:
          return createMarkerIcon('#111827')
      }
    }

    // Resolve a human-readable label for the popup
    // using the same role-first logic as the icon.

    function getVenueLabel(venue: MapVenue) {

      if (isStartVenue(venue))
        return 'Start'

      if (isFinishVenue(venue))
        return 'Finish'

      switch (venue.venue_type) {
        case 'camp':       return 'Camp'
        case 'rest_stop':  return 'Rest Stop'
        case 'restaurant': return 'Restaurant'
        case 'activity':   return 'Activity'
        case 'parking':    return 'Parking'
        default:           return venue.venue_type ?? ''
      }
    }

    // Track marker bounds

    const bounds = L.latLngBounds([])

    const routeCoordinates: [number, number][] =
  (routePath ?? [])
    .filter(
      (venue) =>
        venue.latitude !== null &&
        venue.longitude !== null
    )
    .map((venue) => [
      venue.latitude!,
      venue.longitude!,
    ])

    // Add markers

    validVenues.forEach((venue) => {

      const marker = L.marker(
        [
          venue.latitude!,
          venue.longitude!,
        ],
        {
          icon: getVenueIcon(venue),
        }
      )

      marker.bindPopup(`
        <div>
          <strong>${venue.name}</strong>
          <br />
          ${venue.city}, ${venue.state}
          <br />
          ${getVenueLabel(venue)}
          <br />
          <a
            href="/venues/${venue.id}"
            style="
              color:#2563eb;
              text-decoration:underline;
            "
          >
            View Venue
          </a>
        </div>
      `)

      marker.addTo(map)

      bounds.extend([
        venue.latitude!,
        venue.longitude!,
      ])
    })

    if (routeCoordinates.length > 1) {

      const polyline = L.polyline(
        routeCoordinates, 
        {
          color: '#2563eb',
          weight: 4,
          opacity: 0.7,
          smoothFactor: 1,
          dashArray: '10, 10',
        }
      )
      polyline.addTo(map)
    }

    // Auto-fit all markers

    if (validVenues.length > 1) {
      map.fitBounds(bounds, {
        padding: [50, 50],
      })
    }

    mapInstanceRef.current = map

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }

  }, [venues, routePath, startVenueId, finishVenueId])

  return (
    <section className="mb-10">

      <div className="
        h-[350px]
        md:h-[500px]
        rounded-xl
        overflow-hidden
        border
      ">
        <div
          ref={mapRef}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>

      {/* MAP LEGEND */}

      <div className="
        mt-4
        flex
        flex-wrap
        gap-4
        text-sm
      ">
        <Legend color="#0f766e" label="Start" />
        <Legend color="#7c3aed" label="Finish" />
        <Legend color="#2563eb" label="Camp" />
        <Legend color="#dc2626" label="Rest Stop" />
        <Legend color="#16a34a" label="Restaurant" />
        <Legend color="#ca8a04" label="Activity" />
        <Legend color="#6b7280" label="Parking" />
      </div>

    </section>
  )
}

interface LegendProps {
  color: string
  label: string
}

function Legend({
  color,
  label,
}: LegendProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        style={{
          background: color,
          width: 14,
          height: 14,
          borderRadius: '999px',
        }}
      />

      <span>{label}</span>
    </div>
  )
}
