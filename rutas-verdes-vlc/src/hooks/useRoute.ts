import { useState, useCallback } from 'react';
import type { LatLng, RouteResult } from '../types';
import { getRoute, type RouteOptions } from '../data/routing';

interface RouteState {
  origin: LatLng | null;
  destination: LatLng | null;
  route: RouteResult | null;
  coordinates: [number, number][] | null;
  loading: boolean;
  error: string | null;
}

export function useRoute() {
  const [state, setState] = useState<RouteState>({
    origin: null,
    destination: null,
    route: null,
    coordinates: null,
    loading: false,
    error: null,
  });

  const setOrigin = useCallback((point: LatLng | null) => {
    setState((s) => ({ ...s, origin: point, route: null, coordinates: null, error: null }));
  }, []);

  const setDestination = useCallback((point: LatLng | null) => {
    setState((s) => ({ ...s, destination: point, route: null, coordinates: null, error: null }));
  }, []);

  const calculateRoute = useCallback(
    async (options: RouteOptions = {}) => {
      const { origin, destination } = state;
      if (!origin || !destination) return;

      setState((s) => ({ ...s, loading: true, error: null }));

      const result = await getRoute(origin, destination, options);

      if (!result) {
        setState((s) => ({
          ...s,
          loading: false,
          error: 'No se pudo calcular la ruta. Intenta con otras ubicaciones.',
        }));
        return;
      }

      setState((s) => ({
        ...s,
        loading: false,
        route: result.score,
        coordinates: result.coordinates,
      }));
    },
    [state.origin, state.destination]
  );

  return {
    ...state,
    setOrigin,
    setDestination,
    calculateRoute,
  };
}
