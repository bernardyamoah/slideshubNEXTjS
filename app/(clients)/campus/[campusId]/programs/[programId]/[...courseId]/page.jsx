

import SlidesCard from '@/components/SlidesCard';
export default async function FilesList({params:{courseId}}) {

return (
    <>


      
      <section className="relative flex flex-col items-center w-full pb-10 mx-auto ">
       <SlidesCard courseId={courseId}  />
      </section>
     
      
    </>
  );
}