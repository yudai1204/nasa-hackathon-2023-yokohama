import { useMemo } from "react";
import { MoonquakeData } from "@/type";
import { convertToCoordinates } from "@/utils/coordinateTransformation";

type Props = { radius: number; moonquake: MoonquakeData };

export const Pin = (props: Props) => {
  const { radius, moonquake } = props;
  const { latitude, longitude } = moonquake.location;

  const position = useMemo(() => {
    const phi = (90 - latitude) * (Math.PI / 180);
    const theta = (longitude + 180) * (Math.PI / 180);
    return convertToCoordinates(radius, phi, theta);
  }, [latitude, longitude, radius]);

  return (
    <mesh position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshPhysicalMaterial color="red" />
    </mesh>
  );
};
