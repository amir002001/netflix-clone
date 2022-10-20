import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Movie } from "../types";

interface Props {
  netflixOriginals: Movie[];
}

function Banner({ netflixOriginals }: Props) {
  const movie =
    netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)];

  return (
    <div>
      <div>
        <Image src={`${baseUrl}${movie.backdrop_path}`} alt="lorem" layout="fill" />
      </div>
    </div>
  );
}

export default Banner;
