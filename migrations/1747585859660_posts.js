/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = pgm => {
  return pgm.sql(`
    CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    url VARCHAR(200),
    lat NUMERIC,
    lng NUMERIC
    );
    `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = pgm => {
  return pgm.sql(`
    DROP TABLE posts
    `);
};
