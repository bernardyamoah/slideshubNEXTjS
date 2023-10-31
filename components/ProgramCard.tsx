import { formatUserTime } from '@/lib/functions';
import { GraduationCap } from 'lucide-react';

import Link from 'next/link';
import { Card, CardTitle } from './ui/card';



export default function ProgramCard(program: ProgramCardProps) {
  let { $id, name, campusId, $createdAt, duration } = program;
  const programId = $id
  return (
    <>
      <Card className="relative h-full overflow-hidden duration-500 border rounded-xl dark:bg-zinc-950 group md:gap-8 hover:border-zinc-400 dark:hover:border-zinc-700 dark:border-zinc-900">
        <div className="pointer-events-none">
          <div className="absolute inset-0 z-0  transition duration-1000 [mask-image:linear-gradient(black,transparent)]"></div>
          <div className="absolute inset-0 z-10 transition duration-1000 opacity-100 bg-gradient-to-br via-zinc-100/10 group-hover:opacity-50 card_style"></div>
          <div className="absolute inset-0 z-10 transition duration-1000 opacity-0 mix-blend-overlay group-hover:opacity-100 card_style"></div>
        </div>
        <Link href={`/campus/${campusId}/${programId}`}




        >

          <article className="p-4 md:p-8">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs duration-1000 text-zinc-500 dark:text-zinc-500 dark:group-hover:text-white dark:group-hover:border-zinc-200 ">
                <time dateTime={$createdAt}>{formatUserTime($createdAt)}

                </time>
              </span>
              <span className="flex items-center gap-1 text-xs text-zinc-500">
                <GraduationCap className='w-4 h-4 dark:stroke' />
                {duration}
              </span>
            </div>
            <CardTitle className="z-20 mt-4 text-lg font-medium capitalize duration-1000 lg:text-xl group-hover:text-zinc-800 dark:text-zinc-200 dark:group-hover:text-white font-display">
              {name}
            </CardTitle>

          </article>
        </Link>
      </Card>








    </>

  );
};

