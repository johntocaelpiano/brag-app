import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Day } from '@/types/database'

export default async function Home() {
  const { data: days, error } = await supabase
    .from('days')
    .select('*')
    .order('day_number')

  const typedDays = days as Day[] | null

  if (error) {
    return (
      <main className="p-8">
        <h1>Error Loading Data</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </main>
    )
  }

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        BIG BRAG 2026
      </h1>

      <div className="space-y-4">
        {typedDays?.map((day) => (
          <Link
  href={`/day/${day.id}`}
  key={day.id}
  className="block border rounded-xl p-4 shadow hover:bg-gray-100 transition"
>
            <h2 className="text-2xl font-semibold">
              {day.label}
            </h2>

            <p>
              Host City: {day.host_city}
            </p>

            <p>
              Distance: {day.distance_miles} miles
            </p>

            <p>
              Elevation: {day.elevation_feet} ft
            </p>

            <p>
              Theme: {day.theme}
            </p>
          </Link>
        ))}
      </div>
    </main>
  )
}