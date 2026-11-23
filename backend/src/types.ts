export interface OpeningHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

export interface Place {
  id: number;
  name: string;
  category: string;
  latitude: number | string;
  longitude: number | string;
  rating: number | string;
  avg_visit_duration: number;
  city: string;
  country: string;
  opening_hours?: OpeningHours;
}

export interface ScoredPlace extends Place {
  score: number;
}