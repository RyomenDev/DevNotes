import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Edit, Trash2 } from "lucide-react";

const NoteCard = ({ note, onDelete, onEdit }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedNote, setEditedNote] = useState({ ...note });

  const priorityColors = {
    high: "priority-high",
    medium: "priority-medium",
    low: "priority-low",
  };

  const handleSave = () => {
    onEdit(editedNote);
    setIsDialogOpen(false);
  };

  return (
    <>
      <div
        className={`note-card ${
          priorityColors[note.priority]
        } flex flex-col h-full`}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg">{note.title}</h3>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setIsDialogOpen(true)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-destructive"
              onClick={() => onDelete(note.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-grow mb-3">
          <p className="text-sm text-gray-600 whitespace-pre-wrap">
            {note.content}
          </p>
        </div>

        <div className="flex justify-between items-center mt-auto pt-2 text-xs text-gray-500">
          <div className="bg-secondary px-2 py-1 rounded">{note.category}</div>
          <div>{format(new Date(note.date), "MMM dd, yyyy")}</div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Note</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                value={editedNote.title}
                onChange={(e) =>
                  setEditedNote({ ...editedNote, title: e.target.value })
                }
                className="w-full"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="content" className="text-sm font-medium">
                Content
              </label>
              <Textarea
                id="content"
                value={editedNote.content}
                onChange={(e) =>
                  setEditedNote({ ...editedNote, content: e.target.value })
                }
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="priority" className="text-sm font-medium">
                  Priority
                </label>
                <Select
                  value={editedNote.priority}
                  onValueChange={(value) =>
                    setEditedNote({ ...editedNote, priority: value })
                  }
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Category
                </label>
                <Select
                  value={editedNote.category}
                  onValueChange={(value) =>
                    setEditedNote({ ...editedNote, category: value })
                  }
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Work">Work</SelectItem>
                    <SelectItem value="Personal">Personal</SelectItem>
                    <SelectItem value="Ideas">Ideas</SelectItem>
                    <SelectItem value="Tasks">Tasks</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NoteCard;
