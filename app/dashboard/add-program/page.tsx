'use client'
import React from 'react'
import { Metadata } from "next"

import AddProgram from '@/components/AddProgram'
export const metadata: Metadata = {
  title: "Add Slides",
  description: "Advanced form example using react-hook-form and Zod.",
}
function page() {
  return (
    <AddProgram />
  )
}


export default page