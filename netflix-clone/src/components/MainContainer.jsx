import React from "react";
import VideoTitle from "./VideoTitle";
import Videobackground from "./Videobackground";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const movie = useSelector((store) => store.movie?.nowPlayingmovies);
  if (!movie) return;

  const { overview, id, title } = movie[4];
  return (
    <div>
      <VideoTitle title={title} overview={overview} />
      <Videobackground movieId={id} />
    </div>
  );
};

export default MainContainer;
