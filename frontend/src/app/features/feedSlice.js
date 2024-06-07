import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feed: null,
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setFeed: (state, action) => {
      state.feed = action.payload;
    },
    AddPost: (state, action) => {},
  },
});

export const { setFeed } = feedSlice.actions;

export default feedSlice.reducer;
