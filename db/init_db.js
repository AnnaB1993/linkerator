// code to build and initialize DB goes here
const {
  client,
  // other db methods
} = require("./index");

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order

    await client.query(`
    DROP TABLE IF EXISTS link_tags;
    DROP TABLE IF EXISTS tags;
    DROP TABLE IF EXISTS links;
    `);

    // build tables in correct order
    await client.query(`
    CREATE TABLE links(
    id SERIAL PRIMARY KEY,
    url VARCHAR(255) UNIQUE NOT NULL,
    clicks INTEGER DEFAULT 0,
    date TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    comments TEXT NOT NULL
);`);

    await client.query(`
    CREATE TABLE tags(
      id SERIAL PRIMARY KEY,
      tagname VARCHAR(255) UNIQUE NOT NULL
    );`);

    await client.query(`
    CREATE TABLE link_tags(
      "linkId" INTEGER REFERENCES links(id),
      "tagId" INTEGER REFERENCES tags(id),
      UNIQUE ("linkId", "tagId")
    );`);
    console.log("Finished building tables");
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
