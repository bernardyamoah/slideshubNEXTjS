'use client'
import React from 'react'
import { Metadata } from "next"
import AddBook from '@/components/AddBook'
const metadata: Metadata = {
    title: "Add Books",
    description: "Advanced form example using react-hook-form and Zod.",
  }
function page() {
  return (
    <AddBook />
  )
}

export default page