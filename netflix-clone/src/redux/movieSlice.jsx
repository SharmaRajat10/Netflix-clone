import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    nowPlayingmovies: null,
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
    toggle: false,
    trailerMovie: null,
    isLoading: false,
    open: false,
    id: "",
  },

  reducers: {
    getNowPlayingMovies: (state, action) => {
      state.nowPlayingmovies = action.payload;
    },
    getPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    getTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    getUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    setToggle: (state) => {
      state.toggle = !state.toggle;
    },
    getTrailerMovie: (state, action) => {
      state.trailerMovie = action.payload;
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    getId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export default movieSlice.reducer;
export const {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  setToggle,
  getTrailerMovie,
  setOpen,
  getId,
} = movieSlice.actions;
