const pg = require('pg');

class Pool {
  _pool = null;

  connect(options) {
    // NOTE: below line don't create the connection
    this._pool = new pg.Pool(options);
    // NOTE: we can run a very basic connection to check if
    // connection is created successfully as a matter of fact a lot of
    // libraries use this query under the hood to check if connections is created
    return this.query('SELECT 1 + 1;');
  }

  query(text, params) {
    return this._pool.query(text, params);
  }

  end() {
    if (this._pool) {
      return this._pool.end();
    }
    return Promise.resolve();
  }
}

module.exports = new Pool();
