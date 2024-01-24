import express from "express";
import { ReviewController } from "../controllers/reviewConstroller.js";

const router = express.Router();

//get reviews
router.get("/:id", ReviewController.getReviews);

//add review
router.post("/:id/add", ReviewController.addReview);

export default router;
