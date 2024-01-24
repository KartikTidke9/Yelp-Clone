import { createAsyncThunk } from "@reduxjs/toolkit";
import { restaurantApi } from "../api";

const fetchAllRestaurants = createAsyncThunk("restro/fetch", async () => {
  try {
    const res = await restaurantApi.get("/all");
    return res.data;
  } catch (err) {
    throw Error(err.response.data.error);
  }
});

const createRestaurant = createAsyncThunk("restro/create", async (data) => {
  try {
    const res = await restaurantApi.post("/new", data);
    return res.data;
  } catch (err) {
    throw Error(err.response.data.error);
  }
});

const deleteRestaurant = createAsyncThunk("restro/delete", async (id) => {
  try {
    const res = await restaurantApi.delete(`/${id}`);
    return res.data;
  } catch (err) {
    throw Error(err.response.data.error);
  }
});

const updateRestaurant = createAsyncThunk("restro/update", async (data) => {
  try {
    const { id, ...other } = data;
    const res = await restaurantApi.put(`/${id}`, other);
    return res.data;
  } catch (err) {
    throw Error(err.response.data.error);
  }
});

const findRestaurant = createAsyncThunk("restro/find", async (id) => {
  try {
    const res = await restaurantApi.get(`/${id}`);
    return res.data;
  } catch (err) {
    throw Error(err.response.data.error);
  }
});

export {
  fetchAllRestaurants,
  createRestaurant,
  deleteRestaurant,
  updateRestaurant,
  findRestaurant,
};
