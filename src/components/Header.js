import React, { useState, useRef } from "react";

import AddLinkForm from "./AddLinkForm";

const Header = ({ allLinks, setAllLinks, setSelector }) => {
  const searchInput = useRef("");

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
    <nav className="navbar is-success" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item is-size-2 has-text-weight-bold has-text-white">
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
        <div className="navbar-end is-size-4 mx-3 px-2">
          <label className="label navbar-item is-size-4 my-3">Search Links:</label>
          <input
            ref={searchInput}
            type="text"
            className="input navbar-item has-text-grey my-4"
            placeholder="search for links or tags"
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
