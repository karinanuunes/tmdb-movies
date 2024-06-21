"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import closeIcon from "../assets/close-icon.svg";

interface ButtonProps {
  onGenreSelect: (genre: number) => void;
  selectedGenres: number[];
}

const Button = ({ onGenreSelect, selectedGenres }: ButtonProps) => {
  const [genres, setGenres] = useState<any[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("/api/genres");
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreClick = (genreId: number) => {
    const isSelected = selectedGenres.includes(genreId);
    let updatedGenre: number;

    if (isSelected) {
      updatedGenre = 0;
      selectedGenres.splice(selectedGenres.indexOf(genreId), 1);
    } else {
      updatedGenre = genreId;
    }
    console.log(isSelected);
    console.log(updatedGenre);

    onGenreSelect(updatedGenre);
  };

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {genres.map((genre) => (
        <button
          className={`flex items-center gap-2 bg-white px-4 py-2 border rounded font-bold hover:bg-[#D18000] hover:border-[#D18000] hover:text-white transition-colors ${
            selectedGenres.includes(genre.id)
              ? "bg-[#D18000] text-white border-[#D18000]"
              : "bg-white"
          }`}
          key={genre.id}
          onClick={() => handleGenreClick(genre.id)}
        >
          {genre.name}
          {selectedGenres.includes(genre.id) ? (
            <Image src={closeIcon} width={18} height={18} alt="Close icon" />
          ) : (
            ""
          )}
        </button>
      ))}
    </div>
  );
};

export default Button;
