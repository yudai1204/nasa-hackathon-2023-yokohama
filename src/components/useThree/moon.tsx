import { useLoader } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { TextureLoader } from "three";
import { Pin } from "./pin";
import { MoonquakeData } from "@/type";
import { fetchArtificialImpactCSV, fetchDeepMoonquakeCSV, fetchShallowMoonquakeCSV } from "@/utils/fetchMoonquakeCSV";

export const Moon = () => {
  const radius = 100;
  const moonMap = useLoader(TextureLoader, "moon.webp");

  const [moonquakeData, setMoonquakeData] = useState<MoonquakeData[]>([]);

  useEffect(() => {
    const fetchMoonquake = async () => {
      const shallowMoonquakes = await fetchShallowMoonquakeCSV();
      const deepMoonquakes = await fetchDeepMoonquakeCSV();
      const artificialImpacts = await fetchArtificialImpactCSV();
      const quakes = [...shallowMoonquakes, ...deepMoonquakes, ...artificialImpacts] as MoonquakeData[];
      setMoonquakeData(quakes);
    };
    fetchMoonquake();
  }, []);

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
