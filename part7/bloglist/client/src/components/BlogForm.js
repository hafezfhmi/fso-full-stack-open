/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

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
    <Form onSubmit={handleCreateBlog}>
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          required
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAuthor">
        <Form.Label>Author</Form.Label>
        <Form.Control
          required
          placeholder="Enter Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formUrl">
        <Form.Label>Url</Form.Label>
        <Form.Control
          required
          placeholder="Enter Url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        id="create-button"
        className="mb-2"
      >
        Create
      </Button>
    </Form>
  );
};

export default BlogForm;
