import { Box } from "@chakra-ui/react";
import React from "react";
import { Header } from "./header";
import { MainCanvas } from "./mainCanvas";

export const Main = () => {
  return (
    <>
      <Header />
      <Box w="100vw" h="100vh">
        <MainCanvas />
      </Box>
    </>
  );
};
