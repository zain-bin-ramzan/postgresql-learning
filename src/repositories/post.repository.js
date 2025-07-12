const snakeToCamelCase = require('../adapters/snake-to-camel-case.adapter.js');
const pool = require('../config/db.config.js');

class PostRepository {
  async findAll() {
    const query = 'SELECT * FROM posts';
    const { rows } = await pool.query(query);
    return snakeToCamelCase(rows);
  }

  async findById(id) {
    const query = 'SELECT * FROM posts WHERE id = $1';
    const result = await pool.query(query, [id]);
    return snakeToCamelCase(result.rows).at(0);
  }

  async create(postData) {
    const { url, lat, lng } = postData;
    const query = `
      INSERT INTO posts(url, loc) VALUES($1, $2)
      RETURNING *
    `;
    const result = await pool.query(query, [url, `(${lng},${lat})`]);
    return result.rows.at(0);
  }
  //TODO: but update does not required to update all of them keep that in mind he can send partial data as well
  async update(id, postData) {
    const { url, lat, lng } = postData;
    const query = `
      UPDATE posts 
      SET url = $1, loc = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *
    `;
    const result = await pool.query(query, [url, `(${lng},${lat})`, id]);
    return snakeToCamelCase(result.rows).at(0);
  }
  async delete(id) {
    const query = 'DELETE FROM posts WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
  async getTotal() {
    const query = `
      SELECT COUNT(*) FROM posts;
    `;
    const result = await pool.query(query);
    return +result.rows.at(0).count;
  }
}

module.exports = new PostRepository();
