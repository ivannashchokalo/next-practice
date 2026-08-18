"use client";

import { useFavoritesStore } from "@/lib/store/favoritesStore";
import Link from "next/link";

export default function Header() {
  const { favorites } = useFavoritesStore();
  return (
    <header style={{ paddingTop: 20, paddingBottom: 20 }}>
      <nav>
        <Link href="/requests">Requests</Link>
        <Link href="/favorites">Favorites{favorites.length}</Link>
      </nav>
    </header>
  );
}
