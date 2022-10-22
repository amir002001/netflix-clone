import { useEffect, useState } from "react";
import MuiModal from "@mui/material/Modal";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtoms";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Element, Genre } from "../types";
import ReactPlayer from "react-player/lazy";
import { FaPlay, FaThumbsUp } from "react-icons/fa";

function Modal() {
  const [modalVisible, setModalVisible] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState<string | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);

  const fetchMovie = async (media_type: string, id: number) => {
    fetch(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.NEXT_PUBLIC_TMBD_API_KEY}&language=en-US&append_to_response=videos`
    )
      .then((response) => response.json())
      .then((data) => {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.videos.results[index].key);
        setGenres(data.genres);
      })
      .catch();
  };

  useEffect(() => {
    if (!currentMovie) return;

    fetchMovie(currentMovie.media_type || "movie", currentMovie.id);
  }, [currentMovie]);

  const handleClose = () => {
    setModalVisible(false);
    setCurrentMovie(null);
    setTrailer(null);
  };

  return (
    <MuiModal
      open={modalVisible}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl 
      overflow-hidden overflow-y-scroll rounded-md hideScroll"
    >
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <div className="relative h-[35%] w-full">
          <div className="absolute top-0 left-0 w-full h-full">
            <ReactPlayer
              url={`https://youtube.com/watch?v=${trailer}`}
              width="100%"
              height="100%"
              playing={true}
            />
          </div>
          <div className="absolute bottom-10 flex w-full space-x-2 px-10">
            <button className="flex items-center gap-x-2 rounded bg-white text-black px-8 text-xl font-bold transition hover:bg-[#e6e6e6]">
              <FaPlay className="h-7 w-7 text-black" />
              Play
            </button>
            <button className="modalButton text-white">
              <PlusIcon className="h-7 w-7" />
            </button>
            <button className="modalButton text-white">
              <FaThumbsUp className="h-5 w-5" />
            </button>
          </div>
        </div>

        {currentMovie && (
          <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
            <div className="space-y-6 text-lg">
              <div className="flex items-center space-x-2 text-sm">
                <p className="font-semibold text-green-400">
                  {currentMovie.vote_average * 10}% Match
                </p>
                <p className="font-light">
                  {currentMovie.release_date || currentMovie.first_air_date}
                </p>
                <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                  HD
                </div>
              </div>

              <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
                <p className="w-5/6">{currentMovie.overview}</p>
                <div className="flex flex-col space-y-3 text-sm">
                  <div>
                    <span className="text-[gray]">Genres: </span>
                    {genres.map((genre) => genre.name).join(", ")}
                  </div>
                  <div>
                    <span className="text-[gray]">Original language: </span>{currentMovie.original_language}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </MuiModal>
  );
}

export default Modal;
