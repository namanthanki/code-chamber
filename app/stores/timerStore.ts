import { create } from "zustand";

interface TimerStore {
	showTimer: boolean;
	time: number;
	setShowTimer: (showTimer: boolean) => void;
	setTime: (time: number) => void;
}

export const useTimerStore = create<TimerStore>((set) => ({
	showTimer: false,
	time: 0,
	setShowTimer: (showTimer) => set({ showTimer }),
	setTime: (time) => set({ time }),
}));
