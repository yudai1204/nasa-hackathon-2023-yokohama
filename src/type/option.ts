import { MoonquakeType } from "./moon";

export type PlayStatus = "play" | "pause" | "stop";

export type PlayInfo = {
  status: PlayStatus;
  speed: number;
  year: number;
};

export type Option = {
  performanceMode: boolean;
  autoRotate: boolean;
  minYear: number;
  maxYear: number;
  typeFilter: Set<MoonquakeType>;
  playInfo: PlayInfo;
  displayLayer: boolean;
  layerOpacity: number;
  layerIdx: number;
};

export class OptionConstants {
  static readonly autoRotate = true;
  static readonly performanceMode = false;
  static readonly minYear = 1965;
  static readonly maxYear = 1980;
  static readonly typeFilter = new Set<MoonquakeType>([0, 1, 2]);
  static readonly playInfo: PlayInfo = { status: "stop", speed: 10, year: 1965 };
  static readonly displayLayer = true;
  static readonly layerOpacity = 0.4;
  static readonly layerIdx = 0;
}
