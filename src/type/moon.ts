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
export const isShallowMoonquake = (data: MoonquakeData): data is ShallowMoonquake => "magnitude" in data;
export const isDeepMoonquake = (data: MoonquakeData): data is DeepMoonquake => "A" in data;
export const isArtificialImpact = (data: MoonquakeData): data is ArtificialImpact => "ai" in data;

export type ShallowMoonquakeCSVData = {
  Year: number;
  Day: number;
  H: number;
  M: number;
  S: number;
  Lat: number;
  Long: number;
  Magnitude: number;
  Comments: string;
};

export type DeepMoonquakeCSVData = {
  A: string;
  Side: string;
  Lat: number;
  Lat_Error: number;
  Long: number;
  Long_Error: number;
  Depth: number;
  Depth_Error: number;
  Assumed: string;
};
