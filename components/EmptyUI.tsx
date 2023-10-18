

import Image from "next/image";

import { EmptyUI } from "@/constants";

export default function EmptyState({title}) {

const data= EmptyUI.find(ui=>ui.label===title);

	return (

		<div className='w-full  p-4'>
			<div className="max-w-sm h-72 flex items-center justify-center mx-auto relative">
			<Image src={data?.image??''} alt={`No ${data?.label}`}  className="object-center h-full w-full" width={300} height={300} quality={100}/>
			</div>
			<h1 className='mt-10 text-center font-bold text-2xl'>Oops! There are no {data?.label} here!</h1>
			
		</div>
	)

}