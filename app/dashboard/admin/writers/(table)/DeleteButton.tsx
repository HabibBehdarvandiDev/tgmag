"use client";

import Delete02Icon from "@/components/icons/Delete02Icon";
import { useToast } from "@/context/ToastContext";
import {
  Button,
  Card,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";

const DeleteButton = ({ id, name }: { id: number; name: string }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { addToast } = useToast();

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (id: number) => {
    try {
      setLoading(true);
      const response = await axios.delete(`/api/v1/users/${id}`);

      if (response.data.status === "error") {
        addToast({
          title: "عملیات ناموفق!.",
          message: response.data.message,
          variant: "error",
        });
      }

      if (response.data.status === "success") {
        addToast({
          title: "عملیات موفقیت آمیز بود.",
          message: response.data.message,
          variant: "success",
        });
      }
    } catch (error) {
      addToast({
        title: "عملیات ناموفق!.",
        message: "مشکلی هنگام ارتباط با سرور بوجود آمد",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
    console.log(id);
  };

  return (
    <>
      <Tooltip color="danger" content="حذف نویسنده">
        <Button color="danger" variant="light" isIconOnly onPress={onOpen}>
          <Delete02Icon />
        </Button>
      </Tooltip>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                حذف نویسنده
              </ModalHeader>
              <ModalBody>
                <p>
                  شما درحال حذف حساب کاربری نویسنده
                  <Chip color="warning" variant="flat" className="mx-1">
                    {name}
                  </Chip>
                  هستید.
                </p>
                <Card className="bg-warning-400/15 text-warning-700 rounded-xl p-2 animate-pulse">
                  لطفا در نظر داشته باشید این تغییر غیرقابل برگشت است!
                </Card>
              </ModalBody>
              <ModalFooter className=" justify-start">
                <Button
                  color="primary"
                  onClick={async () => {
                    await onSubmit(id);
                    onClose();
                  }}
                  isLoading={loading}
                  isDisabled={loading}
                >
                  حذف
                </Button>
                <Button color="danger" variant="light" onPress={onClose}>
                  بستن
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteButton;
