import { formatTime } from '@/lib/functions';
import { GraduationCap } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import { Card } from './ui/card';



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
    <>
      <Card className='overflow-hidden  relative '>

        <Link
          href={{
            pathname: `/campus/${campusId}/programs/${programId}`,
            query: { programId: programId, campusId: campusId, name: name }
          }}
          shallow
          passHref

          className="   
      duration-300 ease-in-out   cursor-pointer w-full h-44    
          group  bg-cover bg-center bg-no-repeat mx-auto flex items-center">

          <Image src={image} className='w-full absolute inset-0 object-cover object-center group-hover:scale-105 duration-300' width={300} height={300} alt='name' />
          <div className="absolute inset-0 bg-black/70  "></div>

          <div className="relative flex items-center justify-center p-4 sm:p-5 flex-1 h-full ">
            <div className="  text-white  flex-1 text-center">
              <h3 className="text-xl font-medium anti ">{name}</h3>

            </div>
            {/* Duration */}
            <span
              className="-mb-[2px] tracking-wide -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-emerald-600 px-3 py-1.5 text-white bottom-0 right-0 absolute   text-[12px] font-normal
          "
            >
              <GraduationCap className='w-4 h-4 ' />

              {duration}
            </span>
            {/* Time Created */}
            <span
              className="absolute top-4 right-4 font-light text-xs text-gray-300"
            >
              {formattedTime}
            </span>




          </div>


        </Link>
      </Card>

    </>

  );
};

export default ProgramCard;
