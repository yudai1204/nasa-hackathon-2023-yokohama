import { useLoader } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { TextureLoader } from "three";
import { Pin } from "./pin";
import { MoonquakeData } from "@/type";
import { fetchArtificialImpactCSV, fetchDeepMoonquakeCSV, fetchShallowMoonquakeCSV } from "@/utils/fetchMoonquakeCSV";

export const Moon = () => {
  const radius = 5;
  const moonMap = useLoader(TextureLoader, "moon.webp");

  const [moonquakeData, setMoonquakeData] = useState<MoonquakeData[]>([]);

  useEffect(() => {
    const fetchMoonquake = async () => {
      const shallowMoonquakes = (await fetchShallowMoonquakeCSV()) as MoonquakeData[];
      const deepMoonquakes = (await fetchDeepMoonquakeCSV()) as MoonquakeData[];
      const artificialImpacts = (await fetchArtificialImpactCSV()) as MoonquakeData[];
      const quakes = shallowMoonquakes.concat(deepMoonquakes).concat(artificialImpacts);
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
