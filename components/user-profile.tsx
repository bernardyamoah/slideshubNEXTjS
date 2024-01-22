import { LogOut } from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStore } from "@/hooks/use-user";

import Link from "next/link";
import { getUserInitials } from "@/lib/functions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const UserProfile = () => {
	const router = useRouter();
	const user = useStore((state) => state.user);
	const signOut = useStore((state) => state.signOut);
	const handleSignOut = async () => {
		signOut();
		router.push("/");
	};
	const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
	useEffect(() => {
		async function fetchAvatarUrl() {
			try {
				if (user) {
					const initials = await getUserInitials(user?.name || "");
					setAvatarUrl(initials);
				}
			} catch (error) {
				console.log(error);
			}
		}

		fetchAvatarUrl();
	}, [user]);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className=" relative w-8 h-8 md:w-10 md:h-10 rounded-full outline-zinc-700"
				>
					<Avatar className="relative w-8 h-8">
						{avatarUrl && (
							<AvatarImage src={avatarUrl} alt={user?.name || " "} />
						)}
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 z-[100]" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<Link
						href={`/dashboard/profile/${user?.$id}`}
						className="flex flex-col space-y-1"
					>
						<p className="text-sm font-medium leading-none">{user?.name}</p>
						<p className="text-xs leading-none text-muted-foreground">
							{user?.email}
						</p>
					</Link>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />

				<DropdownMenuItem
					className="text-red-600 hover:bg-red-50"
					onClick={handleSignOut}
				>
					<LogOut className="w-4 h-4 mr-2" />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
