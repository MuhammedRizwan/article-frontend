import { Article } from "@/Interface/article";
import CreateArticleFormData from "@/page_component/article_form/main";
import LoadingSpinner from "@/page_component/Spinner";
import { get_article_by_id, update_article } from "@/service/article";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
;

export default function EditArticlePage() {
  const{ Id }=useParams(); 
  const Navigate=useNavigate();
  const [existingArticle, setExistingArticle] = useState<Article | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    if (!Id) {
      setError("Article ID is missing in the URL.");
      setLoading(false);
      return;
    }

    const fetchArticle = async () => {
      try {
        const response = await get_article_by_id(Id);
        setExistingArticle(response.data);
      } catch (error) {
        console.error("Failed to fetch article:", error);
        setError("Failed to fetch the article. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [Id]);

  const handleSubmit = async (data: Article) => {
    try {
      console.log(data);
      const response= await update_article(data);
      if (response.success) {
        console.log("Article updated successfully");
        Navigate("/my-article");
      }
    } catch (error) {
      console.error("Failed to update article:", error);
    }
  };

  if (loading) {
    return (
     <LoadingSpinner/>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-6">
        {existingArticle ? (
          <CreateArticleFormData
            existingArticle={existingArticle}
            onSubmit={handleSubmit}
          />
        ) : (
          <p className="text-center">No article found with the provided ID.</p>
        )}
      </main>
    </div>
  );
}
