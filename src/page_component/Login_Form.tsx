import { useState } from "react";
import { Mail, Lock, Phone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { user_login } from "@/service/auth";
import { useDispatch } from "react-redux";
import { setUser } from "@/Redux/user_reducer";
import { useNavigate } from "react-router-dom";

export interface LoginFormData {
  identifier: string;
  password: string;
}

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [usePhone, setUsePhone] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormData>({
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      setIsLoading(true);
      const response = await user_login(data);
      if (response.success) {
        dispatch(setUser(response.data));
        navigate("/home");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.log("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = () => {
    setUsePhone((prev) => !prev);
    setValue("identifier", "");
  };

  return (
    <Card className="w-[350px] shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Welcome back
        </CardTitle>
        <CardDescription className="text-center">
          Enter your {usePhone ? "phone" : "email"} to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="use-phone"
              checked={usePhone}
              onCheckedChange={handleToggle}
            />
            <Label
              htmlFor="use-phone"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Use phone number
            </Label>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="identifier"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {usePhone ? "Phone Number" : "Email"}
            </Label>
            <div className="relative">
              <Controller
                name="identifier"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Input
                    id="identifier"
                    type={usePhone ? "tel" : "email"}
                    placeholder={usePhone ? "+1234567890" : "name@example.com"}
                    {...field}
                    className="pl-10"
                  />
                )}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                {usePhone ? (
                  <Phone className="h-5 w-5 mb-3 text-gray-400" />
                ) : (
                  <Mail className="h-5 w-5 mb-3 text-gray-400" />
                )}
              </div>
                <p className="text-red-500 text-xs h-5 ">
                  {errors.identifier?.message || " "}
                </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Password
            </Label>
            <div className="relative">
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                }}
                render={({ field }) => (
                  <Input
                    id="password"
                    type="password"
                    {...field}
                    className="pl-10"
                  />
                )}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="h-5 w-5 mb-3 text-gray-400" />
              </div>
                <p className="text-red-500 text-xs h-4">
                  {errors.password?.message || " "}
                </p>
            </div>
          </div>

          {isLoading ? (
            <Button disabled className="w-full">
              <Loader2 className="animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          )}
        </form>
        <div className="mt-4 text-center text-sm">
          <a href="#" className="text-blue-500 hover:underline">
            Forgot password?
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
