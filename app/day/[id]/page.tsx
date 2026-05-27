import Link from 'next/link'
import type { Route } from '@/types/database'
import { getAdjacentDays, getDayById } from '@/lib/data/days'
import { getRouteByDayId } from '@/lib/data/routes'
import { getRestStopsByRouteId } from '@/lib/data/restStops'
import { getRouteSegmentsByRouteId } from '@/lib/data/routeSegments'
import { getRecommendationsByDayId } from '@/lib/data/recommendations'
import { getBragBarByDayId } from '@/lib/data/bragBar'
import { getCampAmenitiesByDayId } from '@/lib/data/campAmenities'
import { getMapVenuesForDay } from '@/lib/data/map'
import {Suspense} from 'react'

import RouteInfo from '@/components/RouteInfo'
import RestStopsList from '@/components/RestStopsList'
import DayHeader from '@/components/DayHeader'
import RouteSegments from '@/components/RouteSegments'
import DayNavigation from '@/components/DayNavigation'
import MapToggle from '@/components/MapToggle'
import RecommendationsList from '@/components/RecommendationsList'
import CollapsibleSection from '@/components/ui/CollapsibleSection'
import BragBarInfo from '@/components/BragBar'
import CampAmenitiesInfo from '@/components/CampAmenities'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function DayPage({
  params,
}: PageProps) {
  const { id } = await params

  // Fetch day
  const day = await getDayById(id)

  if (!day) {
    return (
      <main className="p-8">
        <h1>Day Not Found</h1>
      </main>
    )
  }

  const typedDay = day
  
  // Fetch adjacent days
  const { previousDay, nextDay } = await getAdjacentDays(
    typedDay.id
  )

  // Fetch route for this day
  const route = await getRouteByDayId(String(typedDay.id))

  const typedRoute = route as Route | null

  // Fetch rest stops
  const typedRestStops = typedRoute
    ? await getRestStopsByRouteId(String(typedRoute.id))
    : null

  // Fetch route segments
  const typedSegments = typedRoute
    ? await getRouteSegmentsByRouteId(String(typedRoute.id))
    : null

  // Fetch recommendations
  const recommendations = 
    await getRecommendationsByDayId(
      String(typedDay.id)
    )

  // Fetch venues for map
  const {
    venues: 
    mapVenues,
    routePath,
  } = await getMapVenuesForDay(
    String(typedDay.id)
  )

  const bragBar = await getBragBarByDayId(
  String(typedDay.id)
)

  const campAmenities = await getCampAmenitiesByDayId(
    String(typedDay.id)
  )

  return (
    <main className="p-6 max-w-4xl mx-auto">
        {/* DAY HEADER */}
        <DayHeader day={typedDay} />

        {/* NAVIGATION */}
        <DayNavigation previousDay={previousDay} nextDay={nextDay} />
        
        {/* ROUTE INFO */}
        <CollapsibleSection
           title="Route Info"
           defaultOpen={true}
           >
          <RouteInfo route={typedRoute as Route} />
        </CollapsibleSection>

        {/* BRAG BAR INFO */}
        <CollapsibleSection title="BRAG Bar">
          <BragBarInfo bragBar={bragBar} />
        </CollapsibleSection>

        {/* CAMP AMENITIES INFO */}
        <CollapsibleSection title="Camp Amenities">
          <CampAmenitiesInfo amenities={campAmenities} />
        </CollapsibleSection>
        

        {/* ROUTE MAP (lazy-loaded) */}
        {mapVenues.length > 0 && (
          <CollapsibleSection title="Route Map">
             <Suspense
  fallback={
    <div className="
      h-[350px]
      md:h-[500px]
      rounded-xl
      border
      bg-gray-100
      animate-pulse
      flex
      items-center
      justify-center
    ">
      Loading map...
    </div>
  }
>
  <MapToggle
    venues={mapVenues as any}
    routePath={routePath as any}
    startVenueId={typedRoute?.start_venue_id ?? undefined}
    finishVenueId={typedRoute?.finish_venue_id ?? undefined}
  />
</Suspense>
          </CollapsibleSection>
        )}

        {/* REST STOPS */}
        <CollapsibleSection title="Rest Stops">
          <RestStopsList restStops={typedRestStops} />
        </CollapsibleSection>

        {/* ROUTE SEGMENTS */}
        <CollapsibleSection title="Route Segments">
          <RouteSegments segments={typedSegments || []} />
        </CollapsibleSection>

        {/* RECOMMENDATIONS */}
        <CollapsibleSection title="Recommendations">
         <RecommendationsList recommendations={recommendations} />
        </CollapsibleSection>

    </main>
  )
}