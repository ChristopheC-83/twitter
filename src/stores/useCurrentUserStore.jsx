import { create } from "zustand";

export const useCurrentUserStore = create((set) => ({

    currentUser:{
        id: 1,
        username: "user1",
        avatar: "https://picsum.photos/200",
        idOwnTwits:[],
 
    
    }




}))