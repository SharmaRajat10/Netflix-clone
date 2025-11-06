import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    checked: false,
    isloading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.checked = true;
    },
    setChecked: (state, action) => {
      state.checked = action.payload;
    },
    setLoading: (state, action) => {
      state.isloading = action.payload;
    },
  },
});

export const { setUser, setLoading, setChecked } = userSlice.actions;
export default userSlice.reducer;
