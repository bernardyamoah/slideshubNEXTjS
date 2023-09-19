
import { Suspense } from 'react';
import Loading from '@/components/ui/Cloading';
import CampusCard from '@/components/CampusCard';
import { Separator } from '@/components/ui/separator';

export default function CampusList() {

  return (
    <>


   <main className="px-6 pt-8 mx-auto space-y-4 max-w-7xl lg:px-8 ">
   <header className=" max-w-2xl mx-auto lg:mx-0 ">
        <h2 className="text-3xl font-bold tracking-tight text-transparent dark:text-zinc-100 sm:text-4xl xl:text-6xl/none bg-clip-text dark:bg-gradient-to-r dark:from-zinc-300 dark:to-zinc-600 bg-gradient-to-r from-zinc-950 to-zinc-700 ">  Embark on an Adventure! 
        </h2>
        <p className="mt-4 text-zinc-400">
        Select a campus to explore the offered programs, facilities, and vibrant campus life.
        </p> 
      </header>
<Separator/>
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
   </main>

      


     
    </>
  );
}
