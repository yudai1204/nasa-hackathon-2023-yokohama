import { Box } from "@chakra-ui/react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { Header } from "./header";

export const Main = () => {
  return (
    <Box w="100vw" h="100vh">
      <Header />
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [0, 0, 5],
        }}
        style={{ background: "black" }}
      >
        <directionalLight position={[1, 1, 1]} intensity={0.8} />
        <ambientLight args={[0xffffff]} intensity={0.5} />
        <OrbitControls minDistance={15} maxDistance={70} />
      </Canvas>
    </Box>
  );
};
