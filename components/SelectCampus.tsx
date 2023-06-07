import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { getCampus } from "@/lib/getCampus"

export default function SelectCampus() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [campuses, setCampuses] = useState<any[]>([]); // Initialize as an empty array

  useEffect(() => {
    async function fetchCampuses() {
      try {
        const response = await getCampus();
        setCampuses(response);
      } catch (error) {
        console.log('Error fetching campuses:', error);
      }
    }

    fetchCampuses();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? campuses.find((campus) => campus.$id === value)?.name
            : "Select campus..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search campus..." />
          <CommandEmpty>No campuses found.</CommandEmpty>
          <CommandGroup>
            {campuses.map((campus) => (
              <CommandItem
                key={campus.$id}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === campus.$id ? "opacity-100" : "opacity-0"
                  )}
                />
                {campus.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

  {/* Select campus */}
                  
//   <Label htmlFor="campus">Programs</Label>
//   <Select   onValueChange={handleSelectChange}>
// <SelectTrigger className="w-full">
// <SelectValue placeholder="Select Program"/>
// </SelectTrigger>


// <SelectContent>


// <SelectGroup>

// {programs.map((program) => (
// <SelectItem key={program.$id} value={program.$id} >{program.name}</SelectItem>
// ))}


// </SelectGroup>

// </SelectContent>

// </Select>

