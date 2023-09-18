
import { Suspense } from 'react';
import Loading from '@/components/ui/Cloading';
import CampusCard from '@/components/CampusCard';

export default function CampusList() {

  return (
    <>


      <div className="overflow-hidden ">
        <div className="relative p-8 text-center bg-center bg-cover md:p-12 lg:px-16 lg:py-10 bg-hero-image">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            Embark on an Adventure!
          </h2>
          <p className="max-w-lg mx-auto text-center md:mt-6 md:text-lg md:leading-relaxed">
            Select a campus to explore the offered programs, facilities, and vibrant campus life.
          </p>
        </div>
      </div>
      <section className=" relative flex flex-col items-center h-full px-2 pb-10 mx-auto bg-inherit">
        <div className="w-full px-4 ">

          <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3 ">
            <Suspense fallback={<Loading />}>

              <CampusCard />

            </Suspense>
          </div>

        </div>
      </section>
      {/* <div className='flex justify-center'>
        <div className="flex gap-5 p-4 pb-10 mx-auto mt-10">
          <Button className="mt-6" onClick={() => router.back()}>
            <ChevronsLeftIcon className="w-4 h-4 mr-2" aria-hidden="true" />
            Go Back
          </Button>
          <Button className="mt-6" onClick={() => router.forward()} disabled={!router.forward}>
            Go Forward
            <ChevronsRightIcon className="w-4 h-4 mr-2" aria-hidden="true" />
          </Button>
        </div>
      </div> */}
    </>
  );
}
