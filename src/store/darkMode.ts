import { create } from "zustand";
import { persist } from "zustand/middleware";

type DarkModeState = {
	isDarkMode: boolean;
	toggleDarkMode: () => void;
	setDarkMode: (value: boolean) => void;
};

export const useDarkModeStore = create<DarkModeState>()(
	persist(
		(set) => ({
			isDarkMode: false,
			toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
			setDarkMode: (value) => set({ isDarkMode: value }),
		}),
		{
			name: "dark-mode-storage",
		}
	)
);
