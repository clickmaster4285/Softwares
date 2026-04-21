/**
 * Approximate centroids (state/province capitals or regional centers) for COBE [lat, lng].
 * UK uses NUTS1-style English regions + Scotland, Wales, Northern Ireland (no US-style "states").
 */

export interface GlobeRegionMarker {
  id: string;
  location: [number, number];
  /** Short code or tag (e.g. state postal code) */
  region: string;
  /** Full label shown at the pin */
  name: string;
}

const US_STATE_NAMES: Record<string, string> = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

const US_STATE_CAPITALS: Array<{ code: string; lat: number; lng: number }> = [
  { code: "AL", lat: 32.3617, lng: -86.2791 },
  { code: "AK", lat: 58.3019, lng: -134.4197 },
  { code: "AZ", lat: 33.4484, lng: -112.074 },
  { code: "AR", lat: 34.7465, lng: -92.2896 },
  { code: "CA", lat: 38.5816, lng: -121.4944 },
  { code: "CO", lat: 39.7392, lng: -104.9903 },
  { code: "CT", lat: 41.7658, lng: -72.6734 },
  { code: "DE", lat: 39.1582, lng: -75.5244 },
  { code: "FL", lat: 30.4383, lng: -84.2807 },
  { code: "GA", lat: 33.749, lng: -84.388 },
  { code: "HI", lat: 21.3069, lng: -157.8583 },
  { code: "ID", lat: 43.615, lng: -116.2023 },
  { code: "IL", lat: 39.7817, lng: -89.6501 },
  { code: "IN", lat: 39.7684, lng: -86.1581 },
  { code: "IA", lat: 41.5868, lng: -93.625 },
  { code: "KS", lat: 39.0473, lng: -95.6752 },
  { code: "KY", lat: 38.2009, lng: -84.8733 },
  { code: "LA", lat: 30.4515, lng: -91.1871 },
  { code: "ME", lat: 44.3235, lng: -69.7653 },
  { code: "MD", lat: 38.9784, lng: -76.4922 },
  { code: "MA", lat: 42.3601, lng: -71.0589 },
  { code: "MI", lat: 42.7325, lng: -84.5555 },
  { code: "MN", lat: 44.9537, lng: -93.09 },
  { code: "MS", lat: 32.2988, lng: -90.1848 },
  { code: "MO", lat: 38.5767, lng: -92.1735 },
  { code: "MT", lat: 46.5891, lng: -112.0391 },
  { code: "NE", lat: 40.8136, lng: -96.7026 },
  { code: "NV", lat: 39.1638, lng: -119.7674 },
  { code: "NH", lat: 43.2081, lng: -71.5376 },
  { code: "NJ", lat: 40.2206, lng: -74.7567 },
  { code: "NM", lat: 35.687, lng: -105.9378 },
  { code: "NY", lat: 42.6526, lng: -73.7562 },
  { code: "NC", lat: 35.7796, lng: -78.6382 },
  { code: "ND", lat: 46.8083, lng: -100.7837 },
  { code: "OH", lat: 39.9612, lng: -82.9988 },
  { code: "OK", lat: 35.4676, lng: -97.5164 },
  { code: "OR", lat: 44.9429, lng: -123.0351 },
  { code: "PA", lat: 40.2732, lng: -76.8839 },
  { code: "RI", lat: 41.824, lng: -71.4128 },
  { code: "SC", lat: 34.0007, lng: -81.0348 },
  { code: "SD", lat: 44.3668, lng: -100.3538 },
  { code: "TN", lat: 36.1627, lng: -86.7816 },
  { code: "TX", lat: 30.2672, lng: -97.7431 },
  { code: "UT", lat: 40.7608, lng: -111.891 },
  { code: "VT", lat: 44.2601, lng: -72.5754 },
  { code: "VA", lat: 37.5407, lng: -77.436 },
  { code: "WA", lat: 47.0379, lng: -122.9007 },
  { code: "WV", lat: 38.3498, lng: -81.6326 },
  { code: "WI", lat: 43.0748, lng: -89.3838 },
  { code: "WY", lat: 41.14, lng: -104.8202 },
];

