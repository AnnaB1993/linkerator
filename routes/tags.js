const express = require("express");
const tagsRouter = express.Router();
const { getAllTags, createTags, getLinksByTag } = require("../db/index");

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next();
});

tagsRouter.get("/", async (req, res) => {
  const allTags = await getAllTags();

  res.send({
    allTags,
  });
});

tagsRouter.post("/", async (req, res, next) => {
  const { tags = "" } = req.body;

  const tagArr = tags.trim().split(/\s+/);

  try {
    const tagList = await createTags(tagArr);

    res.send(tagList);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

tagsRouter.get("/:tagName/links", async (req, res, next) => {
  //read tagname from the url params
  const tagName = req.params.tagName;
  // console.log("req.params:", req.params);
  // console.log("tagName:", tagName);

  try {
    const linksByTag = await getLinksByTag(tagName);
    // console.log("linksByTag", linksByTag);

    res.send(linksByTag);
  } catch (error) {}
});

module.exports = tagsRouter;
