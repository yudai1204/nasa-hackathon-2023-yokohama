import { Box, Switch } from "@chakra-ui/react";

type Props = {
  name: string;
  checked: boolean;
  onChange: () => void;
  colorScheme?: string;
};

export const SwitchSetting = (props: Props) => {
  const { name, checked, onChange, colorScheme } = props;
  return (
    <Box w="100%">
      <Switch size="md" colorScheme={colorScheme ?? "teal"} fontSize={18} isChecked={checked} onChange={onChange}>
        {name}
      </Switch>
    </Box>
  );
};
