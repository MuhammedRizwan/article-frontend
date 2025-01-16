import { Article } from "@/Interface/article";
import ArticleFormData from "@/page_component/article_form/main";
import { RootState } from "@/Redux/store";
import { create_article } from "@/service/article";
import { useSelector } from "react-redux";

export default function CreateArticle() {
  const userId=useSelector((state: RootState)=>state.user.user?._id)
  const handleSubmit = async(data: Article) => {
    try {
      const response= await create_article(userId,data);
      if (response.success) { 
        console.log("Article created successfully");
      }
    } catch (error) {
      console.error("Failed to create article:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-6">
        <ArticleFormData onSubmit={handleSubmit} />
      </main>
    </div>
  );
}
