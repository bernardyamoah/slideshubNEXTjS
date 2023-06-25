'use client'
import React from 'react'
import { Metadata } from "next"

import AddSlides from '@/components/AddSlides'
const metadata: Metadata = {
  title: "Add Slides",
  description: "Add Slides to database",
}
function page() {
  return (
    <AddSlides/>
  )
}


export default page