import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { ClockIcon, UserIcon } from "lucide-react";
import { StackIcon, UpdateIcon } from "@radix-ui/react-icons";

const Features = () => {
  const features = [
    {
      title: "Reliable",
      icon: <ClockIcon className="w-6 h-6" />,
      description: "Uploaded files are virus-checked, ensuring safe downloads.",
    },
    {
      title: "Brief",
      icon: <UpdateIcon className="w-6 h-6" />,
      description: "Books and lecture slides by lecturers will be uploaded here weekly.",
    },
    {
      title: "Structured",
      icon: <StackIcon className="w-6 h-6" />,
      description: "Essential books and slides are organized by program and year of study.",
    },
    {
      title: "Intuitive",
      icon: <UserIcon className="w-6 h-6" />,
      description: "Easily locate and download what you need hassle-free from Slideshub.",
    },
  ];

  return (
    <>
      <section className="bg-pattern w-full flex items-center justify-center">
        <div className="w-full">
          <div className="space-y-10 w-full">
            <div className="sm:text-3xl md:text-4xl mx-auto mb-20 text-center">
              <h1>Here's what you'll love about Slideshub</h1>
            </div>

            {/* Feature cards */}
            <div className="w-full grid sm:grid-cols-2  gap-8 mx-auto md:p-16">
              {features.map((feature) => (
                // <Card key={feature.title} className="backdrop-blur-md bg-opacity-70 w-full">
                //   <CardHeader className="space-y-4">
                //     <CardTitle className="flex items-center gap-2">
                //       <span>{feature.icon}</span>
                //       <span>{feature.title}</span>
                //     </CardTitle>
                //     <CardDescription>{feature.description}</CardDescription>
                //   </CardHeader>
                // </Card>


<Card key={feature.title} className="w-full max-w-full space-y-4 mx-auto md:p-4">

                <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                  <div className="p-2 dark:bg-black bg-opacity-50 rounded-full bg-zinc-100">
                    {feature.icon}
                     
                  </div>
                  <h2 className="text-xl font-bold dark:text-white text-zinc-950">{feature.title}</h2>
                  <p className="text-zinc-500 dark:text-zinc-100 text-center">
                    {feature.description}
                  </p>
                </div>
             
            </Card>
       

              ))}
            </div>
          </div>
        </div>
      </section>
      <Separator className="mb-8" />
    </>
  );
};

export default Features;