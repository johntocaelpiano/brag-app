import { supabase } from '@/lib/supabase'

import type{
    Recommendation,
    Venue,
} from '@/types/database'

export async function getRecommendationsByDayId(
    dayId: string
): Promise<Recommendation[] | null> {

    const { data, error } = await supabase
        .from('day_recommendations')
        .select(`
            id,
            recommendation_type,
            venues (
                id,
                name,
                address,
                city,
                state,
                latitude,
                longitude
            )
        `)
        .eq('day_id', dayId)

    if (error) {
        console.error(error)
        return null
    }

    return data.map((item: any) => ({
        ...item,

        venues: Array.isArray(item.venues)
        ? item.venues[0] // Assuming one venue per recommendation
        :item.venues,
    })) as Recommendation[]
}
    