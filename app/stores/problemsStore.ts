import axios from "axios";
import { create } from "zustand";
import { DBProblem } from "../utils/types/problem";

interface ProblemsStore {
	loading: boolean;
	problems: DBProblem[];
	setLoading: (loading: boolean) => void;
	setProblems: (problems: DBProblem[]) => void;
	fetchProblems: () => void;
}

export const useProblemsStore = create<ProblemsStore>((set) => ({
	problems: [],
	loading: false,
	setLoading: (loading) => set({ loading }),
	setProblems: (problems) => set({ problems }),
	fetchProblems: async () => {
		try {
			set({ loading: true });
			const response = await axios.get("/api/problems");
			set({ problems: response.data.problems });
		} catch (error) {
			console.error(error);
		} finally {
			set({ loading: false });
		}
	},
}));
