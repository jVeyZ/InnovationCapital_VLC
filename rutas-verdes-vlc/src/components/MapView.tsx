import { useEffect, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { LatLng, RouteSegment } from '../types';
import { getScoreColor } from '../data/scoring';

delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapViewProps {
  origin: LatLng | null;
  destination: LatLng | null;
  coordinates: [number, number][] | null;
  segments: RouteSegment[] | null;
  onMapClick: (coords: LatLng, isOrigin: boolean) => void;
  settingOrigin: boolean;
}

function FitBounds({
  coordinates,
  origin,
  destination,
}: {
  coordinates: [number, number][] | null;
  origin: LatLng | null;
  destination: LatLng | null;
}) {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds([]);
    if (origin) bounds.extend([origin.lat, origin.lng]);
    if (destination) bounds.extend([destination.lat, destination.lng]);
    if (coordinates) {
      for (const [lng, lat] of coordinates) {
        bounds.extend([lat, lng]);
      }
    }
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 16 });
    }
  }, [map, coordinates, origin, destination]);

  return null;
}

function MapClickHandler({
  settingOrigin,
  onMapClick,
}: {
  settingOrigin: boolean;
  onMapClick: (coords: LatLng, isOrigin: boolean) => void;
}) {
  const map = useMap();

  const handleClick = useCallback(
    (e: L.LeafletMouseEvent) => {
      onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng }, settingOrigin);
    },
    [onMapClick, settingOrigin]
  );

  useEffect(() => {
    map.on('click', handleClick);
    return () => {
      map.off('click', handleClick);
    };
  }, [map, handleClick]);

  useEffect(() => {
    const el = map.getContainer();
    el.style.cursor = settingOrigin ? 'cell' : 'crosshair';
  }, [map, settingOrigin]);

  return null;
}

export default function MapView({
  origin,
  destination,
  coordinates,
  segments,
  onMapClick,
  settingOrigin,
}: MapViewProps) {
  const coloredSegments = useMemo(
    () =>
      segments?.map((seg, i) => ({
        key: i,
        positions: seg.coordinates.map(([lng, lat]) => [lat, lng] as [number, number]),
        color: getScoreColor(seg.score * 100),
        weight: 5,
        opacity: 0.8,
      })) ?? [],
    [segments]
  );

  return (
    <MapContainer
      center={[39.46975, -0.37739]}
      zoom={14}
      className="w-full h-full rounded-lg"
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapClickHandler settingOrigin={settingOrigin} onMapClick={onMapClick} />

      {origin && (
        <Marker position={[origin.lat, origin.lng]} icon={greenIcon}>
        </Marker>
      )}
      {destination && (
        <Marker position={[destination.lat, destination.lng]} icon={redIcon}>
        </Marker>
      )}

      {coloredSegments.map((seg) => (
        <Polyline
          key={seg.key}
          positions={seg.positions}
          pathOptions={{
            color: seg.color,
            weight: seg.weight,
            opacity: seg.opacity,
          }}
        />
      ))}

      <FitBounds
        coordinates={coordinates}
        origin={origin}
        destination={destination}
      />
    </MapContainer>
  );
}
