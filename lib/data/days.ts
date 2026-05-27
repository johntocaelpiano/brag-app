import { supabase } from '@/lib/supabase'
import type { DayNavigation, Day} from '@/types/database'

export async function getDayById(
  id: string
): Promise<Day | null> {
  const { data } = await supabase
    .from('days')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  return data as Day | null
}

export async function getAdjacentDays(
    dayId: number
): Promise<{
    previousDay: DayNavigation | null
    nextDay: DayNavigation | null
}> {

    const { data: previousDay } = await supabase
        .from('days')
        .select('id, label')
        .lt('id', dayId)
        .order('id', { ascending: false })
        .limit(1)
        .maybeSingle()

    const { data: nextDay } = await supabase
        .from('days')
        .select('id, label')
        .gt('id', dayId)
        .order('id', { ascending: true })
        .limit(1)
        .maybeSingle()

    return { 
        previousDay: previousDay as DayNavigation | null, 
        nextDay: nextDay as DayNavigation | null 
    }
}

export async function getAllDays(): Promise<Day[]> {
  const { data } = await supabase
    .from('days')
    .select('*')
    .order('day_number')
    return data as Day[]
}