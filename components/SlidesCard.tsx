import { formatTime } from "@/lib/functions";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { toast } from "react-hot-toast";
import { CloudArrowDownIcon } from "@heroicons/react/24/outline";

const SlidesCard: React.FC<SlidesCardProps> = ({
  name,
  fileUrl,
  user_id,
  timePosted,
}) => {
  const formattedTime = timePosted ? formatTime(timePosted) : "";
  return (
    <Card className="">
      <CardHeader className="relative">
        <CardTitle className="w-[70%] text-sm capitalize ">{name.replace(/_/g, ' ').toLocaleLowerCase()}</CardTitle>
        <span className="absolute right-3 top-5  text-[10px] font-light sm:text-xs text-muted-foreground">
          {formattedTime}
        </span>
      </CardHeader>
      <CardContent>
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
