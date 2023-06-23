import { formatTime } from '@/lib/functions';
import Image from 'next/image'
import Link from 'next/link';
import {BookmarkSimple } from "@phosphor-icons/react";
import { Card } from './ui/card';
import { Button } from './ui/button';
import { toast } from 'react-hot-toast';
import {CloudArrowDownIcon,} from "@heroicons/react/24/outline";

const SlidesCard: React.FC<SlidesCardProps> = ({
  name,
fileUrl,
user_id,
  timePosted,
}) => {
  const formattedTime = formatTime(timePosted);
  return (
    <Card
  
    
   className="rounded-xl border-2 border-gray-200 bg-white max-w-xs">
      <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
        {/* Course Image */}
        <div
              
            
               className="block shrink-0">
          <BookmarkSimple size={30} weight="fill" />
        </div>
{/* Course Name */}
        <div>
          
          <h3>
            <h1
            
              className="font-medium sm:text-lg"
            >
              {name}
            </h1>
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
              <p className="text-xs capitalize">{user_id}</p>
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
          <Button size="sm"   className="flex items-center gap-3 mt-0 sm:mt-4"onClick={() => {
                                toast('Download started!', {
                                  icon: '📥',
                                });
                              }}>
                                  <a href={fileUrl} download={fileUrl} className='flex items-center gap-2'>                  
        <CloudArrowDownIcon strokeWidth={2} className="h-5 w-5" /> Download</a>
      </Button>
              
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

        
        </strong>
      </div>
    </Card>
  );
};

export default SlidesCard;
