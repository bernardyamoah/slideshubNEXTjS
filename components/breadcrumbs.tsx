"use client";
import * as React from "react";
import Link from "next/link";
import { ChevronRightIcon } from "@radix-ui/react-icons";

import { cn, truncate } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface BreadcrumbsProps extends React.ComponentPropsWithoutRef<"nav"> {
	separator?: React.ComponentType<{ className?: string }>;
	truncationLength?: number;
}

export function Breadcrumbs({
	separator,
	truncationLength = 0,
	className,
	...props
}: BreadcrumbsProps) {
	const SeparatorIcon = separator ?? ChevronRightIcon;
	const pathname = usePathname();
	const pathnames = pathname.split("/").filter((x) => x);
	if (pathname === "/") return null;

	return (
		<nav
			aria-label="breadcrumbs"
			className={cn(
				"mt-2 flex w-full items-center overflow-auto text-sm font-medium text-muted-foreground justify-center ",
				className
			)}
			{...props}
		>
			{pathnames.map((segment, index) => {
				const isLastSegment = index === pathnames.length - 1;
				const to = `/${pathnames.slice(0, index + 1).join("/")}`;
				return (
					<React.Fragment key={segment}>
						<Link
							aria-current={isLastSegment ? "page" : undefined}
							href={to}
							className={cn(
								"truncate transition-colors hover:text-foreground capitalize",
								isLastSegment ? "text-foreground" : "text-muted-foreground"
							)}
						>
							{truncationLength > 0 && segment
								? truncate(segment, truncationLength)
								: segment}
						</Link>
						{!isLastSegment && (
							<SeparatorIcon className="mx-2 h-4 w-4" aria-hidden="true" />
						)}
					</React.Fragment>
				);
			})}
			
		</nav>
	);
}
