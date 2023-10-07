export interface Time {
  year: number | null;
  day: number | null;
};

export interface Location {
  latitude: number;
  longitude: number;
};

export interface ShallowMoonquake extends Time, Location {
  hour: number;
  minute: number;
  second: number;
  magnitude: number;
  comments: string;
};

export interface DeepMoonquake extends Time, Location {
  A: string;
  side: string;
  latitudeError: number;
  longitudeError: number;
  depth: number;
  depthError: number;
  assumed: string;
};

export interface ArtificialImpact extends Time, Location {
  ai: string;
  hour: number;
  minutes: number;
  seconds: number;
};
