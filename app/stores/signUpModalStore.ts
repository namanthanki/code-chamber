import { create } from "zustand";
import validateEmail from "../helpers/validateEmail";

interface SignUpModalStore {
	isLoading: boolean;
	error: string | null;
	formData: {
		name: string;
		email: string;
		password: string;
	};
	errors: {
		name: string | null;
		email: string | null;
		password: string | null;
	};
	setIsLoading: (isLoading: boolean) => void;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	validateField: (field: keyof SignUpModalStore["formData"]) => void;
	resetErrors: () => void;
	resetForm: () => void;
}

export const useSignUpModalStore = create<SignUpModalStore>((set) => ({
	isLoading: false,
	error: null,
	formData: {
		name: "",
		email: "",
		password: "",
	},
	errors: {
		name: null,
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
				case "name":
					newErrors.name =
						newFormData.name.length < 2
							? "Name must be at least 2 characters long"
							: null;
					break;
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
				case "name":
					newErrors.name =
						state.formData.name.length < 2
							? "Name must be at least 2 characters long"
							: "";
					break;
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
	resetErrors: () => set({ errors: { name: "", email: "", password: "" } }),
	resetForm: () =>
		set(() => ({
			formData: { name: "", email: "", password: "" },
		})),
}));
