import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allBlogs: {},
  blog: {},
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    loadBlogs(state, action) {
      const blogs = action.payload.Blogs;
      blogs.forEach((blog) => {
        state.allBlogs[blog.id] = blog;
      });
    },
    loadBlog(state, action) {
      state.blog = action.payload;
    },
    createBlog(state, action) {
      const newBlog = action.payload;
      state.allBlogs[newBlog.id] = newBlog;
    },
    updateBlog(state, action) {
      const editBlog = action.payload;
      state.allBlogs[editBlog.id] = editBlog;
    },
    deleteBlog(state, action) {
      delete state.allBlogs[action.payload];
    },
  },
});

export const { loadBlogs, loadBlog, updateBlog, deleteBlog } =
  blogSlice.actions;

export default blogSlice.reducer;
