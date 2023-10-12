import { useFrame, useLoader } from "@react-three/fiber";
import React from "react";
import { Group, TextureLoader } from "three";
import { Pin } from "./pin";
import { MoonquakeData, Option } from "@/type";

type Props = {
  option: Option;
  moonquakeData: MoonquakeData[];
  choiceMoonquake: MoonquakeData | null;
  setChoiceMoonquake: React.Dispatch<React.SetStateAction<MoonquakeData | null>>;
};

export const Moon = (props: Props) => {
  const { option, moonquakeData, choiceMoonquake, setChoiceMoonquake } = props;
  const moonRef = React.useRef<Group>(null);
  const radius = 100;
  const moonMap = useLoader(TextureLoader, "moon.webp");

  useFrame(() => {
    const moon = moonRef.current;
    if (!moon || !option.autoRotate) return;
    moon.rotation.y += 0.0005;
  });

  return (
    <group ref={moonRef}>
      <mesh>
        <sphereGeometry args={[radius, 128, 64]} />
        <meshPhysicalMaterial map={moonMap} />
      </mesh>
      {moonquakeData.map((moonquake, idx) => (
        <Pin
          key={idx}
          radius={radius}
          moonquake={moonquake}
          choiceMoonquake={choiceMoonquake}
          setChoiceMoonquake={setChoiceMoonquake}
        />
      ))}
    </group>
  );
};
