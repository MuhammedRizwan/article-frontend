import axiosInstance from "@/axios";
import { Article } from "@/Interface/article";

export const get_user_prefered_articles = async (userId: string|undefined) => {
    try {
        const response = await axiosInstance.get(`/article/prefered/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch articles:", error);
        throw new Error("Failed to fetch articles");
    }
}

export const get_user_articles = async (userId: string|undefined) => {
    try {
        const response = await axiosInstance.get(`/article/user/${userId}`);
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
        const response = await axiosInstance.put(`/article/edit`, data);
        return response.data;
    } catch (error) {
        console.error("Failed to update article:", error);
        throw new Error("Failed to update article");
    }
}

export const get_article_by_id = async (articleId: string|undefined) => {
    try {
        const response = await axiosInstance.get(`/article/${articleId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch article:", error);
        throw new Error("Failed to fetch article");
    }
}

export const delete_article = async (articleId: string|undefined) => {
    try {
        const response = await axiosInstance.delete(`/article/delete/${articleId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to delete article:", error);
        throw new Error("Failed to delete article");
    }
}

export const block_article = async (articleId: string|undefined, is_active: boolean) => {
    try {
        const response = await axiosInstance.put(`/article/activate/${articleId}`, { is_active });
        return response.data;
    } catch (error) {
        console.error("Failed to block article:", error);
        throw new Error("Failed to block article");
    }
}

export const likeArticle = async (articleId: string|undefined, userId: string|undefined) => {
    try {
        const response = await axiosInstance.put(`/article/like/${articleId}`, { userId });
        return response.data;
    } catch (error) {
        console.error("Failed to like article:", error);
        throw new Error("Failed to like article");
    }
}

export const dislikesArticle = async (articleId: string|undefined, userId: string|undefined) => {
    try {
        const response = await axiosInstance.put(`/article/dislike/${articleId}`, { userId });
        return response.data;
    } catch (error) {
        console.error("Failed to dislike article:", error);
        throw new Error("Failed to dislike article");
    }
}
