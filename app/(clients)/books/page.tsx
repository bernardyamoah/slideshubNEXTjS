
import { Banner } from '@/components/banner';
import { Metadata } from 'next';
export const metadata:Metadata={
  title:'Books',
  
}

const Page = () => {
  return (
    <header className="mb-10 mx-auto lg:mx-0 text-center">
      <Banner
        variant="warning"
        label="Page is under maintenance"
      />
    <h2 className="text-3xl font-bold tracking-tight text-transparent dark:text-zinc-100 sm:text-4xl xl:text-6xl/none bg-clip-text dark:bg-gradient-to-r dark:from-zinc-300 dark:to-zinc-600 bg-gradient-to-r from-zinc-950 to-zinc-700 ">  Search books
    </h2>
    <p className="mt-4  text-zinc-400">
    books.
    </p> 
  </header>





  )
}

export default Page