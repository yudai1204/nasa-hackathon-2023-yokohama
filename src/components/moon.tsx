import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export const Moon = () => {
  const radius = 5;
  const moonMap = useLoader(TextureLoader, "moon.webp");
  return (
    <mesh>
      <sphereGeometry args={[radius, 128, 64]} />
      <meshPhysicalMaterial map={moonMap} />
    </mesh>
  );
};
