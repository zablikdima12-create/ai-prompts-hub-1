"use client";

import { useState } from "react";

function getIsFavorite(title: string) {
  if (typeof window === "undefined") return false;
  const favorites = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  ) as string[];
  return favorites.includes(title);
}

export default function FavoriteButton({
  title,
}: {
  title: string;
}) {
  const [isFavorite, setIsFavorite] = useState(() => getIsFavorite(title));
  const [trackedTitle, setTrackedTitle] = useState(title);

  if (trackedTitle !== title) {
    setTrackedTitle(title);
    setIsFavorite(getIsFavorite(title));
  }

  const toggleFavorite = () => {
    const favorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    ) as string[];

    let updated: string[];

    if (favorites.includes(title)) {
      updated = favorites.filter((item) => item !== title);
      setIsFavorite(false);
    } else {
      updated = [...favorites, title];
      setIsFavorite(true);
    }

    localStorage.setItem(
      "favorites",
      JSON.stringify(updated)
    );
  };

  return (
    <button
      onClick={toggleFavorite}
      className="text-2xl"
    >
      {isFavorite ? "⭐" : "☆"}
    </button>
  );
}
