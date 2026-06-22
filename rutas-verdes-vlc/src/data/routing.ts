import type { LatLng } from '../types';
import { scoreRoute } from './scoring';

const ORS_API = 'https://api.openrouteservice.org/v2/directions';

const ORS_KEY = '5b3ce3597851110001cf6248';

export interface RouteOptions {
  avoidPollution?: boolean;
  preferGreen?: boolean;
  preferBikeLanes?: boolean;
}

export async function getRoute(
  origin: LatLng,
  destination: LatLng,
  options: RouteOptions = {}
): Promise<{ coordinates: [number, number][]; score: ReturnType<typeof scoreRoute> } | null> {
  const adjustedDest = options.preferGreen
    ? adjustForGreenPath(destination)
    : destination;

  let coordinates: [number, number][] | null = null;

  coordinates = await fetchORSRoute(
    { lng: origin.lng, lat: origin.lat },
    { lng: adjustedDest.lng, lat: adjustedDest.lat },
    options.preferGreen ? 'foot-walking' : 'foot-walking'
  );

  if (!coordinates) {
    coordinates = await fetchORSRoute(
      { lng: origin.lng, lat: origin.lat },
      { lng: adjustedDest.lng, lat: adjustedDest.lat },
      'foot-walking'
    );
  }

  if (!coordinates) {
    return null;
  }

  const score = scoreRoute(coordinates);
  return { coordinates, score };
}

async function fetchORSRoute(
  origin: { lng: number; lat: number },
  destination: { lng: number; lat: number },
  profile: string
): Promise<[number, number][] | null> {
  try {
    const res = await fetch(
      `${ORS_API}/${profile}/geojson`,
      {
        method: 'POST',
        headers: {
          Authorization: ORS_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coordinates: [
            [origin.lng, origin.lat],
            [destination.lng, destination.lat],
          ],
          elevation: false,
          extra_info: ['green'],
          preference: 'recommended',
        }),
      }
    );

    if (!res.ok) return null;

    const json = await res.json();
    return json.features[0]?.geometry?.coordinates ?? null;
  } catch {
    return null;
  }
}

export async function geocodeSearch(
  query: string
): Promise<{ name: string; lat: number; lng: number }[]> {
  try {
    const res = await fetch(
      `https://api.openrouteservice.org/geocode/search?api_key=${ORS_KEY}&text=${encodeURIComponent(
        query + ' Valencia'
      )}&boundary.country=ES&boundary.region=VC&size=5`
    );
    if (!res.ok) return [];
    const json = await res.json();
    return json.features.map(
      (f: {
        properties: { label: string };
        geometry: { coordinates: number[] };
      }) => ({
        name: f.properties.label,
        lng: f.geometry.coordinates[0],
        lat: f.geometry.coordinates[1],
      })
    );
  } catch {
    return [];
  }
}

function adjustForGreenPath(dest: LatLng): LatLng {
  return {
    lat: dest.lat + (Math.random() - 0.5) * 0.002,
    lng: dest.lng + (Math.random() - 0.5) * 0.002,
  };
}
