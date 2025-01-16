import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Edit, Ban } from "lucide-react";
import { Article } from "@/Interface/article";
import { Link } from "react-router-dom";
import { block_article, delete_article, get_user_articles } from "@/service/article";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { Category } from "@/Interface/category";

export default function ArticleList() {
  const userId = useSelector((state: RootState) => state.user.user?._id);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await get_user_articles(userId);
      setArticles(response.data);
    };

    fetchArticles();
  }, [userId]);

  const handleBlockArticle = async (article: Article) => {
    try {
      const response = await block_article(article._id, !article.is_active);
      console.log(response);
      if (response.success) {
        setArticles(
          articles.map((a) => (a._id === article._id ? response.data : a))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteArticle = async (article: Article) => {
    try {
      const response = await delete_article(article._id);  
      console.log(response);
      if (response.success) {
        setArticles(articles.filter((a) => a._id !== article._id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Articles</h1>
        {articles.length > 0 && (
          <Link to="/create-article">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Article
            </Button>
          </Link>
        )}
      </div>
      {articles.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Card key={article._id} className="flex flex-col">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <img
                      src={
                        article.contentBlocks.find(
                          (block) => block.type === "image"
                        )?.content || "/placeholder.svg?height=96&width=96"
                      }
                      alt={article.title}
                      className="rounded-md w-28 h-28 object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold mb-2">
                      {article.title}
                    </h2>
                    <p className="text-sm text-gray-500 mb-2">
                      {article.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {article.categoryIds.map((categoryId) => (
                        <Badge
                          key={(categoryId as Category)._id}
                          variant="secondary"
                        >
                          {(categoryId as Category).name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                    <Link to={`/edit-article/${article._id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                  </Link>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center p-4 mt-auto">
                <div className="flex space-x-2">
                  <Badge variant="outline">{article.likes?.length} Likes</Badge>
                  <Badge variant="outline">
                    {article.dislikes?.length} Dislikes
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteArticle(article)}
                  >
                    <Ban className="mr-2 h-4 w-4" /> delete
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBlockArticle(article)}
                  >
                    <Ban className="mr-2 h-4 w-4" /> {article.is_active ? "Block" : "Unblock"}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold mb-4">No articles found</h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added any articles yet. Start by creating
            your first article!
          </p>
          <Link to="/create-article">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add First Article
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
