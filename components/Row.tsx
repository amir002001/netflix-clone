import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRef, useState, useEffect } from "react";
import { Movie } from "../types";
import Thumbnail from "./Thumbnail";

interface Props {
  title: string;
  movies: Movie[];
}

function Row({ title, movies }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (key: string) => {
    setIsMoved(true);
    if (!rowRef.current) return;
    const { scrollLeft, clientWidth } = rowRef.current;
    const scrollTo =
      key === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
    rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (rowRef.current?.scrollLeft === 0) setIsMoved(false);
    else if (!isMoved) setIsMoved(true);
  };
  useEffect(() => {
    const current = rowRef.current;
    current?.addEventListener("scroll", handleScroll);

    return () => {
      current?.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div className="group h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <ChevronLeftIcon
          className={`chevronIcon left-2 ${isMoved || "hidden"}`}
          onClick={() => handleClick("left")}
        />
        <div
          ref={rowRef}
          className="flex items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2 movieRow"
        >
          {movies.map((movie, index) => (
            <Thumbnail key={index} movie={movie} />
          ))}
        </div>
        <ChevronRightIcon
          className="chevronIcon right-2"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}

export default Row;
