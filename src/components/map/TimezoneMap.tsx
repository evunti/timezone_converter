import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useMemo } from "react";
import {
  USA_TIMEZONE_MARKERS,
  WORLD_TIMEZONE_MARKERS,
} from "./timezone-markers";

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

interface TimezoneMapProps {
  showUSAOnly: boolean;
  onMarkerClick: (timezone: string) => void;
}

export function TimezoneMap({ showUSAOnly, onMarkerClick }: TimezoneMapProps) {
  const { markers, center, zoom } = useMemo(() => {
    const markers = showUSAOnly ? USA_TIMEZONE_MARKERS : WORLD_TIMEZONE_MARKERS;
    const center = showUSAOnly ? [39.8283, -98.5795] : [20, 0];
    const zoom = showUSAOnly ? 3 : 2;
    return { markers, center, zoom };
  }, [showUSAOnly]);

  return (
    <div style={{ height: "400px" }} className="rounded-lg overflow-hidden">
      <MapContainer
        key={showUSAOnly ? "usa" : "world"}
        center={center as [number, number]}
        zoom={zoom}
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
              click: () => onMarkerClick(marker.name),
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}
