import Image from "next/image";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtoms";
import { BASE_URL } from "../constants/movie";
import { Movie } from "../types";

interface Props {
  movie: Movie;
}

function Thumbnail({ movie }: Props) {
  const setModalVisible = useSetRecoilState(modalState);
  const setCurrentMovie = useSetRecoilState(movieState);

  const handleClick = () => {
    setCurrentMovie(movie);
    setModalVisible(true);
  };

  return (
    <div
      onClick={handleClick}
      className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
    >
      <Image
        priority={true}
        src={`${BASE_URL}w500${movie.backdrop_path || movie.poster_path}`}
        layout="fill"
        alt={`'${movie.name}' movie poster`}
        className="rounded-sm object-cover md:rounded"
      />
    </div>
  );
}

export default Thumbnail;
