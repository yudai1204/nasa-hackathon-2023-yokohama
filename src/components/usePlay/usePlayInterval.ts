import { useEffect, useRef, useState } from "react";

type Control = {
  start: () => void;
  stop: () => void;
};

type State = "run" | "stop";

export const usePlayInterval = (fn: () => void, interval: number): Control => {
  const funcRef = useRef<() => void>();
  const [state, setState] = useState<State>("stop");
  const start = () => {
    setState("run");
  };
  const stop = () => {
    setState("stop");
  };
  useEffect(() => {
    funcRef.current = fn;
  }, [fn]);
  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
    if (state === "run") {
      timerId = setInterval(() => {
        funcRef.current?.();
      }, interval);
    } else {
      timerId && clearInterval(timerId);
    }
    return () => {
      timerId && clearInterval(timerId);
    };
  }, [interval, state]);
  return { start, stop };
};
