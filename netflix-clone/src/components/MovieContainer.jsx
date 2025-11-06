import React from "react";
import Movielist from "./Movielist";
import { useSelector } from "react-redux";

const MovieContainer = () => {
  const movies = useSelector((store) => store.movie);

  return (
    <div className="relative z-10 bg-black">
      <div className="absolute bottom-[-1000px] w-full px-6">
        <Movielist title={"Popular Movies"} movies={movies.popularMovies} />
        <Movielist
          title={"Now Playing Movies"}
          movies={movies.nowPlayingmovies}
        />
        <Movielist title={"Top Rated Movies"} movies={movies.topRatedMovies} />
        <Movielist title={"Upcoming Movies"} movies={movies.upcomingMovies} />
      </div>
    </div>
  );
};

export default MovieContainer;
