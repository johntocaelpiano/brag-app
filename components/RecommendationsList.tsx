import type { Recommendation } from '@/types/database'
import Link from 'next/link'
import VenueCard from './VenueCard'

interface RecommendationsListProps {
    recommendations: Recommendation[] | null
}

export default function RecommendationsList({
    recommendations,
}: RecommendationsListProps) {

    if (
        !recommendations || 
        recommendations.length === 0
    ) {
        return null
    }

    const validRecommendations = recommendations.filter(
        (recommendation): recommendation is Recommendation & { venues: NonNullable<Recommendation['venues']> } =>
            recommendation.venues !== null
    )

    return (
        <section className="mb-8">
            
            <div className="space-y-4">
                {validRecommendations.map((recommendation) => (
                    <VenueCard
                        key={recommendation.id}
                        venue={recommendation.venues}
                    />
                ))}
            </div>
        </section>
    )
}
