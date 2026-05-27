import { supabase } from '@/lib/supabase'
import type { DayNavigation } from '@/types/database'

export async function getVenueById(
  id: string
) {
  const { data, error } = await supabase
    .from('venues')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    console.error(error)
    return null
  }

  return data
}

export async function getDaysForVenue(
  venueId: string
): Promise<DayNavigation[]> {
  const { data: stopsData, error: stopsError } = await supabase
    .from('rest_stops')
    .select('route_id')
    .eq('venue_id', venueId)

  if (stopsError) {
    console.error(stopsError)
    return []
  }

  const routeIds = Array.from(
    new Set(
      (stopsData || [])
        .map((item: any) => item.route_id)
        .filter((routeId: unknown) => routeId != null)
    )
  )

  if (routeIds.length === 0) {
    return []
  }

  const { data: routesData, error: routesError } = await supabase
    .from('routes')
    .select('days ( id, label )')
    .in('id', routeIds)

  if (routesError) {
    console.error(routesError)
    return []
  }

  const days = (routesData || [])
    .map((route: any) => route.days)
    .filter(Boolean)

  return Array.from(
    new Map(days.map((day: DayNavigation) => [day.id, day]))
      .values()
  )
}
