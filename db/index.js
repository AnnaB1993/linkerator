// Connect to DB
const { Client } = require("pg");
const DB_NAME = "linkerator";
const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;
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
    console.log(error);
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
    console.log(error);
  }
}
async function addTagsToLink(linkId, tagList) {
  try {
    const allTagsPromises = tagList.map((tag) => createLinkTag(linkId, tag.id));
    await Promise.all(allTagsPromises);
    return await getLinkById(linkId);
  } catch (error) {
    console.log(error);
  }
}

async function getLinkById(linkId){
  try{
    const {rows: [link]} = await client.query(`
    SELECT * FROM links
    WHERE id=$1,
    `, [linkId]);

    if (!link) {
      throw {
        name: "LinkNotFoundError",
        message: "Could not find a link with that linkId"
      };
    }

    

  }catch(error){
    console.error(error)
  }
}

// export
module.exports = {
  client,
  createLinkTag,
  createLink,
  // db methods
};
