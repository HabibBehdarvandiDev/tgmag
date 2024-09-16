import { Card, CardHeader } from "@nextui-org/react";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <div className="h-screen overflow-hidden flex flex-col items-center align-middle justify-center lg:flex-row">
      <div className="w-full h-full lg:w-2/5 p-4 flex items-center justify-center bg-white dark:bg-zinc-900">
        <Card className="w-full max-w-md shadow-none bg-transparent -mt-24">
          <CardHeader className="fle flex-col space-y-4">
            <h1 className="text-2xl font-bold text-primary">خوش برگشتی 😉</h1>
            <p className="text-pretty text-foreground">برای ورود وبسایت باید نام کاربری و رمز عبور خود را وارد کنید.</p>
          </CardHeader>
          <LoginForm />
        </Card>
      </div>

      <div className="hidden lg:block lg:w-3/5 bg-gradient-to-br from-red-500 to-red-800 w-full h-full">
        <div className="h-full flex items-center justify-center p-2">
          <div className="text-2xl text-white w-full h-full flex items-center justify-center">
            slider
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
