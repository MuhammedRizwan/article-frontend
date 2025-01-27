import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import TitleAndDescription from './title_discription'
import ContentBlocks from './content_block'
import { useEffect, useState } from 'react'
import { Article } from '@/Interface/article'
import CategoriesInput from './categories'
import { Category } from '@/Interface/category'
import { all_active_categories } from '@/service/category'


interface CreateArticleFormDataProps {
  existingArticle?: Article
  onSubmit: (data: Article) => void
}

export default function ArticleFormData({ existingArticle, onSubmit }: CreateArticleFormDataProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const { control, handleSubmit, reset } = useForm<Article>({
    defaultValues: {
      _id: existingArticle?._id || '',
      title: existingArticle?.title || '',
      description: existingArticle?.description || '',
      contentBlocks: existingArticle?.contentBlocks || [],
      categoryIds: existingArticle?.categoryIds || [],
    },
  })

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await all_active_categories();
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (existingArticle) {
      reset({
        _id: existingArticle._id,
        title: existingArticle.title,
        description: existingArticle.description,
        contentBlocks: existingArticle.contentBlocks,
        categoryIds: existingArticle.categoryIds,
      })
    }
  }, [existingArticle, reset])

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className='bg-coolBlue-100'>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <TitleAndDescription control={control} />

            <ContentBlocks control={control} />

            <CategoriesInput control={control} categories={categories} />

            <Button type="submit" className="w-full sm:w-auto">
              {existingArticle ? 'Update Article' : 'Publish Article'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
