import React from "react";

import AddLinkForm from "./AddLinkForm";

const Header = ({ allLinks, setAllLinks, setSelector }) => {
  const sortLinksHandler = (e) => {
    setSelector("popularity");
  };

  const allLinksHandler = () => {
    setSelector("default");
  };

  const sortLinksByDateHandler = (e) => {
    setSelector("date");
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item is-size-2 has-text-weight-bold has-background-info has-text-white">
          Linkerator!
        </a>
      </div>

      <div className="navbar-menu">
        <div className="navbar-start is-size-4">
          <a onClick={allLinksHandler} className="navbar-item">
            All Links
          </a>
          <a onClick={sortLinksHandler} className="navbar-item">
            Sort by Popularity
          </a>
          <a onClick={sortLinksByDateHandler} className="navbar-item">
            Sort by Date
          </a>
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">Add New Link</a>

            <div className="navbar-dropdown">
              <AddLinkForm setAllLinks={setAllLinks} allLinks={allLinks} />
            </div>
          </div>
        </div>

        <div className="nav-bar-end is-size-4">
          <div className="navbar-item"></div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
