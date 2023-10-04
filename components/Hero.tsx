import Image from "next/image";

import heroimage3 from "/assets/details-1.png";
const Hero = () => {
  return (
    <>
      <header className="flex  items-center w-full justify-center">
     

        <div className="max-w-screen-xl  py-8 mx-auto space-y-16">
          <div className="space-y-6 ">
            <h1 className="text-4xl font-bold tracking-tighter text-center  sm:text-5xl xl:text-6xl/none  ">
              Elevate Your Education Game! 🚀
            </h1>
            <p className="max-w-4xl text-gray-700 md:text-xl dark:text-gray-300 mx-auto text-left sm:text-center">
              At SlidesHub, we've revolutionized the way you access educational
              materials. No more endless searches or hours spent scanning
              libraries. With just a few clicks, you can instantly download and
              print lecture slides and books.
            </p>
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

      <section className=" hidden items-center justify-center py-10">
        <div className="mx-auto space-y-4 text-center max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tighter text-center text-transparent sm:text-5xl xl:text-6xl/none bg-clip-text dark:bg-gradient-to-r dark:from-gray-300 dark:to-gray-600 bg-gradient-to-r from-black to-gray-600">
            Welcome to Slideshub 🚀
          </h1>

          <p className="max-w-2xl mx-auto mt-4 text-zinc-500 dark:text-zinc-400 lg:text-lg">
            Slideshub is your ultimate online resource for downloading and
            printing lecture slides and books. Gain easy access to a wide range
            of high-quality educational content in just a few clicks.
          </p>
          <div className="relative w-full h-96">
            <Image
              className="object-cover object-center w-full h-full"
              src={heroimage3}
              width={500}
              height={800}
              alt="Online Learning"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
