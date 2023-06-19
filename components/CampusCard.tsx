import { formatTime } from '@/lib/functions';
import Image from 'next/image'
import Link from 'next/link';
import {Buildings } from "@phosphor-icons/react";
import { MapPin } from 'lucide-react';
interface CampusCardProps {
  name: string;
  image: string;
  campusId: string;
  timePosted: string;
  location:string
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
    <Link
    href={{
      pathname: `/campus/${campusId}/programs/`,
      query: { campusId: campusId, name:name, loc:location }
    }}
    shallow
    passHref
    
   className="relative block overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1592&q=80)] bg-cover bg-center bg-no-repeat">
    
  <div className="absolute inset-0 bg-black/60"></div>

  <div className="relative flex items-start justify-between p-4 sm:p-6 lg:p-8">
    <div className="sm:pt-18 pt-12 text-white lg:pt-24">
      <h3 className="text-xl font-bold">{name}</h3>
    <p className="text-sm text-gray-200 mb-1">Campus</p>
    </div>
    {/* Time Created */}
    <strong
          className="absolute right-3 bottom-0 mb-[2px] -me-[2px] inline-flex items-center gap-1  py-1.5 text-gray-400"
        >
          <span className="text-[10px] font-medium sm:text-xs">{formattedTime}</span>
        </strong>
{/* Duration of Program */}
    <span
      className="absolute right-3 top-4 inline-flex items-center gap-1 rounded-full bg-black px-2 py-1 text-xs font-semibold text-white"
    >
    

    <MapPin size={20} color="#61dc50"  />
      {location}
    </span>
  </div>

    </Link>
  );
};

export default CampusCard;
