import { Box, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { Header } from "./header";
import { MainCanvas } from "./mainCanvas";
import { MapComponent } from "./mapLibre";

export const Main = () => {
  const [isMap, setIsMap] = useState(true);
  return (
    <Box w="100%" h="100vh" position="relative" overflow="none">
      <Header />
      {/* 仮の切り替えボタン */}
      <Button
        onClick={() => {
          setIsMap(!isMap);
        }}
        position={"absolute"}
        bottom={10}
        right={10}
        zIndex={100}
      >
        {isMap ? "toThree" : "toMap"}
      </Button>
      {isMap ? <MapComponent /> : <MainCanvas />}
    </Box>
  );
};
