"use client";
import AddCircleIcon from "@/components/icons/AddCircleIcon";
import {
  Button,
  Card,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import AddUserForm from "./AddUserForm";

const AddWriterButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button isIconOnly color="primary" onPress={onOpen}>
        <AddCircleIcon />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        size="3xl"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                ایجاد نویسنده جدید
              </ModalHeader>
              <ModalBody>
                <AddUserForm />
              </ModalBody>
              <ModalFooter>
                <Card
                  className="bg-warning-400/15 text-warning-700 p-2 rounded-lg w-full text-center shadow-warning-400 border-none"
                  isBlurred
                >
                  * ادمین عزیز لطفا در وارد کردن اطلاعات نویسندگان دقت فرمائید *
                </Card>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddWriterButton;
