import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { SphereGeometry } from "three";
import { MoonquakeData, isShallowMoonquake } from "@/type";
import { convertToCoordinates } from "@/utils/coordinateTransformation";

type Props = {
  radius: number;
  moonquake: MoonquakeData;
  choiceMoonquake: MoonquakeData | null;
  setChoiceMoonquake: React.Dispatch<React.SetStateAction<MoonquakeData | null>>;
};

export const Pin = (props: Props) => {
  const { radius, moonquake, choiceMoonquake, setChoiceMoonquake } = props;
  const { latitude, longitude } = moonquake.location;

  const sphereRef = useRef<SphereGeometry>(null);

  const position = useMemo(() => {
    const phi = ((90 - latitude) * Math.PI) / 180;
    const theta = (-longitude * Math.PI) / 180;
    return convertToCoordinates(radius, phi, theta);
  }, [latitude, longitude, radius]);

  const onChoice = () => {
    setChoiceMoonquake(moonquake);
  };
  const choiced = choiceMoonquake === moonquake;
  const maxSize = useMemo(() => getMaxSize(moonquake), [moonquake]);
  const color = useMemo(() => getColor(moonquake), [moonquake]);

  const [stateRadius, setStateRadius] = useState<number>(maxSize);

  useFrame(() => {
    const sphere = sphereRef.current;
    if (!sphere || !choiced) return;
    let next = stateRadius + maxSize * 0.02;
    if (next > maxSize) next = maxSize * 0.3;
    setStateRadius(next);
  });

  return (
    <mesh position={position} onClick={onChoice}>
      <sphereGeometry ref={sphereRef} args={[choiced ? stateRadius : maxSize, 32, 32]} />
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
  return ["orange", "violet", "blue"][moonquake.type];
};
