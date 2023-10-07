export interface Time {
  year: number;
  day: number;
  hour: number;
  minutes: number;
  seconds: number;
};

export interface Location {
  latitude: number;
  longitude: number;
};

export interface ShallowMoonquake extends Time, Location {
  magnitude: number;
  comments: string;
};

export interface DeepMoonquake extends Location {
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
};
