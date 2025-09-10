const db = require('./lib/db');

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).json({ message: 'Method Not Allowed' });
    }

    await db.query('DELETE FROM products;');
    return res.status(200).json({ message: 'All products deleted' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'DB error', error: e.message });
  }
};
