import React from "react";
import { SingleLink } from "./index";
const MainLinks = ({ allLinks }) => {
  return (
    <div className="is-flex is-flex-wrap-wrap">
      {allLinks &&
        allLinks.map((link) => {
          return <SingleLink key={link.id} singleLink={link} />;
        })}
    </div>
  );
};

export default MainLinks;
