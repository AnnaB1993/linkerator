import React, { useState, useEffect } from "react";

import { getAllLinks } from "../api";
import { sortLinksByPopularity, sortLinksByDate } from "../utils";
import { Header, MainLinks } from "./index.js";

const selectors = {
  popularity: sortLinksByPopularity,
  date: sortLinksByDate,
  default: (links) => links,
};

const App = () => {
  const [allLinks, setAllLinks] = useState([]);
  const [selector, setSelector] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllLinks()
      .then((response) => {
        setAllLinks(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  let linksToRender = allLinks;
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    linksToRender = linksToRender.filter((link) => {
      const urlMatch = link.url.toLowerCase().includes(searchLower);
      const tagsMatch = link.tags.some((tag) => {
        return tag.tagname.toLowerCase().includes(searchLower);
      });
      return urlMatch || tagsMatch;
    });
  }

  return (
    <div className="App">
      <Header
        allLinks={allLinks}
        setAllLinks={setAllLinks}
        setSelector={setSelector}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* <MainLinks allLinks={allLinks} /> */}
      <MainLinks
        allLinks={selectors[selector](linksToRender)}
        setAllLinks={setAllLinks}
        setSelector={setSelector}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
};

export default App;
