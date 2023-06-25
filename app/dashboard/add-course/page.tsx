'use client'
import React from 'react'
import { Metadata } from "next"
import AddCourse from '@/components/AddCourse'
export const metadata: Metadata = {
  title: "Add Course",
  description: "Advanced form example using react-hook-form and Zod.",
}
function page() {
  return (
    <AddCourse />
  )
}


export default page