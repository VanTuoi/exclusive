import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface Customization {
    fontFamily?: string;
    type: "light" | "dark";
    setType: (type: "light" | "dark") => void;
}

export const useThemeStore = create<Customization>()(
    devtools(
        persist(
            (set) => ({
                type: "light",
                setType: (type: "light" | "dark") => set({ type })
            }),
            {
                name: "themeStore",
                storage: createJSONStorage(() => localStorage)
            }
        )
    )
);
