import { Category } from "./category";

export interface ContentBlock {
  _id?: string;
  type: "image" | "header" | "text" | "video";
  id: string;
  content?: string;
  cloudinaryId?: string;
}

export interface Article {
  _id?: string;
  userId: string;
  title: string;
  description: string;
  contentBlocks: ContentBlock[];
  categoryIds: string[] |Category[];
  is_active?: boolean;
  likes?: string[];
  dislikes?: string[];
  createdAt?: string;
}
