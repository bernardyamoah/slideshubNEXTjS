

import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
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
    // <div className="flex items-center gap-4 py-10 justify-center mx-auto max-w-2xl">
    //   <Button
      
    //     color="blue-gray"
    //     className="flex items-center gap-2"
    //     onClick={prev}
    //     disabled={activePage === 1}
    //   >
    //     <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> 
    //   </Button>
    //   <div className="flex items-center gap-1 sm:gap-2">
    //   <p  className="font-normal">
    //     Page {activePage} of{" "}
    //     <strong >{pageCount}</strong>
    //   </p>
    //   </div>
    //   <Button
      
      
    //     className="flex items-center gap-2"
    //     onClick={next}
    //     disabled={activePage === pageCount}
    //   >
      
    //     <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
    //   </Button>
    // </div>
    <div className="mt-5 flex items-center justify-between px-2">
    {/* <div className="flex-1 text-sm text-muted-foreground">
      {table.getFilteredSelectedRowModel().rows.length} of{" "}
      {table.getFilteredRowModel().rows.length} row(s) selected.
    </div> */}
    <div className="flex items-center space-x-6 lg:space-x-8 mx-auto">
  
      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {activePage } of{" "}
        {pageCount}
      </div>
      <div className="flex items-center space-x-2">
        
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={prev}
           disabled={activePage === 1}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={next}
          disabled={activePage === pageCount}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        
      </div>
    </div>
  </div>
  );
}
