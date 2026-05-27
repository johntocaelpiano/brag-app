import Link from 'next/link'
import type {DayNavigation as DayNavigationType} from '@/types/database'

interface DayNavigationProps {
    previousDay: DayNavigationType | null
    nextDay: DayNavigationType | null
}

export default function DayNavigation({
    previousDay,
    nextDay 
}: DayNavigationProps) {
    return (
        <nav className="flex flex-col sm:flex-row gap-4 sm:justify-between my-6">
            {previousDay && (
                <Link href={`/day/${previousDay.id}`} prefetch={false} className="btn btn-outline">
                    Previous Day
                </Link>
            )}
            {nextDay && (
                <Link href={`/day/${nextDay.id}`} prefetch={false} className="btn btn-outline">
                    Next Day
                </Link>
            )}
        </nav>
    )
}