import React, { useState, useEffect } from "react";
import { getAllLinks, sortAllLinksByPopularity } from "../api";

const Header = ({ allLinks, setAllLinks }) => {
  const sortLinksHandler = async () => {
    const sorted = await sortAllLinksByPopularity();
    setAllLinks([]);
    setAllLinks(sorted);
  };

  const allLinksHandler = async () => {
    const allLinks = await getAllLinks();
    setAllLinks([]);
    setAllLinks(allLinks);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item is-size-2 has-text-weight-bold has-background-info has-text-white">
          Linkerator!
        </a>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start is-size-4">
          <a onClick={allLinksHandler} className="navbar-item">
            All Links
          </a>
          <a onClick={sortLinksHandler} className="navbar-item">
            Sorted by Popularity
          </a>
        </div>

        <div className="navbar-end"></div>
      </div>
    </nav>
  );
};

export default Header;
