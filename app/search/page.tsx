import { searchVenues } from '@/lib/data/search'
import Link from 'next/link'
import VenueCard from '@/components/VenueCard'

interface SearchPageProps {
  searchParams: Promise<{
    q?: string
  }>
}

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const params = await searchParams
  const query = params.q || ''

  const results = query
    ? await searchVenues(query)
    : []

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Search Results
      </h1>

      <p className="mb-6 text-gray-600">
        Searching for: <strong>{query}</strong>
      </p>

      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="space-y-4">
          {results.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      )}
    </main>
  )
}