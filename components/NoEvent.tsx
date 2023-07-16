import React from "react";
import party from "@/public/error.svg";
import Image from "next/image";



export default function NoEvent({ user }: any) {
	return (
		<div className='w-full  flex flex-col items-center justify-center p-4'>
			<Image src={party} alt='Create an event' width={500} height={500} />
			<h3 className='my-4 text-center'>You have no existing slides.</h3>


		</div>
	);
};



