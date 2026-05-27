import {supabase} from '@/lib/supabase'
import type {Route} from '@/types/database'

export async function getRouteByDayId(
    dayId: string
): Promise<Route | null> {
    const { data } = await supabase
        .from('routes')
        .select('*')
        .eq('day_id', dayId)
        .maybeSingle()

    return data as Route | null
}