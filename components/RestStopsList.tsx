import type { RestStop } from '@/types/database'
import Link from 'next/link'

interface RestStopsListProps {
    restStops: RestStop[] | null
}

export default function RestStopsList({
    restStops
}: RestStopsListProps) {
    if (!restStops || restStops.length === 0) {
        return null
    }

    return (
        <section className="mb-10">
            
            <div className="space-y-4">
                {restStops.map((stop) => {
                    const venue = Array.isArray(stop.venues)
                        ? stop.venues[0]
                        : stop.venues

                    return (
                        <div
                            key={stop.id}
                            className="border rounded-xl p-4"
                        >
                            <p className="font-semibold">
                                <Link
                                    href={`/venues/${venue?.id}`}
                                    className="hover:text-blue-600 hover:underline"
                                >
                                    {venue?.name}
                                </Link>
                            </p>

                            <p className="text-sm text-gray-600">
                                {venue?.address}
                            </p>
                            <p className="text-sm text-gray-500">
                                {venue?.city}, {venue?.state}
                            </p>
                            <p>
                                Mile {stop.mile_marker}
                            </p>
                            <p>
                                {stop.open_time} - {stop.close_time}
                            </p>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}