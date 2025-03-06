import { useState } from "react";
import { Button, Input } from "../../index";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../Select";
import { Search } from "lucide-react";

export function SearchFilters({
  filterType,
  setFilterType,
  filterQuery,
  setFilterQuery,
  onSearch,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div className="space-y-4">
      <Select value={filterType} onValueChange={setFilterType}>
        <SelectTrigger className="border-amber-200 focus:border-amber-500">
          <SelectValue placeholder="Filter by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="title">Title</SelectItem>
          <SelectItem value="author">Author</SelectItem>
          <SelectItem value="genre">Genre</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex space-x-2">
        <div className="relative flex-grow">
          <Input
            placeholder={`Search by ${filterType}...`}
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10 border-amber-200 focus:border-amber-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        <Button onClick={onSearch} className="bg-amber-800 hover:bg-amber-900 text-white">
          Search
        </Button>
      </div>
    </div>
  );
}
