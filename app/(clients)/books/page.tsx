'use client'
// import EmptyBooks from '@/components/EmptyBooks'
import React, { useState } from 'react'
import DocViewer, {  PDFRenderer, PNGRenderer  } from "@cyntler/react-doc-viewer";
export default function page() {
  const docs = [
    { uri: "https://cloud.appwrite.io/v1/storage/buckets/6489a0a6b548f2079126/files/64d0aaaef070714e2e32/view?project=647a8fc613adfa0667f9&mode=admin" }
    
  ];
  
  return (
  // <EmptyBooks/>
  <>
   return <DocViewer   pluginRenderers={[PDFRenderer, PNGRenderer]} documents={docs}  />;
{/* 
  <div className='max-w-4xl mx-auto'> <iframe name='file' className='w-full h-screen'  src="https://cloud.appwrite.io/v1/storage/buckets/6489a0a6b548f2079126/files/64d0aaaef070714e2e32/view?project=647a8fc613adfa0667f9&mode=admin" ></iframe></div> */}
  </>
  )
}
