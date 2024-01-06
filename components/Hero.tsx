import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ChevronRightCircleIcon } from "lucide-react";

import { Badge } from "./ui/badge";

const Hero = () => {
  const route = useRouter();
  const handleRouteToCampus = () => {
    route.push("/campus");
  };
  return (
    <>
      <section className="hidden max-container padding-container  flex-col gap-10  pb-32 md:gap-16 lg:py-6 xl:flex-row ">
        <div className="relative  flex flex-1  ">
          <div className="w-full">
            <h1 className="bold-40 lg:bold-88 xl:text-center">
              Elevate Your{" "}
              <span className="text-emerald-600 dark:text-emerald-400 ">
                Education Game!
              </span>
              🚀
            </h1>

            <p className=" xl:text-center xl:mx-auto regular-16 my-6 text-muted-foreground  xl:max-w-[620px] xl:text-xl">
              Welcome to{" "}
              <span className="text-emerald-500 font-bold border-b-2 border-dashed border-emerald-400">
                SlidesHub
              </span>{" "}
              where learning is a breeze🍃! No more endless searches or library
              trips. With a few clicks, download and print lecture slides and
              books. Education made easy!
            </p>

            <div className="my-6  flex-wrap gap-5 xl:justify-center hidden">
              <div className="flex items-center gap-2">
                {Array(5)
                  .fill(1)
                  .map((_, index) => (
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
                <span className="regular-16 lg:regular-20 ml-1">
                  Excellent Reviews
                </span>
              </p>
            </div>
            <div className="gap-3  ">
              <Button
                className="xl:mx-auto text-center flex gap-2 text-base !px-8 !py-6 !rounded-full font-bold "
                onClick={handleRouteToCampus}
              >Get Started <ChevronRightCircleIcon className="w-6 h-6 " />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative pt-10 md:pt-44  max-container padding-container flex flex-col gap-10  pb-32 md:gap-16 lg:py-6 xl:flex-row ">
        <div className="mx-auto max-w-4xl top-6">
          <div className=" mb-3 flex justify-center">
            <Badge
              variant="outline"
              className="block relative rounded-full px-4 py-1 text-sm leading-6 max-w-sm  font-mono text-muted-foreground text-center"
            >
              Slideshub 2.0
            </Badge>
          </div>

          <div className="text-center">
            <h1 className="scroll-m-20 bold-40  lg:bold-64">
              Elevate Your{" "}
              <span className="text-emerald-600 dark:text-emerald-400 ">
                Education Game!
              </span>

            </h1>

            <p className="leading-7 md:leading-10 [&:not(:first-child)]:mt-6 regular-20 md:regular-24">
              {" "}
              Welcome to{" "}
              <span className="text-emerald-500 font-bold border-b-2 border-dashed border-emerald-400">
                SlidesHub
              </span>{" "}
              where learning is a breeze🍃! No more endless searches or library
              trips. With a few clicks, download and print lecture slides and
              books. Education made easy!
            </p>

            <div className=" mt-10 flex items-center justify-center gap-x-6">
              <Button
                className=" bg-emerald-600 dark:bg-emerald-400  hover:bg-emerald-500 text-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  flex gap-2  !px-8 !py-6  font-bold "
                onClick={handleRouteToCampus}
              >
                {" "}
                Explore <ChevronRightCircleIcon className="w-6 h-6 " />{" "}
              </Button>
            </div>
          </div>
        </div>

        {/* <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-[5]  overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" >
      <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-emerald-300 to-emerald-600 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}>
      </div>
    </div> */}
      </section>
    </>
  );
};

export default Hero;
