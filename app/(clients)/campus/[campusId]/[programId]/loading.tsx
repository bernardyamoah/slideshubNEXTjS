
import { Card, CardTitle } from "@/components/ui/card";
import { Calendar, Clock2 } from "lucide-react";

export default function Loading() {
  <section className="grid grid-cols-1 gap-10 px-4 pb-10 mx-auto max-w-7xl sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">

    <Card className="relative h-full overflow-hidden duration-500 border rounded-xl dark:bg-zinc-950 group md:gap-8 hover:border-zinc-400 dark:hover:border-zinc-700 dark:border-zinc-900">
      <div className="pointer-events-none">
        <div className="absolute inset-0 z-0  transition duration-1000 [mask-image:linear-gradient(black,transparent)]"></div>
        <div className="absolute inset-0 z-10 transition duration-1000 opacity-100 bg-gradient-to-br via-zinc-100/10 group-hover:opacity-50 card_style"></div>
        <div className="absolute inset-0 z-10 transition duration-1000 opacity-0 mix-blend-overlay group-hover:opacity-100 card_style"></div>
      </div>
      <div
      >

        <article className="p-4 md:p-8">
          <div className="flex items-center justify-between gap-2">
            <span className="w-6 text-xs duration-1000 text-zinc-500 dark:text-zinc-200 dark:group-hover:text-white dark:group-hover:border-zinc-200  animate-pulse">

            </span>
            <span className="flex items-center gap-1 text-xs text-zinc-500">
              <Clock2 className='w-4 h-4 dark:stroke' />

            </span>
          </div>
          <CardTitle className="z-20 w-24 mt-2 text-xl font-medium capitalize duration-1000  lg:text-3xl group-hover:text-zinc-800 dark:text-zinc-200 dark:group-hover:text-white font-display animate-pulse">

          </CardTitle>
          <div className="z-20 flex gap-4 mt-2">
            <span className="flex gap-2 text-sm capitalize duration-1000 text-zinc-400 dark:group-hover:text-zinc-200">
              <Calendar className='w-4 h-4' />
            </span>
            <span className="flex gap-2 text-sm capitalize duration-1000 text-zinc-400 dark:group-hover:text-zinc-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>

            </span>
          </div>
        </article>
      </div>
    </Card>
    <Card className="relative h-full overflow-hidden duration-500 border rounded-xl dark:bg-zinc-950 group md:gap-8 hover:border-zinc-400 dark:hover:border-zinc-700 dark:border-zinc-900">
      <div className="pointer-events-none">
        <div className="absolute inset-0 z-0  transition duration-1000 [mask-image:linear-gradient(black,transparent)]"></div>
        <div className="absolute inset-0 z-10 transition duration-1000 opacity-100 bg-gradient-to-br via-zinc-100/10 group-hover:opacity-50 card_style"></div>
        <div className="absolute inset-0 z-10 transition duration-1000 opacity-0 mix-blend-overlay group-hover:opacity-100 card_style"></div>
      </div>
      <div
      >

        <article className="p-4 md:p-8">
          <div className="flex items-center justify-between gap-2">
            <span className="w-6 text-xs duration-1000 text-zinc-500 dark:text-zinc-200 dark:group-hover:text-white dark:group-hover:border-zinc-200  animate-pulse">

            </span>
            <span className="flex items-center gap-1 text-xs text-zinc-500">
              <Clock2 className='w-4 h-4 dark:stroke' />

            </span>
          </div>
          <CardTitle className="z-20 w-24 mt-2 text-xl font-medium capitalize duration-1000  lg:text-3xl group-hover:text-zinc-800 dark:text-zinc-200 dark:group-hover:text-white font-display animate-pulse">

          </CardTitle>
          <div className="z-20 flex gap-4 mt-2">
            <span className="flex gap-2 text-sm capitalize duration-1000 text-zinc-400 dark:group-hover:text-zinc-200">
              <Calendar className='w-4 h-4' />
            </span>
            <span className="flex gap-2 text-sm capitalize duration-1000 text-zinc-400 dark:group-hover:text-zinc-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>

            </span>
          </div>
        </article>
      </div>
    </Card>
  </section>
}