"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import MovieDetail from "../_components/MovieDetail";
import CastDetail from "../_components/CastDetail";

const MoviePage = () => {
  const pathname = usePathname();
  const id = pathname?.split("/").pop() || "";

  useEffect(() => {
    const url = `${pathname}`;
    // console.log(pathname);
  }, [pathname]);
  return (
    <>
      <MovieDetail id={id} />
      <CastDetail id={id} />
    </>
  );
};

export default MoviePage;
