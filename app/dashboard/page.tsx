'use client'
import  { useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddCourse from '@/components/AddCourse';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import DataEntry from '@/components/DataEntry'
export default function Dashboard() {

  return (
    <>
      <h1 className='text-5xl my-5 text-center font-bold'>Dashboard</h1>
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px] ">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
      

      <DataEntry/>
        <DialogFooter>
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
}



