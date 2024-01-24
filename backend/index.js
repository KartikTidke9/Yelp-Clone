import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import restaurantRouter from "./routes/restaurant.js";
import reviewRouter from "./routes/review.js";

//configs
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

//middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());

//routes
app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/*", (_, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(port, () => {
  console.log("server listening on http://localhost:" + port);
});
