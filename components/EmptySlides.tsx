'use client '
import Image from "next/image";
import { useRouter } from "next/navigation";
import noFile from '@/public/undraw_documents_re_isxv.svg'
import { Button } from "./ui/button";
import { ChevronsLeftIcon, ChevronsLeftRightIcon } from "lucide-react";

export function EmptySlides() {
	const router = useRouter();
	return (

		<div className="dark:bg-inherit w-full mt-10">
			<div className="container  mx-auto grid place-content-center ">
				{/* an Emptystate page */}
				<Image className="object-cover object-center" width={400} height={400} src={noFile} alt="empty books" />
				<div className="flex items-center justify-center mt-16">
					<div className="text-center">
						<h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">Oops! No slides here yet.</h1>

						<Button

							onClick={() => router.back()}
						>
							<ChevronsLeftIcon className="w-4 h-4 mr-2" aria-hidden="true" />
							Go Back
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

