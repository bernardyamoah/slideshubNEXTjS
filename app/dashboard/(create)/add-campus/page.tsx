'use client'

import { useForm } from "react-hook-form";
import { z,  } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createCampus } from "@/lib/functions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define the form schema using zod
const campusFormSchema = z.object({
    name: z.string({
        required_error: "Campus name is required!",
      }),
  location: z.string({
    required_error: "Campus location is required!",
  }),
 
  
})
export default function AddCampus() {
    const form = useForm<z.infer<typeof campusFormSchema>>({
        resolver: zodResolver(campusFormSchema),
        defaultValues: {
          name: '',
          location:'', 
        },
      });

      const { errors } = form.formState;
  const { control,handleSubmit ,reset} = form;

  async function onSubmit(data: z.infer<typeof campusFormSchema>) {
   
 
    await createCampus(data);
      reset();
   
    }

  
  return (
    <Form {...form} >
   
   <Card className="max-w-xl mx-auto mb-10" >
     <CardHeader>
        <CardTitle>
            Add Campus 
        </CardTitle>
     </CardHeader>
     <CardContent>
     <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
    <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <div>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter campus name" {...field} />
            </FormControl>
            {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
          </div>
        )}
      />

      <FormField
        control={control}
        name="location"
        render={({ field }) => (
          <div>
            <FormLabel>Location</FormLabel>
            <FormControl>
          
              <Input placeholder="Enter location" {...field} />
            </FormControl>
            {errors.location && <FormMessage>{errors.location.message}</FormMessage>}
          </div>
        )}
      />

      <Button type="submit">Submit</Button>


    </form>
     </CardContent>
   
   </Card>
    </Form>
  );
}