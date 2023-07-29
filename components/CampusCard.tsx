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

    <Card className='overflow-hidden  relative'>
      <Link
        href={{
          pathname: `/campus/${name}${location}/programs/`,
          query: { campusId: campusId, name: name, loc: location }
        }}
        shallow
        passHref

        className=" duration-300 ease-in-out   cursor-pointer w-full h-44    
        group  bg-cover bg-center bg-no-repeat mx-auto flex items-center">

        <Image src={image} className='w-full absolute object-cover object-center group-hover:scale-105  hidden duration-300' width={300} height={300} alt='name' />
        <div className="absolute  inset-0 bg-gradient-to-t from-black to-black/60 group-hover:backdrop-blur-sm tansistion-all duration-300 "></div>
        <div className="relative flex items-center justify-center p-4  flex-1 h-full z-10">
          <div className=" text-white text-center text-base font-medium
            uppercase font-title tracking-wide">
            {name}
          </div>

          {/* Location */}
          <span
            className="-mb-[2px] tracking-wide -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-emerald-600 px-3 py-1.5 text-white bottom-0 right-0 absolute   text-[12px] "
          >
            <MapPin className='w-4 h-4 ' />
            {location}
          </span>
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