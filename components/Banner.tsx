import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../constants/movie";
import { Movie } from "../types";

interface Props {
  netflixOriginals: Movie[];
}

function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 h-[95vh] w-full -z-10">
        <Image
          priority={true}
          src={`${BASE_URL}${movie?.backdrop_path}`}
          alt="movie banner"
          layout="fill"
          objectFit="cover"
        />
        {/* TODO ADD SKELETON */}
      </div>

      <h1 className="text-2xl lg:text-7xl md:text-4xl font-bold transition-all duration-[.4s]">{movie?.title || movie?.name || movie?.original_name}</h1>
      <p className="max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl transition-all duration-[.4s]">{movie?.overview}</p>
    </div>
  );
}

export default Banner;
