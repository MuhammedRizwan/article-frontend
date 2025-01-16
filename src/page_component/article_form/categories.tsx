import { Controller, Control } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Article } from "@/Interface/article";
import { Category } from "@/Interface/category";

interface Props {
  control: Control<Article>;
  categories: Category[];
}

export default function CategoriesInput({ control, categories }: Props) {
  console.log(categories);

  return (
    <div className="space-y-2">
      <Label htmlFor="categoryIds">Categories (max 3)</Label>
      <Controller
        name="categoryIds"
        control={control}
        defaultValue={[] as string[]}
        rules={{
          validate: (value) =>
            Array.isArray(value) && value.length <= 3 || "You can select up to 3 categories only",
        }}
        render={({ field, fieldState }) => (
          <>
            <div className="flex flex-wrap gap-4">
              {categories.map((category: Category) => (
                <div key={category._id} className="flex items-center gap-2">
                  <Checkbox
                    id={`category-${category._id}`}
                    checked={(field.value as string[]).includes(category._id as string)}
                    onCheckedChange={(checked: boolean) => {
                      if (checked) {
                        if ((field.value as string[]).length < 3) {
                          field.onChange([...(field.value as string[]), category._id]);
                        }
                      } else {
                        field.onChange(
                          (field.value as string[]).filter((id) => id !== category._id)
                        );
                      }
                    }}
                  />
                  <Label 
                    htmlFor={`category-${category._id}`} 
                    className="text-sm whitespace-nowrap cursor-pointer"
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
            {fieldState.error && (
              <p className="text-red-500 text-sm mt-2">{fieldState.error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
}