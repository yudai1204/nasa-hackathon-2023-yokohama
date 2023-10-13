import { Flex, Icon, Radio, Text } from "@chakra-ui/react";
import { FiExternalLink } from "react-icons/fi";

type Props = {
  value: number | string;
  mapName: string;
  projectName: string;
  projectUrl: string;
};

export const LayerRadio = (props: Props) => {
  const { mapName, projectName, projectUrl, value } = props;
  return (
    <Radio value={value.toString()} bgColor="gray.400">
      <Text fontSize={16}>{mapName}</Text>
      <Flex>
        <Text fontSize={12}>({projectName})</Text>
        <a href={projectUrl} target="_blank" rel="noopener noreferrer">
          <Icon as={FiExternalLink} />
        </a>
      </Flex>
    </Radio>
  );
};
