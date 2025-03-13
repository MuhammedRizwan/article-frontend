import { Article } from "@/Interface/article";
import ArticleFormData from "@/page_component/article_form/main";
import { RootState } from "@/Redux/store";
import { create_article } from "@/service/article";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function CreateArticle() {
  const Navigate = useNavigate();
  const userId=useSelector((state: RootState)=>state.user.user?._id)
  const handleSubmit = async(data: Article) => {
    try {
      const response= await create_article(userId,data);
      if (response.success) { 
        Navigate('/my-article');
      }
    } catch (error) {
      console.error("Failed to create article:", error);
    }
  };

  return (
    <div className="min-h-screen bg-green-200">
      <main className="container mx-auto py-6">
        <ArticleFormData onSubmit={handleSubmit} />
      </main>
    </div>
  );
}
