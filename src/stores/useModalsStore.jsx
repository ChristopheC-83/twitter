import { create } from "zustand";

export const useModalsStore = create((set) => ({

    modalPost: false,
    setModalPost: (value) => set({ modalPost: value }),

    modalConnection: false,
    setModalConnection: (value) => set({ modalConnection: value }),

    modalRegister: false,
    setModalRegister: (value) => set({ modalRegister: value }),

}))