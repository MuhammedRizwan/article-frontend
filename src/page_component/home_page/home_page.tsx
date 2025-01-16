"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, ThumbsDown, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Article } from "@/Interface/article";
import { useEffect, useState } from "react";
import { dislikesArticle, get_user_prefered_articles, likeArticle } from "@/service/article";
import { RootState } from "@/Redux/store";
import { useSelector } from "react-redux";
import { Category } from "@/Interface/category";

export default function HomePage() {
  const userId = useSelector((state: RootState) => state.user.user?._id);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      if (!userId) return;
      const response = await get_user_prefered_articles(userId);
      if (response) {
        setArticles(response.data);
      }
    };

    fetchArticles();
  }, [userId]);
  const handleLike = async (articleId: string|undefined) => {
    if (!userId) return; 
    const response = await likeArticle(articleId, userId);
    if (response?.success) {
      setArticles((prev) =>
        prev.map((article) =>
          article._id === articleId
            ? { ...article, likes: response.data.likes, dislikes: response.data.dislikes }
            : article
        )
      );
    }
  };

  const handleDislike = async (articleId: string|undefined) => {
    if (!userId) return; 
    const response = await dislikesArticle(articleId, userId);
    if (response?.success) {
      setArticles((prev) =>
        prev.map((article) =>
          article._id === articleId
            ? { ...article, likes: response.data.likes, dislikes: response.data.dislikes }
            : article
        )
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Quote Section */}
      <section className="relative mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50 opacity-10 rounded-3xl" />
        <div className="relative max-w-4xl mx-auto text-center px-4 py-16">
          <blockquote className="text-3xl md:text-4xl font-serif italic mb-6">
            "Reading is the basic tool in the living of a good life."
          </blockquote>
          <cite className="text-lg text-muted-foreground">
            - Mortimer J. Adler
          </cite>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Articles</h2>
          <Link to="/articles">
            <Button variant="ghost">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Card key={article._id} className="group overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={
                      article.contentBlocks.find(
                        (block) => block.type === "image"
                      )?.content || "/placeholder.svg?height=400&width=600"
                    }
                    alt={article.title}
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {article.categoryIds.map((cat) => (
                      <Badge variant="secondary">
                        {(cat as Category).name}
                      </Badge>
                    ))}
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      {article.createdAt &&
                        new Date(article.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                    <Link
                      to={`/articles/${article._id}`}
                      className="hover:text-primary"
                    >
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Button
                      variant="ghost"
                        className={`flex items-center text-sm text-muted-foreground ${
                          article.likes?.includes(userId as string) ? "text-blue-500 hover:text-blue-600" : ""}`}
                        onClick={() => handleLike(article._id)}
                      >
                        <ThumbsUp className="h-3 w-3" />
                        {article.likes?.length} likes
                      </Button>
                      <Button
                        variant="ghost"
                        className={`flex items-center text-sm text-muted-foreground ${
                          article.dislikes?.includes(userId as string) ? "text-red-500 hover:text-red-600" : ""
                        }`}
                        onClick={() => handleDislike(article._id)}
                      >
                        <ThumbsDown className="h-3 w-3" />
                        {article.dislikes?.length} dislikes
                      </Button>
                    </div>
                    <Link to={`/articles/${article._id}`}>
                      <Button variant="ghost" size="sm">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
