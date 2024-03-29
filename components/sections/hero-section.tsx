import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Book } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";

const Hero = () => {
	const route = useRouter();

	return (
		<>
			<section className="relative mt-10  max-container padding-container flex flex-col gap-16  pb-32    ">
				<div className="mx-auto max-w-5xl mb-6">
					<div className=" mb-3 flex justify-center">
						<Badge
							variant="outline"
							className="block relative rounded-full px-4 py-1 text-sm leading-6 max-w-sm  font-mono  text-center"
						>
							Slideshub 2.0
						</Badge>
					</div>

					<div className="text-center">
						<h1 className="scroll-m-20  bold-40  lg:bold-64">
							Charting Your Course to Success{" "}
						</h1>

						<p className="leading-7 md:leading-10 [&:not(:first-child)]:mt-6 regular-20 md:regular-24 dark:text-zinc-400">
							For students who seek excellence in learning!{" "}
							<span className="text-emerald-500 font-bold border-b-2 border-dashed border-emerald-400">
								SlidesHub{" "}
							</span>
							transforms your study experience by providing a comprehensive
							library of college books and slides. Level up your education
							journey with us!{" "}
						</p>
						<div className=" mt-10 flex items-center justify-center gap-x-6">
							<Button className=" focus-visible:outline-offset-2 focus-visible:outline-2 focus-visible:outline  rounded-full  lg:!p-8 !p-6 hover:bg-emerald-500">
								<Link
									href="/campus"
									className="flex gap-2     text-xl     font-bold"
								>
									Explore Now
									<Book className="w-6 h-6 " />{" "}
								</Link>
							</Button>
						</div>
					</div>
				</div>

				<h2 className="bold-32 text-4xl leading-7 md:leading-10 text-center md-3 mt-16">
					SlidesHub, the Ultimate Resource for Academic Mastery!{" "}
				</h2>
				<div className="relative aspect-video rounded-2xl w-full max-w-3xl mx-auto overflow-hidden  ">
					<Image
						src="/hero-image-2.png"
						fill={true}
						alt="hero"
						className="object-cover"
					/>
				</div>
			</section>
		</>
	);
};

export default Hero;
