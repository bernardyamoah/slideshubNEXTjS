// 'use client'
// import Image from "next/image";

// import heroimage3 from "/assets/details-1.png";
// import { Button } from "./ui/button";
// import { useRouter } from "next/navigation";
// import { ChevronRightCircleIcon } from "lucide-react";

// const Hero = () => {
//   const route=useRouter()
//   const handleRouteToCampus = () => {
//    route.push("/campus");}
//   return (
//     <>
//       <header className="flex  items-center w-full justify-center">
     

//         <div className="max-w-screen-xl   mx-auto space-y-16">
//           <div className="space-y-6 lg:h-[calc(80vh)] lg:flex items-center flex-col justify-center">
//             <h1 className="[text-wrap:balance] text-4xl font-bold tracking-tighter text-center  sm:text-5xl xl:text-8xl/none  ">
//               Elevate Your Education Game!🚀
//             </h1>
//             <p className="lg:[text-wrap:balance] max-w-4xl text-gray-700 md:text-xl dark:text-gray-300 mx-auto text-center lg:text-2xl">
//             Welcome to <span className="text-emerald-600 font-bold border-b-2 border-dashed border-emerald-700">SlidesHub</span> where learning is a breeze🍃! No more endless searches or library trips. With a few clicks, download and print lecture slides and books. Education made easy!
//             </p>
//             <Button className="mx-auto text-center flex gap-2 " onClick={handleRouteToCampus}> Get Started <ChevronRightCircleIcon className="w-5 h-5 "/> </Button>
//             {/* <Button variant='outline' className="ml-5" > A lecturer / Course Rep?</Button> */}
//           </div>

//           <div className="relative w-full flex items-center justify-center ">
//           <Image
//             className="object-cover object-center "
//             src={heroimage3}
// 			width={600}
// 			height={200}
//       quality={100}
//             alt="Online Learning"
       
//           />
//         </div>
//         </div>
//       </header>

//     </>
//   );
// };

// export default Hero;
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { ChevronRightCircleIcon, X } from 'lucide-react';


const Hero = () => {
  const route=useRouter()
  const handleRouteToCampus = () => {
   route.push("/campus");}
  return (
    <section className="  max-container padding-container flex flex-col gap-10  md:gap-16 lg:py-6 xl:flex-row ">
    

      <div className="relative z-20 flex flex-1  ">
        <div className='w-full'>
        <Image 
          src="/camp.svg"
          alt="camp"
          width={50}
          height={50}
          className="absolute  dark:xl:left-16 left-[-5px] top-[-32px] w-10 lg:w-[50px]"
        />
        <h1 className="bold-40 lg:bold-64 xl:text-center">Elevate Your <span className='text-emerald-600 dark:text-emerald-400 '>Education  Game!</span>🚀</h1>
        <p className=" xl:text-center xl:mx-auto regular-16 mt-6 text-muted-foreground  xl:max-w-[620px] xl:text-xl">
        Welcome to <span className="text-emerald-500 font-bold border-b-2 border-dashed border-emerald-400">SlidesHub</span> where learning is a breeze🍃! No more endless searches or library trips. With a few clicks, download and print lecture slides and books. Education made easy!
        </p>
        <div className="my-6 flex flex-wrap gap-5 xl:justify-center">
          <div className="flex items-center gap-2">
            {Array(5).fill(1).map((_, index) => (
              <Image 
                src="/star.svg"
                key={index}
                alt="star"
                width={24}
                height={24}
              />
            ))}
          </div>

          <p className="bold-16 lg:bold-20 ">
            125
            <span className="regular-16 lg:regular-20 ml-1">Excellent Reviews</span>
          </p>
        </div>
        <div className="gap-3  ">
        <Button className="xl:mx-auto text-center flex gap-2 text-base !px-8 !py-6 !rounded-full font-bold " onClick={handleRouteToCampus}> Get Started <ChevronRightCircleIcon className="w-6 h-6 "/> </Button>
        </div>
        </div>
       
       

      
      </div>

    
    </section>
  )
}

export default Hero