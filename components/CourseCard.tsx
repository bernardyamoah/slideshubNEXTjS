import { formatTime } from '@/lib/functions';

import Link from 'next/link';

import { Card, CardContent, CardTitle } from './ui/card';
import { Calendar, Clock2, Files, FlaskConical, Plus } from 'lucide-react';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { CardHeader } from '@material-tailwind/react';
import { Button } from './ui/button';
import AddSlides from './AddSlides';
import { DialogContent } from './ui/dialog';
interface CourseCardProps {
  name: string;
  image: string;
  courseCode: string;
  credit: string;
  campusId: string;
  programId: string;
  courseId: string;
  semester: string;
  timePosted: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  name,
  image,
  courseCode,
  credit,
  campusId,
  programId,
  courseId,
  semester,
  timePosted,
}) => {
  const formattedTime = formatTime(timePosted);
  return (
  
  <>
    <div  className="group relative block  w-full  cursor-pointer ">
  <span className="rounded-md absolute inset-0 border-2 border-dashed border-gray-400 dark:border-gray-800/80"></span>


      <Card className='relative  h-full transform items-end  border-gray-400 dark:border-gray-800/80  bg-white dark:bg-gray-900 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2   border-4 dark:border-gray-700'>
      
<Link
      href={{
        pathname: `/campus/${campusId}/programs/${programId}/course/${courseId}`,
        query: { courseId: courseId, name: name }
      }}
      shallow
      passHref

      className="overflow-hidden">
      <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
        {/* Course Image */}
        <Link
          href={{
            pathname: `/campus/${campusId}/programs/${programId}/course/${courseId}`,
            query: { courseId: courseId, name: name }
          }}
          shallow
          passHref

          className="block shrink-0">
            <FlaskConical className='w-8 h-8 fill-gray-700 stroke-gray-700 dark:fill-white' />
          
        </Link>
        {/* Course Name */}
        <div>

          <h3   className="font-medium sm:text-base capitalize dark:text-white truncate ">
          
              {name.toLocaleLowerCase()}
          
          </h3>

          <div className="mt-2 flex items-center gap-2">
            {/* Semester */}
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-300">
            <Calendar className='w-4 h-4' />
              <p className="text-xs capitalize">{semester}</p>
            </div>

            {/* Credit Hours */}
            <div className=" flex items-center gap-1 text-gray-500 dark:text-gray-300">
            <Clock2 className='w-4 h-4 dark:stroke' />

              <p className="text-xs capitalize">{credit} credit hours</p>
            </div>





          </div>
        </div>
      </div>

      <div className="flex justify-end">
        {/* Time Created */}
        {/* <strong
          className="-mb-[2px] -me-[2px] inline-flex items-center gap-1  px-3 py-1.5 text-gray-500"
        >


          <span className="text-[10px] font-medium sm:text-xs">{formattedTime}</span>
        </strong> */}

        {/* Course Code */}
        <strong
          className="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-emerald-600 px-3 py-1.5 text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
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
    </Link>


    </Card>
    
    
</div>
  </>
  );
};

export default CourseCard;
