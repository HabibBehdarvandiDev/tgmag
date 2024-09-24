"use client";

import Call02Icon from "@/components/icons/Call02Icon";
import EditUser02Icon from "@/components/icons/EditUser02Icon";
import MailAtSign02Icon from "@/components/icons/MailAtSign02Icon";
import PassportIcon from "@/components/icons/PassportIcon";
import SquareLock02Icon from "@/components/icons/SquareLock02Icon";
import UserIcon from "@/components/icons/UserIcon";
import UserListIcon from "@/components/icons/UserListIcon";
import { useToast } from "@/context/ToastContext";
import { passwordGenerator } from "@/lib/utils";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
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

type UserDetails = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone_number: string;
  is_verified: boolean;
  is_active: boolean;
  role_id: number;
  created_at: string;
  updated_at: string;
};

const EditButton = ({ id }: { id: number }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { addToast } = useToast();

  const [loading, setLoading] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [newPassword, setNewPassword] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      first_name: userDetails?.first_name ? userDetails?.first_name : "",
      last_name: userDetails?.last_name ? userDetails?.last_name : "",
      username: userDetails?.username ? userDetails?.username : "",
      password: "",
      email: userDetails?.email ? userDetails?.email : "",
      phone_number: userDetails?.phone_number ? userDetails?.phone_number : "",
      is_active: userDetails?.is_active ? userDetails?.is_active : false,
      is_verified: userDetails?.is_verified ? userDetails?.is_verified : false,
    },
  });

  useEffect(() => {
    if (!isOpen) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/v1/users/${id}`);

        if (response.data.status === "error") {
          addToast({
            title: "مشکل اتصال",
            message: response.data.message,
            variant: "error",
          });
        } else {
          setUserDetails(response.data);
          reset(response.data);
        }
      } catch (error) {
        addToast({
          title: "مشکل اتصال",
          message: "مشکلی هنگام اتصال به سرور پیش آمد!",
          variant: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isOpen, reset]);

  // Form submission handler
  const onSubmit = async (data: Inputs) => {
    console.log("Form Data:", data);
    const filteredData: Partial<Inputs> = {};

    // Iterate over each key-value pair in the data object
    Object.entries(data).forEach(([key, value]) => {
      // Check if the value is not null, undefined, or empty string
      if (value !== null && value !== undefined && value !== "") {
        // Add the valid key-value pair to the filteredData object
        filteredData[key as keyof Inputs] = value;
      }
    });

    // Log the filtered data (can remove this line in production)
    console.log("Filtered Data:", filteredData);

    try {
      const response = await axios.patch(`/api/v1/users/${id}`, filteredData);

      if (response.data.status === "error") {
        addToast({
          title: "عملیات ناموفق",
          message: "مشکلی هنگام تغییرات بوجود آمد!",
          variant: "error",
        });
      }

      if (response.data.status === "success") {
        addToast({
          title: "عملیات موفق",
          message: "اطلاعات کاربر ذخیر شد.",
          variant: "success",
        });
        onClose();
        window.location.reload();
      }
    } catch (error) {
      addToast({
        title: "عملیات ناموفق",
        message: "مشکلی هنگام ذخیره سازی اطلاعات وجود آمد!",
        variant: "error",
      });
    }
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

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit User
              </ModalHeader>
              <ModalBody>
                {loading ? (
                  <div className="flex justify-center">
                    <Spinner size="lg" />
                  </div>
                ) : (
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
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          endContent={
                            <div className="flex gap-2">
                              <Button
                                color="primary"
                                variant="light"
                                size="sm"
                                onClick={() => {
                                  const generatedPassword = passwordGenerator();
                                  setNewPassword(generatedPassword);
                                  setValue("password", generatedPassword);
                                }}
                              >
                                ایجاد رمز جدید
                              </Button>
                              <SquareLock02Icon className="w-7 h-7 text-foreground-400" />
                            </div>
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
                            <Checkbox onChange={onChange} isSelected={value}>
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
                            <Checkbox onChange={onChange} isSelected={value}>
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
                        ثبت
                      </Button>
                    </div>
                  </form>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  انصراف
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
