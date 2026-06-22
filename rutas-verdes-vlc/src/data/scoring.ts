import type { RouteResult, RouteSegment, LatLng } from '../types';

interface SensorData {
  lat: number;
  lng: number;
  no2: number;
  pm10: number;
  pm25: number;
}

const AIR_QUALITY_STATIONS: SensorData[] = [
  { lat: 39.470, lng: -0.376, no2: 35, pm10: 22, pm25: 14 },
  { lat: 39.479, lng: -0.377, no2: 42, pm10: 28, pm25: 18 },
  { lat: 39.461, lng: -0.382, no2: 28, pm10: 18, pm25: 10 },
  { lat: 39.468, lng: -0.367, no2: 31, pm10: 20, pm25: 12 },
  { lat: 39.455, lng: -0.363, no2: 25, pm10: 15, pm25: 9 },
  { lat: 39.481, lng: -0.389, no2: 38, pm10: 25, pm25: 16 },
  { lat: 39.474, lng: -0.353, no2: 20, pm10: 12, pm25: 7 },
  { lat: 39.463, lng: -0.397, no2: 30, pm10: 20, pm25: 13 },
  { lat: 39.443, lng: -0.390, no2: 27, pm10: 17, pm25: 11 },
  { lat: 39.490, lng: -0.377, no2: 33, pm10: 22, pm25: 15 },
];

const TREE_ZONES: { center: LatLng; radius: number; density: number }[] = [
  { center: { lat: 39.476, lng: -0.368 }, radius: 800, density: 0.9 },
  { center: { lat: 39.472, lng: -0.365 }, radius: 1200, density: 0.95 },
  { center: { lat: 39.469, lng: -0.360 }, radius: 600, density: 0.85 },
  { center: { lat: 39.466, lng: -0.378 }, radius: 500, density: 0.7 },
  { center: { lat: 39.480, lng: -0.375 }, radius: 400, density: 0.65 },
  { center: { lat: 39.452, lng: -0.365 }, radius: 700, density: 0.88 },
  { center: { lat: 39.462, lng: -0.355 }, radius: 900, density: 0.92 },
  { center: { lat: 39.485, lng: -0.368 }, radius: 500, density: 0.6 },
  { center: { lat: 39.458, lng: -0.378 }, radius: 600, density: 0.75 },
  { center: { lat: 39.475, lng: -0.350 }, radius: 500, density: 0.55 },
];

const BIKE_LANE_SEGMENTS: { start: LatLng; end: LatLng; name: string }[] = [
  {
    start: { lat: 39.473, lng: -0.376 },
    end: { lat: 39.479, lng: -0.370 },
    name: 'Carrer de Colón',
  },
  {
    start: { lat: 39.470, lng: -0.376 },
    end: { lat: 39.466, lng: -0.382 },
    name: 'Gran Via',
  },
  {
    start: { lat: 39.477, lng: -0.377 },
    end: { lat: 39.480, lng: -0.365 },
    name: 'Av. del Port',
  },
  {
    start: { lat: 39.465, lng: -0.375 },
    end: { lat: 39.460, lng: -0.380 },
    name: 'Carrer de Xàtiva',
  },
  {
    start: { lat: 39.467, lng: -0.367 },
    end: { lat: 39.462, lng: -0.362 },
    name: 'Av. Regne de València',
  },
  {
    start: { lat: 39.472, lng: -0.370 },
    end: { lat: 39.474, lng: -0.355 },
    name: 'Pont de l\'Assut de l\'Or',
  },
  {
    start: { lat: 39.480, lng: -0.375 },
    end: { lat: 39.485, lng: -0.380 },
    name: 'Carrer de Sagunt',
  },
  {
    start: { lat: 39.455, lng: -0.370 },
    end: { lat: 39.450, lng: -0.365 },
    name: 'Av. Ausiàs March',
  },
  {
    start: { lat: 39.478, lng: -0.382 },
    end: { lat: 39.476, lng: -0.390 },
    name: 'Carrer de Quart',
  },
];

export function getNearestAirStation(lat: number, lng: number): SensorData {
  let minDist = Infinity;
  let nearest = AIR_QUALITY_STATIONS[0];
  for (const station of AIR_QUALITY_STATIONS) {
    const dist = haversine(lat, lng, station.lat, station.lng);
    if (dist < minDist) {
      minDist = dist;
      nearest = station;
    }
  }
  return nearest;
}

