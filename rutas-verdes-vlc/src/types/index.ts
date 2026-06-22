export interface LatLng {
  lat: number;
  lng: number;
}

export interface RouteSegment {
  coordinates: [number, number][];
  score: number;
  airQuality: number;
  treeCoverage: number;
  hasBikeLane: boolean;
}

export interface RouteResult {
  segments: RouteSegment[];
  overallScore: number;
  distance: number;
  duration: number;
  calories: number;
  co2Saved: number;
  greenCorridor: number;
}

export interface PlaceResult {
  name: string;
  lat: number;
  lng: number;
  type: 'address' | 'poi' | 'neighborhood';
}

export interface CKANDataset {
  id: string;
  name: string;
  title: string;
  notes: string;
  resources: CKANResource[];
}

export interface CKANResource {
  id: string;
  name: string;
  format: string;
  url: string;
}
