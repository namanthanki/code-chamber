import { create } from "zustand";
import validateEmail from "../helpers/validateEmail";

interface SignInModalStore {
	isLoading: boolean;
	error: string | null;
	formData: {
		email: string;
		password: string;
	};
	errors: {
		email: string | null;
		password: string | null;
	};
	setIsLoading: (isLoading: boolean) => void;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	validateField: (field: keyof SignInModalStore["formData"]) => void;
	resetErrors: () => void;
	resetForm: () => void;
}

export const useSignInModalStore = create<SignInModalStore>((set) => ({
	isLoading: false,
	error: null,
	formData: {
		email: "",
		password: "",
	},
	errors: {
		email: null,
		password: null,
	},
	setIsLoading: (isLoading) => set({ isLoading }),
	handleInputChange: (e) =>
		set((state) => {
			const newFormData = {
				...state.formData,
				[e.target.name]: e.target.value,
			};
			const newErrors = { ...state.errors };

			switch (e.target.name) {
				case "email":
					newErrors.email = validateEmail(newFormData.email)
						? "Invalid email address"
						: null;
					break;
				case "password":
					newErrors.password =
						newFormData.password.length < 6
							? "Password must be at least 6 characters long"
							: null;
					break;
			}

			return { formData: newFormData, errors: newErrors };
		}),
	validateField: (field) =>
		set((state) => {
			const newErrors = { ...state.errors };
			switch (field) {
				case "email":
					newErrors.email = !state.formData.email.includes("@")
						? "Invalid email address"
						: "";
					break;
				case "password":
					newErrors.password =
						state.formData.password.length < 6
							? "Password must be at least 6 characters long"
							: "";
					break;
			}
			return { errors: newErrors };
		}),
	resetErrors: () => set({ errors: { email: null, password: null } }),
	resetForm: () =>
		set({
			formData: { email: "", password: "" },
			errors: { email: null, password: null },
		}),
}));
