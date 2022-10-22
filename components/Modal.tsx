import { useEffect, useState } from "react";
import MuiModal from "@mui/material/Modal";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtoms";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Movie } from "../types";

function Modal() {
  const [modalVisible, setModalVisible] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState<string | null>(null);

  const fetchMovie = async (media_type: string, id: number) => {
    fetch(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.NEXT_PUBLIC_TMBD_API_KEY}&language=en-US&append_to_response=videos`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
    <MuiModal open={modalVisible} onClose={handleClose}>
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <div></div>
      </>
    </MuiModal>
  );
}

export default Modal;
