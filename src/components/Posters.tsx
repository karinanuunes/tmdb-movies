"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import nextIcon from "../assets/next-icon.png";
import Link from "next/link";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  genre_ids: number[];
}

interface PostersProps {
  selectedGenres: number[];
}

const Posters = ({ selectedGenres }: PostersProps) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async (page: number, genres: string[] = []) => {
    setLoading(true);
    let url = `/api/movies?page=${page}`;
    if (genres.length > 0) {
      const genresParam = genres.join("&");
      url += `&genres=${genresParam}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data);

      const filteredMovies = data.filter((movie: Movie) =>
        movie.genre_ids.some((genreId) => selectedGenres.includes(genreId))
      );
      if (filteredMovies.length > 0) setMovies(filteredMovies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const stringGenres = selectedGenres.map(String);
    fetchMovies(currentPage, stringGenres);
  }, [currentPage, selectedGenres]);

  const handleNextPageClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  const formatDate = (date: string) => {
    const [year, month, day] = date.split("-");
    const months = [
      "JAN",
      "FEV",
      "MAR",
      "ABR",
      "MAI",
      "JUN",
      "JUL",
      "AGO",
      "SET",
      "OUT",
      "NOV",
      "DEZ",
    ];
    return `${day} ${months[parseInt(month) - 1]} ${year}`;
  };

  const IMG_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <>
      <div className="flex flex-wrap justify-center gap-8 py-8">
        {movies.map((movie) => (
          <Link href={`/movie/${movie.id}`} key={movie.id}>
            <div
              className="w-44 h-80 flex flex-col gap-2 mb-12 hover:transform hover:scale-105 transition-transform cursor-pointer"
              key={movie.id}
            >
              <Image
                src={`${IMG_URL}${movie.poster_path}`}
                width={176}
                height={264}
                alt={`Poster ${movie.title}`}
                className="min-w-[176px] min-h-[264px] object-cover rounded-sm shadow-md"
              />
              <div className="flex flex-col">
                <span className="font-bold text-base">{movie.title}</span>
                <span className="font-bold text-sm text-[#646464]">
                  {formatDate(movie.release_date)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mb-8 gap-10 text-[#5C16C5] font-bold">
        {movies.length > 8 ? (
          <>
            {[...Array(5)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageClick(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={handleNextPageClick}>
              <Image src={nextIcon} alt="Ícone de seta para direita" />
            </button>
            <button onClick={() => handlePageClick(500)}>Última</button>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Posters;
