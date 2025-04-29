import { useTimezoneConverter } from "../../hooks/useTimezoneConverter";
import { TimezoneMap } from "../map/TimezoneMap";
import { TimezoneSelector } from "./TimezoneSelector";
import { RecentConversions } from "./RecentConversions";
import {
  USA_TIMEZONE_MARKERS,
  WORLD_TIMEZONE_MARKERS,
} from "../map/timezone-markers";

export function TimezoneConverter() {
  const {
    fromTimezone,
    toTimezone,
    timestamp,
    showUSAOnly,
    selectionMode,
    errorMessage,
    recentConversions,
    setShowUSAOnly,
    setSelectionMode,
    handleConvert,
    handleMarkerClick,
    flipTimezones,
    clearRecentConversions,
  } = useTimezoneConverter();

  const markers = showUSAOnly ? USA_TIMEZONE_MARKERS : WORLD_TIMEZONE_MARKERS;

  return (
    <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-2">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            onClick={() => setShowUSAOnly(false)}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              !showUSAOnly
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-900 hover:bg-gray-50"
            } border border-gray-200`}
          >
            World
          </button>
          <button
            onClick={() => setShowUSAOnly(true)}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              showUSAOnly
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-900 hover:bg-gray-50"
            } border border-gray-200`}
          >
            USA
          </button>
        </div>
      </div>

      <TimezoneMap
        showUSAOnly={showUSAOnly}
        onMarkerClick={handleMarkerClick}
      />

      <div className="grid grid-cols-2 gap-4 mt-4">
        <TimezoneSelector
          label="From"
          timezone={fromTimezone}
          timestamp={timestamp}
          isSelected={selectionMode === "from"}
          onClick={() => setSelectionMode("from")}
          markers={markers}
        />
        <TimezoneSelector
          label="To"
          timezone={toTimezone}
          timestamp={timestamp}
          isSelected={selectionMode === "to"}
          onClick={() => setSelectionMode("to")}
          markers={markers}
        />
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={flipTimezones}
          className="text-sm bg-gray-300 text-gray-700 py-1 px-2 rounded hover:bg-gray-400"
        >
          Flip Timezones
        </button>
      </div>

      {errorMessage && (
        <div className="text-red-500 text-sm text-center mt-2">
          {errorMessage}
        </div>
      )}

      <button
        onClick={handleConvert}
        className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
      >
        Save Conversion
      </button>

      <RecentConversions
        conversions={recentConversions}
        markers={markers}
        onClearAll={clearRecentConversions}
      />
    </div>
  );
}
