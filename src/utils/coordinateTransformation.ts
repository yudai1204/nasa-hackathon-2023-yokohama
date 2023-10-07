import { Vector3 } from "three";

export const convertToCoordinates = (radius: number, phi: number, theta: number) => {
  return new Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
};
