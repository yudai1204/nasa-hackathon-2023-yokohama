import { Text } from "@react-three/drei";
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
  setMoonRotate: React.Dispatch<React.SetStateAction<number>>;
};

export const Moon = (props: Props) => {
  const { option, moonquakeData, choiceMoonquake, setChoiceMoonquake, setMoonRotate } = props;
  const moonRef = React.useRef<Group>(null);
  const radius = 100;
  const moonMap = useLoader(TextureLoader, "moon.webp");

  useFrame(() => {
    const moon = moonRef.current;
    if (!moon || !option.autoRotate) return;
    // moon.rotation.y += 0.0005;
    setMoonRotate(moon.rotation.y);
  });

  return (
    <group ref={moonRef}>
      <mesh>
        <sphereGeometry args={[radius, 128, 64]} />
        <meshPhysicalMaterial map={moonMap} />
      </mesh>
      <Text
        position={[0, 0, radius + 5]}
        fontSize={6}
        color="white"
        anchorX="center"
        anchorY="middle"
        onClick={() => alert("neko")}
      >
        Moon
      </Text>
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
