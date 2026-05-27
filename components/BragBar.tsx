import type { BragBar } from '@/types/database'

interface BragBarInfoProps {
    bragBar: BragBar | null
}

export default function BragBarInfo({ 
    bragBar,
}: BragBarInfoProps) {
    if (!bragBar) return (
        <p className="text-gray-500">
            No BRAG Bar information available for this day.
        </p>
    )

    return (
        <section className="
            rounded-xl
            border
            p-4
            bg-white
            ">
                <h2 className="
                    text-xl
                    font-semibold
                    mb-2
                    ">
                    BRAG Bar
                </h2>

                {bragBar.open ? (
                    <div className="space-y-2">
                        <p className="text-green-600 font-medium">
                            Open Today
                        </p>

                        <p>
                            <strong>Location:</strong>{' '}
                            {bragBar.location}
                        </p>
                    </div>
                ) : (
                    <p className="text-gray-500">
                        Closed Today
                    </p>
                )}
        </section>    
    )
}