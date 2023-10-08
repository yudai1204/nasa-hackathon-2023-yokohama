import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { SphereGeometry } from "three";
import { MoonquakeData, isArtificialImpact, isDeepMoonquake, isShallowMoonquake } from "@/type";
import { convertToCoordinates } from "@/utils/coordinateTransformation";

type Props = { radius: number; moonquake: MoonquakeData };

export const Pin = (props: Props) => {
  const { radius, moonquake } = props;
  const { latitude, longitude } = moonquake.location;

  const sphereRef = useRef<SphereGeometry>(null);

  const position = useMemo(() => {
    const phi = ((90 - latitude) * Math.PI) / 180;
    const theta = (-longitude * Math.PI) / 180;
    return convertToCoordinates(radius, phi, theta);
  }, [latitude, longitude, radius]);

  const maxSize = useMemo(() => getMaxSize(moonquake), [moonquake]);
  const color = useMemo(() => getColor(moonquake), [moonquake]);

  const [stateRadius, setStateRadius] = useState<number>(maxSize);
  const [hovered, setHovered] = useState<boolean>(false);

  useFrame(() => {
    const sphere = sphereRef.current;
    if (!sphere || !hovered) return;
    let next = stateRadius + 0.1;
    if (next > maxSize) next = maxSize * 0.3;
    setStateRadius(next);
  });

  return (
    <mesh position={position} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <sphereGeometry ref={sphereRef} args={[hovered ? stateRadius : maxSize, 32, 32]} />
      <meshPhysicalMaterial color={color} transparent={true} opacity={0.4} />
    </mesh>
  );
};

const getMaxSize = (moonquake: MoonquakeData): number => {
  if (isShallowMoonquake(moonquake)) {
    return moonquake.magnitude ** 2 * 1.5;
  }
  return 5;
};

const getColor = (moonquake: MoonquakeData): string => {
  if (isShallowMoonquake(moonquake)) {
    return "orange";
  } else if (isDeepMoonquake(moonquake)) {
    return "violet";
  } else if (isArtificialImpact(moonquake)) {
    return "blue";
  }
  return "orange";
};
