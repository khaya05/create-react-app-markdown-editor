import { configureStore } from "@reduxjs/toolkit";
import markdownSlice from "./markdownSlice";
import uiSlice from "./uiSlice";

const store = configureStore({
  reducer: {
    ui: uiSlice,
    markdown: markdownSlice
  }
})

export default store