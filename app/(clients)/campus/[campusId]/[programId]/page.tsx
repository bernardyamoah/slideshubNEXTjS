
import CourseList from "@/components/courseList";
import ProgramDetails from "./programDetails";

import { Metadata, ResolvingMetadata } from 'next';
import { getProgramDetails } from "@/lib/functions";

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

export default function Page({params}: Props) {
  return (
    <>
      <ProgramDetails programId={params.programId} />
      <CourseList programId={params.programId} />
    </>
  );
}