

import EmptyState from '@/components/EmptyUI';
import ProgramCard from '@/components/ProgramCard';
import { getCampusDetails, getProgramsByCampusId } from '@/lib/functions';

import { Metadata} from 'next';



type Props = {
  params: { campusId: string };
};
export async function generateMetadata(
  { params }: Props
 
): Promise<Metadata> {
  const { campusId } = params;

  // Fetch campus details using the campusId
  const { name, location } = await getCampusDetails(campusId)?? { name: '', location: '' };;

  // Define the metadata fields
  const pageTitle = campusId ? `${name}, ${location} Programs` : "Campus";
  const pageDescription = `Browse programs available at ${name}, ${location} campus.`;

  return {
    title: pageTitle,
    description: pageDescription,
  };
}



async function ProgramList ({ campusId })  {
const programs= await getProgramsByCampusId(campusId)
const mainClassName = programs?.length > 0 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 " : "grid-cols-1 ";
  return (
    <>
     {programs.length> 0 ? ( 
              <div className={` grid grid-cols-1 gap-10 pb-10 mx-auto max-w-7xl lg:gap-12  py-6  auto-rows-max ${mainClassName}`}>
                {programs.map((program,index) => (
              
                    <ProgramCard key={program.$id} {...program} />
                ))}
              </div>
            ) : (
              <div className="flex justify-center w-full">
                <EmptyState title='programs'/>
              </div>
            )}
    </>
    )
  
  }

export default async function Page({params}: Props) {
const {name,location}=await getCampusDetails(params.campusId)||{name:'',location:''}


  return (

    <>
        
        <div className="p-2 mx-auto text-center lg:mx-0">
        <p className="mb-1 md:text-lg text-emerald-500">
        {location}
        </p> 
        <h2 className="text-xl font-bold tracking-tight text-center text-transparent md:text-3xl dark:text-zinc-100 bg-clip-text dark:bg-gradient-to-r dark:from-zinc-300 dark:to-zinc-600 bg-gradient-to-r from-zinc-950 to-zinc-700 lg:text-4xl ">  {name} 
        </h2>
       
      </div>
    
      <div>
    
      <ProgramList campusId={params.campusId}/>
     
      </div>

    </>
  );
}
