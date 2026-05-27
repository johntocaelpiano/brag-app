import { supabase } from '@/lib/supabase'

export async function searchVenues(
  query: string
) {
  const { data, error } = await supabase
    .from('venues')
    .select('*')
    .or(
      `name.ilike.%${query}%,city.ilike.%${query}%,address.ilike.%${query}%`
    )
    .limit(20)

  if (error) {
    console.error('Search error:', error)
    return []
  }

  return data || []
}