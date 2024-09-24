"use client";

import Call02Icon from "@/components/icons/Call02Icon";
import EditUser02Icon from "@/components/icons/EditUser02Icon";
import MailAtSign02Icon from "@/components/icons/MailAtSign02Icon";
import PassportIcon from "@/components/icons/PassportIcon";
import SquareLock02Icon from "@/components/icons/SquareLock02Icon";
import UserIcon from "@/components/icons/UserIcon";
import UserListIcon from "@/components/icons/UserListIcon";
import { UserUpdateSchema } from "@/schema/User";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";

interface Inputs {
  first_name?: string;
  last_name?: string;
  username?: string;
  password?: string;
  email?: string;
  phone_number?: string;
  is_active?: boolean;
  is_verified?: boolean;
}

const EditButton = ({ id }: { id: number }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(UserUpdateSchema),
  });

  // Form submission handler
  const onSubmit = (data: Inputs) => {
    console.log("Form Data:", data); // Logs the submitted form data
    reset(); // Reset the form after successful submission, if needed
  };

  return (
    <>
      <Tooltip color="default" content="اصلاح مشخصات">
        <Button
          color="default"
          variant="light"
          isIconOnly
          className="text-info-500"
          onPress={onOpen}
        >
          <EditUser02Icon />
        </Button>
      </Tooltip>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                    <div className="flex flex-col space-y-3">
                      <Input
                        autoFocus
                        label="نام"
                        variant="flat"
                        size="md"
                        {...register("first_name")}
                        endContent={
                          <UserListIcon className="w-7 h-7 text-foreground-400" />
                        }
                      />
                      {errors.first_name?.message && (
                        <p className="text-sm text-red-600">
                          {errors.first_name.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col space-y-3">
                      <Input
                        label="نام خانوادگی"
                        variant="flat"
                        size="md"
                        {...register("last_name")}
                        endContent={
                          <PassportIcon className="w-7 h-7 text-foreground-400" />
                        }
                      />
                      {errors.last_name?.message && (
                        <p className="text-sm text-red-600">
                          {errors.last_name.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 w-full">
                    <div className="flex flex-col space-y-3">
                      <Input
                        label="نام کاربری"
                        variant="flat"
                        size="md"
                        {...register("username")}
                        endContent={
                          <UserIcon className="w-7 h-7 text-foreground-400" />
                        }
                      />
                      {errors.username?.message && (
                        <p className="text-sm text-red-600">
                          {errors.username.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col space-y-3">
                      <Input
                        label="رمز عبور"
                        variant="flat"
                        size="md"
                        {...register("password")}
                        endContent={
                          <SquareLock02Icon className="w-7 h-7 text-foreground-400" />
                        }
                      />
                      {errors.password?.message && (
                        <p className="text-sm text-red-600">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                    <div className="flex flex-col space-y-3">
                      <Input
                        label="ایمیل"
                        variant="flat"
                        size="md"
                        {...register("email")}
                        endContent={
                          <MailAtSign02Icon className="w-7 h-7 text-foreground-400" />
                        }
                      />
                      {errors.email?.message && (
                        <p className="text-sm text-red-600">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col space-y-3">
                      <Input
                        label="شماره تماس"
                        variant="flat"
                        size="md"
                        {...register("phone_number")}
                        endContent={
                          <Call02Icon className="w-7 h-7 text-foreground-400" />
                        }
                      />
                      {errors.phone_number?.message && (
                        <p className="text-sm text-red-600">
                          {errors.phone_number.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                    <div className="flex flex-col space-y-3">
                      <Controller
                        control={control}
                        name="is_active"
                        render={({ field: { onChange, value } }) => (
                          <Checkbox
                            onChange={onChange}
                            isSelected={value}
                          >
                            وضعیت حساب : {value ? "فعال" : "غیرفعال"}
                          </Checkbox>
                        )}
                      />
                    </div>
                    <div className="flex flex-col space-y-3">
                      <Controller
                        control={control}
                        name="is_verified"
                        render={({ field: { onChange, value } }) => (
                          <Checkbox
                            onChange={onChange}
                            isSelected={value}
                          >
                            وضعیت حساب : {value ? "تایید" : "تایید نشده"}
                          </Checkbox>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                    <Button
                      color="primary"
                      variant="shadow"
                      isLoading={isSubmitting}
                      isDisabled={isSubmitting}
                      type="submit"
                    >
                      {isSubmitting ? "درحال اصلاح" : "تایید"}
                    </Button>
                  </div>
                </form>
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

export default EditButton;
