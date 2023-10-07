import { Card, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

export default function Loading() {
  return (
    <>
      <div className="mx-auto text-center lg:mx-0">
        <p className="w-16 mb-1 md:text-lg text-emerald-500"></p>
        <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-center text-transparent dark:text-zinc-100 xl:text-6xl/none bg-clip-text dark:bg-gradient-to-r dark:from-zinc-300 dark:to-zinc-600 bg-gradient-to-r from-zinc-950 to-zinc-700 lg:text-4xl "></h2>
      </div>

      <div className="grid grid-cols-1 gap-10 px-4 pb-10 mx-auto max-w-7xl sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">

        
      <Card className="relative w-full overflow-hidden duration-700 border rounded-xl dark:hover:bg-zinc-800/10 group md:gap-8 hover:border-zinc-400/50 dark:border-zinc-600 backdrop-blur-sm ">
          <div className="pointer-events-none">
            <div className="absolute inset-0 z-0  transition duration-1000 [mask-image:linear-gradient(black,transparent)]"></div>
            <div className="absolute inset-0 z-10 transition duration-1000 opacity-100 bg-gradient-to-br via-zinc-100/10 group-hover:opacity-50 card_style"></div>
            <div className="absolute inset-0 z-10 transition duration-1000 opacity-0 mix-blend-overlay group-hover:opacity-100 card_style"></div>
          </div>
          <div>
            <article className="p-4 md:p-8">
              <div className="flex items-center justify-between">
              <span className='w-8 h-3 rounded-md bg-zinc-200 dark:bg-zinc-600 animate-pulse'></span>
              
                <div className="flex items-center gap-1 ">
                  <GraduationCap className="w-4 h-4 dark:stroke" />
                  <span className='w-8 h-3 rounded-md bg-zinc-200 dark:bg-zinc-600 animate-pulse'></span>
                </div>
              </div>
              <CardTitle className="z-20 w-full h-10 mt-2 duration-1000 rounded animate-pulse dark:bg-zinc-600 bg-slate-200"></CardTitle>
            </article>
          </div>
        </Card>

        <Card className="relative overflow-hidden duration-700 border rounded-xl dark:hover:bg-zinc-800/10 group md:gap-8 hover:border-zinc-400/50 dark:border-zinc-600 backdrop-blur-sm ">
          <div className="pointer-events-none">
            <div className="absolute inset-0 z-0  transition duration-1000 [mask-image:linear-gradient(black,transparent)]"></div>
            <div className="absolute inset-0 z-10 transition duration-1000 opacity-100 bg-gradient-to-br via-zinc-100/10 group-hover:opacity-50 card_style"></div>
            <div className="absolute inset-0 z-10 transition duration-1000 opacity-0 mix-blend-overlay group-hover:opacity-100 card_style"></div>
          </div>
          <div>
            <article className="p-4 md:p-8">
              <div className="flex items-center justify-between">
              <span className='w-8 h-3 rounded-md bg-zinc-200 dark:bg-zinc-600 animate-pulse'></span>
              
                <div className="flex items-center gap-1 ">
                  <GraduationCap className="w-4 h-4 dark:stroke" />
                  <span className='w-8 h-3 rounded-md bg-zinc-200 dark:bg-zinc-600 animate-pulse'></span>
                </div>
              </div>
              <CardTitle className="z-20 w-full h-10 mt-2 duration-1000 rounded animate-pulse dark:bg-zinc-600 bg-slate-200"></CardTitle>
            </article>
          </div>
        </Card>

        <Card className="relative overflow-hidden duration-700 border rounded-xl dark:hover:bg-zinc-800/10 group md:gap-8 hover:border-zinc-400/50 dark:border-zinc-600 backdrop-blur-sm ">
          <div className="pointer-events-none">
            <div className="absolute inset-0 z-0  transition duration-1000 [mask-image:linear-gradient(black,transparent)]"></div>
            <div className="absolute inset-0 z-10 transition duration-1000 opacity-100 bg-gradient-to-br via-zinc-100/10 group-hover:opacity-50 card_style"></div>
            <div className="absolute inset-0 z-10 transition duration-1000 opacity-0 mix-blend-overlay group-hover:opacity-100 card_style"></div>
          </div>
          <div>
            <article className="p-4 md:p-8">
              <div className="flex items-center justify-between">
              <span className='w-8 h-3 rounded-md bg-zinc-200 dark:bg-zinc-600 animate-pulse'></span>
              
                <div className="flex items-center gap-1 ">
                  <GraduationCap className="w-4 h-4 dark:stroke" />
                  <span className='w-8 h-3 rounded-md bg-zinc-200 dark:bg-zinc-600 animate-pulse'></span>
                </div>
              </div>
              <CardTitle className="z-20 w-full h-10 mt-2 duration-1000 rounded animate-pulse dark:bg-zinc-600 bg-slate-200"></CardTitle>
            </article>
          </div>
        </Card>

        <Card className="relative overflow-hidden duration-700 border rounded-xl dark:hover:bg-zinc-800/10 group md:gap-8 hover:border-zinc-400/50 dark:border-zinc-600 backdrop-blur-sm ">
          <div className="pointer-events-none">
            <div className="absolute inset-0 z-0  transition duration-1000 [mask-image:linear-gradient(black,transparent)]"></div>
            <div className="absolute inset-0 z-10 transition duration-1000 opacity-100 bg-gradient-to-br via-zinc-100/10 group-hover:opacity-50 card_style"></div>
            <div className="absolute inset-0 z-10 transition duration-1000 opacity-0 mix-blend-overlay group-hover:opacity-100 card_style"></div>
          </div>
          <div>
            <article className="p-4 md:p-8">
              <div className="flex items-center justify-between">
              <span className='w-8 h-3 rounded-md bg-zinc-200 dark:bg-zinc-600 animate-pulse'></span>
              
                <div className="flex items-center gap-1 ">
                  <GraduationCap className="w-4 h-4 dark:stroke" />
                  <span className='w-8 h-3 rounded-md bg-zinc-200 dark:bg-zinc-600 animate-pulse'></span>
                </div>
              </div>
              <CardTitle className="z-20 w-full h-10 mt-2 duration-1000 rounded animate-pulse dark:bg-zinc-600 bg-slate-200"></CardTitle>
            </article>
          </div>
        </Card>
      </div>
    </>
  );
}
