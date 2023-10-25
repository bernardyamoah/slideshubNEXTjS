import Image from "next/image"
import { PlusCircledIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"




interface Slide {
	$id: string;
	$createdAt: string;
	name: string;
	fileUrl: string;
	fileType: string;
	size: string;
	courseId: string;
	user_id?: string | undefined;
	previewUrl: URL;
	programme?: string;
}
type ImagesProps = {
  slide: Slide;
  aspectRatio?: "portrait" | "square";
  width: number;
  height: number;
  className?: string;
 
};
export function ImageCard({
  slide,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: ImagesProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <div className="overflow-hidden rounded-md">
            <Image
              src={slide.previewUrl.toString()}
              alt={slide.name}
              width={width}
              height={height}
              className={cn(
                "h-auto w-auto object-cover transition-all hover:scale-105",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
          </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{slide?.name}</h3>
  
      </div>
    </div>
  )
}
