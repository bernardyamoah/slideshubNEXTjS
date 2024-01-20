import  qs  from 'query-string';
import { RemoveUrlQueryParams, UrlQueryParams } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function truncate(str: string, length: number) {
	return str.length > length ? `${str.substring(0, length)}...` : str;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
	const currentUrl = qs.parse(params);

	currentUrl[key] = value;

	return qs.stringifyUrl(
		{
			url: window.location.pathname,
			query: currentUrl,
		},
		{ skipNull: true }
	);
}

export function removeKeysFromQuery({
	params,
	keysToRemove,
}: RemoveUrlQueryParams) {
	const currentUrl = qs.parse(params);

	keysToRemove.forEach((key) => {
		delete currentUrl[key];
	});

	return qs.stringifyUrl(
		{
			url: window.location.pathname,
			query: currentUrl,
		},
		{ skipNull: true }
	);
}
