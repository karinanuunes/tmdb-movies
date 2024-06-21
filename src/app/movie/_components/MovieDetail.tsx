import { useEffect, useState } from "react";
import Image from "next/image";

const IMG_URL = "https://image.tmdb.org/t/p/w500";

interface MovieDetailProps {
  id: string;
}

const formatDate = (date: string) => {
  if (!date) return;
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};

const formatYear = (date: string) => {
  if (!date) return;
  return date.split("-")[0];
};

const formatRunTime = (runtime: number) => {
  if (!runtime || runtime <= 0) return "";
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}m`;
};

const formatPercentage = (value: number) => {
  if (value === undefined || isNaN(value)) return "";
  return `${Math.round(value * 10)}%`;
};

const MovieDetail = ({ id }: MovieDetailProps) => {
  const [movie, setMovie] = useState<any>("");

  const fetchMovie = async (id: string) => {
    try {
      const response = await fetch(`/api/movie/${id}`);
      const data = await response.json();
      console.log(data);
      setMovie(data);
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  return (
    <div className="flex flex-col items-center bg-[#2D0C5E] gap-10 max-h-[600px]">
      <div className="flex gap-[33px] p5 pt-[72px]">
        <Image
          src={`${IMG_URL}${movie.poster_path}`}
          width={383}
          height={574}
          alt={`Poster ${movie.title}`}
          className="min-w-[176px] min-h-[264px] object-cover rounded-lg shadow-md"
        />
        <div className="flex flex-col max-w-[700px]">
          <h1 className="text-white text-2xl font-bold">
            {movie.title} ({formatYear(movie.release_date)})
          </h1>
          <span className="text-white pt-2 text-[18px]">
            {movie.adult ? "Adulto" : "Livre"} •{" "}
            {`${formatDate(movie.release_date)} (BR)`} •{" "}
            {movie.genres &&
              movie.genres.map((genre: any) => genre.name).join(", ")}{" "}
            • {formatRunTime(movie.runtime)}
          </span>
          <div className="flex pt-4 gap-3">
            <div
              className={`w-[60px] h-[60px] bg-[#FFFFFF1A] rounded-full flex justify-center items-center border-[#14FF00] border-4`}
            >
              <span className="text-[#14FF00] font-bold text-lg">
                {formatPercentage(movie.vote_average)}
              </span>
            </div>
            <p className="text-white max-w-[102px]">Avaliação dos usuários</p>
          </div>
          <h5 className="text-white text-xl font-bold pt-8">Sinopse</h5>
          <p className="text-white text-base pt-2">{movie.overview}</p>
          <div className="flex">
            {movie.production_companies ? (
              movie.production_companies.map((company: any) => (
                <div className="mt-6" key={company.name}>
                  <p className="text-white font-bold min-w-44">
                    {company.name}
                  </p>
                  <p className="text-white text-sm">Company</p>
                </div>
              ))
            ) : (
              <p className="text-white">Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
