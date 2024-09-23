"use client";

import Call02Icon from "@/components/icons/Call02Icon";
import EyeIcon from "@/components/icons/EyeIcon";
import FingerAccessIcon from "@/components/icons/FingerAccessIcon";
import MailAtSign02Icon from "@/components/icons/MailAtSign02Icon";
import { useToast } from "@/context/ToastContext";
import { convertToJalali } from "@/utils";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
  Spinner,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";

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

const DetailsButton = ({ id }: { id: number }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { addToast } = useToast();

  const [loading, setLoading] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [imageError, setImageError] = useState(false);

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
  }, [id, isOpen]);

  return (
    <>
      <Tooltip color="default" content="مشخصات نویسنده">
        <Button
          color="default"
          variant="light"
          isIconOnly
          className="text-zinc-400"
          onPress={onOpen} // Open modal on button press
        >
          <EyeIcon />
        </Button>
      </Tooltip>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                مشخصات نویسنده
              </ModalHeader>
              <ModalBody>
                {loading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                ) : userDetails ? (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <Avatar
                        className="h-16 w-16"
                        isBordered
                        radius="md"
                        size="lg"
                      >
                        {!imageError ? (
                          <Avatar
                            src={`https://api.dicebear.com/6.x/initials/svg?seed=${userDetails.first_name} ${userDetails.last_name}`}
                          />
                        ) : null}
                      </Avatar>
                      <div>
                        <h4 className="text-xl font-semibold">
                          {userDetails.first_name} {userDetails.last_name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          @{userDetails.username}
                        </p>
                      </div>
                    </div>
                    <Divider />
                    <div className="grid gap-4">
                      <div className="flex items-center gap-2">
                        <MailAtSign02Icon className="h-6 w-6 text-muted-foreground" />
                        <span>{userDetails.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Call02Icon className="h-6 w-6 text-muted-foreground" />
                        <span>{userDetails.phone_number}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FingerAccessIcon className="h-6 w-6 text-muted-foreground" />

                        <Chip variant="dot" color="secondary">
                          نویسنده
                        </Chip>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Chip
                        color={userDetails.is_active ? "success" : "danger"}
                        className="text-white"
                        variant="shadow"
                      >
                        {userDetails.is_active ? "فعال" : "غیرفعال"}
                      </Chip>
                      <Chip
                        color={userDetails.is_verified ? "success" : "danger"}
                        className="text-white"
                        variant="shadow"
                      >
                        {userDetails.is_verified ? "تایید شده" : "تایید نشده"}
                      </Chip>
                    </div>
                    <Divider />
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <EyeIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          تاریخ ایجاد: {convertToJalali(userDetails.created_at)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <EyeIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          آخرین بروزرسانی :{" "}
                          {convertToJalali(userDetails.updated_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground">
                    اطلاعات کاربر در دسترس نیست.
                  </p>
                )}
              </ModalBody>
              <ModalFooter className="justify-start">
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

export default DetailsButton;
