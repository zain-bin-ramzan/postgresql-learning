const db = require('../config/db.config.js');

const getUsers = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).json({
      message: 'Database connection failed',
      error: err.message,
    });
  }
};

module.exports = { getUsers };
