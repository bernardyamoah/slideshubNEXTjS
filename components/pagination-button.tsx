
import { IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
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
    <div className="flex items-center gap-4 my-10 justify-center mx-auto max-w-2xl">
      <Button
      
        color="blue-gray"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={activePage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-1 sm:gap-2">
        {Array.from({ length: pageCount }, (_, index) => (
          <IconButton
            key={index + 1}
            size="sm"
            variant={activePage === index + 1 ? "filled" : "text"}
            className={activePage === index + 1 ? "bg-emerald-500" : "text-emerald-500"}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </IconButton>
        ))}
      </div>
      <Button
      
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
