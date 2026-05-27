import Link from 'next/link'
import {
  getVenueById,
  getDaysForVenue,
} from '@/lib/data/venues'
import type { DayNavigation } from '@/types/database'

interface VenuePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function VenuePage({
  params,
}: VenuePageProps) {
  const { id } = await params

  const venue = await getVenueById(id)
  const relatedDays: DayNavigation[] = await getDaysForVenue(id)

  if (!venue) {
    return (
      <main className="p-6">
        <h1>Venue Not Found</h1>
      </main>
    )
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="
        border
        rounded-2xl
        p-6
        bg-white
      ">
        <h1 className="text-4xl font-bold mb-2">
          {venue.name}
        </h1>

        <p className="text-lg text-gray-600 mb-4">
          {venue.city}, {venue.state}
        </p>

        <div className="space-y-2">
          <p>
            <strong>Address:</strong>{' '}
            {venue.address}
          </p>

          <p>
            <strong>Venue Type:</strong>{' '}
            {venue.venue_type}
          </p>

          <p>
            <a
        href={`https://maps.google.com/?q=${venue.latitude},${venue.longitude}`}
        target="_blank"
      >
        Open in Maps
      </a>
          </p>
        </div>
      </div>

      <section className="mt-8">
  <h2 className="text-2xl font-semibold mb-4">
    Appears On
  </h2>

  {relatedDays.length === 0 ? (
    <p>This venue is not associated with any routes.</p>
  ) : (
    <div className="space-y-2">
      {relatedDays.map((day) => (
        <Link
          key={day.id}
          href={`/day/${day.id}`}
          className="
            block
            border
            rounded-lg
            p-3
            hover:bg-gray-50
          "
        >
          {day.label}
        </Link>
      ))}
    </div>
  )}
</section>
    </main>
  )
}