import React from "react";

// import { updateClickCount } from "../../db";
import { updateClicks } from "../api";
const formatDate = (stringDate) => {
  const dateObj = new Date(stringDate);
  const mm = dateObj.getMonth() + 1;
  const dd = dateObj.getDate();
  const yyyy = dateObj.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
};

const SingleLink = ({ singleLink, setAllLinks, allLinks, selector, setSelector }) => {
  const { id, url, comments, clicks, date, tags } = singleLink;
  const formattedDate = formatDate(date);

  const goToSite = async () => {
    window.open(url, "_blank");
    console.log(singleLink.url);
    try {
      const updatedClicksLinks = await updateClicks(id);
      setAllLinks([...allLinks, updatedClicksLinks]);
      // console.log(this.selector.selector)
  
    } catch (error) {
      console.log("this error", error);
    }
  };
  return (
    <div className="card my-3 mx-2 has-background-success-light">
      <div className="card-content">
        <div className="content">
          <a href="{url}" onClick={() => goToSite(url)}>
            {url}
          </a>
          <p>
            Clicked {clicks} times since {formattedDate}
          </p>
          <p>
            <strong>Comments:</strong> {comments}
          </p>
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
                <a
                  className="tag has-background-info has-text-white mx-1"
                  key={id}
                >
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
