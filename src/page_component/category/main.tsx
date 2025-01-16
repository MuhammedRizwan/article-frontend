import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CategoryModal } from "./category_modal";
import { Category } from "@/Interface/category";
import {
  activateAndDeactivate_category,
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "@/service/category";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleAddCategory = () => {
    setEditingCategory(undefined);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleSaveCategory = async (category: Category) => {
    if (category._id) {
      const response = await updateCategory(category);
      if (response.success) {
        setCategories(
          categories.map((c) => (c._id === category._id ? category : c))
        );
      }
    } else {
      const response = await createCategory(category);
      if (response.success) {
        setCategories([response.data, ...categories]);
      }
    }
    setIsModalOpen(false);
  };

  const handleblockCategory = async (category: Category) => {
    try {
      const response = await activateAndDeactivate_category(category._id,
        !category.is_active);
      if (response.success) {
        setCategories(
          categories.map((c) => (c._id === category._id ? response.data : c))
        );
      }
    } catch (error) {
      console.error("Failed to block/unblock category:", error);
    }
  };

  const handleDeleteCategory = async (category: Category) => {
    try {
      const response = await deleteCategory(category._id);
      if (response.success) {
        setCategories(categories.filter((c) => c._id !== category._id));
      }
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Categories</CardTitle>
        <Button onClick={handleAddCategory}>Add Category</Button>
      </CardHeader>
      <CardContent>
        {categories.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No categories available.</p>
            <Button onClick={handleAddCategory} className="mt-4">
              Add Your First Category
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
                <TableHead>Edit</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category._id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <Badge
                      className="min-w-16"
                      variant={category.is_active ? "secondary" : "default"}
                    >
                      {category.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(category.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      className="w-16"
                      variant="outline"
                      size="sm"
                      onClick={() => handleblockCategory(category)}
                    >
                      {category.is_active ? "Block" : "Unblock"}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditCategory(category)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteCategory(category)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCategory}
        category={editingCategory}
      />
    </Card>
  );
}
