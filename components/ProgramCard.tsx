import { formatTime } from '@/lib/functions';
import Image from 'next/image'
import Link from 'next/link';
import { BookmarkSimple } from "@phosphor-icons/react";
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

      className="relative block overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1592&q=80)] bg-cover bg-center bg-no-repeat">

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative flex items-start justify-between p-4 sm:p-6 lg:p-8">
        <div className="sm:pt-18 pt-12 text-white lg:pt-24">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-sm text-gray-200 mb-1">Programme</p>
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


          <svg xmlns="http://www.w3.org/2000/svg" className='w-4 h-4 fill-emerald-500' viewBox="0 0 256 256"><path d="M216,113.07v53.22a8,8,0,0,1-2,5.31c-11.3,12.59-38.9,36.4-86,36.4s-74.68-23.81-86-36.4a8,8,0,0,1-2-5.31V113.07L128,160Z" opacity="0.2"></path><path d="M251.76,88.94l-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V240a8,8,0,0,0,16,0V199.51a115.63,115.63,0,0,0,27.94-22.57A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12ZM128,200c-43.27,0-68.72-21.14-80-33.71V126.4l76.24,40.66a8,8,0,0,0,7.52,0L176,143.47v46.34C163.4,195.69,147.52,200,128,200Zm80-33.75a97.83,97.83,0,0,1-16,14.25V134.93l16-8.53ZM188,118.94l-.22-.13-56-29.87a8,8,0,0,0-7.52,14.12L171,128l-43,22.93L25,96,128,41.07,231,96Z"></path></svg>
          {duration}
        </span>
      </div>

    </Link>
  );
};

export default ProgramCard;
