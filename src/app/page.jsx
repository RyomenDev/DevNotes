"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import FilterPanel from "@/components/FilterPanel";
import NoteCard from "@/components/NoteCard";
import AddNoteDialog from "@/components/AddNoteDialog";
import ViewSwitcher from "@/components/ViewSwitcher";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { toast } from "sonner";

// Sample data
const initialNotes = [
  {
    id: "1",
    title: "Welcome to Memo Board",
    content:
      "This is a sample note. You can create, edit, and organize your notes here!",
    priority: "medium",
    category: "Personal",
    date: new Date(2023, 4, 15).toISOString(),
  },
  {
    id: "2",
    title: "Project Ideas",
    content:
      "1. Create a mobile app\n2. Design a new website\n3. Learn a new programming language",
    priority: "high",
    category: "Work",
    date: new Date(2023, 4, 10).toISOString(),
  },
  {
    id: "3",
    title: "Shopping List",
    content: "- Milk\n- Eggs\n- Bread\n- Fruits",
    priority: "low",
    category: "Personal",
    date: new Date(2023, 4, 5).toISOString(),
  },
  {
    id: "4",
    title: "Shopping List-2",
    content: "- Milk\n- Eggs\n- Bread\n- Fruits",
    priority: "low",
    category: "Personal",
    date: new Date(2023, 4, 5).toISOString(),
  },
  {
    id: "5",
    title: "Shopping List-3",
    content: "- Milk\n- Eggs\n- Bread\n- Fruits",
    priority: "low",
    category: "Personal",
    date: new Date(2023, 4, 5).toISOString(),
  },
];

// Sortable note component
const SortableNote = ({ note, onDelete, onEdit }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: note.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="h-full">
      <NoteCard
        note={note}
        onDelete={onDelete}
        onEdit={onEdit}
        dragListeners={listeners} // only drag icon listens
      />
    </div>
  );
};

const HomePage = ({ logout }) => {
  const [notes, setNotes] = useState([]);
  const [view, setView] = useState("grid");
  const [filters, setFilters] = useState({
    category: "",
    priority: "",
    date: null,
  });

  // Initialize notes from localStorage or use sample data
  useEffect(() => {
    const savedNotes = localStorage.getItem("memoNotes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      setNotes(initialNotes);
    }
  }, []);

  // Save notes to localStorage when they change
  useEffect(() => {
    localStorage.setItem("memoNotes", JSON.stringify(notes));
  }, [notes]);

  // Setup DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Filter notes based on selected filters
  const filteredNotes = notes.filter((note) => {
    const matchesCategory =
      !filters.category || note.category === filters.category;
    const matchesPriority =
      !filters.priority || note.priority === filters.priority;

    let matchesDate = true;
    if (filters.date) {
      const noteDate = new Date(note.date);
      const filterDate = new Date(filters.date);
      matchesDate = noteDate.toDateString() === filterDate.toDateString();
    }

    return matchesCategory && matchesPriority && matchesDate;
  });

  const handleAddNote = (newNote) => {
    setNotes([newNote, ...notes]);
    toast.success("Note added successfully");
  };

  const handleDeleteNote = (id) => {
    // console.log("Deleting note with id:", id);
    setNotes(notes.filter((note) => note.id !== id));
    toast.success("Note deleted");
  };

  const handleEditNote = (editedNote) => {
    // console.log("OnEdit: ", editedNote);

    setNotes(
      notes.map((note) => (note.id === editedNote.id ? editedNote : note))
    );
    toast.success("Note updated");
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setNotes((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header logout={logout} />

      <main className="container mx-auto px-4 py-6">
        <FilterPanel onFilterChange={setFilters} />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {filteredNotes.length === 0
              ? "No notes found"
              : filteredNotes.length === 1
              ? "1 note"
              : `${filteredNotes.length} notes`}
          </h2>

          <ViewSwitcher view={view} setView={setView} />
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={filteredNotes.map((note) => note.id)}
            strategy={
              view === "grid"
                ? rectSortingStrategy
                : verticalListSortingStrategy
            }
          >
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  : "flex flex-col space-y-4"
              }
            >
              {filteredNotes.map((note) => (
                <SortableNote
                  key={note.id}
                  note={note}
                  onDelete={handleDeleteNote}
                  onEdit={handleEditNote}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </main>

      <AddNoteDialog onAddNote={handleAddNote} />
    </div>
  );
};

export default HomePage;
