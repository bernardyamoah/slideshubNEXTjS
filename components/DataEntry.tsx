'use client'
import  { useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddCourse from '@/components/AddCourse';
import AddCampus from '@/components/AddCampus';
import AddProgram from '@/components/AddProgram';


interface ButtonItem {
  name: string;
 
}

export default function DataEntry() {
  let Buttons: ButtonItem[] = [
    {
      name: "Course",
      
    },
    {
      name: "Campus",
    
    },
    {
      name: "Program",
     
    },
    {
      name: "File",
    
    },
  ];

  const [activeTab, setActiveTab] = useState<string>(Buttons[0].name);

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <>
    

      <Tabs defaultValue={activeTab} className="w-full mx-auto   md:overflow-y-auto md:full">
        <TabsList className="flex justify-evenly items-center sm:grid w-full sm:grid-cols-4">
          {Buttons.map((button, index) => (
            <TabsTrigger
              key={index}
              value={button.name}
              onClick={() => handleTabChange(button.name)}
            >
              {button.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {Buttons.map((button, index) => (
          <TabsContent key={index} value={button.name}>
            {button.name === 'Course' && <AddCourse />}
            {button.name === 'Campus' && <AddCampus />}
            {button.name === 'Program' && <AddProgram />}
            {/* Add other components for different tabs based on their names */}
          </TabsContent>
        ))}
      </Tabs>
    
    </>
  );
}



