import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../redux/counterSlice";
import searchReducer from "../redux/searchSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });
