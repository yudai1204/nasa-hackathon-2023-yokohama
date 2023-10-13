import { Flex, Text, Icon } from "@chakra-ui/react";
import { css, keyframes } from "@emotion/react";
import { useEffect, useState } from "react";
import { CgScrollV } from "react-icons/cg";
import { MdOutlinePinch } from "react-icons/md";
import { useWideHeader } from "@/utils/useWideHeader";

const bounce = keyframes`
  0%, 100% {
    transform: scale(1,1);
    opacity: 0.6;
  }

  50% {
    transform: scale(1.1,1.1);
    opacity: 1;
  }
`;

type Props = {
  setDisplayHint: React.Dispatch<React.SetStateAction<boolean>>;
};
export const HintPopup = (props: Props) => {
  const { setDisplayHint } = props;
  const wideHeader = useWideHeader();
  const [isSP, setIsSP] = useState(false);
  useEffect(() => {
    if (wideHeader) {
      setIsSP(false);
    } else {
      setIsSP(true);
    }
  }, [wideHeader]);

  return (
    <Flex
      zIndex={1}
      position="absolute"
      top="40%"
      left={0}
      w="100%"
      align="center"
      justify="center"
      gap={4}
      userSelect="none"
      css={css`
        animation: ${bounce} 3s ease-in-out infinite;
      `}
      onClick={() => setDisplayHint(false)}
    >
      <Icon as={isSP ? MdOutlinePinch : CgScrollV} fontSize={32} color="white" />
      <Text fontSize={16} color="white">
        {isSP ? "Pinch out" : "Scroll up"} and zoom
        <br /> to switch to 2D map
      </Text>
    </Flex>
  );
};
