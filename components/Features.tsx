
import { FEATURES } from '@/constants'
import Image from 'next/image'
import React from 'react'
import { Card, CardTitle } from './ui/card'

const Features = () => {
  return (
    <div className="flex-col flexCenter overflow-hidden  py-10 ">

      <div className="max-container padding-container relative w-full flex justify-end">
        <div className="flex flex-1 ">
          <Image
            src="/details-1.png"
            alt="students"
            width={500}
            height={1000}
            className="feature-phone"
          />
        </div>

        <div className="z-20 flex w-full flex-col lg:w-[60%]">
          <div className='relative'>
            <Image
              src="/camp.svg"
              alt="camp"
              width={100}
              height={100}
              className="absolute mx-auto left-[-5px] top-[-28px] w-10 lg:w-[40px]"
            />
            <h4 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 lg:text-left">Our Features</h4>
          </div>
          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-20 lg:gap-10">
            {FEATURES.map((feature) => (
              <FeatureItem
                key={feature.title}
                title={feature.title}
                icon={feature.icon}
                description={feature.description}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

type FeatureItem = {
  title: string;
  icon: string | React.ReactNode;
  description: string;
}

const FeatureItem = ({ title, icon, description }: FeatureItem) => {
  return (

    <Card key={title} className="rounded-xl w-full max-w-md space-y-4  mx-auto  p-6 dark:border-zinc-800 dark:bg-opacity-0 dark:bg-zinc-950/50">

      <div className="space-y-2 p-4 rounded-lg">

        <CardTitle className="flex items-center gap-2">
          <span>{icon}</span>
          <span className='text-xl font-bold dark:text-white text-zinc-950'>{title}</span>
        </CardTitle>
        <p className="text-zinc-500 dark:text-zinc-400 pt-4">
          {description}
        </p>
      </div>

    </Card>

  )
}

export default Features