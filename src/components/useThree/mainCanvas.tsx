import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Moon } from "./moon";
import { Universe } from "./universe";
import type { MoonquakeData } from "@/type";
import { Option, OptionConstants } from "@/type/option";

type Props = {
  moonquakeData: MoonquakeData[];
  setIsMap: React.Dispatch<React.SetStateAction<boolean>>;
  option: Option;
};
export const MainCanvas = (props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { moonquakeData, setIsMap, option } = props;
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 1000,
        position: [0, 0, 0],
      }}
      style={{ background: "black" }}
    >
      <directionalLight position={[1, 1, 1]} intensity={0.8} />
      <ambientLight args={[0xffffff]} intensity={0.5} />
      <OrbitControls minDistance={250} maxDistance={500} />
      <Moon
        moonquakeData={moonquakeData.filter((quake) => {
          if (option.minYear === OptionConstants.minYear && option.maxYear === OptionConstants.maxYear) return true;
          const year = quake.time?.year;
          if (year === undefined) return false;
          return option.minYear <= year && year <= option.maxYear;
        })}
      />
      <Universe />
    </Canvas>
  );
};
