import { create } from "zustand";

interface FavoritesStore {
  favorites: number[];
  addToFavorite: (id: number) => void;
  removeFromFavorite: (id: number) => void;
}

export const useFavoritesStore = create<FavoritesStore>()((set) => ({
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
}));
