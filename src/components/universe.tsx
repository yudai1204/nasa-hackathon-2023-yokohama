import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

export const Universe = () => {
  const radius = 500;
  const universeMap = useLoader(TextureLoader, "universe.jpg");

  return (
    <group>
      <mesh>
        <sphereGeometry args={[radius, 128, 64]} />
        <meshBasicMaterial side={THREE.BackSide} map={universeMap} />
      </mesh>
    </group>
  );
};
