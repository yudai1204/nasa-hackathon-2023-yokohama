import { useLoader } from "@react-three/fiber";
import { BackSide, TextureLoader } from "three";
export const Universe = () => {
  const radius = 500;
  const universeMap = useLoader(TextureLoader, "universe.jpg");

  return (
    <mesh>
      <sphereGeometry args={[radius, 128, 64]} />
      <meshBasicMaterial side={BackSide} map={universeMap} />
    </mesh>
  );
};
