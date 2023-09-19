

import SlidesCard from '@/components/SlidesCard';
export default async function FilesList({params:{courseId}}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}`
  );
  const data = await response.json();
  console.log("🚀 ~ file: page.jsx:9 ~ FilesList ~ data:", data)
 
return (
    <>


      
      <section className="relative flex flex-col items-center w-full pb-10 mx-auto ">
       <SlidesCard courseId={courseId}  />
      </section>
     
      
    </>
  );
}