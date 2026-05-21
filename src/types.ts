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
}

export interface ScoredPlace extends Place {
  score: number;
}