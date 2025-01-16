import axiosInstance from "@/axios";
import { Article } from "@/Interface/article";

export const get_user_articles = async (id: string|undefined) => {
    try {
        const response = await axiosInstance.get(`/article/user/${id}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch articles:", error);
        throw new Error("Failed to fetch articles");
    }
}

export const create_article = async (userId: string|undefined,data: Article) => {
    try {
        const response = await axiosInstance.post(`/article/add/${userId}`, data);
        return response.data;
    } catch (error) {
        console.error("Failed to create article:", error);
        throw new Error("Failed to create article");
    }
}

export const update_article = async (data: Article) => {
    try {
        console.log(data)
        const response = await axiosInstance.put(`/article/edit/${data._id}`, data);
        return response.data;
    } catch (error) {
        console.error("Failed to update article:", error);
        throw new Error("Failed to update article");
    }
}

export const get_article_by_id = async (id: string) => {
    try {
        const response = await axiosInstance.get(`/article/${id}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch article:", error);
        throw new Error("Failed to fetch article");
    }
}

export const delete_article = async (id: string|undefined) => {
    try {
        const response = await axiosInstance.delete(`/article/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error("Failed to delete article:", error);
        throw new Error("Failed to delete article");
    }
}

export const block_article = async (id: string|undefined, is_active: boolean) => {
    try {
        console.log(is_active)
        const response = await axiosInstance.put(`/article/activate/${id}`, { is_active });
        return response.data;
    } catch (error) {
        console.error("Failed to block article:", error);
        throw new Error("Failed to block article");
    }
}
