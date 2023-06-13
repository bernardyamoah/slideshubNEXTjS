'use client'
import  { useState } from 'react';

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
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
    

    <Tabs value="Course" className='w-full'>
    <TabsHeader className='max-w-xl mx-auto'>
    {Buttons.map((button, index) => (
          <Tab  key={index}
          value={button.name}
          onClick={() => handleTabChange(button.name)}>
                {button.name}
          </Tab>
          ))}
          
      
      </TabsHeader>
      <TabsBody>
      {Buttons.map((button, index) => (
          <TabPanel key={index} value={button.name}>
          {button.name === 'Course' && <AddCourse />}
            {button.name === 'Campus' && <AddCampus />}
            {button.name === 'Program' && <AddProgram />}
            {/* Add other components for different tabs based on their names */}
          </TabPanel>
        ))}
      </TabsBody>
      
      </Tabs>
    
    </>
  );
}



