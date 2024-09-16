"use client";

import EyeIcon from "@/components/icons/EyeIcon";
import ViewOffIcon from "@/components/icons/ViewOffIcon";
import { Button, CardBody, CardFooter, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { UserRegisterSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useToast } from "@/context/ToastContext";
import { ApiResponse } from "@/schema/api";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import { useRouter } from "next/navigation";

// form inputs
interface Inputs {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
}

const RegisterForm = () => {
  const { addToast } = useToast();
  const router = useRouter();
  // imports fror react-hook-form handlers
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(UserRegisterSchema),
  });

  // visibility state for password Input
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [formError, setFormError] = useState<string | null>(null);

  const [passwordValue, setPasswordValue] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  const onSubmit = async (data: Inputs) => {
    setFormError(null); // Clear any previous form-level errors

    try {
      // Sending the request using axios
      const response = await axios.post("/api/v1/auth/register", data);

      if (response.data.status === "success") {
        // Handle successful registration (e.g., redirect or show success message)

        addToast({
          title: "ثبت نام موفق بود.",
          message: (
            <div>
              <p>
                تبریک میگم شما الان جزئی از خانواده تی جی مگ هستید 😎 <br />
                در حال انتقال به داشبورد...
              </p>
            </div>
          ),
          duration: 5000,
          position: "bottom-right",
          variant: "success",
        });
        setTimeout(() => {
          router.push("/");
        }, 5000);
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardBody className="space-y-6">
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
                  <ViewOffIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            {...register("password")}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
          <PasswordStrengthIndicator
            password={passwordValue}
            onStrengthChange={setPasswordStrength}
          />
          {errors.password && (
            <p className="text-xs text-red-600" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>
      </CardBody>
      <CardFooter className="flex flex-col space-y-4">
        <Button
          type="submit"
          className="w-full"
          color="primary"
          disabled={isSubmitting || passwordStrength < 80}
        >
          {isSubmitting ? "درحال ثبت نام" : "ثبت نام"}
        </Button>
        {formError && (
          <div className="bg-red-100 p-3 rounded-xl w-full text-red-600 text-xs">
            {formError}
          </div>
        )}
      </CardFooter>
    </form>
  );
};

export default RegisterForm;
