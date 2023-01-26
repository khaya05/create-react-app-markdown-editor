import { createSlice } from '@reduxjs/toolkit';

const markdownSlice = createSlice({
  name: 'markdownSlice',
  initialState: {
    index: 0,
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
  },
});

export const markdownActions = markdownSlice.actions;
export default markdownSlice.reducer;
