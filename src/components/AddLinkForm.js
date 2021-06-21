import React, { useState } from "react";
import { createNewLinks } from "../api";

const AddLinkForm = ({ allLinks, setAllLinks }) => {
  const [url, setUrl] = useState("");
  const [comments, setComments] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { link: newLink } = await createNewLinks([url, comments, tags]);

      setAllLinks([...allLinks, newLink]);
      setUrl("");
      setComments("");
      setTags("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="px-2" onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">URL</label>
        <div className="control">
          <input
            required
            value={url}
            type="url"
            className="input"
            placeholder="https://example.com"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Comments</label>
        <div className="control">
          <input
            value={comments}
            type="textarea"
            className="input"
            placeholder="comments"
            onChange={(e) => setComments(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="" className="label">
          Tags
        </label>
        <div className="control">
          <input
            value={tags}
            type="text"
            className="input"
            placeholder="tags separated by space"
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
      </div>

      <div className="control">
        <button className="button has-background-info has-text-white">Submit</button>
      </div>
    </form>
  );
};

export default AddLinkForm;
