import { create } from "zustand";

interface AuthStore {
	isLoading: boolean;
	isLoggedIn: boolean;
	isInProblemPage: boolean;
	user: any;
	setIsLoading: (isLoading: boolean) => void;
	setIsLoggedIn: (isLoggedIn: boolean) => void;
	setIsInProblemPage: (isInProblemPage: boolean) => void;
	setUser: (user: any) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
	isInProblemPage: false,
	isLoading: false,
	isLoggedIn: false,
	user: null,
	setIsLoading: (isLoading) => set({ isLoading }),
	setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
	setIsInProblemPage: (isInProblemPage) => set({ isInProblemPage }),
	setUser: (user: any) => set({ user }),
}));