export function getTreeCoverage(lat: number, lng: number): number {
  let maxCoverage = 0;
  for (const zone of TREE_ZONES) {
    const dist = haversine(lat, lng, zone.center.lat, zone.center.lng);
    if (dist < zone.radius) {
      const coverage = zone.density * (1 - dist / zone.radius);
      maxCoverage = Math.max(maxCoverage, coverage);
    }
  }
  return maxCoverage;
}

export function isOnBikeLane(lat: number, lng: number): boolean {
  const threshold = 0.0005;
  for (const seg of BIKE_LANE_SEGMENTS) {
    const dist = pointToSegmentDistance(
      { lat, lng },
      seg.start,
      seg.end
    );
    if (dist < threshold) return true;
  }
  return false;
}

export function scorePoint(lat: number, lng: number): {
  airQuality: number;
  treeCoverage: number;
  hasBikeLane: boolean;
  score: number;
} {
  const station = getNearestAirStation(lat, lng);
  const treeCoverage = getTreeCoverage(lat, lng);
  const hasBikeLane = isOnBikeLane(lat, lng);

  const aqScore = Math.max(0, 100 - (station.no2 * 1.5 + station.pm25 * 1.2));
  const treeScore = treeCoverage * 100;
  const bikeScore = hasBikeLane ? 100 : 0;

  const score = aqScore * 0.35 + treeScore * 0.35 + bikeScore * 0.30;
  const normalizedScore = Math.min(100, Math.max(0, score)) / 100;

  return {
    airQuality: aqScore / 100,
    treeCoverage: treeCoverage,
    hasBikeLane,
    score: normalizedScore,
  };
}

export function scoreRoute(coordinates: [number, number][]): RouteResult {
  const sampleEvery = Math.max(1, Math.floor(coordinates.length / 50));
  const segments: RouteSegment[] = [];

  for (let i = 0; i < coordinates.length - 1; i += sampleEvery) {
    const [lng, lat] = coordinates[i];
    const pts = scorePoint(lat, lng);

    segments.push({
      coordinates: coordinates.slice(i, Math.min(i + sampleEvery + 1, coordinates.length)),
      score: pts.score,
      airQuality: pts.airQuality,
      treeCoverage: pts.treeCoverage,
      hasBikeLane: pts.hasBikeLane,
    });
  }

  const totalScore =
    segments.reduce((sum, s) => sum + s.score, 0) / Math.max(1, segments.length);

  const distance = calculateTotalDistance(coordinates);
  const duration = distance / 83.3;
  const calories = Math.round(distance * 0.05 * 70);
  const co2Saved = Math.round(distance * 0.12);
  const greenCorridor = Math.round(
    (segments.filter((s) => s.treeCoverage > 0.3).length /
      Math.max(1, segments.length)) *
      100
  );

  return {
    segments,
    overallScore: Math.round(totalScore * 100),
    distance: Math.round(distance),
    duration: Math.round(duration),
    calories,
    co2Saved,
    greenCorridor,
  };
}

function calculateTotalDistance(coords: [number, number][]): number {
  let dist = 0;
  for (let i = 1; i < coords.length; i++) {
    const [lng1, lat1] = coords[i - 1];
    const [lng2, lat2] = coords[i];
    dist += haversine(lat1, lng1, lat2, lng2);
  }
  return dist;
}

function haversine(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function pointToSegmentDistance(
  p: LatLng,
  a: LatLng,
  b: LatLng
): number {
  const dx = b.lng - a.lng;
  const dy = b.lat - a.lat;
  if (dx === 0 && dy === 0) return haversine(p.lat, p.lng, a.lat, a.lng);
  const t = Math.max(
    0,
    Math.min(1, ((p.lng - a.lng) * dx + (p.lat - a.lat) * dy) / (dx * dx + dy * dy))
  );
  const proj = { lat: a.lat + t * dy, lng: a.lng + t * dx };
  return haversine(p.lat, p.lng, proj.lat, proj.lng);
}

export function getScoreColor(score: number): string {
  if (score >= 80) return '#10b981';
  if (score >= 60) return '#84cc16';
  if (score >= 40) return '#f59e0b';
  if (score >= 20) return '#f97316';
  return '#ef4444';
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excelente';
  if (score >= 60) return 'Buena';
  if (score >= 40) return 'Moderada';
  if (score >= 20) return 'Regular';
  return 'Deficiente';
}

export function getScoreEmoji(score: number): string {
  if (score >= 80) return '🌿';
  if (score >= 60) return '🍃';
  if (score >= 40) return '🌱';
  if (score >= 20) return '😐';
  return '🏭';
}
