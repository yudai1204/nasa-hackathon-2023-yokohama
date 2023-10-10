import { Box, Text, Checkbox, Icon } from "@chakra-ui/react";
import { AiFillInfoCircle } from "react-icons/ai";
import { MoonquakeType, Option } from "@/type";

type Props = {
  option: Option;
  setOption: React.Dispatch<React.SetStateAction<Option>>;
};

export const TypeFilterSetting = (props: Props) => {
  const { option, setOption } = props;

  const changetypeFilter = (type: MoonquakeType) => {
    const typeFilter = option.typeFilter;
    if (typeFilter.has(type)) {
      typeFilter.delete(type);
    } else {
      typeFilter.add(type);
    }
    setOption({ ...option, typeFilter: typeFilter });
  };

  return (
    <Box w="100%">
      <Text fontSize={24} fontWeight="medium">
        Filter
      </Text>
      <Text fontSize={12}>
        <Icon as={AiFillInfoCircle} fontSize={12} mr="8px" />
        Click to filter.
      </Text>
      <Box w="100%" pt={3} pb={1}>
        <Checkbox size="lg" colorScheme="orange" onChange={() => changetypeFilter(0)} defaultChecked>
          Shallow
        </Checkbox>
      </Box>
      <Box w="100%" pb={1}>
        <Checkbox size="lg" colorScheme="purple" onChange={() => changetypeFilter(1)} defaultChecked>
          Deep
        </Checkbox>
      </Box>
      <Box w="100%">
        <Checkbox size="lg" colorScheme="blue" onChange={() => changetypeFilter(2)} defaultChecked>
          Artifical
        </Checkbox>
      </Box>
    </Box>
  );
};
