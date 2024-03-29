
'use client'
import { Card, CardTitle } from "@/components/ui/card"
import DownloadBtn from "@/components/ui/downloadBtn"
import { ExternalLink, FolderOpen, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { formatUserTime } from '@/lib/functions';
import { Badge } from "@/components/ui/badge"



const FileCard = ({ slide }) => {
  return (

    <Card key={slide.$id} className="overflow-hidden duration-700 border rounded-xl dark:hover:bg-zinc-800/40  md:gap-8 hover:border-zinc-400 dark:border-zinc-800 backdrop-blur-sm  dark:hover:border-zinc-800">
      <div className="pointer-events-none">
        <div className="absolute inset-0 z-0  transition duration-300 [mask-image:linear-gradient(black,transparent)]"></div>
        <div className="absolute inset-0 z-10 transition duration-300 opacity-100 bg-gradient-to-br via-zinc-100/10 group-hover:opacity-50 card_style"></div>
        <div className="absolute inset-0 z-10 transition duration-300 opacity-0 mix-blend-overlay group-hover:opacity-100 card_style"></div>
      </div>

      <article className="p-4 md:p-6">
        <div className="flex items-center justify-between gap-2">
          <span className="flex gap-1 text-xs duration-300  py-2 rounded-lg text-muted-foreground ">

            <FolderOpen className='w-4 h-4  text-xs' />  {slide.size}
          </span>
          <span className="flex items-center gap-1 text-xs text-zinc-500">
            <ShieldCheck className='w-4 h-4 text-muted-foreground' /><span className='text-xs text-muted-background'>{slide.fileType}</span>
          </span>
        </div>




        <CardTitle className="z-20 mt-2 bold-20 font-medium text-left capitalize duration-500 group-hover:text-zinc-800 dark:text-zinc-200 dark:group-hover:text-white font-display">

          {slide.name.replace(/_/g, ' ').toLocaleLowerCase()}

        </CardTitle>
        <div className="z-20 flex gap-4 mt-2">

          <span className="flex gap-2 text-xs capitalize duration-300 text-zinc-400 dark:group-hover:text-zinc-200">
            Updated on
            <time dateTime={slide.$updatedAt}>{formatUserTime(slide.$updatedAt)}

            </time>

          </span>
          {slide.fileType === 'pdf' ? (

            <Link href={'/slide-preview'}
              className='gap-2'>
              <ExternalLink className='w-4 h-4 text-muted-foreground' />
              Preview
            </Link>
          ) : null}

        </div>
        <DownloadBtn Fileurl={slide.fileUrl} filename={slide.name} />

      </article>

    </Card>


  )
}

export default FileCard