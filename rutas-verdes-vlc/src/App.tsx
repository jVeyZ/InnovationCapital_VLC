import { useState, useCallback } from 'react';
import MapView from './components/MapView';
import RouteSearch from './components/RouteSearch';
import RouteInfo from './components/RouteInfo';
import { useRoute } from './hooks/useRoute';
import type { LatLng } from './types';

export default function App() {
  const routeState = useRoute();
  const [clickCount, setClickCount] = useState(0);

  const handleMapClick = useCallback(
    (coords: LatLng, isOrigin: boolean) => {
      if (isOrigin) {
        routeState.setOrigin(coords);
        setClickCount(1);
      } else {
        routeState.setDestination(coords);
        setClickCount(0);
      }
    },
    [routeState]
  );

  const handleCalculateGreen = useCallback(() => {
    routeState.calculateRoute({ preferGreen: true });
  }, [routeState]);

  const settingOrigin = clickCount === 0 || !routeState.origin;

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-emerald-50 to-white">
      <header className="bg-white/80 backdrop-blur border-b border-emerald-100 px-4 py-3 shrink-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌿</span>
            <div>
              <h1 className="text-lg font-bold text-emerald-800 leading-tight">
                Rutas Verdes VLC
              </h1>
              <p className="text-xs text-emerald-600">
                Movilidad Saludable en Valencia
              </p>
            </div>
          </div>
          <a
            href="https://opendata.vlci.valencia.es"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-gray-400 hover:text-emerald-600 transition-colors hidden sm:block"
          >
            Datos abiertos Valencia
          </a>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        <aside className="w-80 shrink-0 bg-white/60 backdrop-blur border-r border-emerald-50 overflow-y-auto p-3 space-y-4 hidden md:block">
          <RouteSearch
            onSelectOrigin={routeState.setOrigin}
            onSelectDestination={routeState.setDestination}
            onCalculateRoute={() => routeState.calculateRoute()}
            onCalculateGreenRoute={handleCalculateGreen}
            origin={routeState.origin}
            destination={routeState.destination}
            loading={routeState.loading}
            error={routeState.error}
          />
          <RouteInfo route={routeState.route} hasRoute={!!routeState.origin && !!routeState.destination} />
        </aside>

        <section className="flex-1 relative">
          <MapView
            origin={routeState.origin}
            destination={routeState.destination}
            coordinates={routeState.coordinates}
            segments={routeState.route?.segments ?? null}
            onMapClick={handleMapClick}
            settingOrigin={settingOrigin}
          />
          {!routeState.origin && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur rounded-full px-4 py-2 shadow-lg border border-emerald-200 z-[1000]">
              <p className="text-sm text-emerald-700 font-medium">
                Haz clic en el mapa para marcar el <strong>origen</strong>
              </p>
            </div>
          )}
          {routeState.origin && !routeState.destination && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur rounded-full px-4 py-2 shadow-lg border border-red-200 z-[1000]">
              <p className="text-sm text-red-600 font-medium">
                Ahora marca el <strong>destino</strong>
              </p>
            </div>
          )}
        </section>
      </main>

      <div className="md:hidden bg-white border-t border-gray-200 p-3 overflow-y-auto max-h-48 space-y-2">
        <RouteSearch
          onSelectOrigin={routeState.setOrigin}
          onSelectDestination={routeState.setDestination}
          onCalculateRoute={() => routeState.calculateRoute()}
          onCalculateGreenRoute={handleCalculateGreen}
          origin={routeState.origin}
          destination={routeState.destination}
          loading={routeState.loading}
          error={routeState.error}
        />
        {routeState.route && <RouteInfo route={routeState.route} hasRoute={false} />}
      </div>

      <footer className="bg-white/60 border-t border-emerald-50 px-4 py-1.5 shrink-0 hidden md:block">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-[10px] text-gray-400">
          <span>
            Usando datos abiertos del Ayuntamiento de Valencia · OpenStreetMap · OpenRouteService
          </span>
          <span>
            Candidatura Premios Innovación Valencia 2026 · A.6 UrbanTech
          </span>
        </div>
      </footer>
    </div>
  );
}
