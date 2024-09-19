import { createSlice } from "@reduxjs/toolkit";
import song from "../assets/music/Dull.mp3";

const playbackSlice = createSlice({
  name: "playback",
  initialState: {
    currentPlayUrl: song,
  },
  reducers: {
    setPlayUrl: (state, action) => {
      state.currentPlayUrl = action.payload;
    },
  },
});

export const { setPlayUrl } = playbackSlice.actions;
export default playbackSlice.reducer;
