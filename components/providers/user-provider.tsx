"use client";
import { useStore } from "@/hooks/use-user";

import Loading from "@/components/ui/Cloading";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { account } from "@/appwrite";
import { useConfettiStore } from "@/hooks/use-confetti-store";

export const UserProvider = ({ children }) => {
	const setUser = useStore((state) => state.setUser);
	const user = useStore((state) => state.user);
	const { loading, checkUserInTeam } = useStore();
	const router = useRouter();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const user = await account.get();
				setUser(user);
				checkUserInTeam();
				
				// If the user is null, redirect to the login page
				if (!user) {
					router.push("/login");
				}
			} catch (error) {
				console.error("Error fetching user:", error);
				// Handle error, e.g., redirect to an error page or show an error message
			}
		};

		// Fetch user information
		fetchUser();
	}, [ router]);

	// If loading is true, show a loading spinner
	if (loading) {
		return <Loading />;
	}

	// If the user is authenticated, render the children
	return children;
};
