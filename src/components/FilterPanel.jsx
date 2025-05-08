import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Filter } from "lucide-react";

const FilterPanel = ({ onFilterChange }) => {
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState(null);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);

  const handleCategoryChange = (value) => {
    setCategory(value);
    onFilterChange({ category: value, priority, date });
  };

  const handlePriorityChange = (value) => {
    setPriority(value);
    onFilterChange({ category, priority: value, date });
  };

  const handleDateChange = (value) => {
    setDate(value);
    onFilterChange({ category, priority, date: value });
  };

  const clearFilters = () => {
    setCategory("");
    setPriority("");
    setDate(null);
    onFilterChange({ category: "", priority: "", date: null });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center text-xs"
          onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
        >
          <Filter className="h-4 w-4 mr-1" />
          {isFiltersExpanded ? "Hide filters" : "Show filters"}
        </Button>
      </div>

      {isFiltersExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Category</label>
            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All categories</SelectItem>
                <SelectItem value="Work">Work</SelectItem>
                <SelectItem value="Personal">Personal</SelectItem>
                <SelectItem value="Ideas">Ideas</SelectItem>
                <SelectItem value="Tasks">Tasks</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Priority</label>
            <Select value={priority} onValueChange={handlePriorityChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Any priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any priority</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateChange}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="md:col-span-3">
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="text-xs"
            >
              Clear all filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