const US_MARKERS: GlobeRegionMarker[] = [
  ...US_STATE_CAPITALS.map((s) => ({
    id: `us-${s.code.toLowerCase()}`,
    location: [s.lat, s.lng] as [number, number],
    region: s.code,
    name: US_STATE_NAMES[s.code] ?? s.code,
  })),
  {
    id: "us-dc",
    location: [38.9072, -77.0369],
    region: "DC",
    name: "District of Columbia",
  },
];

const CA_MARKERS: GlobeRegionMarker[] = [
  { id: "ca-bc", location: [48.4284, -123.3656], region: "BC", name: "British Columbia" },
  { id: "ca-ab", location: [53.5461, -113.4938], region: "AB", name: "Alberta" },
  { id: "ca-sk", location: [50.4452, -104.6189], region: "SK", name: "Saskatchewan" },
  { id: "ca-mb", location: [49.8951, -97.1384], region: "MB", name: "Manitoba" },
  { id: "ca-on", location: [43.6532, -79.3832], region: "ON", name: "Ontario" },
  { id: "ca-qc", location: [46.8139, -71.208], region: "QC", name: "Quebec" },
  { id: "ca-nb", location: [45.9636, -66.6431], region: "NB", name: "New Brunswick" },
  { id: "ca-ns", location: [44.6488, -63.5752], region: "NS", name: "Nova Scotia" },
  { id: "ca-pe", location: [46.2382, -63.1311], region: "PE", name: "Prince Edward Island" },
  { id: "ca-nl", location: [47.5615, -52.7126], region: "NL", name: "Newfoundland and Labrador" },
  { id: "ca-yt", location: [60.7212, -135.0568], region: "YT", name: "Yukon" },
  { id: "ca-nt", location: [62.454, -114.3718], region: "NT", name: "Northwest Territories" },
  { id: "ca-nu", location: [63.7467, -68.517], region: "NU", name: "Nunavut" },
];

const AU_MARKERS: GlobeRegionMarker[] = [
  { id: "au-nsw", location: [-33.8688, 151.2093], region: "NSW", name: "New South Wales" },
  { id: "au-vic", location: [-37.8136, 144.9631], region: "VIC", name: "Victoria" },
  { id: "au-qld", location: [-27.4698, 153.0251], region: "QLD", name: "Queensland" },
  { id: "au-wa", location: [-31.9505, 115.8605], region: "WA", name: "Western Australia" },
  { id: "au-sa", location: [-34.9285, 138.6007], region: "SA", name: "South Australia" },
  { id: "au-tas", location: [-42.8821, 147.3272], region: "TAS", name: "Tasmania" },
  {
    id: "au-act",
    location: [-35.2809, 149.13],
    region: "ACT",
    name: "Australian Capital Territory",
  },
  { id: "au-nt", location: [-12.4634, 130.8456], region: "NT", name: "Northern Territory" },
];

/** New Zealand — regional council / major hub centroids */
const NZ_MARKERS: GlobeRegionMarker[] = [
  { id: "nz-northland", location: [-35.725, 174.324], region: "Northland", name: "Northland" },
  { id: "nz-auckland", location: [-36.8485, 174.7633], region: "Auckland", name: "Auckland" },
  { id: "nz-waikato", location: [-37.787, 175.2793], region: "Waikato", name: "Waikato" },
  {
    id: "nz-bop",
    location: [-37.6878, 176.1651],
    region: "Bay of Plenty",
    name: "Bay of Plenty",
  },
  { id: "nz-gisborne", location: [-38.6623, 178.0176], region: "Gisborne", name: "Gisborne" },
  {
    id: "nz-hawkes",
    location: [-39.4928, 176.912],
    region: "Hawke's Bay",
    name: "Hawke's Bay",
  },
  { id: "nz-taranaki", location: [-39.0556, 174.0742], region: "Taranaki", name: "Taranaki" },
  {
    id: "nz-manawatu",
    location: [-40.3523, 175.6082],
    region: "Manawatū",
    name: "Manawatū-Whanganui",
  },
  {
    id: "nz-wellington",
    location: [-41.2865, 174.7767],
    region: "Wellington",
    name: "Wellington",
  },
  { id: "nz-tasman", location: [-41.2706, 173.283], region: "Tasman", name: "Tasman" },
  {
    id: "nz-marlborough",
    location: [-41.5134, 173.9613],
    region: "Marlborough",
    name: "Marlborough",
  },
  {
    id: "nz-westcoast",
    location: [-42.4504, 171.2108],
    region: "West Coast",
    name: "West Coast",
  },
  {
    id: "nz-canterbury",
    location: [-43.5321, 172.6306],
    region: "Canterbury",
    name: "Canterbury",
  },
  { id: "nz-otago", location: [-45.8788, 170.5028], region: "Otago", name: "Otago" },
  {
    id: "nz-southland",
    location: [-46.4132, 168.3538],
    region: "Southland",
    name: "Southland",
  },
];

