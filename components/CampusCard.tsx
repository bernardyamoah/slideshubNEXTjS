'use client';
import {formatUserTime} from '@/lib/functions';
import Image from 'next/image'
import Link from 'next/link';

import { MapPin } from 'lucide-react';
import { Card } from './ui/card';
import { useCampuses } from '@/customHooks/useCampuses';


interface Campus {
  $id: string;
  name: string;
  image: string;
  location: string;
  $createdAt: string;
}

const CampusCard = () => {
  

  const campuses: Campus[] = useCampuses()
  return (
    <>
      {campuses.map((campus) => (
        <Card key={campus.$id} className='overflow-hidden relative duration-700 border rounded-xl hover:bg-gray-800/10 group md:gap-8 hover:border-gray-400/50 border-gray-600 w-full '>

          <Link
            href={{
              pathname: `/campus/${campus.name}${campus.location}/programs/`,
              // query: { campusId: campus.$id },

              query: { campusId: campus.$id, campusName: campus.name, campusLocation: campus.location }
            }}
            shallow
            passHref

            className="flex items-center w-full mx-auto duration-300 ease-in-out bg-center bg-no-repeat bg-cover cursor-pointer h-44 group">

            <Image src={campus.image} className='absolute inset-0 object-cover object-center w-full duration-300 group-hover:scale-105' width={300} height={300} alt='name' />
            <div className="absolute inset-0 bg-black/70 "></div>

            <div className="relative flex items-center justify-center flex-1 h-full p-4 sm:p-5 ">
              <div className="flex-1 text-center text-white ">
              <h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl dark:text-gray-200 dark:group-hover:text-white ">{campus.name}</h2>

              </div>
              {/* Duration */}
              <span
                className="-mb-[2px] tracking-wide -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-emerald-600 px-3 py-1.5 text-white bottom-0 right-0 absolute   text-[12px] font-normal
        "
              >
                <MapPin className='w-4 h-4 ' />

                {campus.location}
              </span>





            </div>


          </Link>
        </Card>

      

      



      ))}
    </>
  )
}
export default CampusCard;

{/* <div key={campus.$id} className="overflow-hidden relative duration-700 border rounded-xl hover:bg-gray-800/10 group md:gap-8 hover:border-gray-400/50 border-gray-600 w-full">
    <div className="pointer-events-none">
        <div className="absolute inset-0 z-0  transition duration-1000 [mask-image:linear-gradient(black,transparent)]">

        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-br opacity-100  via-gray-100/10  transition duration-1000 group-hover:opacity-50 " ></div><div className="absolute inset-0 z-10 opacity-0 mix-blend-overlay transition duration-1000 group-hover:opacity-100" >
        </div>
    </div>

    <a href="/projects/ai-companion"><article className="p-4 md:p-8">
        <div className="flex justify-between gap-2 items-center">
            <span className="text-xs duration-1000 dark:text-gray-200 dark:group-hover:text-white dark:group-hover:border-gray-200 drop-shadow-orange">
                <time>{formatUserTime(campus.$createdAt )}</time>
    </span>
    
        <span className="text-gray-500 text-xs  flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 h-4"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
    
        </span>
      
    </div>


            <h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl dark:text-gray-200 dark:group-hover:text-white ">{campus.name}</h2>

            <p className="z-20 mt-4 text-sm  duration-1000 text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-200">{campus.location}

        </p>
    </article>
</a>
</div> 
*/}