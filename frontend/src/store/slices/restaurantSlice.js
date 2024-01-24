import { createSlice } from "@reduxjs/toolkit";
import {
  createRestaurant,
  deleteRestaurant,
  fetchAllRestaurants,
  findRestaurant,
  updateRestaurant,
} from "../thunks/restaurantThunks";

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState: {
    restaurants: {
      data: [],
      result: 0,
    },
    activeRestaurant: {},
  },
  extraReducers(builder) {
    builder.addCase(fetchAllRestaurants.fulfilled, (state, action) => {
      state.restaurants.data = action.payload.data;
      state.restaurants.result = action.payload.result;
    });

    builder.addCase(createRestaurant.fulfilled, (state, action) => {
      state.restaurants.data.push(action.payload.data);
      state.restaurants.result++;
    });

    builder.addCase(deleteRestaurant.fulfilled, (state, action) => {
      state.restaurants.data = state.restaurants.data.filter(
        (r) => r.id !== action.payload.data.id
      );
      state.restaurants.result--;
    });

    builder.addCase(updateRestaurant.fulfilled, (state, action) => {
      state.restaurants.data = state.restaurants.data.map((restro) =>
        restro.id === action.payload.data.id
          ? { ...restro, ...action.payload.data }
          : restro
      );
      state.activeRestaurant = {};
    });

    builder.addCase(findRestaurant.fulfilled, (state, action) => {
      state.activeRestaurant = action.payload.data;
    });
  },
});

export const restaurantReducer = restaurantSlice.reducer;
