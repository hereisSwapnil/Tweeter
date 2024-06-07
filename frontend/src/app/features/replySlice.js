import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  replyPost: null,
  replyReply: null,
  isReplying: false,
};

export const replySlice = createSlice({
  name: "reply",
  initialState,
  reducers: {
    setReplyPost: (state, action) => {
      state.replyPost = action.payload;
      state.replyReply = null;
    },
    setReplyReply: (state, action) => {
      state.replyReply = action.payload;
      state.replyPost = null;
    },
    setIsReplying: (state, action) => {
      state.isReplying = action.payload;
    },
  },
});

export const { setReplyPost, setReplyReply, setIsReplying } =
  replySlice.actions;

export default replySlice.reducer;
