"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { useCampuses } from "@/customHooks/useCampuses"
import { toast } from "sonner"
import { usePrograms } from "@/customHooks/usePrograms"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCourses } from "@/customHooks/useCourse"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { CheckIcon } from "lucide-react"



const FormSchema = z.object({
  campus: z.string().min(1,'You have to select at least one program.'),
  programs:  z.string().min(1,'You have to select at least one program.'),
  courses:  z.string().min(1,'You have to select at least one program.'),
  currentFiles: z.array(z.string().min( 1, 'You have to select at least one file.'))

})

export default function CheckboxReactHookFormMultiple() {
  const form = useForm<z.infer<typeof FormSchema>>({
    
    resolver: zodResolver(FormSchema),
    defaultValues: {
  
  
      currentFiles: [],
    },
  })

  const campuses: Campus[] = useCampuses();
  const programs:Program[]= usePrograms(form.watch('campus'));
  const courses:Course[]= useCourses(form.watch('programs'));


  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.success(
      
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

      <FormField
  control={form.control}
  name="campus"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Campus</FormLabel>
      <Select onValueChange={field.onChange}  defaultValue={field.value} >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select a campus" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {campuses.map((campus) => (
            <SelectItem key={campus.$id} value={campus.$id}>
              {campus.name}, <span className='text-sm font-medium text-right'>{campus.location}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormDescription>
        Choose the campus for the slides.
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
<FormField
  control={form.control}
  name="programs"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="block">Program</FormLabel>
      <Popover >
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-full justify-between",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value
                ? programs.find((program) => program.$id === field.value)?.name
                : "Select a program"}
              <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="!w-full p-2">
          <Command>
            <CommandInput
              placeholder="Search program..."
              className="h-9"
            />
            <CommandEmpty>No program found.</CommandEmpty>
            <CommandGroup>
              {programs.map((program) => (
                <CommandItem
                  value={program.name}
                  key={program.$id}
                  onSelect={() => {
                    form.setValue("programs", program.$id);
                  }}
                >
                  {program.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      program.$id === field.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <FormDescription>
        Choose the program for the program.
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
        
        {/* <FormField
          control={form.control}
          name="programs"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Sidebar</FormLabel>
                <FormDescription>
                  Select the programs you want to display in the sidebar.
                </FormDescription>
              </div>
              {programs.map((program) => (
                <FormField
                  key={program.$id}
                  control={form.control}
                  name="programs"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={program.$id}
                        className="flex flex-row programs-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(program.$id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, program.$id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== program.$id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {program.name}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        /> */}

<FormField
  control={form.control}
  name="courses"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="block">Course</FormLabel>
      <Popover >
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-full justify-between",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value
                ? courses.find((course) => course.$id === field.value)?.name
                : "Select a program"}
              <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="!w-full p-2">
          <Command>
            <CommandInput
              placeholder="Search course..."
              className="h-9"
            />
            <CommandEmpty>No program found.</CommandEmpty>
            <CommandGroup>
              {courses.map((course) => (
                <CommandItem
                  value={course.name}
                  key={course.$id}
                  onSelect={() => {
                    form.setValue("courses", course.$id);
                  }}
                >
                  {course.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      course.$id === field.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <FormDescription>
        Choose the program for the course.
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
         
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
