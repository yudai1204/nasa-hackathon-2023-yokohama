import { useToast, Icon } from "@chakra-ui/react";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import { BiSolidRocket } from "react-icons/bi";
import { Mesh, TextureLoader } from "three";
import { Option } from "@/type";
import { convertToCoordinates } from "@/utils/coordinateTransformation";

const quotes = [
  {
    title: "Fix your little problem and light this candle.",
    description: "Alan Bartlett Shepard Jr - the First American in space",
  },
  {
    title: "It's been a long way, but we are here.",
    description: "Alan Bartlett Shepard Jr - Apollo 14",
  },
  {
    title: "That's one small step for a man, one giant leap for mankind.",
    description: "Neil Armstrong - Apollo 11",
  },
  {
    title: "Houston, we've had a problem.",
    description: "John “Jack” Swigert & James Arthur Lovell Jr - Apollo 13",
  },
  {
    title: "The dream is alive",
    description: "John Watts Young - Space Shuttle Columbia",
  },
  {
    title: "The stars don't look bigger, but they do look brighter.",
    description: "Sally Ride - Space Shuttle Challenger",
  },
];

type Props = {
  option: Option;
};
export const Earth = (props: Props) => {
  const { option } = props;
  const earthMap = useLoader(TextureLoader, "earth.webp");
  const earthRef = useRef<Mesh>(null);
  const radius = 500;
  const phi = Math.PI / 2;
  const [stateTheta, setStateTheta] = useState<number>(0);

  useFrame(() => {
    const earth = earthRef.current;
    if (!earth || !option.autoRotate) return;
    let theta = stateTheta - 0.0005;
    if (theta < 0) theta = 2 * Math.PI;
    setStateTheta(theta);
    const position = convertToCoordinates(radius, phi, theta);
    earth.position.set(position.x, position.y, position.z);
    earth.rotation.y += 0.002;
  });

  const toast = useToast();

  const onClickEarth = () => {
    toast({
      status: "info",
      position: "top",
      duration: 2500,
      size: "xl",
      icon: <Icon as={BiSolidRocket} color="#fff" height="100%" fontSize="32px" />,
      isClosable: true,
      ...quotes[Math.floor(Math.random() * quotes.length)],
    });
  };

  return (
    <mesh ref={earthRef} position={convertToCoordinates(radius, phi, stateTheta)} onClick={onClickEarth}>
      <sphereGeometry args={[30, 128, 64]} />
      <meshPhysicalMaterial map={earthMap} />
    </mesh>
  );
};
