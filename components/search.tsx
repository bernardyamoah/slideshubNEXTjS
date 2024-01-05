import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Search({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <Card className="max-w-xl mx-auto">
      <CardContent className="mt-5">
        <CardDescription className="mb-4">
          <CardTitle>Search Books</CardTitle>
        </CardDescription>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search for books"
          />
          <Button type="submit">Search</Button>
        </form>
      </CardContent>
    </Card>
  );
}
