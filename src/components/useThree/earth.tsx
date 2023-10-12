import { useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh, TextureLoader } from "three";
import { Option } from "@/type";
import { convertToCoordinates } from "@/utils/coordinateTransformation";

type Props = {
  option: Option;
};
export const Earth = (props: Props) => {
  const { option } = props;
  const earthMap = useLoader(TextureLoader, "earth.webp");
  const earthRef = useRef<Mesh>(null);
  const radius = 500;
  const phi = Math.PI / 2;
  const [stateTheta, setStateTheta] = useState<number>(0);

  useFrame(() => {
    const earth = earthRef.current;
    if (!earth || !option.autoRotate) return;
    let theta = stateTheta - 0.0005;
    if (theta < 0) theta = 2 * Math.PI;
    setStateTheta(theta);
    const position = convertToCoordinates(radius, phi, theta);
    earth.position.set(position.x, position.y, position.z);
    earth.rotation.y += 0.001;
  });

  return (
    <mesh ref={earthRef} position={convertToCoordinates(radius, phi, stateTheta)}>
      <sphereGeometry args={[30, 128, 64]} />
      <meshPhysicalMaterial map={earthMap} />
    </mesh>
  );
};
