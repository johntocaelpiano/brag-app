import Link from 'next/link'
import type { Venue } from '@/types/database'

interface VenueCardProps {
  venue: Venue
}

export default function VenueCard({
  venue,
}: VenueCardProps) {
  return (
    <div className="
      border
      rounded-xl
      p-4
      bg-white
      space-y-2
    ">
      <Link
        href={`/venues/${venue.id}`}
        className="
          text-xl
          font-semibold
          hover:text-blue-600
          hover:underline
        "
      >
        {venue.name}
      </Link>

      <p>
        {venue.address}
      </p>

      <p className="text-gray-600">
        {venue.city}, {venue.state}
      </p>

      <p className="text-sm text-gray-500">
        {venue.venue_type}
      </p>

      
    </div>
  )
}