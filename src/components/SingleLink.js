import React, { useState, useEffect } from "react";

const SingleLink = ({ singleLink }) => {
  const { url, comments, clicks, date, tags } = singleLink;

  return (
    <div className="single-link">
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
    </div>
  );
};

export default SingleLink;
