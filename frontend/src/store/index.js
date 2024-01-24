import { configureStore } from "@reduxjs/toolkit";
import { restaurantReducer } from "./slices/restaurantSlice";
import { reviewReducer } from "./slices/reviewSlice";

const store = configureStore({
  reducer: {
    restaurant: restaurantReducer,
    review: reviewReducer,
  },
});

export { store };

export * from "./thunks/restaurantThunks";
export * from "./thunks/reviewThunks";
