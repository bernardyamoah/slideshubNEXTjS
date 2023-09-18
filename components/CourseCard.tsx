import {  formatUserTime } from "@/lib/functions";

import Link from "next/link";


import { Calendar, Clock2 } from "lucide-react";
import { Card, CardTitle } from "./ui/card";

export default function CourseCard({ course }: CourseCardProps) {
  let {
    name,
    courseCode,
    credit,
    campusId,
    programId,
   
    semester,
    $id,
    $createdAt,
  } = course;
    const courseId=$id
    
  return (
    <>
      <Card className="relative overflow-hidden duration-700 border rounded-xl dark:hover:bg-zinc-800/10 group md:gap-8 hover:border-zinc-400/50 dark:border-zinc-600 ">
        <div className="pointer-events-none">
          <div className="absolute inset-0 z-0  transition duration-1000 [mask-image:linear-gradient(black,transparent)]"></div>
          <div className="absolute inset-0 z-10 transition duration-1000 opacity-100 bg-gradient-to-br via-zinc-100/10 group-hover:opacity-50 card_style"></div>
          <div className="absolute inset-0 z-10 transition duration-1000 opacity-0 mix-blend-overlay group-hover:opacity-100 card_style"></div>
        </div>
        <Link href={{ pathname:`/campus/${campusId}/programs/${programId}/${courseId}`,
        query: { courseId}
        }}
        
        
      >
        
          <article className="p-4 md:p-8">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
                <time dateTime={$createdAt}>{formatUserTime($createdAt)}
                
                </time>
              </span>
              <span className="flex items-center gap-1 text-xs text-zinc-500">
              <Clock2 className='w-4 h-4 dark:stroke' />
                {credit} credit hours
              </span>
            </div>
            <CardTitle className="z-20 mt-4 text-xl font-medium capitalize duration-1000 lg:text-2xl text-zinc-200 group-hover:text-white font-display">
            {name.toLocaleLowerCase()}
            </CardTitle>
          <div className="z-20 flex gap-4 mt-2">
          <span className="flex gap-2 text-sm capitalize duration-1000 text-zinc-400 group-hover:text-zinc-200">
            <Calendar className='w-4 h-4' />{semester}
            </span>
            <span className="flex gap-2 text-sm capitalize duration-1000 text-zinc-400 group-hover:text-zinc-200">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>{courseCode}
              
            </span>
          </div>
          </article>
        </Link>
      </Card>

      {/* <Link href={{
        pathname: `/campus/${campusId}/programs/${programId}/course/${name}`,
        query: { courseId: courseId, name: name }
      }}
        shallow
        passHref
        className="relative hidden w-full cursor-pointer group ">
        <span className="absolute inset-0 border-2 border-gray-300 border-dashed rounded-md dark:border-gray-800/80"></span>


        <Card className='relative items-end h-full transition-transform transform border-2 border-gray-300 dark:border-gray-800/80 group-hover:-translate-x-2 group-hover:-translate-y-2 dark:border-gray-700'>


          <div className="flex items-start gap-4 p-4 ">


            <div className='md:truncate '>

              <h3 className="font-bold text-gray-700 capitalize sm:text-base dark:text-white ">

                {name.toLocaleLowerCase()}

              </h3>

              <div className="flex items-center gap-2 mt-2 sm:block sm:space-y-2 md:space-y-0 md:flex ">
               
                <div className="flex items-center gap-1 font-light text-gray-500 dark:text-gray-400">
                  <Calendar className='w-4 h-4' />
                  <p className="text-xs capitalize">{semester}</p>
                </div>

               
                <div className="flex items-center gap-1 font-light text-gray-500 dark:text-gray-400">
                  <Clock2 className='w-4 h-4 dark:stroke' />

                  <p className="text-xs font-light capitalize">{credit} credit hours</p>
                </div>





              </div>
            </div>
          </div>

          <div className="flex justify-between">
      
            <span
              className="-mb-[2px] -me-[2px] inline-flex items-center gap-1 text-xs px-3 py-1.5 "
            >


              <span className="text-[10px] font-medium sm:text-xs text-muted-foreground">{formatTime($createdAt)}</span>
            </span>


            <strong
              className="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-emerald-600 px-3 py-1.5 text-accent-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>

              <span className="text-[10px] font-medium sm:text-xs">{courseCode.toUpperCase()}</span>
            </strong>
          </div>





        </Card>

      </Link> */}
    </>
  );
}
