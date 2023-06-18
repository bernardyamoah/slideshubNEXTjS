'use client'
import { useState, useEffect } from 'react';
import { getCampus } from '@/lib/functions';
import { Suspense } from 'react';
import Loading from '../../components/ui/Cloading';
import Image from 'next/image';
import Link from 'next/link';
import { Chip } from "@material-tailwind/react";
import toast, { Toaster } from 'react-hot-toast';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";


interface Campus {
  $id: string;
  name: string;
  image: string;
  location: string;
}

export default function CampusList() {
  const [campuses, setCampuses] = useState<Campus[]>([]);

  useEffect(() => {
    async function fetchCampuses() {
      try {
  
        const response = await toast.promise(getCampus(),
        {
          loading: 'fetctching campuses from database...',
          success: <b>Campuses fetched!</b>,
          error: <b>Could not load campuses.</b>,
        });
      
        setCampuses(response);
      } catch (error) {
        console.error('Error fetching campuses:', error);
      }
    }

    fetchCampuses();
  }, []);

  return (
    <>
      <section className="heading-link">
        <h1 className="text-2xl font-bold mb-4 text-center">Campuses</h1>
        <p>
          <Link href="/">home</Link> / <Link href={`/campus/`}>Campus</Link>
        </p>
      </section>
      <section className="container grid sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-10 pb-10 ">
        <Suspense fallback={<Loading />}>
          {campuses.map((campus) => (
            <Card
key={campus.$id}
              className="max-w-xs transition-all hover:border-emerald-500 dark:hover:border-emerald-500 border-gray-200 w-full dark:bg-transparent group duration-300"
            >
              <Link href={{ pathname: `/campus/${campus.$id}/programs`, query: { campusId: campus.$id, name: campus.name, loc:campus.location } }} shallow passHref
              
              

  
  
className="transition  group">
                <CardHeader color="blue-gray" className="relative h-36 aspect-auto">
                  <Image
                    fill
                    alt={campus.name}
                    src={campus.image}
                    className="transition-transform duration-500 ease-in-out object-center object-cover group-hover:scale-105"
                  />
                </CardHeader>
                <CardBody>
                  <Typography variant="h6" color="blue-gray">
                    {campus.name}
                  </Typography>
                  <Typography className="font-normal text-left absolute bottom-0 right-0">
                    <Chip className="w-fit" size="sm" value={campus.location.toUpperCase()} variant="gradient" />
                  </Typography>
                </CardBody>
              </Link>
            </Card>
          ))}
        </Suspense>
        <Toaster />
      
      </section>
    </>
  );
}
