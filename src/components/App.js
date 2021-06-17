import React, { useState, useEffect } from "react";

import { getLinksOnPage, getSomething } from "../api";

const App = () => {
  const [mainContent, setMainContent] = useState([]);

  useEffect(() => {
    // getSomething()
    //   .then(response => {
    //     setMessage(response.message);
    //   })
    //   .catch(error => {
    //     setMessage(error.message);
    //   });
    getLinksOnPage().then((response) => setMainContent(response))
    // .catch((error) => console.error(error)));
  });

  return (
    <div className="App">
      <h1>Hello, World!</h1>
      <h2>{mainContent}</h2>
    </div>
  );
};

export default App;
