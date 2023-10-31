
import { Card, CardTitle } from "@/components/ui/card";
import { FolderOpen, ShieldCheck } from "lucide-react";

export default function Loading() {
  return (
    <>
      <section className="grid grid-cols-1 gap-10 px-4 pb-10 mx-auto max-w-7xl sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">

        <Card className="relative h-full overflow-hidden duration-500 border rounded-xl dark:bg-zinc-900/70 group md:gap-8 hover:border-zinc-400 dark:hover:border-zinc-600 dark:border-zinc-800">
          <div className="pointer-events-none">
            <div className="absolute inset-0 z-0  transition duration-300 [mask-image:linear-gradient(black,transparent)]"></div>
            <div className="absolute inset-0 z-10 transition duration-300 opacity-100 bg-gradient-to-br via-zinc-100/10 group-hover:opacity-50 card_style"></div>
            <div className="absolute inset-0 z-10 transition duration-300 opacity-0 mix-blend-overlay group-hover:opacity-100 card_style"></div>
          </div>

          <article className="p-4 md:p-8">
            <div className="flex items-center justify-between gap-2">
              <span className="flex gap-1 text-xs duration-300 items-center dark:group-hover:border-zinc-200 ">

                <FolderOpen className='w-4 h-4 text-muted-foreground' /> <span className='bg-zinc-200 dark:bg-zinc-600 w-5 h-3 animate-pulse'></span>
              </span>
              <span className="flex items-center gap-1 text-xs ">
                <ShieldCheck className='w-4 h-4 text-muted-foreground' /> <span className='bg-zinc-200 dark:bg-zinc-600 w-5 h-3 animate-pulse'></span>
              </span>
            </div>
            <CardTitle className="z-20 mt-2 h-10 w-full rounded-md   dark:bg-zinc-600  bg-zinc-300 animate-pulse">

            </CardTitle>
            <div className="z-20 flex gap-4 mt-4 items-center">

              <p className="text-xs capitalize   w-fit ">
                Updated on
              </p>
              <span className='bg-zinc-200 dark:bg-zinc-600  flex-1  h-3 animate-pulse rounded-md'></span>

            </div>
            <p className="block mt-6 w-full rounded-md bg-zinc-600 animate-pulse text-center h-10  ">

            </p>

          </article>

        </Card>

        <Card className="relative h-full overflow-hidden duration-500 border rounded-xl dark:bg-zinc-900/70 group md:gap-8 hover:border-zinc-400 dark:hover:border-zinc-600 dark:border-zinc-800">
          <div className="pointer-events-none">
            <div className="absolute inset-0 z-0  transition duration-300 [mask-image:linear-gradient(black,transparent)]"></div>
            <div className="absolute inset-0 z-10 transition duration-300 opacity-100 bg-gradient-to-br via-zinc-100/10 group-hover:opacity-50 card_style"></div>
            <div className="absolute inset-0 z-10 transition duration-300 opacity-0 mix-blend-overlay group-hover:opacity-100 card_style"></div>
          </div>

          <article className="p-4 md:p-8">
            <div className="flex items-center justify-between gap-2">
              <span className="flex gap-1 text-xs duration-300 items-center dark:group-hover:border-zinc-200 ">

                <FolderOpen className='w-4 h-4 text-muted-foreground' /> <span className='bg-zinc-200 dark:bg-zinc-600 w-5 h-3 animate-pulse'></span>
              </span>
              <span className="flex items-center gap-1 text-xs ">
                <ShieldCheck className='w-4 h-4 text-muted-foreground' /> <span className='bg-zinc-200 dark:bg-zinc-600 w-5 h-3 animate-pulse'></span>
              </span>
            </div>
            <CardTitle className="z-20 mt-2 h-10 w-full rounded-md   dark:bg-zinc-600  bg-zinc-300 animate-pulse">

            </CardTitle>
            <div className="z-20 flex gap-4 mt-4 items-center">

              <p className="text-xs capitalize   w-fit ">
                Updated on
              </p>
              <span className='bg-zinc-200 dark:bg-zinc-600  flex-1  h-3 animate-pulse rounded-md'></span>

            </div>
            <p className="block mt-6 w-full rounded-md bg-zinc-600 animate-pulse text-center h-10  ">

            </p>

          </article>

        </Card>

        <Card className="relative h-full overflow-hidden duration-500 border rounded-xl dark:bg-zinc-900/70 group md:gap-8 hover:border-zinc-400 dark:hover:border-zinc-600 dark:border-zinc-800">
          <div className="pointer-events-none">
            <div className="absolute inset-0 z-0  transition duration-300 [mask-image:linear-gradient(black,transparent)]"></div>
            <div className="absolute inset-0 z-10 transition duration-300 opacity-100 bg-gradient-to-br via-zinc-100/10 group-hover:opacity-50 card_style"></div>
            <div className="absolute inset-0 z-10 transition duration-300 opacity-0 mix-blend-overlay group-hover:opacity-100 card_style"></div>
          </div>

          <article className="p-4 md:p-8">
            <div className="flex items-center justify-between gap-2">
              <span className="flex gap-1 text-xs duration-300 items-center dark:group-hover:border-zinc-200 ">

                <FolderOpen className='w-4 h-4 text-muted-foreground' /> <span className='bg-zinc-200 dark:bg-zinc-600 w-5 h-3 animate-pulse'></span>
              </span>
              <span className="flex items-center gap-1 text-xs ">
                <ShieldCheck className='w-4 h-4 text-muted-foreground' /> <span className='bg-zinc-200 dark:bg-zinc-600 w-5 h-3 animate-pulse'></span>
              </span>
            </div>
            <CardTitle className="z-20 mt-2 h-10 w-full rounded-md   dark:bg-zinc-600  bg-zinc-300 animate-pulse">

            </CardTitle>
            <div className="z-20 flex gap-4 mt-4 items-center">

              <p className="text-xs capitalize   w-fit ">
                Updated on
              </p>
              <span className='bg-zinc-200 dark:bg-zinc-600  flex-1  h-3 animate-pulse rounded-md'></span>

            </div>
            <p className="block mt-6 w-full rounded-md bg-zinc-600 animate-pulse text-center h-10  ">

            </p>

          </article>

        </Card>

        <Card className="relative h-full overflow-hidden duration-500 border rounded-xl dark:bg-zinc-900/70 group md:gap-8 hover:border-zinc-400 dark:hover:border-zinc-600 dark:border-zinc-800">
          <div className="pointer-events-none">
            <div className="absolute inset-0 z-0  transition duration-300 [mask-image:linear-gradient(black,transparent)]"></div>
            <div className="absolute inset-0 z-10 transition duration-300 opacity-100 bg-gradient-to-br via-zinc-100/10 group-hover:opacity-50 card_style"></div>
            <div className="absolute inset-0 z-10 transition duration-300 opacity-0 mix-blend-overlay group-hover:opacity-100 card_style"></div>
          </div>

          <article className="p-4 md:p-8">
            <div className="flex items-center justify-between gap-2">
              <span className="flex gap-1 text-xs duration-300 items-center dark:group-hover:border-zinc-200 ">

                <FolderOpen className='w-4 h-4 text-muted-foreground' /> <span className='bg-zinc-200 dark:bg-zinc-600 w-5 h-3 animate-pulse'></span>
              </span>
              <span className="flex items-center gap-1 text-xs ">
                <ShieldCheck className='w-4 h-4 text-muted-foreground' /> <span className='bg-zinc-200 dark:bg-zinc-600 w-5 h-3 animate-pulse'></span>
              </span>
            </div>
            <CardTitle className="z-20 mt-2 h-10 w-full rounded-md   dark:bg-zinc-600  bg-zinc-300 animate-pulse">

            </CardTitle>
            <div className="z-20 flex gap-4 mt-4 items-center">

              <p className="text-xs capitalize   w-fit ">
                Updated on
              </p>
              <span className='bg-zinc-200 dark:bg-zinc-600  flex-1  h-3 animate-pulse rounded-md'></span>

            </div>
            <p className="block mt-6 w-full rounded-md bg-zinc-600 animate-pulse text-center h-10  ">

            </p>

          </article>

        </Card>


      </section>



    </>
  )
}