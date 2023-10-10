import { Spinner, Text, Flex, VStack } from "@chakra-ui/react";

type Props = {
  loadingPageStep: number;
};
export const LoadingBox = (props: Props) => {
  const { loadingPageStep } = props;
  return (
    <>
      {loadingPageStep < 2 && (
        <Flex
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          zIndex={100}
          bgColor="black"
          align="center"
          justify="center"
        >
          <VStack>
            <Spinner color="white" speed="0.8s" size="xl" />
            <Text color="white">Loading progress</Text>
            <Text color="white"> ( {loadingPageStep + 1} / 2 )</Text>
          </VStack>
        </Flex>
      )}
    </>
  );
};
