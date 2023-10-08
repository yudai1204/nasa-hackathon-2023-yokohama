import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Pin } from "./pin";
import { MoonquakeData } from "@/type";

type Props = {
  moonquakeData: MoonquakeData[];
};

export const Moon = (props: Props) => {
  const { moonquakeData } = props;
  const radius = 100;
  const moonMap = useLoader(TextureLoader, "moon.webp");

  return (
    <group>
      <mesh>
        <sphereGeometry args={[radius, 128, 64]} />
        <meshPhysicalMaterial map={moonMap} />
      </mesh>
      {moonquakeData.map((moonquake, idx) => (
        <Pin key={idx} radius={radius} moonquake={moonquake} />
      ))}
    </group>
  );
};
