'use client'
import * as React from "react";
import { useState, useEffect } from "react";






export default function AddBook() {
; 


  const [bookcategory, setBookCategory] = useState('')
  const categories = [
    {
      id: 'Engineering',
      hour: 'Engineering'
    },
    {
      id: 'Health Science',
      hour: 'Health Science'
    },
    {
      id: 'Psychology',
      hour: 'Psychology'
    },
    {
      id: 'Mathematics',
      hour: 'Mathematics'
    },
  ]
  const handleBookCategoryChange = (selectedValue: string) => {
    setBookCategory(selectedValue);

  };
  return (
    <>


      


    </>
  );
}
