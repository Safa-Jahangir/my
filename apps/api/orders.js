
const db = require('./lib/db');

module.exports = async (req, res) => {
  try {
    if (req.method === 'GET') {
      const { rows } = await db.query('SELECT * FROM orders ORDER BY created_at DESC');
      const parsed = rows.map(r => ({ ...r, items: JSON.parse(r.items) }));
      return res.status(200).json(parsed);
    } else if (req.method === 'POST') {
      const { items, total } = req.body || {};
      if (!Array.isArray(items) || typeof total !== 'number') {
        return res.status(400).json({ message: 'Invalid payload' });
      }
      const itemsStr = JSON.stringify(items);
      const insert = await db.query('INSERT INTO orders (items, total, status) VALUES ($1, $2, $3) RETURNING *', [itemsStr, total, 'pending']);
      const row = insert.rows[0];
      row.items = JSON.parse(row.items);
      return res.status(201).json(row);
    } else {
      res.setHeader('Allow', ['GET','POST']);
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'DB error', error: e.message });
  }
};
