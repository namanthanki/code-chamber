import { create } from "zustand";

interface VerifyEmailStore {
	isVerifying: boolean;
	isSuccess: boolean;
	error: string | null;

	setIsVerifying: (isVerifying: boolean) => void;
	setIsSuccess: (isSuccess: boolean) => void;
	setError: (error: string | null) => void;
}

export const useVerifyEmailStore = create<VerifyEmailStore>((set) => ({
	isVerifying: true,
	isSuccess: false,
	error: null,

	setIsVerifying: (isVerifying) => set({ isVerifying }),
	setIsSuccess: (isSuccess) => set({ isSuccess }),
	setError: (error) => set({ error }),
}));
