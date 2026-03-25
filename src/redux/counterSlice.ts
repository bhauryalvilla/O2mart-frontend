import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    stop: (state) => {
      state.count = state.count;
    },
  },
});

export const { increment, decrement, stop } = counterSlice.actions;

export default counterSlice.reducer;
