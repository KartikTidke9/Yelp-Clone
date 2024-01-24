import { pool } from "../db/connectDb.js";

class ReviewController {
  //get reviews
  static async getReviews(req, res) {
    try {
      const { id } = req.params;

      const reviews = await pool.query(
        "SELECT * FROM reviews WHERE restaurant_id = $1",
        [id]
      );

      //   const

      res.status(200).json({ data: reviews.rows, result: reviews.rowCount });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async addReview(req, res) {
    try {
      const { id } = req.params;
      const { name, review, rating } = req.body;

      if (!name || !review || !rating) {
        throw new Error("Fields must not be empty");
      }

      const reviews = await pool.query(
        "INSERT INTO reviews (name, review, rating, restaurant_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, review, rating, id]
      );
      
      res.status(200).json({ data: reviews.rows[0], result: reviews.rowCount });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

export { ReviewController };
