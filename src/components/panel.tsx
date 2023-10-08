import { Box, Text, VStack, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdDragIndicator } from "react-icons/md";
import { MoonquakeData, isArtificialImpact, isDeepMoonquake, isShallowMoonquake } from "@/type";

type Data = {
  year: number | "N/A";
  latitude: number | "N/A";
  longitude: number | "N/A";
  type: string;
  addDataKey: string;
  addDataValue: number | string | "N/A";
};

const nullData: Data = {
  year: "N/A",
  latitude: "N/A",
  longitude: "N/A",
  type: "N/A",
  addDataKey: "N/A",
  addDataValue: "N/A",
};

const convertToData = (moonquake: MoonquakeData | null): Data => {
  if (!moonquake) {
    return nullData;
  }
  const { time, location } = moonquake;
  const year = time?.year ?? "N/A";
  const latitude = location.latitude ?? "N/A";
  const longitude = location.longitude ?? "N/A";
  const { type, addDataKey, addDataValue } = (() => {
    if (isShallowMoonquake(moonquake)) {
      return { type: "Shallow Moonquake", addDataKey: "magnitude", addDataValue: moonquake.magnitude };
    } else if (isDeepMoonquake(moonquake)) {
      return { type: "Deep Moonquake", addDataKey: "depth", addDataValue: moonquake.depth };
    } else if (isArtificialImpact(moonquake)) {
      return { type: "Artifical Impact", addDataKey: "AI", addDataValue: moonquake.ai };
    }
    return { type: "N/A", addDataKey: "N/A", addDataValue: "N/A" };
  })();
  return { year, latitude, longitude, type, addDataKey, addDataValue };
};

type Props = {
  choiceMoonquake: MoonquakeData | null;
};

export const Panel = (props: Props) => {
  const [isOpen, setIsOpnen] = useState(true);

  const data = convertToData(props.choiceMoonquake);
  const dataText = (key: string, value: number | string | "N/A") => {
    return (
      <Text fontSize="16px" height="40px" lineHeight="40px" borderTop="1px solid" borderColor="#B0BAC640" w="100%">
        {key}: {value}
      </Text>
    );
  };

  return (
    <Box
      position="absolute"
      top={10}
      right={10}
      zIndex={1}
      w="fit-content"
      h={isOpen ? "272px" : "64px"}
      borderRadius="md"
      color="gray.200"
      border="1px solid"
      borderColor="gray.200"
      bgColor="#fff1"
      minW="240px"
      userSelect="none"
      backdropFilter="blur(2px)"
      overflow="hidden"
      transition="0.3s"
    >
      <Box w="100%" h="100%" position="relative" px="24px" py="16px">
        <Text fontWeight={500} fontSize={20} pb="10px">
          Detail
        </Text>
        <Icon
          position="absolute"
          as={MdDragIndicator}
          fontSize={30}
          opacity={0.8}
          top={4}
          right={4}
          cursor="pointer"
          transition={"0.3s"}
          _hover={{ opacity: 0.5 }}
          onClick={() => {
            setIsOpnen(!isOpen);
          }}
        />

        <VStack spacing={0} align="flex-start" opacity={isOpen ? 1 : 0} transition="0.3s">
          {dataText("Year", data.year)}
          {dataText("Latitude", data.latitude)}
          {dataText("Longitude", data.longitude)}
          {dataText("Type", data.type)}
          {dataText(data.addDataKey, data.addDataValue)}
        </VStack>
      </Box>
    </Box>
  );
};
