'use client'
import Link from "next/link";
import Image from "next/image";
import errorImage from '@/public/error.svg'


export default function EmptyProgram() {
	return (
		
		<div className='w-full  flex flex-col items-center justify-center p-4'>
			<h1 className='my-4 text-center text-base font-bold sm:text-2xl'>Oops! There are no Programs here!</h1>
			<Image src={'https://opendoodles.s3-us-west-1.amazonaws.com/reading.svg'} alt='Create an event' width={500} height={500} />

			{/* <Button>
				<Link href={'/campus'}>
					Add Slides
				</Link>
			</Button> */}
	</div>
	)

}