"use client";

import EyeIcon from "@/components/icons/EyeIcon";
import ViewOffIcon from "@/components/icons/ViewOffIcon";
import { useToast } from "@/context/ToastContext";
import { ApiResponse } from "@/schema/api";
import { UserRegisterSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Inputs {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  email?: string;
  phone_number?: string;
  role_id: 2;
}

const AddUserForm = () => {
  const { addToast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(UserRegisterSchema),
  });

  const onSubmit = async (data: Inputs) => {
    setFormError(null); // Clear any previous form-level errors

    try {
      // Sending the request using axios
      const response = await axios.post("/api/v1/auth/register", data);

      if (response.data.status === "success") {
        // Handle successful registration (e.g., redirect or show success message)

        localStorage.setItem("user_id", response.data.user.id);
        localStorage.setItem("user_role", response.data.user.user_role);

        addToast({
          title: "عملیات موفق",
          message: "کاربر جدید ساخته شد.",
          duration: 5000,
          position: "bottom-right",
          variant: "success",
        });
        reset();
        window.location.reload();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiResponse>;

        // Handle API errors with a response
        if (axiosError.response) {
          const result = axiosError.response.data;

          if (result.errors) {
            // Set field-specific errors from the API response
            for (const [key, value] of Object.entries(result.errors)) {
              setError(key as keyof Inputs, {
                type: "manual",
                message: (value as string[])[0], // Use the first error message for the field
              });
            }
          } else if (result.message) {
            // Set general form error if no field-specific errors are provided
            setFormError(result.message);
          }
        } else {
          // If no response from the server, show a generic error message
          setFormError("خطایی در ثبت نام رخ داده است. لطفا دوباره تلاش کنید.");
        }
      } else {
        // Handle unexpected errors
        setFormError("خطایی در ثبت نام رخ داده است. لطفا دوباره تلاش کنید.");
      }
    }
  };

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2 text-right">
          <Input
            id="firstName"
            variant="flat"
            label="نام"
            {...register("first_name")}
          />
          {errors.first_name && (
            <p className="text-xs text-red-600" role="alert">
              {errors.first_name.message}
            </p>
          )}
        </div>
        <div className="space-y-2 text-right">
          <Input
            id="lastName"
            variant="flat"
            label="نام خانوادگی"
            {...register("last_name")}
          />
          {errors.last_name && (
            <p className="text-xs text-red-600" role="alert">
              {errors.last_name.message}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2 text-right">
          <Input
            id="email"
            variant="flat"
            label="ایمیل"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-600" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="space-y-2 text-right">
          <Input
            id="phone_number"
            variant="flat"
            label="شماره تماس"
            {...register("phone_number")}
          />
          {errors.phone_number && (
            <p className="text-xs text-red-600" role="alert">
              {errors.phone_number.message}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2 text-right">
          <Input
            id="username"
            variant="flat"
            label="نام کاربری"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-xs text-red-600" role="alert">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="space-y-3 text-right">
          <Input
            id="password"
            variant="flat"
            type={isVisible ? "text" : "password"}
            label="رمز عبور"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? (
                  <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <ViewOffIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            {...register("password")}
          />
          {errors.password && (
            <p className="text-xs text-red-600" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>
      <div className="space-y-3 w-full">
        {formError && (
          <div className="bg-red-100 p-3 rounded-xl w-full text-red-600 text-xs">
            {formError}
          </div>
        )}
      </div>
      <div className="space-y-3 w-full">
        <Button
          type="submit"
          className="w-full"
          color="primary"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          {isSubmitting ? "درحال ثبت نام" : "ثبت نام"}
        </Button>
      </div>
    </form>
  );
};

export default AddUserForm;
