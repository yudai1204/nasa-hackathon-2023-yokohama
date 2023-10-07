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

export type ShallowMoonquake = Moonquake & {
  magnitude: number;
  comments: string;
};

export type DeepMoonquake = Moonquake & {
  A: string;
  side: string;
  latitudeError: number;
  longitudeError: number;
  depth: number;
  depthError: number;
  assumed: string;
};

export type ArtificialImpact = Moonquake & {
  ai: string;
};

export type MoonquakeData = ShallowMoonquake | DeepMoonquake | ArtificialImpact;
