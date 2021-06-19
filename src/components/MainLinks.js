import React, { useState, useEffect } from "react";
import { SingleLink } from "./index"
const MainLinks = ({ allLinks }) => {
    console.log({allLinks})
  return (
    <div className="main-content">
      {allLinks && allLinks.map((link) => {
        return <SingleLink key={link.id} singleLink={link} />;
      })}
    </div>
  );
};

export default MainLinks;
