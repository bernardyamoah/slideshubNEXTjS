
// import React from "react";
// import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
// import { Separator } from "./ui/separator";
// import { ClockIcon, UserIcon } from "lucide-react";
// import { StackIcon, UpdateIcon } from "@radix-ui/react-icons";

// const Features = () => {
//   const features = [
//     {
//       title: "Reliable",
//       icon: <ClockIcon className="w-6 h-6" />,
//       description: "Uploaded files are virus-checked, ensuring safe downloads.",
//     },
//     {
//       title: "Brief",
//       icon: <UpdateIcon className="w-6 h-6" />,
//       description: "Books and lecture slides by lecturers will be uploaded here weekly.",
//     },
//     {
//       title: "Structured",
//       icon: <StackIcon className="w-6 h-6" />,
//       description: "Essential books and slides are organized by program and year of study.",
//     },
//     {
//       title: "Intuitive",
//       icon: <UserIcon className="w-6 h-6" />,
//       description: "Easily locate and download what you need hassle-free from Slideshub.",
//     },
//   ];

//   return (
//     <>
//       <section className=" w-full flex items-center justify-center">
//         <div>
//           <div className="space-y-10 w-full max-w-4xl">
//               <h1 className="sm:text-3xl md:text-4xl mx-auto  text-center">Here's what you'll love about Slideshub</h1>
//             {/* Feature cards */}
//             <div className="w-full grid sm:grid-cols-2  gap-8 md:gap-10 mx-auto md:px-16">
//               {features.map((feature) => (
//                 // <Card key={feature.title} className="backdrop-blur-md bg-opacity-70 w-full">
//                 //   <CardHeader className="space-y-4">
//                 //     <CardTitle className="flex items-center gap-2">
//                 //       <span>{feature.icon}</span>
//                 //       <span>{feature.title}</span>
//                 //     </CardTitle>
//                 //     <CardDescription>{feature.description}</CardDescription>
//                 //   </CardHeader>
//                 // </Card>



//         <Card key={feature.title} className="rounded-xl w-full max-w-md space-y-4  mx-auto md:p-4">

//                 <div className="flex flex-col items-center space-y-2 border-zinc-800 p-4 rounded-lg">
//                   <div className="p-2 dark:bg-black bg-opacity-50 rounded-full bg-zinc-100">
//                     {feature.icon}
                     
//                   </div>
//                   <h2 className="text-xl font-bold dark:text-white text-zinc-950">{feature.title}</h2>
//                   <p className="text-zinc-500 dark:text-zinc-100 text-center">
//                     {feature.description}
//                   </p>
//                 </div>
             
//             </Card> 

//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
    
//     </>
//   );
// };

// export default Features;

import { FEATURES } from '@/constants'
import Image from 'next/image'
import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'

const Features = () => {
  return (
    <div className="flex-col flexCenter overflow-hidden  py-24">

      <div className="max-container padding-container relative w-full flex justify-end">
        <div className="flex flex-1 lg:min-h-[900px]">
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
              width={50}
              height={50}
              className="absolute left-[-5px] top-[-28px] w-5 lg:w-[40px]"
            />
            <h2 className="bold-40 lg:bold-64">Our Features</h2>
          </div>
          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:mg-20 lg:gap-20">
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
  
    <Card key={title} className="rounded-xl w-full max-w-md space-y-4  mx-auto md:p-4">

                     <div className="flex flex-col items-center space-y-2 border-zinc-800 p-4 rounded-lg">
                       <div className="p-2 dark:bg-black bg-opacity-50 rounded-full bg-zinc-100">
                         {icon}
                         
                       </div>
                       <h2 className="text-xl font-bold dark:text-white text-zinc-950">{title}</h2>
                       <p className="text-zinc-500 dark:text-zinc-100 text-center">
                         {description}
                       </p>
                     </div>
                 
                 </Card> 
    
  )
}

export default Features