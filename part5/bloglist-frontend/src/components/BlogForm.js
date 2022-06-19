/* eslint-disable react/prop-types */
import React, { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreateBlog = (e) => {
    e.preventDefault();

    createBlog({ title, author, url });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={handleCreateBlog}>
      <div>
        title:
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          name="author"
          id="author"
          value={author}
          placeholder="author"
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          name="url"
          id="url"
          value={url}
          placeholder="url"
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <button type="submit" id="create-button">
        create
      </button>
    </form>
  );
};

export default BlogForm;
