import { formatTime } from "@/lib/functions";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { toast } from "react-hot-toast";
import { CloudArrowDownIcon } from "@heroicons/react/24/outline";
import { FolderOpen, ShieldCheck } from "lucide-react";
import { Badge } from "./ui/badge";

const SlidesCard: React.FC<SlidesCardProps> = ({
  name,
  fileUrl,
  user_id,
  timePosted,
  size,
  fileType,
  previewUrl

}) => {
  const formattedTime = timePosted ? formatTime(timePosted) : "";
  return (
    <Card className="relative">
      <CardHeader className="relative">
        <CardTitle className="w-full text-sm capitalize ">{name.replace(/_/g, ' ').toLocaleLowerCase()}</CardTitle>

      </CardHeader>
      <CardContent className="flex flex-col">
        <Badge variant="secondary" className="bg-emerald-500 absolute -top-2 left-4  text-[10px] font-light sm:text-xs ">
          {formattedTime}
        </Badge>
        <div className="text-gray-500  items-center text-xs   flex gap-1  rounded-sm dark:text-gray-500/90 ">

          <aside className='flex gap-3 justify-between  '>
            <div className="text-xs text-muted-foreground flex gap-1">
              <FolderOpen className='h-4 w-4 text-muted-foreground' />  {size}
            </div>

            <div className='text-xs text-muted-foreground flex gap-1'> <ShieldCheck className='h-4 w-4 text-muted-foreground' /><span className='text-xs text-muted-background'>{fileType}</span></div>
          </aside>
        </div>

        <Button
          size="sm"
          className="flex items-center gap-3 mt-4 w-full"
          onClick={() => {
            toast("Download started!", {
              icon: "📥",
            });
          }}
        >
          <a
            href={fileUrl}
            download={fileUrl}
            className="flex items-center gap-2"
          >
            <CloudArrowDownIcon strokeWidth={2} className="h-5 w-5" /> Download
          </a>
        </Button>

      </CardContent>


    </Card>
  );
};

export default SlidesCard;
