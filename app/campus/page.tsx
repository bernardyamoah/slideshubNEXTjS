'use client'
import { useState, useEffect } from 'react';
import { getCampus } from '@/lib/functions';
import { Suspense } from 'react';
import Loading from '../../components/ui/Cloading';
import Image from 'next/image';
import Link from 'next/link';
import { Chip } from "@material-tailwind/react";
import toast, { Toaster } from 'react-hot-toast';
import {Card,CardHeader,CardBody,Typography,} from "@material-tailwind/react";


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
    {/*
  Heads up! 👋

  This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
*/}

<div
  className="overflow-hidden bg-[url('https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80')] bg-cover bg-top bg-no-repeat"
>
  <div className="bg-black/60 p-8 md:p-12 lg:px-16 lg:py-24">
    <div className="text-center ltr:sm:text-left rtl:sm:text-right">
      <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">
      Campus
      </h2>

      <p
        className="hidden max-w-lg text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed text-center mx-auto"
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore
        officia corporis quasi doloribus iure architecto quae voluptatum beatae
        excepturi dolores.
      </p>

    
    </div>
  </div>
</div>
      <section className="heading-link">
    
        <p>
          <Link href="/">home</Link> / <Link href={`/campus/`}>Campus</Link>
        </p>
      </section>
      <section className="container grid sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-8 pb-10 ">
        <Suspense fallback={<Loading />}>
          {campuses.map((campus) => (
            <Card key={campus.$id}
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
