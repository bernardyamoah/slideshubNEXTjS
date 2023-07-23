import { formatTime } from '@/lib/functions';
import Image from 'next/image'
import Link from 'next/link';

import { MapPin } from 'lucide-react';
import { Card } from './ui/card';

interface CampusCardProps {
  name: string;
  image: string;
  campusId: string;
  timePosted: string;
  location: string
}

const CampusCard: React.FC<CampusCardProps> = ({
  name,
  image,

  campusId,
  location,
  timePosted,
}) => {
  const formattedTime = formatTime(timePosted);

  return (

    <Card className='h-44 overflow-hidden'>
      <Link
        href={{
          pathname: `/campus/${campusId}/programs/`,
          query: { campusId: campusId, name: name, loc: location }
        }}
        shallow
        passHref

        className="   backdrop-blur-md transition-all  
        duration-300 ease-in-out   w-full h-full overflow-hidden
           group flex items-center">

        <Image src={image} className='w-full absolute inset-0 object-cover object-center group-hover:scale-105 duration-300' width={300} height={300} alt='name' />
        <div className="absolute inset-0 bg-black/80  "></div>
        <div className="relative flex items-center  justify-center p-4 sm:p-6 flex-1 h-full">
          <div className=" pt-1 text-white text-center text-lg font-bold uppercase">
            {name}
          </div>

          {/* Location */}
          <strong
            className="-mb-[2px] tracking-wide -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-emerald-600 px-3 py-1.5 text-white bottom-0 right-0 absolute   text-[12px] font-bold "
          >
            <MapPin className='w-4 h-4 ' />
            {location}
          </strong>
          <p className="absolute left-4 bottom-2 text-xs text-gray-300 "><strong
            className="   text-[10px] font-normal "
          >
            {formattedTime}
          </strong></p>





        </div>


      </Link>


    </Card>





  );
};

export default CampusCard;
// {location}
// {formattedTime}