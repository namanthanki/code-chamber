import { create } from "zustand";

interface AuthModalStore {
    isOpen: boolean;
    type: "signin" | "signup" | "reset-password";
    open: () => void;
    close: () => void;
    setType: (type: "signin" | "signup" | "reset-password") => void;
}

export const useAuthModalStore = create<AuthModalStore>((set) => ({
    isOpen: false,
    type: "signin",
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false, type: "signin" }),
    setType: (type) => set({ type }),
}));


