import type {RouteSegment} from '@/types/database'
interface RouteSegmentsProps {
    segments: RouteSegment[]
}

export default function RouteSegments({ segments }: RouteSegmentsProps) {
    return (
        <section>
           
            <div className="space-y-3">
                {segments.map((segment) => (
                    <div
                        key={segment.id}
                        className="border rounded-lg p-3"
                    >
                        <p>
                            <strong>
                                Mile {segment.cumulative_mile}
                            </strong>
                        </p>

                        {segment.instruction && (
                            <p>{segment.instruction}</p>
                        )}

                        {segment.warning && (
                            <p className="text-red-600 font-semibold mt-2">
                                ⚠ {segment.warning}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}
