import connectDB from "../app/connectDB.js";
import SqlString from "sqlstring";

export default class CategoriesService {
  async getAll() {
    const db = await connectDB();

    const { rows } = await db.query("SELECT * FROM categories");

    return rows;
  }

  async getById({ id }) {
    const db = await connectDB();

    const query = SqlString.format("SELECT * FROM categories WHERE id = ?", [
      id,
    ]);
    const { rows } = await db.query(query);

    return rows[0];
  }

  async getByName({ name }) {
    const db = await connectDB();

    const query = SqlString.format("SELECT * FROM categories WHERE name = ?", [
      name,
    ]);
    const { rows } = await db.query(query);

    return rows;
  }

  async create({ name }) {
    const db = await connectDB();

    const query = SqlString.format(
      'INSERT INTO categories ("name") VALUES (?) RETURNING *',
      [name]
    );
    const { rows } = await db.query(query);

    return rows[0];
  }
}
