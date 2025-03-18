import { create, type StateCreator } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { User } from "../schemas/entities/user";

interface AppStoreSlice {
    user: User | null;
    setUser: (user: User | null) => void;
}

const createAppStoreSlice: StateCreator<AppStoreSlice> = (set) => ({
    user: null,
    setUser: (user) => set({ user }),
});

export const useAppStore = create<AppStoreSlice>()(
    devtools(
        persist(
            (...a) => ({
                ...createAppStoreSlice(...a),
            }),
            {
                name: "appStore",
                storage: createJSONStorage(() => localStorage),
                version: 1,
            },
        ),
    ),
);
