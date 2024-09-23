"use client"
import AddCircleIcon from "@/components/icons/AddCircleIcon";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from "@nextui-org/react";
import AddUserForm from "./AddUserForm";

const AddWriterButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button isIconOnly color="primary" onPress={onOpen}>
        <AddCircleIcon />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" size="3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">ایجاد نویسنده جدید</ModalHeader>
              <ModalBody>
                <AddUserForm />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddWriterButton;
