
import CampusCard from '@/components/CampusCard';
import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';
export const metadata:Metadata={
  title:'Campus',
  
}
export default function CampusList() {

  return (
    <>


   
   <header className=" mx-auto lg:mx-0 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-transparent dark:text-zinc-100 sm:text-4xl xl:text-6xl/none bg-clip-text dark:bg-gradient-to-r dark:from-zinc-300 dark:to-zinc-600 bg-gradient-to-r from-zinc-950 to-zinc-700 ">  Embark on an Adventure! 
        </h2>
        <p className="mt-4  text-zinc-400">
        Select a campus to explore the offered programs, facilities, and vibrant campus life.
        </p> 
      </header>

      <section className="relative flex flex-col items-center h-full px-2 md:px-10 pb-10 mx-auto bg-inherit">
        

          <div className="grid grid-cols-1 gap-8 mx-auto lg:mx-0 md:grid-cols-3 ">
           

              <CampusCard />

          </div>

      </section>
    
  

      


     
    </>
  );
}
