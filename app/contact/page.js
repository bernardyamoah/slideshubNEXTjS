import React from "react";
import Link from "next/link";
export default function contactUs() {
	return (
		<>
			<section className="heading-link">
				<h3>about us</h3>
				<p>
					<Link href="/">home</Link> / about
				</p>
			</section>
		</>
	);
}
