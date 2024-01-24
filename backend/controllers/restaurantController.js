import { pool } from "../db/connectDb.js";

class RestaurantController {
  //getting all restaurants
  static async getAllRestaurants(req, res) {
    try {
      const restros = await pool.query(
        "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews  on reviews.restaurant_id = restaurants.id "
      );

      res.status(200).json({ data: restros.rows, result: restros.rowCount });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  //get a restaurant
  static async getRestaurant(req, res) {
    try {
      const { id } = req.params;

      const restaurant = await pool.query(
        "SELECT * FROM restaurants WHERE id = $1",
        [id]
      );

      res
        .status(200)
        .json({ data: restaurant.rows[0], result: restaurant.rowCount });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  //create restaurant
  static async createRestaurant(req, res) {
    try {
      const { name, location, price } = req.body;

      if (!name || !location || !price) {
        throw new Error("All fields must be filled in");
      }

      if (price < 1 || price > 5) {
        throw new Error("price must be between 1 and 5 inclusive");
      }

      const newRestaurant = await pool.query(
        "INSERT INTO restaurants (name, location, price_range) VALUES ($1,$2,$3) RETURNING *",
        [name, location, price]
      );

      res.status(201).json({
        data: newRestaurant.rows[0],
        result: newRestaurant.rowCount,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  //update restaurant
  static async updateRestaurant(req, res) {
    try {
      const { id } = req.params;
      const { name, location, price } = req.body;
      console.log(name, location, price, id);
      const updatedRestro = await pool.query(
        "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
        [name, location, price, id]
      );

      res.status(201).json({
        data: updatedRestro.rows[0],
        result: updatedRestro.rowCount,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  //delete restaurant
  static async deleteRestaurant(req, res) {
    try {
      const { id } = req.params;
      const deleteRestaurant = await pool.query(
        "DELETE FROM restaurants WHERE id = $1 RETURNING *",
        [id]
      );

      res.status(200).json({
        data: deleteRestaurant.rows[0],
        result: deleteRestaurant.rowCount,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

export { RestaurantController };
