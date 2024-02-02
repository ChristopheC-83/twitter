import { create } from "zustand";

export const useModalsStore = create((set) => ({

    modalPost: false,
    setModalPost: (value) => set({ modalPost: value }),

    modalSignIn: false,
    setModalSignIn: (value) => set({ modalSignIn: value }),

    modalSignUp: false,
    setModalSignUp: (value) => set({ modalSignUp: value }),















}))