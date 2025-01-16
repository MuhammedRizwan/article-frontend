import axiosInstance from "@/axios";
import User from "@/Interface/user";
import { PasswordForm } from "@/page_component/change_password_Form";
import { LoginFormData } from "@/page_component/Login_Form";

export const user_login = async (data: LoginFormData) => {
  try {
    const response = await axiosInstance.post("/login", data);
    return response.data;
  } catch (error) {
    console.error("Failed to login:", error);
    throw new Error("Failed to login");
  }
};

export const user_register = async (data:User) => {
  try {
    const response = await axiosInstance.post("/register", data);
    return response.data;
  } catch (error) {
    console.error("Failed to register:", error);
    throw new Error("Failed to register");
  }
};

export const user_detials = async (id: string|undefined) => {
  try {
    const response = await axiosInstance.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to get user details:", error);
    throw new Error("Failed to get user details");
  }
};

export const update_user = async (data:User) => {
  try {
    const response = await axiosInstance.put(`/update/${data._id}`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to update user:", error);
    throw new Error("Failed to update user");
  }
};

export const change_password = async (id: string|undefined,data:PasswordForm) => {
  try {
    const response = await axiosInstance.put(`/change-password/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to change password:", error);
    throw new Error("Failed to change password");
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.get("/logout");
    return response.data;
  } catch (error) {
    console.error("Failed to logout:", error);
    throw new Error("Failed to logout");
  }
};
