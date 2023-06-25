import { deleteSlide, formatTime } from '@/lib/functions';

import {BookmarkSimple, Trash } from "@phosphor-icons/react";
import { Card } from './ui/card';
import { Button } from '@material-tailwind/react';


const UserSlidesCard: React.FC<UserSlidesCardProps> = ({
  name,
fileUrl,
user_id,
id,
  timePosted,
}) => {
  const formattedTime = formatTime(timePosted);
  return (
    <Card
  
    
   className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white max-w-xs dark:bg-gray-950/50">
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
            
              className="font-medium text-base"
            >
              {name}
            </h1>
          </h3>

          <div className="mt-2 sm:gap-2">
            {/* Semester */}
            <div className="flex items-center gap-1 text-gray-500">
            
            
            </div>

            {/* Credit Hours */}
            <div className="mt-1  text-gray-500">
          
          
              
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
        <Button
          className="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-red-600 px-3 py-1.5 text-white"
        >
        

          
                                                
                                  <Trash size={20} onClick={() => {
                              deleteSlide(id)
                              }}/>

        </Button>
      </div>
    </Card>
  );
};

export default UserSlidesCard;
