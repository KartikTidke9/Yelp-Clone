import { configureStore } from "@reduxjs/toolkit";
import { restaurantReducer } from "./slices/restaurantSlice";

const store = configureStore({
  reducer: {
    restaurant: restaurantReducer,
  },
});

export { store };

export * from "./thunks/restaurantThunks";
