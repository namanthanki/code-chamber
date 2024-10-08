import axios from "axios";
import { create } from "zustand";

type Problem = {
	id: string;
	title: string;
	difficulty: string;
	category: string;
	order: number;
	videoId?: string;
	link?: string;
	likes: number;
	dislikes: number;
};

interface ProblemsStore {
	loading: boolean;
	problems: Problem[];
	setLoading: (loading: boolean) => void;
	setProblems: (problems: Problem[]) => void;
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
