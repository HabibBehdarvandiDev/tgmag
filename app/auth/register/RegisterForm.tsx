"use client";

import EyeIcon from "@/components/icons/EyeIcon";
import ViewOffIcon from "@/components/icons/ViewOffIcon";
import { Button, CardBody, CardFooter, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { UserRegisterSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";

// form inputs
interface Inputs {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
}

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(UserRegisterSchema),
  });

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
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
        <div className="space-y-2 text-right">
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
      <CardFooter>
        <Button
          type="submit"
          className="w-full"
          color="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "درحال ثبت نام" : "ثبت نام"}
        </Button>
      </CardFooter>
    </form>
  );
};

export default RegisterForm;
