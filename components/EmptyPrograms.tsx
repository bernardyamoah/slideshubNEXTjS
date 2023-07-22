'use client'
import Link from "next/link";
import Image from "next/image";
import noProgram from '@/public/undraw_no_data_re_kwbl.svg'


export default function EmptyProgram() {
	return (

		<div className='w-full  flex flex-col items-center justify-center p-4'>
			<Image src={noProgram} alt='Create an event' width={300} height={300} />
			<h1 className='mt-10 text-center text-base font-bold sm:text-2xl'>Oops! There are no Programs here!</h1>

			{/* <Button>
				<Link href={'/campus'}>
					Add Slides
				</Link>
			</Button> */}
		</div>
	)

}