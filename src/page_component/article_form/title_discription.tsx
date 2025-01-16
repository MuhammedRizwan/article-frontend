import { Controller, Control } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Article } from '@/Interface/article'

interface Props {
  control: Control<Article>
}

export default function TitleAndDescription({ control }: Props) {
  return (
    <div>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Controller
          name="title"
          control={control}
          rules={{ required: 'Title is required' }}
          render={({ field, fieldState }) => (
            <>
              <Input
                id="title"
                placeholder="Enter your article title"
                className="w-full"
                {...field}
              />
              {fieldState.error && (
                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
              )}
            </>
          )}
        />
      </div>

      <div className="space-y-2 mt-4">
        <Label htmlFor="description">Description</Label>
        <Controller
          name="description"
          control={control}
          rules={{ required: 'Description is required' }}
          render={({ field, fieldState }) => (
            <>
              <Textarea
                id="description"
                placeholder="Write a brief description of your article"
                className="min-h-[100px]"
                {...field}
              />
              {fieldState.error && (
                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
              )}
            </>
          )}
        />
      </div>
    </div>
  )
}
