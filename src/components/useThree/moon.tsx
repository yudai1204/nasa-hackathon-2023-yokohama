import { Text } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef } from "react";
import { Group, TextureLoader } from "three";
import { Pin } from "./pin";
import { MoonquakeData, Option } from "@/type";
import { convertToCoordinates } from "@/utils/coordinateTransformation";

type Props = {
  option: Option;
  moonquakeData: MoonquakeData[];
  choiceMoonquake: MoonquakeData | null;
  setChoiceMoonquake: React.Dispatch<React.SetStateAction<MoonquakeData | null>>;
  setMoonRotate: React.Dispatch<React.SetStateAction<number>>;
};

const mapData = [
  {
    name: "Mare Serenitatis",
    lng: 17,
    lat: 28,
  },
  {
    name: "Mare Orientale",
    lng: 92,
    lat: 19,
  },
  {
    name: "Oceanus Procellarum",
    lng: 57,
    lat: 18,
  },
  {
    name: "Copernicus",
    lng: -20,
    lat: 10,
  },
  {
    name: "Apollo 12",
    lng: 23,
    lat: 3,
  },
  {
    name: "Apollo 11",
    lng: 169,
    lat: 13,
  },
  {
    name: "HAKUTO-R collision point",
    lng: 44,
    lat: 47,
  },
  {
    name: "Apollo 14",
    lng: 20,
    lat: 3,
  },
  {
    name: "Kepler",
    lng: -38,
    lat: 8,
  },
  {
    name: "Mare Humorum",
    lng: -38,
    lat: -24,
  },
];

export const Moon = (props: Props) => {
  const { option, moonquakeData, choiceMoonquake, setChoiceMoonquake, setMoonRotate } = props;
  const moonRef = React.useRef<Group>(null);
  const radius = 100;
  const moonMap = useLoader(TextureLoader, "moon.webp");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataRefs = useRef<any>([]);

  useFrame(() => {
    const moon = moonRef.current;
    if (!moon || !option.autoRotate) return;
    // moon.rotation.y += 0.0005;
    setMoonRotate(moon.rotation.y);
  });

  const mapTextData = useMemo(() => {
    return mapData.map((data) => {
      const lat = ((90 - data.lat) * Math.PI) / 180;
      const lng = (-data.lng * Math.PI) / 180;
      const textPosition = convertToCoordinates(radius + 8, lat, lng);
      const position = convertToCoordinates(radius, lat, lng);
      return {
        ...data,
        textPosition,
        position,
      };
    });
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataRefs.current.forEach((ref: any) => {
      if (!ref) return;
      ref.lookAt(0, 0, 0);
      ref.rotation.y += Math.PI;
    });
  }, []);

  return (
    <group ref={moonRef}>
      <mesh>
        <sphereGeometry args={[radius, 128, 64]} />
        <meshPhysicalMaterial map={moonMap} />
      </mesh>
      {mapTextData.map((data, idx) => (
        <>
          <Text
            key={idx}
            ref={(el) => (dataRefs.current[idx] = el)}
            position={data.textPosition}
            fontSize={3}
            color="white"
            anchorX="center"
            anchorY="middle"
            rotation={[2, 0, 0]}
          >
            {data.name}
          </Text>

          <mesh position={data.position}>
            <sphereGeometry args={[0.5]} />
            <meshPhysicalMaterial color={"red"} />
          </mesh>
        </>
      ))}
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
