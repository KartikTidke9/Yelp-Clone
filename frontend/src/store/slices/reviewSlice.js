import { createSlice } from "@reduxjs/toolkit";
import {} from "../thunks/restaurantThunks";
import { addReview, fetchReviews } from "../thunks/reviewThunks";

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: {
      data: [],
      result: 0,
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchReviews.fulfilled, (state, action) => {
      state.reviews.data = action.payload.data;
      state.reviews.result = action.payload.result;
    });

    builder.addCase(addReview.fulfilled, (state, action) => {
      state.reviews.data.push(action.payload.data);
      state.reviews.result++;
    });
  },
});

export const reviewReducer = reviewSlice.reducer;
