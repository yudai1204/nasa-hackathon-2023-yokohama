import { useEffect, useRef, useState } from "react";
import { PlayControl, PlayState } from "@/type";

export const usePlayInterval = (fn: () => void, interval: number): PlayControl => {
  const funcRef = useRef<() => void>();
  const [state, setState] = useState<PlayState>("stop");
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
