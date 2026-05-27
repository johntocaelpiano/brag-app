export interface Venue {
  id: number
  name: string
  address: string
  city: string
  state: string
  latitude: number | null
  longitude: number | null
  venue_type: string | null
}

export interface RestStop {
  id: number
  mile_marker: number
  open_time: string
  close_time: string
  venues: Venue | null
}

export interface RouteSegment {
  id: number
  cumulative_mile: number
  instruction: string | null
  warning: string | null
}

export interface Day {
    id: number
    day_number: number
    host_city: string | null
    distance_miles: number | null
    elevation_feet: number | null
    theme: string | null
    label: string | null
}

export interface DayNavigation {
    id: number
    day_number: number
    label: string | null
}   

export interface Route {
    id: number
    day_id: number
    name: string | null
    total_distance: number | null
    total_elevation: number | null
    start_venue_id?: number | null
    finish_venue_id?: number | null
}

export interface Recommendation {
    id: number
    recommendation_type: string
    venues: Venue | null
}

export interface BragBar {
    id: number
    day_id: number
    open: boolean
    location: string
}

export interface CampAmenities {
    id: number
    day_id: number
    city: string 
    amenity: string 
    location: string
}