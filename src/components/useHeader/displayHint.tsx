import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

export const DisplayHintModal = (props: Props) => {
  const { onClose, isOpen } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>How to use</ModalHeader>
        <ModalBody>
          This application displays the moonquakes observed by Apollo. You can scroll, zoom in, and manipulate the moon.
          In the left sidebar, you can customize the functions to your liking, and in the right Details section, you can
          see detailed information about the moonquakes. You can also click the clock icon in the bottom bar to play the
          moonquakes in chronological order.
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
