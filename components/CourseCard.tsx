import { formatTime } from '@/lib/functions';
import Image from 'next/image'
import Link from 'next/link';
import {BookmarkSimple } from "@phosphor-icons/react";
interface CourseCardProps {
  name: string;
  image: string;
  courseCode: string;
  credit: string;
  campusId: string;
  programId: string;
  courseId: string;
  semester:string;
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
    <Link
    href={{
      pathname: `/campus/${campusId}/programs/${programId}/course/${courseId}`,
      query: { courseId: courseId, name: name }
    }}
    shallow
    passHref
    
   className="rounded-xl border-2 border-gray-200 bg-white max-w-xs">
      <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
        {/* Course Image */}
        <Link
              href={{
                pathname: `/campus/${campusId}/programs/${programId}/course/${courseId}`,
                query: { courseId: courseId, name:name }
              }}
              shallow
              passHref
            
               className="block shrink-0">
          <BookmarkSimple size={30} weight="fill" />
        </Link>
{/* Course Name */}
        <div>
          
          <h3>
            <Link
              href={{
                pathname: `/campus/${campusId}/programs/${programId}/course/${courseId}`,
                query: { courseId: courseId, name: name }
              }}
              shallow
              passHref
              className="font-medium sm:text-lg"
            >
              {name}
            </Link>
          </h3>

          <div className="mt-2 sm:flex sm:items-center sm:gap-2">
            {/* Semester */}
            <div className="flex items-center gap-1 text-gray-500">
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
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
              <p className="text-xs capitalize">{semester}</p>
            </div>

            {/* Credit Hours */}
            <div className="mt-1 sm:mt-0 flex items-center gap-1 text-gray-500">
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

              <p className="text-xs capitalize">{credit} credit hours</p>
            </div>
              

          

          
          </div>
        </div>
      </div>
    
      <div className="flex justify-between">
        {/* Time Created */}
        <strong
          className="-mb-[2px] -me-[2px] inline-flex items-center gap-1  px-3 py-1.5 text-gray-400"
        >
          

          <span className="text-[10px] font-medium sm:text-xs">{formattedTime}</span>
        </strong>

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
  );
};

export default CourseCard;
