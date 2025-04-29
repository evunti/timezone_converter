import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { formatInTimeZone } from "date-fns-tz";
import { toast } from "sonner";

export function useTimezoneConverter() {
  const [fromTimezone, setFromTimezone] = useState("UTC");
  const [toTimezone, setToTimezone] = useState("America/New_York");
  const [timestamp, setTimestamp] = useState(new Date());
  const [showUSAOnly, setShowUSAOnly] = useState(false);
  const [selectionMode, setSelectionMode] = useState<"from" | "to" | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const saveConversion = useMutation(api.timezone.saveConversion);
  const recentConversions = useQuery(api.timezone.listRecentConversions) ?? [];
  const clearRecentConversions = useMutation(
    api.timezone.clearRecentConversions
  );

  // Update timestamp every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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

  const flipTimezones = () => {
    const temp = fromTimezone;
    setFromTimezone(toTimezone);
    setToTimezone(temp);
  };

  return {
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
  };
}
