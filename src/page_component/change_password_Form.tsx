import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RootState } from "@/Redux/store";
import { useSelector } from "react-redux";
import { change_password } from "@/service/auth";
import { useNavigate } from "react-router-dom";

export type PasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ChangePasswordPage() {
    const userId=useSelector((state: RootState)=>state.user.user?._id)
    const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<PasswordForm>();

  const onSubmit = async (values: PasswordForm) => {
    try {
      const response = await change_password(userId,values);
      if (response.success) {
          navigate(-1);
      }
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Change Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>Current Password</Label>
          <Input
            type="password"
            {...register("currentPassword", {
              required: "Current password is required",
            })}
          />
          {errors.currentPassword && (
            <p className="text-red-500 text-sm">
              {errors.currentPassword.message}
            </p>
          )}
        </div>
        <div>
          <Label>New Password</Label>
          <Input
            type="password"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
          )}
        </div>
        <div>
          <Label>Confirm New Password</Label>
          <Input
            type="password"
            {...register("confirmPassword", {
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
              </p>
      )}
    </div>
    <Button type="submit">Change Password</Button>
  </form>
</div>
  )
}