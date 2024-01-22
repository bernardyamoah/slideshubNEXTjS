"use client";

import qs from "query-string";
import { IconType } from "react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

interface CategoryItemProps {
	label: string;
	value?: string;
	icon?: IconType;
}

export const CategoryItem = ({
	label,
	value,
	icon: Icon,
}: CategoryItemProps) => {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();

	const currentCategoryId = searchParams.get("categoryId");
	

	const isSelected = currentCategoryId === value;

	const onClick = () => {
		const url = qs.stringifyUrl(
			{
				url: pathname,
				query: {
					
					categoryId: isSelected ? null : value,
				},
			},
			{ skipNull: true, skipEmptyString: true }
		);

		router.push(url);
	};

	return (
		<button
			onClick={onClick}
			className={cn(
				"py-2 px-3 text-sm border dark:text-slate-200 border-slate-200 dark:border-slate-800 rounded-full flex items-center dark:bg-zinc-700 gap-x-1 hover:border-sky-700 transition",
				isSelected &&
					"border-sky-700 bg-sky-200/20 text-sky-800 dark:bg-sky-500 dark:text-white"
			)}
			type="button"
		>
			{Icon && <Icon size={20} />}
			<div className="truncate">{label}</div>
		</button>
	);
};
