'use client'

import { Button } from "@/components/ui/button"
import { CloudArrowDownIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { toast } from "sonner"

function DownloadBtn({Fileurl,filename}) {
  return (
   <>

 


  <Link  href={Fileurl}
               download={filename}>
  <Button
             size="sm"
             className="flex flex-1 items-center w-full gap-3 mt-4"
             onClick={() => {
               toast("Download started!", {
                 icon: "📥",
               });
             }}
           >
             <span
           
               className="flex items-center gap-2"
             >
               <CloudArrowDownIcon strokeWidth={2} className="w-5 h-5" /> Download
             </span>
           </Button>
  
  </Link>
   </>
  )
}

export default DownloadBtn
