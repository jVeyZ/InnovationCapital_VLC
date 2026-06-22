import type { RouteResult } from '../types';
import { getScoreColor, getScoreLabel, getScoreEmoji } from '../data/scoring';

interface RouteInfoProps {
  route: RouteResult | null;
  hasRoute: boolean;
}

function CircularScore({ score }: { score: number }) {
  const color = getScoreColor(score);
  const circumference = 2 * Math.PI * 38;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-24 h-24 shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50" cy="50" r="38"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="8"
        />
        <circle
          cx="50" cy="50" r="38"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold" style={{ color }}>
          {score}
        </span>
        <span className="text-[10px] text-gray-500">/100</span>
      </div>
    </div>
  );
}

export default function RouteInfo({ route, hasRoute }: RouteInfoProps) {
  if (!route && hasRoute) {
    return (
      <div className="space-y-3">
        <h2 className="text-base font-semibold text-emerald-800">Resultados</h2>
        <div className="text-sm text-gray-400 text-center py-8">
          Selecciona origen y destino para ver los resultados
        </div>
      </div>
    );
  }

  if (!route) return null;

  const healthColor = getScoreColor(route.overallScore);

  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold text-emerald-800 flex items-center gap-2">
        <span>{getScoreEmoji(route.overallScore)}</span>
        Resultados de la ruta
      </h2>

      <div className="flex items-center gap-4 bg-white rounded-xl p-3 border border-gray-100">
        <CircularScore score={route.overallScore} />
        <div>
          <p className="font-semibold text-sm" style={{ color: healthColor }}>
            {getScoreLabel(route.overallScore)}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            Puntuación de salud ambiental
          </p>
          <div className="flex gap-3 mt-2">
            <div className="flex items-center gap-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: healthColor }}
              />
              <span className="text-[10px] text-gray-400">
                {route.greenCorridor}% zonas verdes
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <StatCard
          icon="📏"
          label="Distancia"
          value={`${(route.distance / 1000).toFixed(1)} km`}
        />
        <StatCard
          icon="⏱️"
          label="Tiempo"
          value={`${route.duration} min`}
        />
        <StatCard
          icon="🔥"
          label="Calorías"
          value={`${route.calories} kcal`}
        />
        <StatCard
          icon="🌍"
          label="CO₂ ahorrado"
          value={`${route.co2Saved} g`}
        />
      </div>

      <div className="bg-blue-50 rounded-lg p-3 text-xs text-blue-800">
        <strong>Consejo:</strong> Al caminar o ir en bici por esta ruta, evitas zonas de alta
        contaminación y disfrutas de {route.greenCorridor}% de corredores verdes.
      </div>

      <div className="flex flex-wrap gap-1.5">
        <ColorLegend color="#10b981" label="Excelente (80-100)" />
        <ColorLegend color="#84cc16" label="Buena (60-79)" />
        <ColorLegend color="#f59e0b" label="Moderada (40-59)" />
        <ColorLegend color="#f97316" label="Regular (20-39)" />
        <ColorLegend color="#ef4444" label="Deficiente (0-19)" />
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white rounded-lg p-2 border border-gray-100 text-center">
      <span className="text-lg">{icon}</span>
      <p className="text-sm font-semibold text-gray-800">{value}</p>
      <p className="text-[10px] text-gray-400">{label}</p>
    </div>
  );
}

function ColorLegend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1 bg-white rounded-full px-2 py-0.5 border border-gray-100">
      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-[9px] text-gray-500">{label}</span>
    </div>
  );
}
