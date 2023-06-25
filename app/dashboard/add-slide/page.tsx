'use client'
import React from 'react'
import { Metadata } from "next"

import AddSlides from '@/components/AddSlides'
export const metadata: Metadata = {
  title: "Add Slides",
  description: "Advanced form example using react-hook-form and Zod.",
}
function page() {
  return (
    <AddSlides/>
  )
}


export default page