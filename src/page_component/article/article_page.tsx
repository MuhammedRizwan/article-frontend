import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Article, ContentBlock } from "@/Interface/article";
import { Category } from "@/Interface/category";
import { get_article_by_id } from "@/service/article";
import { all_active_categories } from "@/service/category";
import { useParams } from "react-router-dom";

export default function ArticleDisplay() {
  const { Id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await get_article_by_id(Id);
        setArticle(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await all_active_categories();
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchArticle();
    fetchCategories();
  }, [Id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  const renderContentBlock = (block: ContentBlock) => {
    switch (block.type) {
      case "image":
        return (
          <div key={block.id} className="my-6 flex justify-center">
            <img
              src={block.content || "/placeholder.svg?height=400&width=600"}
              alt={block.content || "Article image"}
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
        );
      case "header":
        return (
          <h2 key={block.id} className="text-2xl font-semibold mt-8 mb-4">
            {block.content}
          </h2>
        );
      case "text":
        return (
          <p key={block.id} className="mb-4">
            {block.content}
          </p>
        );
      case "video":
        return (
          <div key={block.id} className="my-6 flex justify-center">
            <video
              src={block.content}
              controls
              className="w-2/3 rounded-lg"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardContent className="p-6">
          <article className="prose prose-slate max-w-none dark:prose-invert">
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <span>
                {article.createdAt &&
                  format(new Date(article.createdAt), "MMMM dd, yyyy")}
              </span>
              <span>•</span>
              {article.categoryIds.map((categoryId) => {
                const category = categories.find((c) => c._id === categoryId);
                return (
                  <Badge key={category?._id} variant="secondary">
                    {category?.name || "Uncategorized"}
                  </Badge>
                );
              })}
            </div>

            <section className="mb-8">
              <p className="text-lg mb-4">{article.description}</p>
            </section>

            {article.contentBlocks.map(renderContentBlock)}

            <div className="mt-8 flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {article.likes?.length} likes • {article.dislikes?.length}{" "}
                dislikes
              </span>
            </div>
          </article>
        </CardContent>
      </Card>
    </div>
  );
}
