const express = require("express");
const tagsRouter = express.Router();
const { getAllTags } = require("../db/index");

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

module.exports = tagsRouter;
