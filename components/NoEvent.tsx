import React from "react";
import party from "@/public/error.svg";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";


export default function NoEvent({ user }: any) {
	return (
		<div className='w-full  flex flex-col items-center justify-center p-4'>
			<Image src={party} alt='Create an event' width={500} height={500} />
			<h3 className='my-4 text-center'>You have no existing event tickets.</h3>

			<Button>
				<Link href={'/dashboard/create'}>
					Add Slides
				</Link>
			</Button>

		</div>
	);
};



