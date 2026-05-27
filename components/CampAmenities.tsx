import type {CampAmenities} from '@/types/database'

interface CampAmenitiesProps {
    amenities: CampAmenities[]
}

export default function CampAmenitiesInfo({ 
    amenities,
}: CampAmenitiesProps) {
    if (amenities.length === 0) return (
        <p className="text-gray-500">
            No camp amenities information available for this day.
        </p>
    )

    return (
        <section className="
            rounded-xl
            border
            p-4
            bg-white
            ">              
               <div className="space-y-2">
                    {amenities.map((item) => (
                        <div
                            key={item.id}
                            className="border-b pb-2 last:border-b-0"
                        >
                            <p>
                                <strong>{item.amenity}:</strong>
                            </p>
                            <p>{item.location}</p>
                        </div>
                    ))}
               </div>

            </section>
        )
}