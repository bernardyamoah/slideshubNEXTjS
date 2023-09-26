// "use client";
// import React from "react";
// import {
//   useForm,
//   Controller,
//   SubmitHandler,
//   FieldValues
// } from "react-hook-form";
// import { createCourse, successMessage } from "@/lib/functions";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "@/components/ui/input";
// import { FormLabel } from "@/components/ui/form";
// import { Label } from "@/components/ui/label";
// import { LucideTable2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { useMyContext } from "@/components/MyContext";
// // Define your schema using Zod
// const formSchema = z.object({
//   name: z.string({
//       required_error: "Course name is required",
//     }),
// programId: z.string({
//   required_error: "Please select a program",
// }),
// year: z.string({
//   required_error: "Please select a level",
// }),
// credit: z.string({
//   required_error: "Credit is required.",
// }),
// courseCode: z.string({
//   required_error: "Course code is required",
// }),
// semester: z.string({
//   required_error: "Please select a semester",
// }),
// lecturer: z.string().optional(),
// campusName: z.string(),

// })

// interface CourseCreation extends FieldValues {
//   name: string;
//   semester: string;
//   courseCode: string;
//   credit: string;
//   lecturer?: string;
//   programId: string;
//   year: string;
//   user_id: any;
// }


// function AddCourse() {
//   const {
//     handleSubmit,
//     control,
//     formState: { errors },reset
//   } = useForm();
//   const {user } = useMyContext();
//  let user_id= user.name;
//   const onSubmit= async (data:any) => {
//     let formData: CourseCreation = { ...data,user_id};
// console.log(formData);
// await createCourse(formData);
// successMessage('Course was created successfully' )
// reset(
//     {
// ...data,
//     }
//   )
//   };

//   return (
//    <Card className="max-w-2xl p-3 mx-auto">
//      <form onSubmit={handleSubmit(onSubmit)}>
//       <div>
//         <Label>Name:</Label>
//         <Controller
//           name="name"
//           control={control}
//           defaultValue=""
//           render={({ field }) => <Input {...field} />}
//         />
//         {/* {errors.name?.message && <span>{errors.name.message}</span>} */}
//       </div>

//       <div>
//         <Label>Semester:</Label>
//         <Controller
//           name="semester"
//           control={control}
//           defaultValue=""
//           render={({ field }) => <Input {...field} />}
//         />
//       </div>

//       <div>
//         <Label>Course Code:</Label>
//         <Controller
//           name="courseCode"
//           control={control}
//           defaultValue=""
//           render={({ field }) => <Input {...field} />}
//         />
//       </div>

//       <div>
//         <Label>Credit:</Label>
//         <Controller
//           name="credit"
//           control={control}
//           defaultValue=""
          
//           render={({ field }) => <Input {...field} />}
//         />
//       </div>

//       <div>
//         <Label>Lecturer:</Label>
//         <Controller
//           name="lecturer"
//           control={control}
//           defaultValue=""
//           render={({ field }) => <Input {...field} />}
//         />
//       </div>

//       <div>
//         <Label>Year:</Label>
//         <Controller
//           name="year"
//           control={control}
//           defaultValue=""
//           render={({ field }) => <Input {...field} />}
//         />
//         {/* {errors.year?.message && <span>{errors.year.message}</span>} */}
//       </div>

//       <div>
//         <Label>User ID:</Label>
//         <Controller
//           name="user_id"
//           control={control}
//           defaultValue=""
//           render={({ field }) => <Input {...field} />}
//         />
//       </div>

//       <div>
//         <Label>Program ID:</Label>
//         <Controller
//           name="programId"
//           control={control}
//           defaultValue=""
//           render={({ field }) => <Input {...field} />}
//         />
//       </div>

//       <div>
//         <Button type="submit">Submit</Button>
//       </div>
//     </form>
    
//     </Card>
//   );
// }

// export default AddCourse;
