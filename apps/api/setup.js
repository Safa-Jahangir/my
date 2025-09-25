const db = require('./lib/db');

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // Create tables if they don't exist
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

    // Seed only if no products exist
    const { rows } = await db.query('SELECT COUNT(*) AS c FROM products');
    if (parseInt(rows[0].c) === 0) {
      await db.query(
        "INSERT INTO products (name, price, description, image) VALUES ($1,$2,$3,$4)",
        ['Red T-Shirt', 15.99, 'Comfortable cotton t-shirt', '/assets/unnamed-1.png']
      );
      await db.query(
        "INSERT INTO products (name, price, description, image) VALUES ($1,$2,$3,$4)",
        ['Blue Jeans', 29.99, 'Stylish denim jeans', '/assets/unnamed-2.png']
      );
      await db.query(
        "INSERT INTO products (name, price, description, image) VALUES ($1,$2,$3,$4)",
        ['Kids Sneakers', 24.5, 'Durable and comfy sneakers', '/assets/image-3.jpeg']
      );
      await db.query(
        "INSERT INTO products (name, price, description, image) VALUES ($1,$2,$3,$4)",
        ['Striped Hoodie', 18.75, 'Cozy hooded sweatshirt with classic stripes', '/assets/unnamed-4.png']
      );
      await db.query(
        "INSERT INTO products (name, price, description, image) VALUES ($1,$2,$3,$4)",
        ['Cargo Shorts', 16.99, 'Practical shorts with side pockets', '/assets/unnamed-5.png']
      );
      await db.query(
        "INSERT INTO products (name, price, description, image) VALUES ($1,$2,$3,$4)",
        ['Summer Dress', 19.25, 'Lightweight floral dress for sunny days', '/assets/unnamed-6.png']
      );
      await db.query(
        "INSERT INTO products (name, price, description, image) VALUES ($1,$2,$3,$4)",
        ['Rain Jacket', 35.00, 'Waterproof jacket with a vibrant print', '/assets/unnamed-7.png']
      );
      await db.query(
        "INSERT INTO products (name, price, description, image) VALUES ($1,$2,$3,$4)",
        ['Pink Ruffle Dress', 25.50, 'Light pink dress with a ruffled skirt', '/assets/unnamed-8.png']
      );
      await db.query(
        "INSERT INTO products (name, price, description, image) VALUES ($1,$2,$3,$4)",
        ['Floral A-Line Dress', 28.75, 'A cute floral dress, having summer vibes', '/assets/unnamed-9.png']
      );
      await db.query(
        "INSERT INTO products (name, price, description, image) VALUES ($1,$2,$3,$4)",
        ['Unicorn Onesie', 19.99, 'Soft, pastel pink onesie with a small, embroidered unicorn', '/assets/unnamed-10.png']
      );
    }

    return res.status(200).json({ message: 'OK' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'DB error', error: e.message, stack: e.stack });
  }
};
