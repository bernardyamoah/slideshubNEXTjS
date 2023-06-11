'use client'
import  { useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddCourse from '@/components/AddCourse';
import AddCampus from '@/components/AddCampus';
import AddProgram from '@/components/AddProgram';


interface ButtonItem {
  name: string;
 
}

export default function Dashboard() {
  let Buttons: ButtonItem[] = [
    {
      name: "Add course",
      
    },
    {
      name: "Add Campus",
    
    },
    {
      name: "Add Program",
     
    },
    {
      name: "Add file",
    
    },
  ];

  const [activeTab, setActiveTab] = useState<string>(Buttons[0].name);

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <h1 className='text-5xl my-5 text-center font-bold'>Dashboard</h1>

      <Tabs defaultValue={activeTab} className="max-w-2xl mx-auto">
        <TabsList className="grid w-full grid-cols-4">
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
            {button.name === 'Add course' && <AddCourse />}
            {button.name === 'Add Campus' && <AddCampus />}
            {button.name === 'Add Program' && <AddProgram />}
            {/* Add other components for different tabs based on their names */}
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}
