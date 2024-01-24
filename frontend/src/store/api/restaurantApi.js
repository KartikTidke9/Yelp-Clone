import axios from "axios";

const restaurantApi = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL + "/api/v1/restaurants",
});

export { restaurantApi };
