
import ProgramList from './programList';
import { getCampusDetails } from '@/lib/functions';

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


export default async function Page({params}: Props) {
const {name,location}=await getCampusDetails(params.campusId)||{name:'',location:''}


  

  return (

    <>
        
        <div className="mx-auto text-center lg:mx-0">
        <p className="mb-1 md:text-lg text-emerald-500">
        {location}
        </p> 
        <h2 className="text-3xl font-bold tracking-tight text-center text-transparent dark:text-zinc-100 xl:text-6xl/none bg-clip-text dark:bg-gradient-to-r dark:from-zinc-300 dark:to-zinc-600 bg-gradient-to-r from-zinc-950 to-zinc-700 lg:text-4xl ">  {name} 
        </h2>
       
      </div>
    

       <ProgramList campusId={params.campusId} />
       

    </>
  );
}
