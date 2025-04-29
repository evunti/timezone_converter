import { formatInTimeZone } from "date-fns-tz";
import { TimezoneMarker } from "../map/timezone-markers";

interface RecentConversion {
  fromTimezone: string;
  toTimezone: string;
  timestamp: number;
}

interface RecentConversionsProps {
  conversions: RecentConversion[];
  markers: TimezoneMarker[];
  onClearAll: () => void;
}

export function RecentConversions({
  conversions,
  markers,
  onClearAll,
}: RecentConversionsProps) {
  if (conversions.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h3 className="font-medium mb-2">Recent Conversions:</h3>
      <button
        onClick={onClearAll}
        className="bg-red-500 text-white px-4 py-2 rounded mb-4 hover:bg-red-600"
      >
        Clear All Conversions
      </button>
      <div className="space-y-2">
        {conversions.map((conv, index) => (
          <div
            key={`${conv.fromTimezone}-${conv.toTimezone}-${conv.timestamp}`}
            className="p-4 rounded w-full text-left bg-gray-50"
          >
            <h3 className="font-medium mb-2">
              From:{" "}
              {markers.find((m) => m.name === conv.fromTimezone)?.label ||
                conv.fromTimezone}
            </h3>
            <p className="text-lg">
              {formatInTimeZone(
                new Date(conv.timestamp),
                conv.fromTimezone,
                "HH:mm:ss zzz"
              )}
            </p>
            <p className="text-sm text-gray-600">
              {formatInTimeZone(
                new Date(conv.timestamp),
                conv.fromTimezone,
                "h:mm:ss a"
              )}
            </p>
            <h3 className="font-medium mb-2 mt-4">
              To:{" "}
              {markers.find((m) => m.name === conv.toTimezone)?.label ||
                conv.toTimezone}
            </h3>
            <p className="text-lg">
              {formatInTimeZone(
                new Date(conv.timestamp),
                conv.toTimezone,
                "HH:mm:ss zzz"
              )}
            </p>
            <p className="text-sm text-gray-600">
              {formatInTimeZone(
                new Date(conv.timestamp),
                conv.toTimezone,
                "h:mm:ss a"
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
