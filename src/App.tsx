import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster, toast } from "sonner";
import { useState, useEffect } from "react";
import { formatInTimeZone } from "date-fns-tz";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const USA_TIMEZONE_MARKERS = [
  {
    name: "America/New_York",
    lat: 40.7128,
    lng: -74.006,
    label: "New York (ET)",
  },
  {
    name: "America/Chicago",
    lat: 41.8781,
    lng: -87.6298,
    label: "Chicago (CT)",
  },
  {
    name: "America/Denver",
    lat: 39.7392,
    lng: -104.9903,
    label: "Denver (MT)",
  },
  {
    name: "America/Los_Angeles",
    lat: 34.0522,
    lng: -118.2437,
    label: "Los Angeles (PT)",
  },
  {
    name: "America/Anchorage",
    lat: 61.2181,
    lng: -149.9003,
    label: "Anchorage (AT)",
  },
  {
    name: "Pacific/Honolulu",
    lat: 21.3069,
    lng: -157.8583,
    label: "Honolulu (HT)",
  },
];

const WORLD_TIMEZONE_MARKERS = [
  { name: "UTC", lat: 51.4778, lng: -0.0014, label: "UTC (GMT)" },
  // Americas
  { name: "America/New_York", lat: 40.7128, lng: -74.006, label: "New York" },
  {
    name: "America/Los_Angeles",
    lat: 34.0522,
    lng: -118.2437,
    label: "Los Angeles",
  },
  { name: "America/Chicago", lat: 41.8781, lng: -87.6298, label: "Chicago" },
  { name: "America/Toronto", lat: 43.6532, lng: -79.3832, label: "Toronto" },
  {
    name: "America/Mexico_City",
    lat: 19.4326,
    lng: -99.1332,
    label: "Mexico City",
  },
  {
    name: "America/Sao_Paulo",
    lat: -23.5505,
    lng: -46.6333,
    label: "São Paulo",
  },
  {
    name: "America/Buenos_Aires",
    lat: -34.6037,
    lng: -58.3816,
    label: "Buenos Aires",
  },
  {
    name: "America/Toronto",
    lat: 43.65107,
    lng: -79.347015,
    label: "Toronto (ET)"
  },
  {
    name: "America/Winnipeg",
    lat: 49.8951,
    lng: -97.1384,
    label: "Winnipeg (CT)"
  },
  {
    name: "America/Edmonton",
    lat: 53.5461,
    lng: -113.4938,
    label: "Edmonton (MT)"
  },
  {
    name: "America/Vancouver",
    lat: 49.2827,
    lng: -123.1207,
    label: "Vancouver (PT)"
  },
  {
    name: "America/St_Johns",
    lat: 47.5615,
    lng: -52.7126,
    label: "St. John's (NT)"
  },
  // Europe
  { name: "Europe/London", lat: 51.5074, lng: -0.1278, label: "London" },
  { name: "Europe/Paris", lat: 48.8566, lng: 2.3522, label: "Paris" },
  { name: "Europe/Berlin", lat: 52.52, lng: 13.405, label: "Berlin" },
  { name: "Europe/Rome", lat: 41.9028, lng: 12.4964, label: "Rome" },
  { name: "Europe/Madrid", lat: 40.4168, lng: -3.7038, label: "Madrid" },
  { name: "Europe/Moscow", lat: 55.7558, lng: 37.6173, label: "Moscow" },
  // Asia & Oceania
  { name: "Asia/Dubai", lat: 25.2048, lng: 55.2708, label: "Dubai" },
  { name: "Asia/Mumbai", lat: 19.076, lng: 72.8777, label: "Mumbai" },
  { name: "Asia/Shanghai", lat: 31.2304, lng: 121.4737, label: "Shanghai" },
  { name: "Asia/Tokyo", lat: 35.6762, lng: 139.6503, label: "Tokyo" },
  { name: "Asia/Seoul", lat: 37.5665, lng: 126.978, label: "Seoul" },
  { name: "Asia/Singapore", lat: 1.3521, lng: 103.8198, label: "Singapore" },
  { name: "Asia/Hong_Kong", lat: 22.3193, lng: 114.1694, label: "Hong Kong" },
  { name: "Australia/Sydney", lat: -33.8688, lng: 151.2093, label: "Sydney" },
  {
    name: "Australia/Melbourne",
    lat: -37.8136,
    lng: 144.9631,
    label: "Melbourne",
  },
  { name: "Pacific/Auckland", lat: -36.8509, lng: 174.7645, label: "Auckland" },
  // Africa
  { name: "Africa/Cairo", lat: 30.0444, lng: 31.2357, label: "Cairo" },
  { name: "Africa/Lagos", lat: 6.5244, lng: 3.3792, label: "Lagos" },
  {
    name: "Africa/Johannesburg",
    lat: -26.2041,
    lng: 28.0473,
    label: "Johannesburg",
  },
  // Russia
  {
    name: "Europe/Kaliningrad",
    lat: 54.7104,
    lng: 20.4522,
    label: "Kaliningrad",
  },
  {
    name: "Europe/Moscow",
    lat: 55.7558,
    lng: 37.6173,
    label: "Moscow",
  },
  {
    name: "Europe/Samara",
    lat: 53.1959,
    lng: 50.1008,
    label: "Samara",
  },
  {
    name: "Asia/Yekaterinburg",
    lat: 56.8389,
    lng: 60.6057,
    label: "Yekaterinburg",
  },
  {
    name: "Asia/Omsk",
    lat: 54.9914,
    lng: 73.3645,
    label: "Omsk",
  },
  {
    name: "Asia/Novosibirsk",
    lat: 55.0084,
    lng: 82.9357,
    label: "Novosibirsk",
  },
  {
    name: "Asia/Krasnoyarsk",
    lat: 56.0153,
    lng: 92.8932,
    label: "Krasnoyarsk",
  },
  {
    name: "Asia/Irkutsk",
    lat: 52.2869,
    lng: 104.305,
    label: "Irkutsk",
  },
  {
    name: "Asia/Yakutsk",
    lat: 62.0355,
    lng: 129.6755,
    label: "Yakutsk",
  },
  {
    name: "Asia/Vladivostok",
    lat: 43.1198,
    lng: 131.8869,
    label: "Vladivostok",
  },
  {
    name: "Asia/Magadan",
    lat: 59.561,
    lng: 150.8106,
    label: "Magadan",
  },
  {
    name: "Asia/Kamchatka",
    lat: 53.0452,
    lng: 158.6483,
    label: "Kamchatka",
  },
  {
    name: "Asia/Anadyr",
    lat: 64.7337,
    lng: 177.5089,
    label: "Anadyr",
  },
];

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-[1000] bg-white/80 backdrop-blur-sm p-4 flex justify-between items-center border-b">
        <h2 className="text-xl font-semibold accent-text">
          Timezone Converter
        </h2>
        <SignOutButton />
      </header>
      <main className="flex-1 flex items-center justify-center p-8 overflow-hidden">
        <div className="w-full max-w-4xl mx-auto">
          <Content />
        </div>
      </main>
      <Toaster />
    </div>
  );
}

