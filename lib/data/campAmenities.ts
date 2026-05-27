import { supabase } from '@/lib/supabase'
import type { CampAmenities } from '@/types/database'

export async function getCampAmenitiesByDayId(
  dayId: string
): Promise<CampAmenities[]> {

  const { data, error } = await supabase
    .from('camp_amenities')
    .select('*')
    .eq('day_id', Number(dayId))

  if (error) {
    console.error(
      'Error fetching Camp Amenities:',
      error
    )

    return []
  }

  return data ?? []
}