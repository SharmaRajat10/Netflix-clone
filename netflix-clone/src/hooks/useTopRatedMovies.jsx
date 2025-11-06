import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Top_Rated_Movie, options } from "../utils/Constant";
import { getTopRatedMovies } from "../redux/movieSlice";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const fetchTopRatedMovies = async () => {
    try {
      const res = await axios.get(Top_Rated_Movie, options);
      dispatch(getTopRatedMovies(res.data.results));
    } catch (error) {
      console.log(error);
    }
  };
  return fetchTopRatedMovies;
};
export default useTopRatedMovies;
