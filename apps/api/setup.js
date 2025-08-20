
const db = require('./lib/db');

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
    await db.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        price NUMERIC NOT NULL,
        description TEXT,
        image TEXT
      );
    `);
    await db.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        items TEXT NOT NULL,
        total NUMERIC NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    const { rows } = await db.query('SELECT COUNT(*) AS c FROM products');
    if (parseInt(rows[0].c) === 0) {
      await db.query("INSERT INTO products (name, price, description, image) VALUES ($1,$2,$3,$4)", ['Red T-Shirt', 15.99, 'Comfortable cotton t-shirt', 'assets/product1.svg']);
      await db.query("INSERT INTO products (name, price, description, image) VALUES ($1,$2,$3,$4)", ['Blue Jeans', 29.99, 'Stylish denim jeans', 'assets/product2.svg']);
      await db.query("INSERT INTO products (name, price, description, image) VALUES ($1,$2,$3,$4)", ['Kids Sneakers', 24.5, 'Durable and comfy sneakers', 'assets/product3.svg']);
      await db.query("INSERT INTO products (name, price, description, image) VALUES ($1,$2,$3,$4)", ['School Backpack', 18.75, 'Spacious backpack for kids', 'assets/product4.svg']);
    }
    return res.status(200).json({ message: 'OK' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'DB error', error: e.message });
  }
};
