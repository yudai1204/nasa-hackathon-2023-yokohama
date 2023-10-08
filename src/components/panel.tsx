import { Box, Text, VStack, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdDragIndicator } from "react-icons/md";
import { MoonquakeData } from "@/type";

type Data = {
  year: number;
  latitude: number;
  longitude: number;
  type: string;
  magnitude: number;
  [key: string]: number | string;
};

const data: Data = {
  year: 1974,
  latitude: 21,
  longitude: 88,
  type: "Shallow",
  magnitude: 2.7,
};

type Props = {
  choiceMoonquake: MoonquakeData | null;
};

export const Panel = (props: Props) => {
  const [isOpen, setIsOpnen] = useState(true);
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
          {props.choiceMoonquake?.location.latitude}
          {props.choiceMoonquake?.location.longitude}
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
          {Object.keys(data).map((key, index) => (
            <Text
              key={index}
              fontSize="16px"
              height="40px"
              lineHeight="40px"
              borderTop="1px solid"
              borderColor="#B0BAC640"
              w="100%"
            >
              {key}: {data[key]}
            </Text>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};
