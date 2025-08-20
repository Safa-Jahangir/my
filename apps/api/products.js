
const db = require('./lib/db');

module.exports = async (req, res) => {
  try {
    if (req.method === 'GET') {
      const { rows } = await db.query('SELECT * FROM products ORDER BY id');
      return res.status(200).json(rows);
    } else {
      res.setHeader('Allow', ['GET']);
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'DB error', error: e.message });
  }
};
