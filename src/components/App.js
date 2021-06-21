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

  useEffect(() => {
    getAllLinks()
      .then((response) => {
        setAllLinks(response);
      })
      .catch((error) => {
        console.error(error);
      })

      .then((response) => console.log(response));
  }, []);

  return (
    <div className="App">
      <Header allLinks={allLinks} setAllLinks={setAllLinks} setSelector={setSelector} />
      {/* <MainLinks allLinks={allLinks} /> */}
      <MainLinks allLinks={selectors[selector](allLinks)} setAllLinks={setAllLinks} setSelector={setSelector}/>
    </div>
  );
};

export default App;
