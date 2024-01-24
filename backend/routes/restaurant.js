import express from "express";
import { RestaurantController } from "../controllers/restaurantController.js";

const router = express.Router();

//get all restaurants
router.get("/all", RestaurantController.getAllRestaurants);
//get a restaurant
router.get("/:id", RestaurantController.getRestaurant);
//create a new restaurant
router.post("/new", RestaurantController.createRestaurant);
//update a restaurant
router.put("/:id", RestaurantController.updateRestaurant);
//delete a restaurant
router.delete("/:id", RestaurantController.deleteRestaurant);

export default router;
