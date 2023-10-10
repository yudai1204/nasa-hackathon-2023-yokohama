import { useFrame, useLoader } from "@react-three/fiber";
import React from "react";
import { Group, TextureLoader } from "three";
import { Pin } from "./pin";
import { MoonquakeData } from "@/type";
import { Option } from "@/type/option";
import { moonQuakeFilter } from "@/utils/moonquakeFilter";

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

  const filteredMoonquakeData = moonQuakeFilter(moonquakeData, option);

  useFrame(() => {
    const moon = moonRef.current;
    if (!moon || !option.autoRotate) return;
    moon.rotation.y += 0.0001;
    moon.rotation.z += 0.001;
  });

  return (
    <group ref={moonRef}>
      <mesh>
        <sphereGeometry args={[radius, 128, 64]} />
        <meshPhysicalMaterial map={moonMap} />
      </mesh>
      {filteredMoonquakeData.map((moonquake, idx) => (
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
