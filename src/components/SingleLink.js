import React, { useState, useEffect } from "react";

const SingleLink = ({ singleLink }) => {
  const { url, comments, clicks, date, tags } = singleLink;

  return (
    <div className="card my-2">
      <div className="card-content">
        <div className="content">
          <p>{url}</p>
          <p>
            Clicked {clicks} since {date}
          </p>
          <p>Comments: {comments}</p>
        </div>
      </div>
      <footer className="card-footer is-align-self-auto">
        <p className="card-footer-item">
          Tags:
          <br />
          {tags &&
            tags.map((tag) => {
              const { id, tagname } = tag;
              return (
                <a className="tag has-background-info has-text-white mx-1" key={id}>
                  {tagname}
                </a>
              );
            })}
        </p>
      </footer>
    </div>
  );
};

export default SingleLink;

/* <div className="single-link">
      <p>{url}</p>
      <p>
        Clicked {clicks} since {date}
      </p>
      <p>Comments: {comments}</p>
      <div>
        Includes tags:{" "}
        {tags &&
          tags.map((tag) => {
            const { id, tagname } = tag;
            return <p key={id}>{tagname}</p>;
          })}
      </div>
    </div> */
