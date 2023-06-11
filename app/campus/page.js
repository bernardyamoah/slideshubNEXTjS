'use client'
import { useState, useEffect } from 'react';
import { getCampus } from '@/lib/functions';
import { Suspense } from 'react';
import Loading from '../contact/loading';
import Image from 'next/image';
import Link from 'next/link';

export default function Campus() {
  const [campuses, setCampuses] = useState([]);

  useEffect(() => {
    async function fetchCampuses() {
      try {
        const response = await getCampus();
        setCampuses(response);
      } catch (error) {
        console.error('Error fetching campuses:', error);
      }
    }

    fetchCampuses();
  }, []);

  return (
    <>
      <main className="card_container">
        <h1 className="text-2xl font-bold mb-4 text-center">Campuses</h1>
        <section className="max-w-6xl container relative grid grid-cols-2 gap-8 pb-10">
          <Suspense fallback={<Loading />}>
            {campuses.map((campus) => (
              <aside
                key={campus.$id}
                className="relative block shadow-xl backdrop-blur-md transition-all hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-emerald-500/10 overflow-hidden duration-300 ease-in-out border-4 border-gray-200 hover:shadow-xl cursor-pointer dark:border-gray-600 rounded-3xl w-full bg-white dark:bg-transparent"
              >
                <Link className="card_link group" href={`/campus/${campus.$id}`}>
                  <div className="card_image_wrapper">
                    {/*<Image
                      className="card_image group-hover:scale-105"
                      src={campus.image}
                      alt={campus.name}
                      width={300}
                      height={200}
                    />*/}
                  </div>
                  <div className="text_container">
                    <h3 className="card_heading">{campus.name}</h3>
                    <p className="course-code">{campus.location}</p>
                  </div>
                </Link>
              </aside>
            ))}
          </Suspense>
        </section>
      </main>
    </>
  );
}
