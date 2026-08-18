import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesStore {
  favorites: number[];
  addToFavorite: (id: number) => void;
  removeFromFavorite: (id: number) => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set) => ({
      favorites: [],
      addToFavorite: (id) =>
        set((state) => {
          if (!state.favorites.includes(id)) {
            return { favorites: [...state.favorites, id] };
          } else {
            return state;
          }
        }),
      removeFromFavorite: (id) =>
        set((state) => {
          const filtered = state.favorites.filter((favId) => favId !== id);

          return { favorites: filtered };
        }),
    }),
    {
      name: "favorites",
    },
  ),
);
