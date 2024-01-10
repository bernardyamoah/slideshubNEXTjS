"use client";
import { useStore } from "@/hooks/use-user";

import Loading from "@/components/ui/Cloading";
import { useRouter } from "next/navigation";

export const UserProvider = ({ children }) => {
	const { user, loading, setUser, setLoading } = useStore();
  const router = useRouter();

	if (loading) return <Loading />;
	if (!user) router.push("/login");

	return children;
};
