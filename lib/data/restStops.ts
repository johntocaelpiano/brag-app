import { supabase } from '@/lib/supabase'
import type { RestStop } from '@/types/database'

export async function getRestStopsByRouteId(
  routeId: string
): Promise<RestStop[]> {

  const { data, error } = await supabase
    .from('rest_stops')
    .select(`
      *,
      venues (
        id,
        name,
        address,
        city,
        state,
        latitude,
        longitude,
        venue_type
      )
    `)
    .eq('route_id', routeId)

  if (error) {
    console.error(
      'Error fetching rest stops:',
      error
    )

    return []
  }

  if (!data) {
    return []
  }

  return data.map((item: any) => ({
    ...item,

    venues: Array.isArray(item.venues)
      ? item.venues[0] ?? null
      : item.venues,
  }))
}