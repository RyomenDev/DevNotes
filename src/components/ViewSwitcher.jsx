import { Button } from "@/components/ui/button";
import { Grid2X2, List } from "lucide-react";

const ViewSwitcher = ({ view, setView }) => {
  return (
    <div className="flex space-x-1 bg-secondary rounded-md p-1">
      <Button
        variant={view === "grid" ? "default" : "ghost"}
        size="sm"
        className="h-8 px-2"
        onClick={() => setView("grid")}
      >
        <Grid2X2 className="h-4 w-4 mr-1" />
        Grid
      </Button>

      <Button
        variant={view === "list" ? "default" : "ghost"}
        size="sm"
        className="h-8 px-2"
        onClick={() => setView("list")}
      >
        <List className="h-4 w-4 mr-1" />
        List
      </Button>
    </div>
  );
};

export default ViewSwitcher;
