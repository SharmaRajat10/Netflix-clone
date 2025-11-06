// import React from "react";
// import useMovieById from "../hooks/useMovieById";
// import { useSelector } from "react-redux";
// import { useEffect } from "react";

// const Videobackground = ({ movieId, bool }) => {
//   const trailerMovie = useSelector((store) => store.movie?.trailerMovie);
//   // const fetchMovieById = useMovieById(movieId);

//   useMovieById(movieId);

//   return (
//     <div className="relative w-screen">
//       <iframe
//         className={`${bool ? "w-[100%]" : "w-screen  aspect-video"} `}
//         src={`https://www.youtube.com/embed/${trailerMovie?.key}?autoplay=1&mute=1`}
//         title="YouTube video player"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         referrerPolicy="strict-origin-when-cross-origin"
//         allowFullScreen
//       ></iframe>
//     </div>

//   );
// };

// export default Videobackground;
import React from "react";
import useMovieById from "../hooks/useMovieById";
import { useSelector } from "react-redux";

const Videobackground = ({ movieId, bool }) => {
  const trailerMovie = useSelector((store) => store.movie.trailerMovie);

  useMovieById(movieId);

  return (
    <div className="w-[vw] overflow-hidden">
      <iframe
        className={`${bool ? "w-[100%]" : "w-screen aspect-video"} `}
        src={`https://www.youtube.com/embed/${trailerMovie?.key}?si=HorxQfzFY2_TAO1W&autoplay=1&mute=1`}
        title="YouTube video player"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Videobackground;
