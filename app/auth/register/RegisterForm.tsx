"use client";

import EyeIcon from "@/components/icons/EyeIcon";
import ViewOffIcon from "@/components/icons/ViewOffIcon";
import { Button, CardBody, CardFooter, Input } from "@nextui-org/react";
import React, { useState } from "react";

const RegisterForm = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <form>
      <CardBody className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2 text-right">
            <Input id="firstName" name="firstName" variant="flat" label="نام" />
          </div>
          <div className="space-y-2 text-right">
            <Input
              id="lastName"
              name="lastName"
              variant="flat"
              label="نام خانوادگی"
            />
          </div>
        </div>
        <div className="space-y-2 text-right">
          <Input
            id="username"
            name="username"
            variant="flat"
            label="نام کاربری"
          />
        </div>
        <div className="space-y-2 text-right">
          <Input
            id="password"
            name="password"
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
          />
        </div>
      </CardBody>
      <CardFooter>
        <Button type="submit" className="w-full" color="primary">
          ثبت نام
        </Button>
      </CardFooter>
    </form>
  );
};

export default RegisterForm;
