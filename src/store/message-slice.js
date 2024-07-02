import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: { message: [] },
  reducers: {
    ReplaceMessage(state, action) {
      state.message = action.payload;
    },
    AddMessage(state, action) {
      const name = action.payload.name;
      const message = action.payload.message;
      const date = action.payload.date;
      state.message.push({
        id: Math.random(),
        name,
        message,
        date,
      });
    },
    DeleteMessage(state, action) {
      const id = action.payload;
      state.message = state.message.filter((item) => item.id !== id);
    },
  },
});

export const messageAction = messageSlice.actions;
export default messageSlice;
