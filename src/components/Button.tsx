"use client";

import { useState, useEffect } from "react";

const Button = ({ selectGenre }: any) => {
  const [genres, setGenres] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("/api/genres");
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  const handleGenreClick = (genreId: string) => {
    console.log(genreId);
  };

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {genres.map((genre) => (
        <button
          className="bg-white px-4 py-2 border rounded font-bold hover:bg-[#D18000] hover:border-[#D18000] hover:text-white transition-colors"
          key={genre.id}
          onClick={() => handleGenreClick(genre.name)}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default Button;
