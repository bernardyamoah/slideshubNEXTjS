import { create } from "zustand";
import { account, teams } from "@/appwrite";
import {
	errorMessage,
	getCurrentUserAndSetUser,
	logIn,
	logOut,
	signUp,
} from "@/lib/functions";
import { useRouter } from "next/navigation";
  const getUserID = async (): Promise<string> => {
		try {
			const request = await account.get();
			return request.$id;
		} catch (error) {
			throw new Error("Error fetching user ID: " + error);
		}
	};
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
	setUser: (user: User | null) => void;
	setLoading: (loading: boolean) => void;
	login: (email: string, password: string) => Promise<void>;
	register: (name: string, email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
	checkUserInTeam: () => Promise<void>;
};

export const useStore = create<State>((set) => ({
	user: null,
	loading: false,
	userInTeam: false,
	setLoading: (loading) => set({ loading }),
	setUser: (user) => set({ user }),
	setUserInTeam: (inTeam) => set({ userInTeam: inTeam }),
	login: async (email: string, password: string) => {
		try {
			await logIn(email, password);
			const currentUser = await getCurrentUserAndSetUser();
			console.log("🚀 ~ file: use-user.ts:53 ~ login: ~ currentUser:", currentUser)
			set({ user: currentUser, loading: false });
			useRouter().push("/dashboard");
		} catch (error) {
			set({ loading: false });
			errorMessage("Error logging in");
		}
	},
	register: async (name: string, email: string, password: string) => {
		try {
			await signUp(name, email, password);
			const currentUser = await getCurrentUserAndSetUser();
			set({ user: currentUser, loading: false });
			useRouter().push("/dashboard");
		} catch (error) {
			set({ loading: false });
			errorMessage("Error registering");
			useRouter().push("/register");
		}
	},
	signOut: async () => {
		try {
			await logOut();
			useRouter().push("/");
			set({ user: null, loading: false });
		} catch (error) {
			set({ loading: false });
			errorMessage("Error signing out");
		}
	},
	checkUserInTeam: async () => {
		try {
			  const userId = await getUserID()
			if (!userId) throw new Error("User ID is not available");

			const response = await teams.listMemberships(
				process.env.NEXT_PUBLIC_TEAM_ID!
			);
			const isUserInTeam = response.memberships.some(
				(membership: any) => membership.userId === userId
			);
			set({ userInTeam: isUserInTeam });
		} catch (error) {
			console.error("Error checking team membership:", error);
			set({ userInTeam: false });
		}
	},
}));
