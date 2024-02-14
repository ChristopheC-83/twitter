import {create} from "zustand";

export const useTwitsStore = create((set) => ({
  twits: [],
  setTwits: (twits) => set({ twits }),
  addTwit: (newTwit) => set((state) => ({ twits: [...state.twits, newTwit] })),
  deleteTwit: (twitId) =>
    set((state) => ({
      twits: state.twits.filter((twit) => twit.id !== twitId),
    })),
  commentTwit: (twitId, comment) =>
    set((state) => ({
      twits: state.twits.map((twit) => {
        if (twit.id === twitId) {
          return { ...twit, comments: [...twit.comments, comment] };
        }
        return twit;
      }),
    })),
}));
