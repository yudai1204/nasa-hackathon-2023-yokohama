export interface Time {
  year: number;
  day: number;
  hour: number;
  minutes: number;
  seconds: number;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Moonquake {
  type: 0 | 1 | 2;
  time?: Time;
  location: Location;
}

export interface ShallowMoonquake extends Moonquake {
  magnitude: number;
  comments: string;
}

export interface DeepMoonquake extends Moonquake {
  A: string;
  side: string;
  latitudeError: number;
  longitudeError: number;
  depth: number;
  depthError: number;
  assumed: string;
}

export interface ArtificialImpact extends Moonquake {
  ai: string;
}

export type MoonquakeData = ShallowMoonquake | DeepMoonquake | ArtificialImpact;
export const isShallowMoonquake = (data: MoonquakeData): data is ShallowMoonquake => data.type === 0;
export const isDeepMoonquake = (data: MoonquakeData): data is DeepMoonquake => data.type === 1;
export const isArtificialImpact = (data: MoonquakeData): data is ArtificialImpact => data.type === 2;

export type ShallowMoonquakeCSVData = {
  Year: string;
  Day: string;
  H: string;
  M: string;
  S: string;
  Lat: string;
  Long: string;
  Magnitude: string;
  Comments: string;
};

export type DeepMoonquakeCSVData = {
  A: string;
  Side: string;
  Lat: string;
  Lat_Error: string;
  Long: string;
  Long_Error: string;
  Depth: string;
  Depth_Error: string;
  Assumed: string;
};

export type ArtificialImpactCSVData = {
  AI: string;
  Lat: string;
  Long: string;
  Y: string;
  JD: string;
  Hour: string;
  Min: string;
  Sec: string;
};
