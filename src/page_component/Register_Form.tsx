import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import User from "@/Interface/user";
import { user_register } from "@/service/auth";
import { all_active_categories } from "@/service/category";
import { Category } from "@/Interface/category";

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      articlePreferences: [],
      dob: undefined,
    },
  });

  const [categories, setCategories] = useState<Category[]>(
    []
  );
  const preferences = watch("articlePreferences") || [];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await all_active_categories();
        if (response.success) {
          setCategories(response.data); // Adjust this based on the API response format
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (data: User) => {
    try {
      const response = await user_register(data);
      if (response.success) {
        console.log("Registration successful");
      } else {
        console.log("Registration failed");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <Card className="w-[350px] sm:w-[450px]">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Get started by filling in your details below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                placeholder="John"
                {...register("firstName", {
                  required: "First name is required",
                  minLength: 2,
                })}
              />
              <p className="text-red-500 text-xs h-4">
                {errors.firstName?.message || " "}
              </p>
            </div>
            <div>
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: 2,
                })}
              />
              <p className="text-red-500 text-xs h-4">
                {errors.lastName?.message || " "}
              </p>
            </div>
          </div>

          {/* Phone Field */}
          <div>
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              placeholder="+1234567890"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\+?[1-9]\d{1,14}$/,
                  message: "Invalid phone number",
                },
              })}
            />
            <p className="text-red-500 text-xs py-1 h-4">
              {errors.phone?.message || " "}
            </p>
          </div>

          {/* Email Field */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="johndoe@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: /^\S+@\S+\.\S+$/,
              })}
            />
            <p className="text-red-500 text-xs py-1 h-4">
              {errors.email?.message || " "}
            </p>
          </div>

          {/* Date of Birth Field */}
          <div>
            <Label>Date of birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full pl-3 text-left ${
                    !watch("dob") && "text-muted-foreground"
                  }`}
                >
                  {watch("dob")
                    ? format(watch("dob") as Date, "PPP")
                    : "Pick a date"}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={watch("dob")}
                  onSelect={(date) => setValue("dob", date || undefined)}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                />
              </PopoverContent>
            </Popover>
            <p className="text-red-500 text-xs py-1 h-4">
              {errors.dob?.message || " "}
            </p>
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              <p className="text-red-500 text-xs h-4">
                {errors.password?.message || ""}
              </p>
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              <p className="text-red-500 text-xs h-4">
                {errors.confirmPassword?.message || " "}
              </p>
            </div>
          </div>

          {/* Article Preferences */}
          <div>
            <Label>Article Preferences</Label>
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 xs:grid-cols-1 my-3">
              {categories.map((item) => (
                <div key={item._id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={preferences.includes(item._id as string)}
                    onCheckedChange={(checked) =>
                      setValue(
                        "articlePreferences",
                        checked
                          ? [...preferences, item._id as string]
                          : preferences.filter((pref) => pref !== item._id)
                      )
                    }
                  />
                  <Label>{item.name}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
