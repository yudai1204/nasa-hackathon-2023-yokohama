import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Pin } from "./pin";
import { MoonquakeData } from "@/type";
import { Option, OptionConstants } from "@/type/option";

type Props = {
  option: Option;
  moonquakeData: MoonquakeData[];
  choiceMoonquake: MoonquakeData | null;
  setChoiceMoonquake: React.Dispatch<React.SetStateAction<MoonquakeData | null>>;
};

export const Moon = (props: Props) => {
  const { option, moonquakeData, choiceMoonquake, setChoiceMoonquake } = props;
  const radius = 100;
  const moonMap = useLoader(TextureLoader, "moon.webp");

  const { minYear, maxYear } = option;
  const isAll = minYear === OptionConstants.minYear && maxYear === OptionConstants.maxYear;
  const filteredMoonquakeData = moonquakeData.filter((moonquake) => {
    if (isAll) return true;
    const year = moonquake.time?.year ?? 0;
    return year >= minYear && year <= maxYear;
  });

  return (
    <group>
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
