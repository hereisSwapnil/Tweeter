import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./features/theme/themeSlice";
import authSlice from "./features/theme/authSlice";
import loadingSlice from "./features/theme/loadingSlice";
import pageRouteSlice from "./features/theme/pageRouteSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    auth: authSlice,
    loading: loadingSlice,
    pageRoute: pageRouteSlice,
  },
});
