import {supabase} from '@/lib/supabase'
import type {RouteSegment} from '@/types/database'

export async function getRouteSegmentsByRouteId(
    routeId: string
): Promise<RouteSegment[] | null> {
    const { data } = await supabase
        .from('route_segments')
        .select('*')
        .eq('route_id', routeId)

    return data as RouteSegment[] | null
}