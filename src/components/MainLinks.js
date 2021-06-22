import React from "react";
import { SingleLink } from "./index";
const MainLinks = ({ allLinks, setAllLinks, setSelector, selector, setSearchTerm }) => {
  return (
    <div className="is-flex is-flex-wrap-wrap">
      {allLinks &&
        allLinks.map((link) => {
          return (
            <SingleLink
              key={link.id}
              singleLink={link}
              setAllLinks={setAllLinks}
              allLinks={allLinks}
              selector={selector}
              setSelector={setSelector}
              setSearchTerm={setSearchTerm}
            />
          );
        })}
    </div>
  );
};

export default MainLinks;
