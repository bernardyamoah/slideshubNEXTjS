'use client'
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { type CarouselApi } from "@/components/ui/carousel"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Download } from "lucide-react"
import Link from "next/link"

export function ImageCarousel({ images }) {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)
    useEffect(() => {
        if (!api) {
            return
        }
        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])
    return (
        <>
            <Carousel
                setApi={setApi}
                opts={{
                    align: "center",

                    loop: true,
                }}
                plugins={[
                    Autoplay({
                        delay: 2000,
                    }),
                ]}
                className=" md:max-w-6xl w-full -ml-6 mx-auto  "
            >
                <CarouselContent>
                    {images.map(({ name, previewUrl, downloadUrl }) => (
                        <CarouselItem key={name} className=" md:basis-1/2 lg:basis-1/3 pl-6">

                            <div >
                                <Card className="dark:border-zinc-700 ">
                                    <CardContent className="aspect-square p-4">
                                        <div className="overflow-hidden relative h-full mb-4 ">
                                            <Image
                                                src={previewUrl.toString()}
                                                alt={name}
                                                className="object-cover  rounded-2xl aspect-square"
                                                fill
                                            />
                                        </div>

                                        <CardHeader className="grid grid-cols-2 space-x-5 align-center p-0">
                                            <CardTitle className="medium-14 leading-none capitalize inline-flex items-center  text-clip">{name}</CardTitle>
                                            <Link className='inline-flex justify-end items-center' download={downloadUrl} target='_blank' href={previewUrl}><Download className='w-4 h-4 text-muted-foreground' /></Link>
                                        </CardHeader>

                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}


                    {/* {Images.map((slide) => (
                        <ImageCard
                          key={slide.name}
                          slide={slide}
                          className="w-[150px]"
                          aspectRatio="square"
                          width={150}
                          height={150}
                        />
                      ))} */}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <div className="py-2 text-center text-sm text-muted-foreground md:hidden">
                Image {current} of {count}
            </div>
        </>
    )
}
