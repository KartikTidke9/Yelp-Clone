import { createAsyncThunk } from "@reduxjs/toolkit";
import { reviewApi } from "../api";

const fetchReviews = createAsyncThunk("reviews/fetch", async (id) => {
  try {
    const res = await reviewApi.get(`/${id}`);
    return res.data;
  } catch (err) {
    throw Error(err.response.data.error);
  }
});

const addReview = createAsyncThunk("reviews/add", async (data) => {
  try {
    const { id, ...other } = data;
    const res = await reviewApi.post(`/${id}/add`, other);
    return res.data;
  } catch (err) {
    throw Error(err.response.data.error);
  }
});

export { fetchReviews, addReview };
