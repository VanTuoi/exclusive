import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { UserData } from "~/types";

interface AuthState {
    userData: UserData | null;
    timeUpdate: Date | null;
    setInfo: (userData: UserData | null) => void;
}

export const useAuthStore = create<AuthState>()(
    devtools((set) => ({
        userData: null,
        timeUpdate: null,
        setInfo: (newUserData: UserData | null) => {
            set((state) => ({
                userData: newUserData ? { ...state.userData, ...newUserData } : null,
                timeUpdate: new Date()
            }));
        }
    }))
);
