'use client';
import { formatTime, getCampus } from '@/lib/functions';
import Image from 'next/image'
import Link from 'next/link';

import { MapPin } from 'lucide-react';
import { Card } from './ui/card';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';


interface Campus {
  $id: string;
  name: string;
  image: string;
  location: string;
  $createdAt: string;
}

const CampusCard = () => {
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCampuses() {
      try {

        const response = await toast.promise(getCampus(),
          {
            loading: 'Embarking on an adventure...',
            success: <b>Adventure awaits! Campuses found!</b>,
            error: <b>Lost in the jungle of campuses. Could not find any.</b>,
          });

        setCampuses(response);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching campuses:', error);
        setIsLoading(false);
      }
    }

    fetchCampuses();
  }, []);
  return (
    <>
      {campuses.map((campus) => (
        <Card key={campus.$id} className='relative w-full max-w-xs overflow-hidden '>

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
                <h3 className="text-xl font-medium anti ">{campus.name}</h3>

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



  );
};

export default CampusCard;
// {location}
// {formattedTime}