import React from "react";
import ModelEditNote from "./ModelEditNote";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react";

export default function EditNotes({ note, ChangeAlert }) {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <i className="fa-solid fa-pen-to-square mx-1" onClick={onOpen}></i>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="fontPrimaryColor">Edit Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ModelEditNote
              note={note}
              ChangeAlert={ChangeAlert}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
