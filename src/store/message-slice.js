import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: { message: [] },
  reducers: {
    sendMessage(state, action) {
      const name = action.payload.name;
      const message = action.payload.message;
      state.message.push({ id: Math.random(), name, message });
    },
    removeMessage(state, action) {
      const id = action.payload;
      state.message = state.message.filter((item) => item.id !== id);
    },
  },
});

export const messageAction = messageSlice.actions;
export default messageSlice;
