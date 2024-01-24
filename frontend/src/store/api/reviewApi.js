import axios from "axios";

const reviewApi = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL + "/api/v1/reviews",
});

export { reviewApi };
