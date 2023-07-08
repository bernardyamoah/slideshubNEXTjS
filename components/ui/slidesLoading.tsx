import { Card } from "./card";

  export default function SlidesLoading(){
return(

  <Card className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white max-w-xs dark:bg-gray-950/50">
  <div className="animate-pulse flex items-start gap-4 p-4 sm:p-6 lg:p-8">
    {/* Course Image */}
    <div className="block shrink-0">
      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
    </div>

    {/* Course Name */}
    <div>
      <h3>
        <div className="w-2/3 h-6 bg-gray-300 rounded"></div>
      </h3>

      <div className="mt-2 sm:gap-2">
        {/* Semester */}
        <div className="w-1/3 h-4 bg-gray-300 rounded"></div>

        {/* Credit Hours */}
        <div className="mt-1 w-1/2 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  </div>

  <div className="flex justify-between">
    {/* Time Created */}
    <strong className="-mb-[2px] -me-[2px] inline-flex items-center gap-1 px-3 py-1.5 text-gray-400">
      <div className="w-8 h-4 bg-gray-300 rounded"></div>
    </strong>

    {/* Course Code */}
    <strong className="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-emerald-600 px-3 py-1.5 text-white">
      <div className="w-4 h-4 bg-gray-300 rounded"></div>
    </strong>
  </div>
</Card>
)
  
}

  