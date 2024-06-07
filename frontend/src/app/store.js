import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./features/themeSlice";
import authSlice from "./features/authSlice";
import loadingSlice from "./features/loadingSlice";
import pageRouteSlice from "./features/pageRouteSlice";
import replySlice from "./features/replySlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    auth: authSlice,
    loading: loadingSlice,
    pageRoute: pageRouteSlice,
    reply: replySlice,
  },
});
