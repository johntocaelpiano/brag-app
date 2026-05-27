import { supabase } from '@/lib/supabase'

type Venue = {
  id: string
  venue_type?: string
  [key: string]: any
}


export async function getMapVenuesForDay(dayId: string) {
  //
  // STEP 1: Get route
  //
  const { data: route } = await supabase
    .from('routes')
    .select(`
      id,
      start_venue_id,
      finish_venue_id,
      startVenue:venues!start_venue_id (*),
      finishVenue:venues!finish_venue_id (*)
    `)
    .eq('day_id', dayId)
    .maybeSingle()

  if (!route) {
    return {
      venues: [],
      routePath: [],
    }
  }

  //
  // Normalize start / finish
  //
  const startVenue: Venue[] = route.startVenue
    ? Array.isArray(route.startVenue)
      ? route.startVenue
      : [route.startVenue]
    : []

  const finishVenue: Venue[] = route.finishVenue
    ? Array.isArray(route.finishVenue)
      ? route.finishVenue
      : [route.finishVenue]
    : []

  //
  // STEP 2: Get rest stops
  //
  const { data: restStops } = await supabase
    .from('rest_stops')
    .select(`
      mile_marker,
      venues!rest_stops_venue_id_fkey (*)
    `)
    .eq('route_id', route.id)
    .order('mile_marker', { ascending: true })

  const restStopVenues: Venue[] =
    restStops
      ?.map((r: any) => r.venues)
      .filter(Boolean) ?? []

  //
  // STEP 3: Get recommendations
  //
  const { data: recommendations } = await supabase
    .from('day_recommendations')
    .select(`venues (*)`)
    .eq('day_id', dayId)

  const recommendationVenues: Venue[] =
    recommendations?.flatMap((r: any) => r.venues ?? []) ?? []

  //
  // STEP 4: Build ordered route path
  //
  const routePath: Venue[] = [
    ...startVenue,
    ...restStopVenues,
    ...finishVenue,
  ]

  //
  // STEP 5: Merge all venues
  //
  const allVenues: Venue[] = [
    ...startVenue,
    ...finishVenue,
    ...restStopVenues,
    ...recommendationVenues,
  ]

  //
  // STEP 6: Deduplicate
  //
  const uniqueVenues = allVenues.filter(
    (venue, index, self) =>
      index === self.findIndex(v => v.id === venue.id)
  )

  //
  // STEP 7: Role tagging helper
  //
  const withRole = (v: Venue) => ({
    ...v,
    role:
      v.id === route.start_venue_id
        ? 'start'
        : v.id === route.finish_venue_id
        ? 'finish'
        : v.venue_type ?? 'unknown',
  })

  return {
    venues: uniqueVenues.map(withRole),
    routePath: routePath.map(withRole),
  }
}