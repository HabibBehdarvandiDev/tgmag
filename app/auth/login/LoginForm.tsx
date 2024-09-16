"use client";

import EyeIcon from "@/components/icons/EyeIcon";
import ViewOffIcon from "@/components/icons/ViewOffIcon";
import { useToast } from "@/context/ToastContext";
import { ApiResponse } from "@/schema/api";
import { UserRegisterSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CardBody, CardFooter, Input } from "@nextui-org/react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

// form inputs
interface Inputs {
  username: string;
  password: string;
}

const LoginForm = () => {
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
          disabled={isSubmitting}
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

export default LoginForm;
