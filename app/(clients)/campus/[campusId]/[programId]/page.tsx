
import CourseList from "@/components/courseList";
import { getProgramDetails } from "@/lib/functions";


import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { programId: string };
};
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { programId } = params;

  // Fetch campus details using the campusId
  const {name  } = await getProgramDetails(programId)?? { name: ''};;

  // Define the metadata fields
  const pageTitle = programId ? `${name} Courses` : "Program";
  const pageDescription = `Browse programs available at ${name} campus.`;

  return {
    title: pageTitle,
    description: pageDescription,
  };
}




   
type ProgramDetails = {
  name: string;
  campusId: string;
};

async function getPDetails(programId:string) {
  // Replace this with actual logic to fetch program details
  const programDetails = await getProgramDetails(programId);

  return programDetails ?? { name: '', campusId: '' };
}



export  default async function Page({params}: Props) {
  const {name,campusId}=await getPDetails(params.programId)


  return (
    <>
    <div className="mb-6">
    <h2 className="text-3xl text-center ">{name}</h2>
    </div>

      <CourseList programId={params.programId} campusId={campusId} />
    </>
  );
}