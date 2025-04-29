export interface TimezoneMarker {
  name: string;
  lat: number;
  lng: number;
  label: string;
}

export const USA_TIMEZONE_MARKERS: TimezoneMarker[] = [
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

export const WORLD_TIMEZONE_MARKERS: TimezoneMarker[] = [
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
    label: "Toronto (ET)",
  },
  {
    name: "America/Winnipeg",
    lat: 49.8951,
    lng: -97.1384,
    label: "Winnipeg (CT)",
  },
  {
    name: "America/Edmonton",
    lat: 53.5461,
    lng: -113.4938,
    label: "Edmonton (MT)",
  },
  {
    name: "America/Vancouver",
    lat: 49.2827,
    lng: -123.1207,
    label: "Vancouver (PT)",
  },
  {
    name: "America/St_Johns",
    lat: 47.5615,
    lng: -52.7126,
    label: "St. John's (NT)",
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
  { name: "Europe/Moscow", lat: 55.7558, lng: 37.6173, label: "Moscow" },
  { name: "Europe/Samara", lat: 53.1959, lng: 50.1008, label: "Samara" },
  {
    name: "Asia/Yekaterinburg",
    lat: 56.8389,
    lng: 60.6057,
    label: "Yekaterinburg",
  },
  { name: "Asia/Omsk", lat: 54.9914, lng: 73.3645, label: "Omsk" },
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
  { name: "Asia/Irkutsk", lat: 52.2869, lng: 104.305, label: "Irkutsk" },
  { name: "Asia/Yakutsk", lat: 62.0355, lng: 129.6755, label: "Yakutsk" },
  {
    name: "Asia/Vladivostok",
    lat: 43.1198,
    lng: 131.8869,
    label: "Vladivostok",
  },
  { name: "Asia/Magadan", lat: 59.561, lng: 150.8106, label: "Magadan" },
  { name: "Asia/Kamchatka", lat: 53.0452, lng: 158.6483, label: "Kamchatka" },
  { name: "Asia/Anadyr", lat: 64.7337, lng: 177.5089, label: "Anadyr" },
];
