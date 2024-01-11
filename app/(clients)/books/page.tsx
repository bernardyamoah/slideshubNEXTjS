
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
        label="Books Page is under maintenance"
      />
  </header>





  )
}

export default Page