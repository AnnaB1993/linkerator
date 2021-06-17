import React, { useState, useEffect } from "react";

import { getAllLinks, getSomething, sortAllLinksByPopularity } from "../api";
import {Header} from "./index.js"

const App = () => {
  const [allLinks, setAllLinks] = useState([]);

  useEffect(() => {
    getAllLinks()
    .then(response => {setAllLinks(response.data);
    })
    .catch(error => {
      console.log(error)})

    sortAllLinksByPopularity()
    .then(response => console.log(response))
  });


  return (
    <div className="App">
      <Header/>
    </div>
  );
};

export default App;
