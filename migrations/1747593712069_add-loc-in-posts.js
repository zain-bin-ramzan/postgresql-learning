exports.shorthands = undefined;

exports.up = pgm => {
  return pgm.sql(`
    ALTER TABLE posts
    ADD COLUMN loc point;
  `);
};

exports.down = pgm => {
  return pgm.sql(`
      ALTER TABLE posts
      DROP COLUMN loc;
    `);
};
