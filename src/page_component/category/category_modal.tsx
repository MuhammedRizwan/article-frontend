import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Category } from '@/Interface/category'

interface CategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (category: Category) => void
  category?: Category
}

export function CategoryModal({ isOpen, onClose, onSave, category }: CategoryModalProps) {
  const [name, setName] = useState('')
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    if (category) {
      setName(category.name)
      setIsActive(category.is_active)
    } else {
      setName('')
      setIsActive(true)
    }
  }, [category])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
        _id: category?._id, name, is_active: isActive,
        createdAt: new Date(),
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{category ? 'Edit Category' : 'Add New Category'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="is_active" className="text-right">
                Active
              </Label>
              <Switch
                id="is_active"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{category ? 'Update' : 'Add'} Category</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

