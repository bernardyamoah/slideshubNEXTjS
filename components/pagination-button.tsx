import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

interface PaginationProps {
  pageCount: number;
  activePage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ pageCount, activePage, onPageChange }: PaginationProps) {
  const prev = () => {
    if (activePage === 1) return;

    onPageChange(activePage - 1);
  };

  const next = () => {
    if (activePage === pageCount) return;

    onPageChange(activePage + 1);
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        color="blue-gray"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={activePage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {Array.from({ length: pageCount }, (_, index) => (
          <IconButton
            key={index + 1}
            variant={activePage === index + 1 ? "filled" : "text"}
            color={activePage === index + 1 ? "blue" : "blue-gray"}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        color="blue-gray"
        className="flex items-center gap-2"
        onClick={next}
        disabled={activePage === pageCount}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
