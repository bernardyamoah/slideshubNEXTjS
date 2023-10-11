'use client'
import Loading from '@/components/ui/Cloading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
// import EmptyBooks from '@/components/EmptyBooks'
import React, { useState } from 'react'
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc=new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString()
import {Document,Page} from 'react-pdf'

export default function Book() {
  const [numPages, setNumPages]=useState<number>()
  const [pageNumber, setPageNumber]=useState<number>(1)
  function onDocumentLoadSuccess({numPages}:{numPages:number}):void{
    setNumPages(numPages)

  }
  const handleNextPage = () => {
    if (numPages && pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  }
  return (
<>
<Button onClick={handleNextPage}>Next</Button>
<div className=' mx-auto border overflow-hidden'>
  <Document className='max-w-2xl mx-auto h-screen overflow-scroll-y' file={'https://cloud.appwrite.io/v1/storage/buckets/6489a0a6b548f2079126/files/64d0aaaef070714e2e32/view?project=647a8fc613adfa0667f9&mode=admin'} onLoadSuccess={onDocumentLoadSuccess} loading={Loading}>
    <Page  pageNumber={pageNumber}/>
  </Document>
 
  <Badge>Page {pageNumber
  } of {numPages}</Badge>
</div>
</>
  )
}
