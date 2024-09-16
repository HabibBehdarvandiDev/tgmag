"use client";
import { Progress } from "@nextui-org/progress";

interface PasswordStrengthIndicatorProps {
  password: string;
  onStrengthChange: (strength: number) => void; // Callback to pass strength value to parent
}

const PasswordStrengthIndicator = ({
  password,
  onStrengthChange,
}: PasswordStrengthIndicatorProps) => {
  // Define validation rules
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);
  const isMinLength = password.length >= 8;

  // Calculate password strength based on the rules
  let strength = 0;
  if (hasLowercase) strength += 20;
  if (hasUppercase) strength += 20;
  if (isMinLength) strength += 20;
  if (hasNumber) strength += 20;
  if (hasSpecialChar) strength += 20;

  const progressColor =
    strength < 40
      ? "bg-red-500"
      : strength < 60
      ? "bg-orange-500"
      : strength < 80
      ? "bg-yellow-500"
      : "bg-green-500";

  onStrengthChange(strength);

  const passwordStatus =
    strength < 20
      ? "ضعیف 😢"
      : strength <= 40
      ? "بهتر 😊"
      : strength <= 60
      ? "خوب 😁"
      : strength <= 80
      ? "عالییی 😍"
      : strength === 100 && "شکست ناپذیر 😎";

  return (
    <div className="space-y-3 text-xs text-right">
      <Progress
        size="sm"
        radius="sm"
        classNames={{
          base: "max-w-md",
          track: "drop-shadow-md border border-default",
          indicator: progressColor, // Apply the color dynamically
          label: "tracking-wider font-medium text-default-600",
          value: "text-foreground/60",
        }}
        label={`قدرت رمز : ${passwordStatus}`}
        value={strength} // Set the progress value based on the strength
      />

      <div className="flex flex-col gap-1">
        <p className={hasLowercase ? "text-green-600" : "text-red-600"}>
          {hasLowercase ? "✓" : "✗"} شامل یک حرف کوچک
        </p>
        <p className={hasUppercase ? "text-green-600" : "text-red-600"}>
          {hasUppercase ? "✓" : "✗"} شامل یک حرف بزرگ
        </p>
        <p className={hasNumber ? "text-green-600" : "text-red-600"}>
          {hasNumber ? "✓" : "✗"} شامل یک عدد
        </p>
        <p className={hasSpecialChar ? "text-green-600" : "text-red-600"}>
          {hasSpecialChar ? "✓" : "✗"} شامل یک کاراکتر خاص
        </p>
        <p className={isMinLength ? "text-green-600" : "text-red-600"}>
          {isMinLength ? "✓" : "✗"} حداقل 8 کاراکتر
        </p>
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
