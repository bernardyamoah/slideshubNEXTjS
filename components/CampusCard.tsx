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


    <Card className='overflow-hidden  relative max-w-xs w-full '>

      <Link
        href={{
          pathname: `/campus/${name}${location}/programs/`,
          query: { campusId: campusId, name: name, loc: location }
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
            <MapPin className='w-4 h-4 ' />

            {location}
          </span>





        </div>


      </Link>
    </Card>




  );
};

export default CampusCard;
// {location}
// {formattedTime}