import connectDB from "../app/connectDB.js";
import SqlString from "sqlstring";

export default class CustomersService {
  async getAll({ cpf }) {
    const db = await connectDB();

    if (!cpf) {
      const { rows } = await db.query("SELECT * FROM customers");

      return rows;
    }

    const query = SqlString.format("SELECT * FROM games WHERE cpf LIKE ?", [
      `${cpf}%`,
    ]);

    const { rows } = await db.query(query);

    return rows;
  }

  async getById({ id }) {
    const db = await connectDB();

    const query = SqlString.format("SELECT * FROM customers WHERE id = ?", [
      id,
    ]);
    const { rows } = await db.query(query);

    return rows[0];
  }

  async getByCpf({ cpf }, { id }) {
    const db = await connectDB();

    const query = SqlString.format("SELECT * FROM customers WHERE cpf LIKE ?", [
      `${cpf}%`,
    ]);
    const { rows } = await db.query(query);

    if (id) {
      return rows.filter((customer) => customer.id !== parseInt(id));
    }

    return rows;
  }

  async update({ name, phone, cpf, birthday }, { id }) {
    const db = await connectDB();

    const query = SqlString.format(
      'UPDATE customers SET "name" = ?, "phone" = ?, "cpf" = ?, "birthday" = ? WHERE id = ? RETURNING *',
      [name, phone, cpf, birthday, id]
    );
    const { rows } = await db.query(query);

    return rows[0];
  }

  async create({ name, phone, cpf, birthday }) {
    const db = await connectDB();

    const query = SqlString.format(
      'INSERT INTO customers ("name", "phone", "cpf", "birthday") VALUES (?, ?, ?, ?) RETURNING *',
      [name, phone, cpf, birthday]
    );
    const { rows } = await db.query(query);

    return rows[0];
  }
}
