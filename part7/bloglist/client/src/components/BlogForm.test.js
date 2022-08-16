import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("blog is created with the right details", async () => {
  const createBlog = jest.fn();

  render(<BlogForm createBlog={createBlog} />);

  const titleInput = screen.getByPlaceholderText("title");
  const authorInput = screen.getByPlaceholderText("author");
  const urlInput = screen.getByPlaceholderText("url");

  await userEvent.type(titleInput, "Amazing John");
  await userEvent.type(authorInput, "John Author");
  await userEvent.type(urlInput, "johndoe.com");

  const submitButton = screen.getByText("create");

  await userEvent.click(submitButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("Amazing John");
  expect(createBlog.mock.calls[0][0].author).toBe("John Author");
  expect(createBlog.mock.calls[0][0].url).toBe("johndoe.com");
});
