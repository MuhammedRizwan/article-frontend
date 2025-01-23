import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { update_user, user_detials } from "@/service/auth";
import { all_active_categories } from "@/service/category";
import { Category } from "@/Interface/category";
import User from "@/Interface/user";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const userId = useSelector((state: RootState) => state.user.user?._id);
  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const {
    handleSubmit,
    control,
    register,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      dob: undefined,
      articlePreferences: [],
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await user_detials(userId);
        reset(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    const fetchCategories = async () => {
      try {
        const response = await all_active_categories();
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchUser();
    fetchCategories();
  }, [reset, userId]);
  
    const articlePreferences = watch("articlePreferences");
    const allFormValues = watch();

  const onSubmit = async (values: User) => {
    try {
      if(allFormValues){
      const response = await update_user(values);
      reset(response.data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <Label>First Name</Label>
          <Input
            {...register("firstName", { required: "First name is required" })}
            disabled={!isEditing}
            className="border-coolBlue-500"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <Label>Last Name</Label>
          <Input
            {...register("lastName", { required: "Last name is required" })}
            disabled={!isEditing}
            className="border-coolBlue-500"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <Label>Phone</Label>
          <Input
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Phone number must be 10 digits",
              },
            })}
            className="border-coolBlue-500"
            disabled={!isEditing}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <Label>Email</Label>
          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            disabled={!isEditing}
            className="border-coolBlue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label>Date of Birth</Label>
          <Controller
            name="dob"
            control={control}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full pl-3 text-left font-normal"
                    disabled={!isEditing}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.dob && (
            <p className="text-red-500 text-sm">{errors.dob.message}</p>
          )}
        </div>

        <div>
          <Label>Article Preferences</Label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <label
                key={category._id}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <Input
                  type="checkbox"
                  value={category._id || ""}
                  checked={
                    category._id
                      ? articlePreferences.includes(category._id)
                      : false
                  } 
                  onChange={(e) => {
                    if (category._id) {
                      if (e.target.checked) {
                        setValue("articlePreferences", [
                          ...articlePreferences,
                          category._id,
                        ]);
                      } else {
                        setValue(
                          "articlePreferences",
                          articlePreferences.filter((c) => c !== category._id)
                        );
                      }
                    }
                  }}
                  className="border-coolBlue-500"
                  disabled={!isEditing}
                />
                <span>{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          {isEditing ? (
            <Button
              type="submit"
              variant="outline"
              className="bg-zinc-900 text-white"
            >
              Update Profile
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="bg-coolBlue-300 text-white hover:bg-coolBlue-500 hover:text-white"
            >
              Edit Profile
            </Button>
          )}
          <Link to="/change-password">
            <Button type="button" variant="link">
              Change Password
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
