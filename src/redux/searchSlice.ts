import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { searchApi, type SubPlant } from "../api/searchApi"; // Your existing API

interface SearchState {
  results: SubPlant[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SearchState = {
  results: [],
  loading: "idle",
  error: null,
};

// Thunk using YOUR searchApi.searchPlants()
export const searchPlants = createAsyncThunk<
  SubPlant[], // Returns your SubPlant[]
  string, // Takes query string
  { rejectValue: string }
>("search/searchPlants", async (query, { rejectWithValue }) => {
  try {
    const { data } = await searchApi.searchPlants(query); // YOUR API!
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.error || "Search failed");
  }
});

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.results = [];
      state.error = null;
      state.loading = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchPlants.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(
        searchPlants.fulfilled,
        (state, action: PayloadAction<SubPlant[]>) => {
          state.loading = "succeeded";
          state.results = action.payload;
        },
      )
      .addCase(searchPlants.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Search failed";
      });
  },
});

export const { clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
