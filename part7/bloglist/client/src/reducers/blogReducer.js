import { createSlice } from "@reduxjs/toolkit";
import blogServices from "../services/blogs";
import { displayNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    // updateBlog(state, action) {
    //   return state.map((blog) =>
    //     blog.id === action.payload.id ? action.payload : blog
    //   );
    // },
    addBlog(state, action) {
      return [...state, action.payload];
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { setBlogs, addBlog, updateBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    let blogs = await blogServices.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      let newBlog = await blogServices.addBlog(blog);
      dispatch(addBlog(newBlog));
      dispatch(
        displayNotification({
          message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        })
      );
    } catch (error) {
      dispatch(
        displayNotification({
          message: `error creating new blog`,
          type: "danger",
        })
      );
    }
  };
};

export const updateBlogLikes = (blog) => {
  console.log(blog);
  //   return async (dispatch) => {
  //     let newBlog = await blogServices.updateLikes(blog.id, blog.likes + 1);
  //     dispatch(updateBlog(newBlog));
  //   };
};

export default blogSlice.reducer;
