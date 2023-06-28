"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import book from '@/public/books.svg'
export default function EmptyBooks() {
	const router = useRouter();
	const content = (
		<>
			<div className="bg-white dark:bg-inherit w-full )">
				<div className="container  mx-auto grid place-content-center">
					{/* an Emptystate page */}
					<Image className="object-cover object-center" width={900} height={600} src={book} alt="empty books"/>
					<div className="flex items-center justify-center">
						<div className="text-center">
							<h1 className="text-3xl font-semibold text-gray-900 mb-2">Oops! Nothing here yet.</h1>
							<p className="text-gray-600 mb-6">There are no books added here yet.</p>
							<button
            className="bg-emerald-500 hover:bg-emerald-600 border rounded-lg text-white font-semibold py-2 px-4 mt-6"
            onClick={() => router.push("/")}
          >
            Go Home
          </button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
	return content;
}
