import { supabase } from '@/lib/supabase'
import type { BragBar } from '@/types/database'

export async function getBragBarByDayId(
  dayId: string
): Promise<BragBar | null> {

  const { data, error } = await supabase
    .from('brag_bar')
    .select('*')
    .eq('day_id', Number(dayId))
    .maybeSingle()

  if (error) {
    console.error(
      'Error fetching BRAG bar:',
      error
    )
    return null
  }

  return data
}