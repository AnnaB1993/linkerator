// Connect to DB
const { Client } = require("pg");
const DB_NAME = "change-this-name";
const DB_URL = process.env.DATABASE_URL || `postgres://${DB_NAME}`;
const client = new Client(DB_URL);

// database methods

async function createLink({ url, comments, tags = [] }) {
  try {
    const {
      rows: [link],
    } = await client.query(
      `
    INSERT INTO links(url, comments)
    VALUES($1, $2)
    RETURNING *;
    `,
      [url, comments]
    );

    const tagList = await createTags(tags);
    return await addTagsToLink(link.id, tagList);
  } catch (error) {
    console.error(error);
  }
}

async function createTags(tagList) {
  if (tagList.length === 0) {
    return;
  }

  const insertTags = tagList.map((_, index) => `$${index + 1}`).join("), (");

  const selectTags = taglist.map((_, index) => `$${index + 1}`).join(", ");
}

try {
  await client.query(
    `
INSERT INTO tags(tagname)
VALUES(${insertTags})
ON CONFLICT (tagname) DO NOTHING;
`,
    tagList
  );
} catch (error) {
  console.log(error);
}

async function createLinkTag(linkId, tagId) {
  try {
    await client.query(
      `
    INSERT INTO link_tags("linkId", "tagId")
    VALUES ($1, $2)
    ON CONFLICT ("linkId", "tagId") DO NOTHING;`,
      [linkId, tagId]
    );
  } catch (error) {
    console.log(error);
  }
}

// export
module.exports = {
  client,
  createLinkTag,
  // db methods
};
