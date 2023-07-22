

import Image from "next/image";
import noProgram from '@/public/undraw_no_data_re_kwbl.svg'
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { ChevronsLeftIcon } from "lucide-react";

export default function EmptyProgram() {
	const router = useRouter();
	return (

		<div className='w-full  flex flex-col items-center justify-center p-4'>
			<Image src={noProgram} alt='Create an event' width={200} height={300} />
			<h1 className='mt-10 text-center text-base font-bold sm:text-2xl'>Oops! There are no Programs here!</h1>
			<Button

				onClick={() => router.back()}
			>
				<ChevronsLeftIcon className="w-4 h-4 mr-2" aria-hidden="true" />
				Go Back
			</Button>

		</div>
	)

}