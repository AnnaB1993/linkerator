const express = require("express");
const linksRouter = express.Router();
const { getAllLinks } = require("../db/index");

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

module.exports = linksRouter;
