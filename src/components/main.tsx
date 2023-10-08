import { Box, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { Header } from "./header";
import { MapComponent } from "./mapLibre";
import { MainCanvas } from "./useThree/mainCanvas";

export const Main = () => {
  const [isMap, setIsMap] = useState(false);
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

      <Box w="100%" h="100%" position="absolute" top={0} left={0} zIndex={isMap ? 0 : -1}>
        <MapComponent setIsMap={setIsMap} />
      </Box>
      <Box w="100%" h="100%" position="absolute" top={0} left={0} zIndex={isMap ? -1 : 0}>
        <MainCanvas />
      </Box>
    </Box>
  );
};
