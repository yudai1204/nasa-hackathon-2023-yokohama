import { Flex, Text, VStack, Divider } from "@chakra-ui/react";

const names = ["Joraku Daijiro", "Hiyama Yudai", "Taguchi Yumei", "Horike Haruki", "Aoki Ren", "Yoshikoshi Jo"];

export const Footer = () => (
  <VStack w="100%" gap={4} py={25}>
    <Divider borderColor="gray.600" />
    <Flex wrap="wrap" w="100%" gap={1} align="center" justify="center">
      {names.map((name) => (
        <Text key={name} fontSize="md" color="gray.900">
          {name}.
        </Text>
      ))}
    </Flex>
    <a href="https://github.com/yudai1204/nasa-hackathon-2023-yokohama" target="_blank" rel="noreferrer noopener">
      <Text fontSize="sm" color="gray.900" textDecoration="underline">
        Our GitHub Repository
      </Text>
    </a>

    <Text color="gray.500" fontSize="xs">
      Background Image:
      <a
        href="https://www.eso.org/public/images/eso0932a/"
        target="_blank"
        rel="noreferrer noopener"
        style={{ textDecoration: "underline" }}
      >
        &copy;ESO/S. Brunier
      </a>
    </Text>
  </VStack>
);
