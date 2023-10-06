'use client'
import Image from "next/image";

import heroimage3 from "/assets/details-1.png";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { ChevronRightCircleIcon } from "lucide-react";

const Hero = () => {
  const route=useRouter()
  const handleRouteToCampus = () => {
   route.push("/campus");}
  return (
    <>
      <header className="flex  items-center w-full justify-center">
     

        <div className="max-w-screen-xl   mx-auto space-y-16">
          <div className="space-y-6 lg:h-[calc(80vh)] lg:flex items-center flex-col justify-center">
            <h1 className="[text-wrap:balance] text-4xl font-bold tracking-tighter text-center  sm:text-5xl xl:text-8xl/none  ">
              Elevate Your Education Game!🚀
            </h1>
            <p className="lg:[text-wrap:balance] max-w-4xl text-gray-700 md:text-xl dark:text-gray-300 mx-auto text-center lg:text-2xl">
            Welcome to <span className="text-emerald-600 font-bold border-b-2 border-dashed border-emerald-700">SlidesHub</span> where learning is a breeze🍃! No more endless searches or library trips. With a few clicks, download and print lecture slides and books. Education made easy!
            </p>
            <Button className="mx-auto text-center flex gap-2 " onClick={handleRouteToCampus}> Get Started <ChevronRightCircleIcon className="w-5 h-5 animate-pulse duration-1000"/> </Button>
            {/* <Button variant='outline' className="ml-5" > A lecturer / Course Rep?</Button> */}
          </div>

          <div className="relative w-full flex items-center justify-center ">
          <Image
            className="object-cover object-center "
            src={heroimage3}
			width={600}
			height={200}
      quality={100}
            alt="Online Learning"
       
          />
        </div>
        </div>
      </header>

    </>
  );
};

export default Hero;
