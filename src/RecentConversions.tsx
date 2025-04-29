import React, { useEffect, useState } from "react";
import { api } from "../convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { formatDistanceToNow } from "date-fns";

const RecentConversions = () => {
  const conversions = useQuery(api.timezone.listRecentConversions);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const clearConversions = useMutation(api.timezone.clearRecentConversions);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleClear = async () => {
    await clearConversions();
  };

  if (!conversions) return <div>Loading...</div>;

  return (
    <div>
      <h2>Recent Conversions</h2>
      <button onClick={handleClear} className="clear-button">
        Clear All
      </button>
      <ul>
        {conversions.map((conversion, index) => (
          <li key={index}>
            {conversion.fromTimezone} to {conversion.toTimezone} - Updated{" "}
            {formatDistanceToNow(new Date(conversion.timestamp), {
              addSuffix: true,
            })}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentConversions;
