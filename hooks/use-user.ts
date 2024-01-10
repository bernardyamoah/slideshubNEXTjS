import { create } from "zustand";
import { account, teams } from "@/appwrite";
import { errorMessage, logIn, logOut, signUp } from "@/lib/functions";

interface User {
	$id: string;
	name: string;
	email: string;
	labels?: string[];
	prefs: {};
	status: boolean;
	registration: string;
	emailVerification: boolean;
}

type State = {
	user: User | null;
	loading: boolean;
	userInTeam: boolean;
	login: (
		email: string,
		password: string,
		onSuccess: () => void
	) => Promise<void>;
	register: (name: string, email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
	setUser: (user: User | null) => void;
	checkUserInTeam: () => Promise<void>;
};

export const useStore = create<State>((set) => ({
	user: null,
	loading: false,
	userInTeam: false,
	setUser: (user) => set({ user }),
	login: async (email: string, password: string, onSuccess) => {
		set({ loading: true });
		await logIn(email, password);
		const currentUser = await account.get();
		set({ user: currentUser, loading: false });
		onSuccess();
	},
	register: async (name: string, email: string, password: string) => {
		try {
			await signUp(name, email, password);
			const currentUser = await account.get();
			set({ user: currentUser, loading: false });
		} catch (error) {
			set({ loading: false });
			errorMessage("Error registering");
		}
	},
	signOut: async () => {
		set({ loading: true });
		await logOut();
		set({ user: null, loading: false });
	},
	checkUserInTeam: async () => {
		set({ loading: true });
		try {
			const { $id } = await account.get();
			if (!$id) throw new Error("User ID is not available");

			const response = await teams.listMemberships(
				process.env.NEXT_PUBLIC_TEAM_ID!
			);
			const isUserInTeam = response.memberships.some(
				(membership: any) => membership.userId === $id
			);
			set({ userInTeam: isUserInTeam });
		} catch (error) {
			console.error("Error checking team membership:", error);
			set({ userInTeam: false });
		} finally {
			set({ loading: false });
		}
	},
}));
