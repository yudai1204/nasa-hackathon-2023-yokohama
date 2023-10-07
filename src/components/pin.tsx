import { useMemo } from "react";
import { MoonquakeData, isArtificialImpact, isDeepMoonquake } from "@/type";
import { convertToCoordinates } from "@/utils/coordinateTransformation";

type Props = { radius: number; moonquake: MoonquakeData };

export const Pin = (props: Props) => {
  const { radius, moonquake } = props;
  const { latitude, longitude } = moonquake.location;

  const position = useMemo(() => {
    const phi = ((90 - latitude) * Math.PI) / 180;
    const theta = (-longitude * Math.PI) / 180;
    return convertToCoordinates(radius, phi, theta);
  }, [latitude, longitude, radius]);

  let color = "orange";
  if (isDeepMoonquake(moonquake)) {
    color = "violet";
  } else if (isArtificialImpact(moonquake)) {
    color = "blue";
  }

  return (
    <mesh position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshPhysicalMaterial color={color} />
    </mesh>
  );
};
