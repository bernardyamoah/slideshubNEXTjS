'use client'

import { Button } from "@/components/ui/button"
import { CloudArrowDownIcon } from "@heroicons/react/24/outline"
import { toast } from "sonner"

function DownloadBtn({Fileurl,filename}) {
  return (
   <>

 


   <Button
             size="sm"
             className="flex items-center w-full gap-3 mt-4"
             onClick={() => {
               toast("Download started!", {
                 icon: "📥",
               });
             }}
           >
             <a
            href={Fileurl}
               download={filename}
               className="flex items-center gap-2"
             >
               <CloudArrowDownIcon strokeWidth={2} className="w-5 h-5" /> Download
             </a>
           </Button>
   </>
  )
}

export default DownloadBtn
