import type { Route } from '@/types/database'

interface RouteInfoProps {
  route: Route
}

export default function RouteInfo({ 
    route,
 }: RouteInfoProps) {
    return (
        <section className="mb-10">
            

            <div className="border rounded-xl p-4">
                <p>
                    <strong>Name:</strong>{' '}
                    {route?.name}
                </p>

                <p>
                    <strong>Total Distance:</strong>{' '}
                    {route?.total_distance} miles
                </p>

                <p>
                    <strong>Total Elevation:</strong>{' '}
                    {route?.total_elevation} ft
                </p>
            </div>
        </section>
    )
}