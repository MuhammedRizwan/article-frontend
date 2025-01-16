import axiosInstance from "@/axios";
import { Category } from "@/Interface/category";

export const getCategories = async () => {
    try {
        const response = await axiosInstance.get("/category");
        return response.data;
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        throw new Error("Failed to fetch categories");
    }
}
export const createCategory = async (data: Category) => {
  try {
    const response = await axiosInstance.post("/category/add", data);
    return response.data;
  } catch (error) {
    console.error("Failed to create category:", error);
    throw new Error("Failed to create category");
  }
}

export const updateCategory = async (data: Category) => {
  try {
    const response = await axiosInstance.put(`/category//update/${data._id}`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to update category:", error);
    throw new Error("Failed to update category");
  }
}

export const deleteCategory = async (id: string|undefined) => {
  try {
    const response = await axiosInstance.delete(`/category/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete category:", error);
    throw new Error("Failed to delete category");
  }
}

export const all_active_categories = async () => {
  try {
    const response = await axiosInstance.get("/category/active");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch active categories:", error);
    throw new Error("Failed to fetch active categories");
  }
}

export const activateAndDeactivate_category = async (id: string|undefined, is_active: boolean) => {
  try {
    const response = await axiosInstance.put(`/category/activate/${id}`,{is_active});
    return response.data;
  } catch (error) {
    console.error("Failed to activate/deactivate category:", error);
    throw new Error("Failed to activate/deactivate category");
  }
}