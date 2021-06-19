import React, { useState, useEffect } from "react";
import { sortAllLinksByPopularity } from "../api";

const Header = ({ allLinks, setAllLinks }) => {
  const sortLinksHandler = async () => {
    const sorted = await sortAllLinksByPopularity();
    setAllLinks([]);
    setAllLinks(sorted);
  };
  return (
    <header>
      <h2>LINKERATOR</h2>
      <h4>your bookmark app</h4>
      <button
        onClick={(event) => {
          event.preventDefault();
          sortLinksHandler();
        }}
      >
        Show most visited first
      </button>
    </header>
  );
};

export default Header;