type SelectionMode = "from" | "to" | null;

function Content() {
  const loggedInUser = useQuery(api.auth.loggedInUser);
  const [fromTimezone, setFromTimezone] = useState("UTC");
  const [toTimezone, setToTimezone] = useState("America/New_York");
  const [timestamp, setTimestamp] = useState(new Date());
  const [showUSAOnly, setShowUSAOnly] = useState(false);
  const [selectionMode, setSelectionMode] = useState<SelectionMode>(null);
  const saveConversion = useMutation(api.timezone.saveConversion);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const recentConversions = useQuery(api.timezone.listRecentConversions) ?? [];
  const clearRecentConversions = useMutation(
    api.timezone.clearRecentConversions
  );

  const markers = showUSAOnly ? USA_TIMEZONE_MARKERS : WORLD_TIMEZONE_MARKERS;
  const mapCenter = showUSAOnly ? [39.8283, -98.5795] : [20, 0];
  const mapZoom = showUSAOnly ? 3 : 2;

  // Update timestamp every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (loggedInUser === undefined) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const handleConvert = async () => {
    try {
      await saveConversion({
        fromTimezone,
        toTimezone,
        timestamp: timestamp.getTime(),
        clock: formatInTimeZone(timestamp, fromTimezone, "HH:mm:ss zzz"),
      });
      toast.success("Conversion saved successfully!");
    } catch (error) {
      setErrorMessage("Failed to save conversion. Please try again.");
      toast.error("Failed to save conversion. Please try again.");
    }
  };

  const handleMarkerClick = (timezone: string) => {
    if (selectionMode === "from") {
      setFromTimezone(timezone);
    } else if (selectionMode === "to") {
      setToTimezone(timezone);
    }
    setSelectionMode(null);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold accent-text mb-4">
          Timezone Converter
        </h1>
        <Authenticated>
          <p className="text-xl text-slate-600">
            Select "From" or "To" timezone, then click a location on the map
          </p>
        </Authenticated>
        <Unauthenticated>
          <p className="text-xl text-slate-600">Sign in to get started</p>
        </Unauthenticated>
      </div>

      <Unauthenticated>
        <SignInForm />
      </Unauthenticated>

      <Authenticated>
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

          <div
            style={{ height: "400px" }}
            className="rounded-lg overflow-hidden"
          >
            <MapContainer
              key={showUSAOnly ? "usa" : "world"}
              center={mapCenter as [number, number]}
              zoom={mapZoom}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {markers.map((marker) => (
                <Marker
                  key={marker.name}
                  position={[marker.lat, marker.lng]}
                  eventHandlers={{
                    click: () => handleMarkerClick(marker.name),
                  }}
                ></Marker>
              ))}
            </MapContainer>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <button
              onClick={() => setSelectionMode("from")}
              className={`p-4 rounded w-full text-left ${selectionMode === "from" ? "bg-indigo-50 ring-2 ring-indigo-500" : "bg-gray-50"}`}
            >
              <h3 className="font-medium mb-2">
                From:{" "}
                {markers.find((m) => m.name === fromTimezone)?.label ||
                  fromTimezone}
              </h3>
              <p className="text-lg">
                {formatInTimeZone(timestamp, fromTimezone, "HH:mm:ss zzz")}
              </p>
              <p className="text-sm text-gray-600">
                {formatInTimeZone(timestamp, fromTimezone, "h:mm:ss a")}
              </p>
            </button>
            <button
              onClick={() => setSelectionMode("to")}
              className={`p-4 rounded w-full text-left ${selectionMode === "to" ? "bg-indigo-50 ring-2 ring-indigo-500" : "bg-gray-50"}`}
            >
              <h3 className="font-medium mb-2">
                To:{" "}
                {markers.find((m) => m.name === toTimezone)?.label ||
                  toTimezone}
              </h3>
              <p className="text-lg">
                {formatInTimeZone(timestamp, toTimezone, "HH:mm:ss zzz")}
              </p>
              <p className="text-sm text-gray-600">
                {formatInTimeZone(timestamp, toTimezone, "h:mm:ss a")}
              </p>
            </button>
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={() => {
                const temp = fromTimezone;
                setFromTimezone(toTimezone);
                setToTimezone(temp);
              }}
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

          {recentConversions.length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium mb-2">Recent Conversions:</h3>
              <button
                onClick={async () => {
                  await clearRecentConversions();
                }}
                className="bg-red-500 text-white px-4 py-2 rounded mb-4 hover:bg-red-600"
              >
                Clear All Conversions
              </button>
              <div className="space-y-2">
                {recentConversions.map((conv, index) => (
                  <div
                    key={`${conv.fromTimezone}-${conv.toTimezone}-${conv.timestamp}`}
                    className="p-4 rounded w-full text-left bg-gray-50"
                  >
                    <h3 className="font-medium mb-2">
                      From:{" "}
                      {markers.find((m) => m.name === conv.fromTimezone)
                        ?.label || conv.fromTimezone}
                    </h3>
                    <input
                      type="time"
                      className="text-lg border rounded p-2"
                      value={formatInTimeZone(
                        new Date(conv.timestamp),
                        conv.fromTimezone,
                        "HH:mm"
                      )}
                      onChange={(e) => {
                        const newTime = e.target.value;
                        const [hours, minutes] = newTime.split(":");
                        const updatedTimestamp = new Date(conv.timestamp);
                        updatedTimestamp.setHours(
                          parseInt(hours, 10),
                          parseInt(minutes, 10)
                        );
                        // Update the conversion timestamp
                        recentConversions[index].timestamp =
                          updatedTimestamp.getTime();
                      }}
                    />
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
          )}
        </div>
      </Authenticated>
    </div>
  );
}
