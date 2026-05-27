import {Day} from '@/types/database'

interface DayHeaderProps {
    day: Day
}

export default function DayHeader({ day }: DayHeaderProps) {
    return (
        <header className="mb-6">
            <h1 className="text-4xl font-bold mb-2">
                {day.label}
            </h1>
            <p className="text-xl">
                Host City: {day.host_city} | Distance: {day.distance_miles} miles | Elevation: {day.elevation_feet} ft | Theme: {day.theme}
            </p>
        </header>
    )
}
