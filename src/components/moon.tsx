import { useLoader } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { TextureLoader } from "three";
import { Pin } from "./pin";
import { MoonquakeData } from "@/type";
import { fetchDeepMoonquakeCSV, fetchShallowMoonquakeCSV } from "@/utils/fetchMoonquakeCSV";

export const Moon = () => {
  const radius = 5;
  const moonMap = useLoader(TextureLoader, "moon.webp");

  const [moonquakeData, setMoonquakeData] = useState<MoonquakeData[]>([]);

  useEffect(() => {
    const fetchMoonquake = async () => {
      const shallows = (await fetchShallowMoonquakeCSV()) as MoonquakeData[];
      const deeps = (await fetchDeepMoonquakeCSV()) as MoonquakeData[];
      setMoonquakeData(shallows.concat(deeps));
      console.log(
        shallows
          .concat(deeps)
          .map((m) => m.time?.year)
          .filter((y) => y != undefined)
          .map((z) => typeof z),
      );
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
