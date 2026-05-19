export interface Hotel {
  id: number
  name: string
  city: string
  description: string
  shortDescription: string
  rating: number
  reviewCount: number
  pricePerNight: number
  images: string[]
  services: string[]
  languages: string[]
  address: string
  coordinates: { lat: number; lng: number }
  category: string
}
