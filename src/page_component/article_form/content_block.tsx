import { useState } from "react";
import { Control, Controller, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronUp, ChevronDown, X, Loader2 } from "lucide-react";
import { Article, ContentBlock } from "@/Interface/article";
import { uploadToCloudinary, deleteFromCloudinary } from "@/util/cloudinary";

interface Props {
  control: Control<Article>;
}

export default function ContentBlocks({ control }: Props) {
  const [uploading, setUploading] = useState<{ [key: number]: boolean }>({});

  const { fields, append, remove, move, update } = useFieldArray({
    control,
    name: "contentBlocks",
  });

  const addBlock = (type: "image" | "header" | "text" | "video") => {
    append({
      type,
      id: Math.random().toString(36).substr(2, 9),
      content: "",
      cloudinaryId: "",
    });
  };

  const handleFileUpload = async (
    file: File,
    index: number,
    onChange: (value: string) => void
  ) => {
    try {
      setUploading((prev) => ({ ...prev, [index]: true }));

      const resourceType = file.type.startsWith("image/") ? "image" : "video";
      const result = await uploadToCloudinary(file, resourceType);

      onChange(result.secure_url);
      const updatedBlock = {
        ...fields[index],
        content: result.secure_url,
        cloudinaryId: result.public_id,
      };
      update(index, updatedBlock);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading((prev) => ({ ...prev, [index]: false }));
    }
  };

  const handleRemove = async (index: number) => {
    const block = fields[index] as ContentBlock & { cloudinaryId?: string };
    if (
      block.cloudinaryId &&
      (block.type === "image" || block.type === "video")
    ) {
      try {
        await deleteFromCloudinary(block.cloudinaryId, block.type);
      } catch (error) {
        console.error("Error deleting from Cloudinary:", error);
      }
    }
    remove(index);
  };

  const renderBlockContent = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case "image":
        return (
          <Controller
            name={`contentBlocks.${index}.content`}
            control={control}
            rules={{ required: "Image is required" }}
            render={({ field, fieldState }) => (
              <div className="space-y-2 w-full">
                {field.value ? (
                  <img
                    src={field.value}
                    alt="Preview"
                    className="max-w-xs h-auto rounded"
                  />
                ) : (
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleFileUpload(file, index, field.onChange);
                      }
                    }}
                  />
                )}
                {uploading[index] && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Uploading...
                  </div>
                )}
                {fieldState.error && (
                  <p className="text-red-500 text-xs">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
        );
      case "video":
        return (
          <Controller
            name={`contentBlocks.${index}.content`}
            control={control}
            rules={{ required: "Video is required" }}
            render={({ field, fieldState }) => (
              <div className="space-y-2 w-full">
                {field.value ? (
                  <video controls className="max-w-xs h-auto rounded">
                    <source src={field.value} type="video/mp4" />
                  </video>
                ) : (
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleFileUpload(file, index, field.onChange);
                      }
                    }}
                  />
                )}
                {uploading[index] && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Uploading...
                  </div>
                )}
                {fieldState.error && (
                  <p className="text-red-500 text-xs">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
        );
      case "header":
        return (
          <Controller
            name={`contentBlocks.${index}.content`}
            control={control}
            rules={{ required: "Header text is required" }}
            render={({ field, fieldState }) => (
              <div>
                <Input {...field} placeholder="Enter header text" />
                {fieldState.error && (
                  <p className="text-red-500 text-xs">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
        );
      case "text":
        return (
          <Controller
            name={`contentBlocks.${index}.content`}
            control={control}
            rules={{ required: "Text content is required" }}
            render={({ field, fieldState }) => (
              <div>
                <Textarea {...field} placeholder="Enter your text content" />
                {fieldState.error && (
                  <p className="text-red-500 text-xs">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {fields.map((block, index) => (
        <div
          key={block.id}
          className="flex items-start gap-2 p-4 border rounded-lg"
        >
          <div className="flex-1" style={{marginTop: "3%"}}>
            {renderBlockContent(block as ContentBlock, index)}
          </div>
          <div className="flex flex-col gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => move(index, index - 1)}
              disabled={index === 0}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => move(index, index + 1)}
              disabled={index === fields.length - 1}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => handleRemove(index)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => addBlock("image")}
        >
          Add Image
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => addBlock("video")}
        >
          Add Video
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => addBlock("header")}
        >
          Add Header
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => addBlock("text")}
        >
          Add Text
        </Button>
      </div>
    </div>
  );
}
