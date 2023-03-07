import { createSlice } from '@reduxjs/toolkit';

const markdownSlice = createSlice({
  name: 'markdownSlice',
  initialState: {
    index: 0,
    isLoggedIn: false,
    files: [],
    currentFile: {},
    filename: '',
    fileContents: '',
  },
  reducers: {
    setIndex(state, action) {
      state.index = action.payload;
    },

    setFiles(state, action) {
      state.files = action.payload;
    },

    setCurrentFile(state, action) {
      state.currentFile = state.files[action.payload];
    },

    setFileName(state, action) {
      state.filename = action.payload;
    },

    setFileContents(state, action) {
      state.fileContents = action.payload;
    },

    logUserIn(state) {
      state.isLoggedIn = true;
    },

    logUserOut(state) {
      state.isLoggedIn = false;
    },
  },
});

export const markdownActions = markdownSlice.actions;
export default markdownSlice.reducer;
