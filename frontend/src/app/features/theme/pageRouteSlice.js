import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageRoute: "login",
};

export const pageRouteSlice = createSlice({
  name: "pageRoute",
  initialState,
  reducers: {
    setPageRoute: (state, action) => {
      state.pageRoute = action.payload;
    },
  },
});

export const { setPageRoute } = pageRouteSlice.actions;

export default pageRouteSlice.reducer;
