'use client'
import  { useState } from 'react';

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import AddCourse from '@/components/AddCourse';
import AddCampus from '@/components/AddCampus';
import AddProgram from '@/components/AddProgram';
import AddSlides from '@/components/AddSlides';
import AddBook from '@/components/AddBook';
interface ButtonItem {
  name: string;
 
}

export default function DataEntry({ user }: { user: User }) {
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
      name: "Slides",
    
    },
    {
      name: "Book",
    
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
          {button.name === 'Course' && <AddCourse user={user} />}
            {button.name === 'Campus' && <AddCampus />}
            {button.name === 'Program' && <AddProgram />}
            {button.name === 'Slides' && <AddSlides user={user} />}
            {button.name === 'Book' && <AddBook user={user}/>}
            {/* Add other components for different tabs based on their names */}
          </TabPanel>
        ))}
      </TabsBody>
      
      </Tabs>
    
    </>
  );
}



