import { formatTime } from '@/lib/functions';
import Image from 'next/image'
import Link from 'next/link';

import { MapPin } from 'lucide-react';

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
  console.log(image)
  return (
    <Link
      href={{
        pathname: `/campus/${campusId}/programs/`,
        query: { campusId: campusId, name: name, loc: location }
      }}
      shallow
      passHref

      className="max-w-xs  shadow-xl backdrop-blur-md transition-all hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-emerald-500/10 
      duration-300 ease-in-out  border-4 border-gray-200 rounded-3xl hover:shadow-xl cursor-pointer w-full h-44    dark:border-gray-600
       relative  overflow-hidden  group  bg-cover bg-center bg-no-repeat mx-auto flex items-center">
<Image src={image} className='w-full absolute inset-0 object-cover object-center group-hover:scale-105 duration-300' width={300} height={300} alt='name'/>
      <div className="absolute inset-0 bg-black/60  "></div>

      <div className="relative flex items-start justify-between p-4 sm:p-6 flex-1">
        <div className=" pt-12 text-white  flex-1">
          <h3 className="text-base font-bold ">{name}</h3>
          <p className="text-xs text-gray-200 ">Campus</p>
        </div>
        {/* Time Created */}
        <strong
        className="absolute right-4 top-0 flex items-center gap-1 rounded border border-emerald-500 bg-emerald-500 px-3 py-1.5 text-[12px] font-medium text-white"
      >
        <MapPin className='w-4 h-4 '/>
      {location}
      </strong>
      
      <strong
        className="absolute right-4 bottom-0   text-[10px] font-normal text-gray-200"
      >
    {formattedTime}
      </strong>

    
    
      
      </div>

    </Link>
  );
};

export default CampusCard;
// {location}
// {formattedTime}