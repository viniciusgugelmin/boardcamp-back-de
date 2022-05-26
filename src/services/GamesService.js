import connectDB from "../app/connectDB.js";
import SqlString from "sqlstring";

export default class GamesService {
  async getAll({ name }) {
    const db = await connectDB();

    if (!name) {
      const { rows } = await db.query("SELECT * FROM games");

      return rows;
    }

    const query = SqlString.format("SELECT * FROM games WHERE name LIKE ?", [
      `${name}%`,
    ]);

    const { rows } = await db.query(query);

    return rows;
  }

  async getByName({ name }) {
    const db = await connectDB();

    const query = SqlString.format("SELECT * FROM games WHERE name = ?", [
      name,
    ]);
    const { rows } = await db.query(query);

    return rows;
  }

  async create({ name, image, stockTotal, categoryId, pricePerDay }) {
    const db = await connectDB();

    const query = SqlString.format(
      'INSERT INTO games ("name", "image", "stockTotal", "categoryId", "pricePerDay") VALUES (?, ?, ?, ?, ?) RETURNING *',
      [name, image, stockTotal, categoryId, pricePerDay]
    );

    console.log(query);
    const { rows } = await db.query(query);

    return rows[0];
  }
}
