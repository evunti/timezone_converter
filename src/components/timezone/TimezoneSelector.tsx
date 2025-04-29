import { formatInTimeZone } from "date-fns-tz";
import { TimezoneMarker } from "../map/timezone-markers";

interface TimezoneSelectorProps {
  label: "From" | "To";
  timezone: string;
  timestamp: Date;
  isSelected: boolean;
  onClick: () => void;
  markers: TimezoneMarker[];
}

export function TimezoneSelector({
  label,
  timezone,
  timestamp,
  isSelected,
  onClick,
  markers,
}: TimezoneSelectorProps) {
  const marker = markers.find((m) => m.name === timezone);

  return (
    <button
      onClick={onClick}
      className={`p-4 rounded w-full text-left ${
        isSelected ? "bg-indigo-50 ring-2 ring-indigo-500" : "bg-gray-50"
      }`}
    >
      <h3 className="font-medium mb-2">
        {label}: {marker?.label || timezone}
      </h3>
      <p className="text-lg">
        {formatInTimeZone(timestamp, timezone, "HH:mm:ss zzz")}
      </p>
      <p className="text-sm text-gray-600">
        {formatInTimeZone(timestamp, timezone, "h:mm:ss a")}
      </p>
    </button>
  );
}
