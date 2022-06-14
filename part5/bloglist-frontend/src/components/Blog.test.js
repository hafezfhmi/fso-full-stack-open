import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

test('Blog component render blog title and author but not url and likes by default', () => {
  const blog = {
    title: 'Jack Adventure',
    author: 'John Doe Author',
    url: 'johndoe.com',
    likes: 2,
  };

  /*
  GETTING ELEMENT BY CSS CLASS

  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector('.blog');
  expect(div).toHaveTextContent(blog.title);
  expect(div).toHaveTextContent(blog.author);
  */

  render(<Blog blog={blog} />);

  /*
  PRINT THE ENTIRE RENDERED ELEMENT TO CONSOLE
  screen.debug();
  */

  let element = screen.queryByText(`${blog.title} ${blog.author}`);
  expect(element).toBeDefined();

  /*
  PRINT THE TARGETED ELEMENT TO CONSOLE
  screen.debug(element);
  */

  element = screen.queryByText(blog.url);
  expect(element).toBeNull();

  element = screen.queryByText(blog.likes);
  expect(element).toBeNull();
});
