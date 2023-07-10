import { formatTime } from '@/lib/functions';
import { GraduationCap } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';

interface ProgramCardProps {
  name: string;
  image: string;
  campusId: string;
  programId: string;
  timePosted: string;
  duration: string
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  name,
  image,
  duration,
  campusId,
  programId,
  timePosted,
}) => {
  const formattedTime = formatTime(timePosted);
  return (
    <Link
      href={{
        pathname: `/campus/${campusId}/programs/${programId}`,
        query: { programId: programId, campusId: campusId, name: name }
      }}
      shallow
      passHref

      className="@container  shadow-xl backdrop-blur-md transition-all hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-emerald-500/10 
      duration-300 ease-in-out  border-4 border-gray-200 rounded-3xl hover:shadow-xl cursor-pointer w-full h-44    dark:border-gray-600
       relative  overflow-hidden  group  bg-cover bg-center bg-no-repeat mx-auto flex items-center">

<Image src={image} className='w-full absolute inset-0 object-cover object-center group-hover:scale-105 duration-300' width={300} height={300} alt='name'/>
      <div className="absolute inset-0 bg-black/80  "></div>

      <div className="relative flex items-center justify-center p-4 sm:p-5 flex-1 h-full ">
        <div className="  text-white  flex-1 text-center">
          <h3 className="text-2xl font-bold ">{name}</h3>

        </div>
      {/* Duration */}
        <strong
        className="-mb-[2px] tracking-wide -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-emerald-600 px-3 py-1.5 text-white bottom-0 right-0 absolute   text-[12px] font-bold"
      >
        <GraduationCap className='w-4 h-4 '/>
        
      {duration}
      </strong>
        {/* Time Created */}
      <strong
        className="absolute top-4 right-4  text-xs text-gray-300"
      >
    {formattedTime}
      </strong>

    
    
      
      </div>


    </Link>
  );
};

export default ProgramCard;
