import React from "react";
import party from "@/public/undraw_empty_re_opql.svg";
import Image from "next/image";



export default function NoEvent() {
	return (
		<div className='w-full  flex flex-col items-center justify-center p-4'>
			<Image src={party} alt='Create an event' width={500} height={500} />
			<p className='mt-10 text-center text-base md:text-lg lg:text-xl xl:text-2xl'>You have no existing slides.</p>


		</div>
	);
};



