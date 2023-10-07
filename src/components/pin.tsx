import { MoonquakeData } from "@/type";
import { convertToCoordinates } from "@/utils/coordinateTransformation";

export const Pin = (props: { radius: number; moonquake: MoonquakeData }) => {
  const { latitude, longitude } = props.moonquake.location;
  const phi = (90 - latitude) * (Math.PI / 180);
  const theta = (longitude + 180) * (Math.PI / 180);
  const position = convertToCoordinates(props.radius, phi, theta);
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshPhysicalMaterial color="red" />
    </mesh>
  );
};
