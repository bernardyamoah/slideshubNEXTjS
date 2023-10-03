
import SlidesCard from '@/components/SlidesCard';
import { getCourseDetails } from '@/lib/functions';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { courseId: string };
};
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { courseId } = params;

  // Fetch campus details using the campusId
  const { name } = await getCourseDetails(courseId)?? { name: '' };

  // Define the metadata fields
  const pageTitle = courseId ? `${name}` : "Course";
  const pageDescription = `Browse ${name} slides on this page`;

  return {
    title: pageTitle,
    description: pageDescription,
  };
}

export default async function FilesList({params:{courseId}}) {

return (
    <>


      
      <section className=" ">
       <SlidesCard courseId={courseId}  />
      </section>
     
      
    </>
  );
}