"use client";
import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
	const isClient = typeof window === "object";

	const [matches, setMatches] = useState<boolean>(
		isClient ? window.matchMedia(query).matches : false
	);

	useEffect(() => {
		if (!isClient) {
			return;
		}

		const mediaQueryList = window.matchMedia(query);
		const handleMediaQueryChange = (event: MediaQueryListEvent) => {
			setMatches(event.matches);
		};

		mediaQueryList.addEventListener("change", handleMediaQueryChange);

		return () => {
			mediaQueryList.removeEventListener("change", handleMediaQueryChange);
		};
	}, [query, isClient]);

	return matches;
}
