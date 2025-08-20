
const db = require('../lib/db');

module.exports = async (req, res) => {
  try {
    const id = (req.query && (req.query.id || (req.query.path || [])[0])) || null;
    if (!id) return res.status(400).json({ message: 'Missing id' });
    if (req.method === 'PUT') {
      const { status } = req.body || {};
      if (!status) return res.status(400).json({ message: 'Missing status' });
      const result = await db.query('UPDATE orders SET status = $1 WHERE id = $2 RETURNING *', [status, id]);
      return res.status(200).json({ updated: result.rowCount, order: result.rows[0] });
    } else {
      res.setHeader('Allow', ['PUT']);
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'DB error', error: e.message });
  }
};
