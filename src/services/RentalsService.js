import connectDB from "../app/connectDB.js";
import SqlString from "sqlstring";
import dayjs from "dayjs";

export default class RentalsService {
  async getAll({ customerId, gameId }) {
    const db = await connectDB();

    if (!customerId && !gameId) {
      const { rows } = await db.query("SELECT * FROM rentals");

      return rows;
    }

    if (customerId) {
      const query = SqlString.format(
        'SELECT * FROM rentals WHERE "customerId" = ?',
        [parseInt(customerId)]
      );

      const { rows } = await db.query(query);

      return rows;
    }

    const query = SqlString.format('SELECT * FROM rentals WHERE "gameId" = ?', [
      parseInt(gameId),
    ]);

    const { rows } = await db.query(query);

    return rows;
  }

  async getById({ id }) {
    const db = await connectDB();

    const query = SqlString.format("SELECT * FROM rentals WHERE id = ?", [id]);
    const { rows } = await db.query(query);

    return rows[0];
  }

  async getByGameId({ gameId }) {
    const db = await connectDB();

    const query = SqlString.format('SELECT * FROM rentals WHERE "gameId" = ?', [
      gameId,
    ]);
    const { rows } = await db.query(query);

    return rows;
  }

  async create({ customerId, gameId, daysRented }, { pricePerDay }) {
    const db = await connectDB();

    const rentDate = dayjs().format("YYYY-MM-DD");
    const originalPrice = daysRented * pricePerDay;

    const query = SqlString.format(
      'INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice", "returnDate", "delayFee") VALUES (?, ?, ?, ?, ?, null, null) RETURNING *',
      [customerId, gameId, daysRented, rentDate, originalPrice]
    );
    const { rows } = await db.query(query);

    return rows[0];
  }

  async finish({ id }, { rentDate, pricePerDay }) {
    const db = await connectDB();

    const returnDate = dayjs().format("YYYY-MM-DD");
    const delayFee =
      dayjs(rentDate).diff(dayjs(returnDate), "day") * pricePerDay;

    const query = SqlString.format(
      'UPDATE rentals SET "returnDate" = ?, "delayFee" = ? WHERE id = ? RETURNING *',
      [returnDate, delayFee, id]
    );
    const { rows } = await db.query(query);

    return rows[0];
  }

  async delete({ id }) {
    const db = await connectDB();

    const query = SqlString.format("DELETE FROM rentals WHERE id = ?", [id]);
    const { rows } = await db.query(query);

    return rows[0];
  }
}
