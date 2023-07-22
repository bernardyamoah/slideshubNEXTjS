
import Image from "next/image";
import { useRouter } from "next/navigation";
import book from '@/public/no books.svg'
import { Button } from "./ui/button";
export default function EmptyBooks() {
	const router = useRouter();
	const content = (
		<>
			<div className="dark:bg-inherit w-full">
				<div className="container  mx-auto grid place-content-center h-screen">
					{/* an Emptystate page */}
					<Image className="object-cover object-center" width={400} height={400} src={book} alt="empty books" />
					<div className="flex items-center justify-center mt-16">
						<div className="text-center">
							<h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">Oops! Nothing here yet.</h1>

							<Button

								onClick={() => router.push("/")}
							>
								Go Home
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
	return content;
}
