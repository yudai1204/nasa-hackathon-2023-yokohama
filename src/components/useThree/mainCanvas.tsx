import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { Earth } from "./earth";
import { Moon } from "./moon";
import { Universe } from "./universe";
import type { MoonquakeData } from "@/type";
import { Option } from "@/type/option";
import { useWideHeader } from "@/utils/useWideHeader";

type Props = {
  moonquakeData: MoonquakeData[];
  setIsMap: React.Dispatch<React.SetStateAction<boolean>>;
  option: Option;
  choiceMoonquake: MoonquakeData | null;
  setChoiceMoonquake: React.Dispatch<React.SetStateAction<MoonquakeData | null>>;
};
export const MainCanvas = (props: Props) => {
  const { moonquakeData, setIsMap, option, choiceMoonquake, setChoiceMoonquake } = props;

  const orbitControlsRef = useRef<OrbitControlsImpl>(null);

  const handleOrbitControlsChange = () => {
    const orbitControls = orbitControlsRef.current;
    if (!orbitControls) return;
    if (orbitControls.getDistance() <= orbitControls.minDistance) {
      setIsMap(true);
    }
  };

  const wideHeader = useWideHeader();

  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 1000,
        position: [300, 100, 0],
      }}
      style={{ background: "black" }}
    >
      <directionalLight position={[1, 1, 1]} intensity={0.8} />
      <ambientLight args={[0xffffff]} intensity={0.5} />
      <OrbitControls
        ref={orbitControlsRef}
        minDistance={wideHeader ? 150 : 250}
        maxDistance={500}
        enablePan={false}
        onChange={handleOrbitControlsChange}
      />
      <Moon
        option={option}
        moonquakeData={moonquakeData}
        choiceMoonquake={choiceMoonquake}
        setChoiceMoonquake={setChoiceMoonquake}
      />
      {!option.performanceMode && <Earth option={option} />}
      <Universe />
    </Canvas>
  );
};
