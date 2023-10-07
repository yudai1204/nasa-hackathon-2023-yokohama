import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Pin } from "./pin";
import { ArtificialImpact } from "@/type";

export const Moon = () => {
  const radius = 5;
  const moonMap = useLoader(TextureLoader, "moon.webp");

  const dammyMooneuake = {
    location: {
      latitude: 0,
      longitude: 0,
    },
  } as ArtificialImpact;

  return (
    <group>
      <mesh>
        <sphereGeometry args={[radius, 128, 64]} />
        <meshPhysicalMaterial map={moonMap} />
      </mesh>
      <Pin radius={radius} moonquake={dammyMooneuake} />
    </group>
  );
};
