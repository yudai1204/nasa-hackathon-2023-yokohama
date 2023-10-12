export type PlayControl = {
  start: () => void;
  stop: () => void;
};

export type PlayState = "run" | "stop";