/** UK — England NUTS1 regions + Scotland, Wales, Northern Ireland */
const UK_MARKERS: GlobeRegionMarker[] = [
  {
    id: "uk-ne",
    location: [54.9783, -1.6178],
    region: "NE England",
    name: "North East England",
  },
  {
    id: "uk-nw",
    location: [53.4808, -2.2426],
    region: "NW England",
    name: "North West England",
  },
  {
    id: "uk-yh",
    location: [53.8008, -1.5491],
    region: "Yorkshire",
    name: "Yorkshire and the Humber",
  },
  {
    id: "uk-em",
    location: [52.9548, -1.1581],
    region: "E Midlands",
    name: "East Midlands",
  },
  {
    id: "uk-wm",
    location: [52.4862, -1.8904],
    region: "W Midlands",
    name: "West Midlands",
  },
  {
    id: "uk-ee",
    location: [52.2053, 0.1218],
    region: "E England",
    name: "East of England",
  },
  { id: "uk-london", location: [51.5074, -0.1278], region: "London", name: "London" },
  {
    id: "uk-se",
    location: [51.4545, -0.9781],
    region: "SE England",
    name: "South East England",
  },
  {
    id: "uk-sw",
    location: [51.4545, -2.5879],
    region: "SW England",
    name: "South West England",
  },
  { id: "uk-scot", location: [55.9533, -3.1883], region: "Scotland", name: "Scotland" },
  { id: "uk-wales", location: [51.4816, -3.1791], region: "Wales", name: "Wales" },
  {
    id: "uk-ni",
    location: [54.5973, -5.9301],
    region: "N Ireland",
    name: "Northern Ireland",
  },
];

export const anglosphereRegionMarkers: GlobeRegionMarker[] = [
  ...US_MARKERS,
  ...CA_MARKERS,
  ...UK_MARKERS,
  ...AU_MARKERS,
  ...NZ_MARKERS,
];

export interface GlobeRegionArc {
  id: string;
  from: [number, number];
  to: [number, number];
}

/** Sparse arcs between major hubs (decorative) */
export const anglosphereRegionArcs: GlobeRegionArc[] = [
  {
    id: "arc-dc-london",
    from: [38.9072, -77.0369],
    to: [51.5074, -0.1278],
  },
  {
    id: "arc-ny-toronto",
    from: [42.6526, -73.7562],
    to: [43.6532, -79.3832],
  },
  {
    id: "arc-la-sydney",
    from: [38.5816, -121.4944],
    to: [-33.8688, 151.2093],
  },
  {
    id: "arc-vic-olympia",
    from: [48.4284, -123.3656],
    to: [47.0379, -122.9007],
  },
  {
    id: "arc-sydney-auckland",
    from: [-33.8688, 151.2093],
    to: [-36.8485, 174.7633],
  },
  {
    id: "arc-london-edinburgh",
    from: [51.5074, -0.1278],
    to: [55.9533, -3.1883],
  },
  {
    id: "arc-miami-london",
    from: [30.4383, -84.2807],
    to: [51.5074, -0.1278],
  },
  {
    id: "arc-victoria-bc-brisbane",
    from: [48.4284, -123.3656],
    to: [-27.4698, 153.0251],
  },
];
