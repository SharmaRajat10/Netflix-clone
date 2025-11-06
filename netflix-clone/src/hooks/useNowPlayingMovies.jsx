import axios from "axios";
import { Now_Playing_Movie, options } from "../utils/Constant";
import { useDispatch } from "react-redux";
import { getNowPlayingMovies } from "../redux/movieSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const fetchNowPlayingMovies = async () => {
    try {
      const res = await axios.get(Now_Playing_Movie, options);
      dispatch(getNowPlayingMovies(res.data.results));
    } catch (error) {
      console.log("Error fetching now playing movies:", error);
    }
  };

  return fetchNowPlayingMovies;
};

export default useNowPlayingMovies;
