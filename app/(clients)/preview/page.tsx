'use client';
import { useState } from 'react';


export default function Sample() {
  const file = 'https://cloud.appwrite.io/v1/storage/buckets/6489a0a6b548f2079126/files/64d0aaaef070714e2e32/view?project=647a8fc613adfa0667f9&mode=admin';

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }



  return (
    <div className="Example">
      <header>
        <h1>react-pdf sample page</h1>
      </header>
      <div className="Example__container">
{/*       
        <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document> */}
      <div>
        <p>
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </p>
        {/* <Button
          type="button"
          disabled={pageNumber <= 1}
          onClick={previousPage}
        >
          Previous
        </Button>
        <Button
          type="button"
          disabled={pageNumber >= (numPages || 0)}
          onClick={nextPage}
        >
          Next
        </Button> */}
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
