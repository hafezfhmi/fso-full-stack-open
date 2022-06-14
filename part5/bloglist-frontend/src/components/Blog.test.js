import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('Testing blog component where:', () => {
  const blog = {
    title: 'Jack Adventure',
    author: 'John Doe Author',
    url: 'johndoe.com',
    likes: 2,
    user: { name: 'John Doe Owner', username: 'JohnDoe' },
  };

  const user = {
    username: 'JohnDoe',
  };

  test('Blog component render blog title and author but not url and likes by default', () => {
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

    let element = screen.getByText(`${blog.title} ${blog.author}`);
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

  test('Blog url and likes are shown when view button is clicked', async () => {
    render(<Blog blog={blog} user={user} />);

    const userClick = userEvent.setup();

    const button = screen.getByText('view');

    await userClick.click(button);

    let element = screen.getByText(blog.url);
    expect(element).toBeDefined();

    element = screen.getByText(blog.likes, { exact: false });
    expect(element).toBeDefined();
  });
});
