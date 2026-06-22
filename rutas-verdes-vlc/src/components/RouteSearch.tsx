import { useState, useCallback, useRef, useEffect, type KeyboardEvent } from 'react';
import type { LatLng } from '../types';
import { geocodeSearch } from '../data/routing';

interface RouteSearchProps {
  onSelectOrigin: (point: LatLng) => void;
  onSelectDestination: (point: LatLng) => void;
  onCalculateRoute: () => void;
  onCalculateGreenRoute: () => void;
  origin: LatLng | null;
  destination: LatLng | null;
  loading: boolean;
  error: string | null;
}

interface Suggestion {
  name: string;
  lat: number;
  lng: number;
}

export default function RouteSearch({
  onSelectOrigin,
  onSelectDestination,
  onCalculateRoute,
  onCalculateGreenRoute,
  origin,
  destination,
  loading,
  error,
}: RouteSearchProps) {
  const [originText, setOriginText] = useState('');
  const [destText, setDestText] = useState('');
  const [activeField, setActiveField] = useState<'origin' | 'dest' | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [searching, setSearching] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const doSearch = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    setSearching(true);
    const results = await geocodeSearch(query);
    setSuggestions(results);
    setSearching(false);
  }, []);

  const handleInput = useCallback(
    (value: string, field: 'origin' | 'dest') => {
      if (field === 'origin') setOriginText(value);
      else setDestText(value);
      setActiveField(field);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => doSearch(value), 300);
    },
    [doSearch]
  );

  const handleSelect = useCallback(
    (sug: Suggestion) => {
      const point: LatLng = { lat: sug.lat, lng: sug.lng };
      if (activeField === 'origin') {
        setOriginText(sug.name);
        onSelectOrigin(point);
      } else if (activeField === 'dest') {
        setDestText(sug.name);
        onSelectDestination(point);
      }
      setSuggestions([]);
      setActiveField(null);
    },
    [activeField, onSelectOrigin, onSelectDestination]
  );

  const handleKeyDown = (e: KeyboardEvent, _isOrigin: boolean) => {
    if (e.key === 'Enter') {
      if (suggestions.length > 0 && activeField) {
        handleSelect(suggestions[0]);
      }
    }
    if (e.key === 'Escape') {
      setSuggestions([]);
      (e.target as HTMLInputElement).blur();
    }
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const canCalculate = origin && destination && !loading;

  return (
    <div ref={containerRef} className="space-y-3">
      <h2 className="text-base font-semibold text-emerald-800 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Planifica tu ruta
      </h2>

      <div className="relative">
        <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200 focus-within:ring-2 focus-within:ring-emerald-400">
          <div className="w-4 h-4 rounded-full bg-green-500 shrink-0" />
          <input
            type="text"
            placeholder="Punto de origen..."
            value={originText}
            onChange={(e) => handleInput(e.target.value, 'origin')}
            onFocus={() => { setActiveField('origin'); if (originText) doSearch(originText); }}
            onKeyDown={(e) => handleKeyDown(e, true)}
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      <div className="relative">
        <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200 focus-within:ring-2 focus-within:ring-emerald-400">
          <div className="w-4 h-4 rounded-full bg-red-500 shrink-0" />
          <input
            type="text"
            placeholder="Punto de destino..."
            value={destText}
            onChange={(e) => handleInput(e.target.value, 'dest')}
            onFocus={() => { setActiveField('dest'); if (destText) doSearch(destText); }}
            onKeyDown={(e) => handleKeyDown(e, false)}
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {suggestions.length > 0 && (
        <ul className="bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto absolute z-50" style={{ width: 'calc(100% - 2rem)' }}>
          {suggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => handleSelect(s)}
              className="px-3 py-2 text-sm text-gray-700 hover:bg-emerald-50 cursor-pointer border-b border-gray-100 last:border-0"
            >
              {s.name}
            </li>
          ))}
        </ul>
      )}

      {searching && (
        <p className="text-xs text-gray-400">Buscando direcciones...</p>
      )}

      <p className="text-xs text-gray-400">
        Haz clic en el mapa para seleccionar origen (primer clic) y destino (segundo clic)
      </p>

      <div className="flex gap-2">
        <button
          onClick={onCalculateRoute}
          disabled={!canCalculate}
          className="flex-1 py-2.5 bg-emerald-600 text-white rounded-lg font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>🌿</span> Ruta más saludable
            </>
          )}
        </button>
        <button
          onClick={onCalculateGreenRoute}
          disabled={!canCalculate}
          className="py-2.5 px-4 bg-green-50 text-emerald-700 rounded-lg font-medium text-sm border border-emerald-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-100 transition-colors"
          title="Ruta que prioriza zonas verdes"
        >
          🍃 Eco
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 rounded-lg p-2">{error}</p>
      )}
    </div>
  );
}
