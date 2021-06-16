const express = require("express");
const linksRouter = express.Router();
const { getAllLinks, createLink } = require("../db/index");
const tagsRouter = require("./tags");

linksRouter.use((req, res, next) => {
  console.log("A request is being made to /links");

  next();
});

linksRouter.get("/", async (req, res) => {
  const allLinks = await getAllLinks();

  res.send({
    allLinks,
  });
});

linksRouter.post("/", async (req, res, next) => {
  const { url, comments, tags = "" } = req.body;
  // console.log("req.body:", req.body);

  const tagArr = tags.trim().split(/\s+/);
  const linkData = {};

  if (tagArr.length) {
    linkData.tags = tagArr;
  }

  try {
    linkData.url = url;
    linkData.comments = comments;
    // console.log("linkData", linkData);

    const link = await createLink(linkData);

    res.send({ link });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = linksRouter;
