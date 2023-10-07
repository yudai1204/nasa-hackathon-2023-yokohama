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
