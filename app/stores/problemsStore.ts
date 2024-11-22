import axios from "axios";
import { create } from "zustand";
import { DBProblem } from "../utils/types/problem";

interface ProblemsStore {
	loading: boolean;
	problems: any;
	totalProblems: number;
	currentPage: number;
	totalPages: number;
	difficulty: string;
	category: string;
	setLoading: (loading: boolean) => void;
	setProblems: (problems: any) => void;
	fetchProblems: (
		page?: number,
		difficulty?: string,
		category?: string
	) => Promise<void>;
	setDifficulty: (difficulty: string) => void;
	setCategory: (category: string) => void;
}

export const useProblemsStore = create<ProblemsStore>((set, get) => ({
	problems: [],
	loading: false,
	totalProblems: 0,
	currentPage: 1,
	totalPages: 1,
	difficulty: "",
	category: "",

	setLoading: (loading) => set({ loading }),

	setProblems: (problems) => set({ problems }),

	fetchProblems: async (page = 1, difficulty = "", category = "") => {
		set({ loading: true });
		try {
			const params = new URLSearchParams({
				page: page.toString(),
				difficulty,
				category,
				limit: "10",
			});

			const response = await axios.get(`/api/problems?${params}`);

			set({
				problems: response.data.problems,
				totalProblems: response.data.totalProblems,
				currentPage: response.data.currentPage,
				totalPages: response.data.totalPages,
				loading: false,
				difficulty,
				category,
			});
		} catch (error) {
			console.error("Failed to fetch problems", error);
			set({ loading: false });
		}
	},

	setDifficulty: (difficulty) => {
		const { fetchProblems } = get();
		fetchProblems(1, difficulty, get().category);
	},

	setCategory: (category) => {
		const { fetchProblems } = get();
		fetchProblems(1, get().difficulty, category);
	},
}));
