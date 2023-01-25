import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    showAside: false,
    isEditing: false,
    showModal: false,
    showPreview: false,
    showInput: false,
    screenWidth: null,
    preferrersLightMode: true,
  },
  reducers: {
    toggleAside(state) {
      state.showAside = !state.showAside;
    },

    setIsEditing(state, action) {
      state.isEditing = action.payload;
    },

    toggleIsEditing(state) {
      state.isEditing = !state.isEditing;
    },

    toggleModal(state) {
      state.showModal = !state.showModal;
    },

    setInput(state, action) {
      state.showInput = action.payload;
    },

    togglePreview(state) {
      state.showPreview = !state.showPreview;
    },

    setPreview(state, action) {
      state.showPreview = action.payload
    },

    toggleInput(state) {
      state.showInput = !state.isEditing;
    },

    toggleTheme(state) {
      state.preferrersLightMode = !state.preferrersLightMode;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
