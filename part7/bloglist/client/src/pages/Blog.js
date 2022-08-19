import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import blogServices from "../services/blogs";
import {
  updateBlog,
  updateBlogLikes,
  addBlogComment,
  deleteBlog,
} from "../reducers/blogReducer";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

const Blog = () => {
  const dispatch = useDispatch();
  let blogId = useParams().blogId;
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const blog = useSelector((state) =>
    state.blog.find((currentBlog) => currentBlog.id == blogId)
  );

  useEffect(() => {
    (async () => {
      let blogData = await blogServices.getBlog(blogId);
      dispatch(updateBlog(blogData));
    })();
  }, []);

  const handleUpdateBlogLikes = async () => {
    dispatch(updateBlogLikes(blog));
  };

  const handleDeleteBlog = async () => {
    dispatch(deleteBlog(blog.id));
    navigate("/");
  };

  const handleAddComment = async (event) => {
    event.preventDefault();

    const comment = event.target.comment.value;
    dispatch(addBlogComment(blog.id, comment));
    event.target.comment.value = "";
  };

  if (!blog) return null;

  return (
    <div>
      <h2 className="my-4">
        {blog.title} by {blog.author}
      </h2>

      <div className="mb-4">
        <p>
          Url: <a href={blog.url}>{blog.url}</a>
        </p>
        <p>
          Likes: {blog.likes}{" "}
          <Button className="mx-3" size="sm" onClick={handleUpdateBlogLikes}>
            Like
          </Button>
        </p>
        <p>
          Added by <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
        </p>
        {user.username === blog.user.username && (
          <Button variant="danger" onClick={handleDeleteBlog}>
            Remove
          </Button>
        )}
      </div>

      <h4>Comments</h4>
      <Form onSubmit={handleAddComment}>
        <Row className="mb-3">
          <Col>
            <Form.Control placeholder="Enter comment" name="comment" />
          </Col>
          <Col>
            <Button type="submit">Add comment</Button>
          </Col>
        </Row>
      </Form>

      {blog.comments.map((comment, index) => (
        <Card key={index} bg="light" className="mb-2">
          <Card.Body>{comment}</Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Blog;
