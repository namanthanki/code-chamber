import { create } from "zustand";

interface AuthStore {
	isLoading: boolean;
	isLoggedIn: boolean;
	user: any;
	setIsLoading: (isLoading: boolean) => void;
	setIsLoggedIn: (isLoggedIn: boolean) => void;
	setUser: (user: any) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
	isLoading: false,
	isLoggedIn: false,
	user: null,
	setIsLoading: (isLoading) => set({ isLoading }),
	setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
	setUser: (user: any) => set({ user }),
}));
