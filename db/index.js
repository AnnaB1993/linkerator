// Connect to DB
const { Client } = require("pg");
const DB_NAME = "linkerator-dev";
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;
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
    console.log("createLink", error);
  }
}

async function createTags(tagList) {
  if (tagList.length === 0) {
    return;
  }

  const insertTags = tagList.map((_, index) => `$${index + 1}`).join("), (");

  const selectTags = tagList.map((_, index) => `$${index + 1}`).join(", ");

  try {
    await client.query(
      `
    INSERT INTO tags(tagname)
    VALUES(${insertTags})
    ON CONFLICT (tagname) DO NOTHING;
    `,
      tagList
    );
    const { rows } = await client.query(
      `
  
    SELECT * FROM tags
    WHERE tagname IN (${selectTags})`,
      tagList
    );

    return rows;
  } catch (error) {
    console.log("createTags", error);
  }
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
    console.log("createLinkTag", error);
  }
}
async function addTagsToLink(linkId, tagList) {
  try {
    const allTagsPromises = tagList.map((tag) => createLinkTag(linkId, tag.id));
    await Promise.all(allTagsPromises);
    return await getLinkById(linkId);
  } catch (error) {
    console.log("addTagsToLink", error);
  }
}

async function getLinkById(linkId) {
  try {
    const {
      rows: [link],
    } = await client.query(
      `
    SELECT * FROM links
    WHERE id=$1;
    `,
      [linkId]
    );

    if (!link) {
      throw {
        name: "LinkNotFoundError",
        message: "Could not find a link with that linkId",
      };
    }

    const { rows: tags } = await client.query(
      `
    SELECT tags.* FROM tags
    JOIN link_tags ON tags.id=link_tags."tagId"
    WHERE link_tags."linkId"=$1;
    `,
      [linkId]
    );

    link.tags = tags;
    return link;
  } catch (error) {
    console.error("getLinkById", error);
  }
}

async function getAllTags() {
  try {
    const { rows } = await client.query(`
    SELECT * FROM tags;
`);
    return rows;
  } catch (error) {
    console.log("getAllTags", error);
  }
}
//all links including their tags//
async function getAllLinks() {
  try {
    const { rows: linkIds } = await client.query(`
    SELECT * FROM links;
    `);
    const allLinks = await Promise.all(linkIds.map((link) => getLinkById(link.id)));
    return allLinks;
  } catch (error) {
    console.log("getAllLinks", error);
  }
}

async function getLinksByTag(tagname) {
  try {
    const { rows: linkIds } = await client.query(
      `
SELECT links.id 
FROM links
JOIN link_tags ON links.id=link_tags."linkId"
JOIN tags ON tags.id=link_tags."linkId"
WHERE tags.tagname=$1;
`,
      [tagname]
    );

    return await Promise.all(linkIds.map((link) => getLinkById(link.id)));
  } catch (error) {
    console.log("getLinksByTag", error);
  }
}
// export
module.exports = {
  client,
  createLinkTag,
  createLink,
  // updateLink,
  addTagsToLink,
  getLinkById,
  createTags,
  getAllLinks,
  getAllTags,
  getLinksByTag,
};
