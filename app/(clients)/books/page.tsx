'use client';

import { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import './Sample.css';

import type { PDFDocumentProxy } from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

type PDFFile = string | File | null;

export default function Sample() {
  const [file, setFile] = useState<PDFFile>('https://cloud.appwrite.io/v1/storage/buckets/6489a0a6b548f2079126/files/64d0aaaef070714e2e32/view?project=647a8fc613adfa0667f9&mode=admin');
  const [numPages, setNumPages] = useState<number>();

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { files } = event.target;

    if (files && files[0]) {
      setFile(files[0] || null);
    }
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  return (
    <div className="Example">
      <header>
        <h1>react-pdf sample page</h1>
      </header>
      <div className="Example__container">
        <div className="Example__container__load">
          <label htmlFor="file">Load from file:</label>{' '}
          <input onChange={onFileChange} type="file" />
        </div>
        <div className="Example__container__document">
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}












// 'use client'

// import Loading from '@/components/ui/Cloading';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { useState } from 'react'

// import {Document,Page,pdfjs} from 'react-pdf'

// pdfjs.GlobalWorkerOptions.workerSrc=new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url,
// ).toString();


// export default function Sample() {
//   const [numPages, setNumPages]=useState<number>()
//   const [pageNumber, setPageNumber]=useState<number>(1)
//   function onDocumentLoadSuccess({numPages}:{numPages:number}):void{
//     setNumPages(numPages)

//   }
//   const handleNextPage = () => {
//     if (numPages && pageNumber < numPages) {
//       setPageNumber(pageNumber + 1);
//     }
//   }
//   return (
// <>
// <Button onClick={handleNextPage}>Next</Button>
// <div className=' mx-auto border overflow-hidden'>
//   <Document className='max-w-2xl mx-auto h-screen overflow-scroll-y' file={'https://cloud.appwrite.io/v1/storage/buckets/6489a0a6b548f2079126/files/64d0aaaef070714e2e32/view?project=647a8fc613adfa0667f9&mode=admin'} onLoadSuccess={onDocumentLoadSuccess} loading={Loading}>
//     {/* <Page  pageNumber={pageNumber}/> */}
//     {
//       Array.from(new Array(numPages), (el, index) => (
//         <Page
//           key={`page_${index + 1}`}
//           pageNumber={index + 1}
//         />
//       ))
//     }
//   </Document>
 
//   <Badge>Page {pageNumber
//   } of {numPages}</Badge>
// </div>
// </>
//   )
// }
