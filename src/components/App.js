import React, { useState, useEffect } from "react";

import { getAllLinks, getSomething, sortAllLinksByPopularity } from "../api";
import {Header, MainLinks, SingleLink} from "./index.js"

const App = () => {
  const [allLinks, setAllLinks] = useState([]);

  useEffect(() => {
    getAllLinks()
    .then(response => {setAllLinks(response);
    })
    .catch(error => {
      console.log(error)})

    // sortAllLinksByPopularity()
    //
     .then(response => console.log(response))
  }, []);


  return (
    <div className="App">
      <Header allLinks={allLinks} setAllLinks={setAllLinks}/>
      <MainLinks allLinks={allLinks}/>
    </div>
  );
};

export default App;
