import { getCourseDetails } from "@/lib/functions";
import { Metadata, ResolvingMetadata } from "next";
import { getSlidesByCourseId } from "@/lib/functions";

import { Suspense } from "react";

import EmptyState from "@/components/empty-ui";

import { Separator } from "@/components/ui/separator";

import LoadingSkeleton from "@/components/loading-skeleton";
import FileCard from "./file";
import { ImageCarousel } from "./_component/imageCarousel";

type Props = {
	params: { courseId: string };
};
export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { courseId } = params;

	// Fetch campus details using the campusId
	const { name } = (await getCourseDetails(courseId)) ?? { name: "" };

	// Define the metadata fields
	const pageTitle = courseId ? `${name}` : "Course";
	const pageDescription = `Browse ${name} slides on this page`;

	return {
		title: pageTitle,
		description: pageDescription,
	};
}

async function getFiles(courseId: string) {
	const slides = await getSlidesByCourseId(courseId);
	return slides;
}

export default async function FilesList({ params: { courseId } }) {
	const data = await getFiles(courseId);

	const slides = data.filter(
		(slide) => slide.fileType !== "PNG" && slide.fileType !== "JPG"
	);
	const Images = data.filter(
		(slide) =>
			slide.fileType === "PNG" ||
			slide.fileType === "JPG" ||
			slide.fileType === "JPEG"
	);
	return (
		<>
			<div className="mt-5 ">
				{/* Images List */}
				{Images.length !== 0 && (
					<>
						<div className="container mt-10 space-y-1 ">
							<h2 className="text-2xl font-semibold tracking-tight">Images</h2>
							<p className="text-sm text-muted-foreground">
								Displaying {Images.length} files
							</p>
						</div>
						<Separator className="my-4" />
						<div className=" relative mx-auto max-w-xs  w-[14rem] md:w-full  md:max-w-6xl px-3">
							<Suspense fallback={<LoadingSkeleton />}>
								<ImageCarousel images={Images} />
							</Suspense>
						</div>
					</>
				)}

				<div className="container mt-10 space-y-1 ">
					<h2 className="text-2xl font-semibold tracking-tight">Files</h2>
					<p className="text-sm text-muted-foreground">
						<span>Displaying {slides.length} files</span>
					</p>
				</div>
				<Separator className="my-8" />

				{/* Files  */}
				{slides.length > 0 ? (
					<div className="grid grid-cols-1 gap-10 px-4 pb-10 mx-auto max-w-7xl sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  place-content-center ">
						<Suspense fallback={<div>Loading...</div>}>
							{slides.map((slide, index) => (
								<FileCard key={index} slide={slide} />
							))}
						</Suspense>
					</div>
				) : (
					<div className="flex justify-center w-full">
						<EmptyState title="slides" />
					</div>
				)}
			</div>
		</>
	);
}
