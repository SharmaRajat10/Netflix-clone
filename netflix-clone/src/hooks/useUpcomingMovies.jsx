import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Upcoming_Movie, options } from "../utils/Constant";
import { getUpcomingMovies } from "../redux/movieSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  const fetchUpcomingMovies = async () => {
    try {
      const res = await axios.get(Upcoming_Movie, options);
      dispatch(getUpcomingMovies(res.data.results));
    } catch (error) {
      console.log(error);
    }
  };
  return fetchUpcomingMovies;
};

export default useUpcomingMovies;
