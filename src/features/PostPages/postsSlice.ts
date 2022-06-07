import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API, Posts } from "../../types/types";

const initialState: Posts.State = {
  posts: [],
  isPostLoading: false,
  isPostContentLoading: false,
  // singlePost: [],
};

export const getAllPosts = createAsyncThunk(
  "/posts/getAllPosts",
  async (_, thunkAPI) => {
    try {
      const {
        data,
        status,
        statusText,
      }: API.Response<{ posts: Posts.Post[] }> = await axios.get("/api/posts");
      if (status === 200) return data.posts;
      else throw new Error(`${status}, ${statusText}`);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("could not fetch posts");
    }
  }
);

export const publishSinglePost = createAsyncThunk(
  "/posts/publishSinglePost",
  async (
    {
      postContent,
      postImageURL,
      token,
    }: { postContent: string; postImageURL: string; token: string },
    thunkAPI
  ) => {
    try {
      const {
        data,
        status,
        statusText,
      }: API.Response<{ posts: Posts.Post[] }> = await axios.post(
        "/api/posts",
        { postData: { content: postContent, imageURL: postImageURL } },
        { headers: { authorization: token } }
      );
      if (status === 201) return data.posts[data.posts.length - 1];
      else throw new Error(`${status}, ${statusText}`);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("could not publish post");
    }
  }
);

export const editSinglePost = createAsyncThunk(
  "/posts/editSinglePost",
  async (
    {
      postId,
      postData,
      token,
    }: { postId: string; postData: { content: string }; token: string },
    thunkAPI
  ) => {
    try {
      const {
        data,
        status,
        statusText,
      }: API.Response<{ posts: Posts.Post[] }> = await axios.post(
        `/api/posts/edit/${postId}`,
        { postData },
        { headers: { authorization: token } }
      );
      if (status === 201)
        return { editedPost: data.posts.find(({ _id }) => _id === postId) };
      else throw new Error(`${status}, ${statusText}`);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("could not edit post");
    }
  }
);

export const deleteSinglePost = createAsyncThunk(
  "/posts/deleteSinglePost",
  async ({ postId, token }: { postId: string; token: string }, thunkAPI) => {
    try {
      const {
        status,
        statusText,
      }: API.Response<{ posts: Posts.Post[] }> = await axios.delete(
        `/api/posts/${postId}`,
        {
          headers: { authorization: token },
        }
      );
      if (status === 201) return { postId };
      else throw new Error(`${status}, ${statusText}`);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("could not delete post");
    }
  }
);

export const likePost = createAsyncThunk(
  "/posts/likePost",
  async ({ postId, token }: { postId: string; token: string }, thunkAPI) => {
    try {
      const {
        data,
        status,
        statusText,
      }: API.Response<{ posts: Posts.Post[] }> = await axios.post(
        `/api/posts/like/${postId}`,
        {},
        {
          headers: { authorization: token },
        }
      );
      if (status === 201) return data.posts.find((post) => post._id === postId);
      else throw new Error(`${status}, ${statusText}`);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("could not like post");
    }
  }
);

export const dislikePost = createAsyncThunk(
  "/posts/dislikePost",
  async ({ postId, token }: { postId: string; token: string }, thunkAPI) => {
    try {
      const {
        data,
        status,
        statusText,
      }: API.Response<{ posts: Posts.Post[] }> = await axios.post(
        `/api/posts/dislike/${postId}`,
        {},
        {
          headers: { authorization: token },
        }
      );
      if (status === 201) return data.posts.find((post) => post._id === postId);
      else throw new Error(`${status}, ${statusText}`);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("could not dislike post");
    }
  }
);

export const commentOnPost = createAsyncThunk(
  "/posts/commentOnPost",
  async (
    {
      postId,
      token,
      commentData,
    }: { postId: string; token: string; commentData: string },
    thunkAPI
  ) => {
    try {
      const {
        data,
        status,
        statusText,
      }: API.Response<{ posts: Posts.Post[] }> = await axios.post(
        `/api/comments/add/${postId}`,
        { commentData },
        { headers: { authorization: token } }
      );
      if (status === 201) return data.posts;
      else throw new Error(`${status}, ${statusText}`);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("could not add comment on post");
    }
  }
);

export const deleteCommentOnPost = createAsyncThunk(
  "/posts/deleteCommentOnPost",
  async (
    {
      postId,
      token,
      commentId,
    }: { postId: string; token: string; commentId: string },
    thunkAPI
  ) => {
    try {
      const {
        data,
        status,
        statusText,
      }: API.Response<{ posts: Posts.Post[] }> = await axios.post(
        `/api/comments/delete/${postId}/${commentId}`,
        {},
        { headers: { authorization: token } }
      );
      if (status === 201) return data.posts;
      else throw new Error(`${status}, ${statusText}`);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("could not delete comment on post");
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.isPostLoading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isPostLoading = false;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state) => {
        state.isPostLoading = false;
      })
      .addCase(publishSinglePost.pending, (state) => {
        state.isPostContentLoading = true;
      })
      .addCase(publishSinglePost.fulfilled, (state, action) => {
        state.isPostContentLoading = false;
        state.posts.unshift(action.payload);
      })
      .addCase(publishSinglePost.rejected, (state) => {
        state.isPostContentLoading = false;
      })
      .addCase(editSinglePost.pending, (state) => {
        state.isPostContentLoading = true;
      })
      .addCase(editSinglePost.fulfilled, (state, action) => {
        state.isPostContentLoading = false;
        state.posts = state.posts.map((post) =>
          post._id === action.payload.editedPost?._id
            ? action.payload.editedPost
            : post
        );
      })
      .addCase(editSinglePost.rejected, (state) => {
        state.isPostContentLoading = false;
      })
      .addCase(deleteSinglePost.pending, (state) => {
        state.isPostContentLoading = true;
      })
      .addCase(deleteSinglePost.fulfilled, (state, action) => {
        state.isPostContentLoading = false;
        state.posts = state.posts.filter(
          ({ _id }) => _id !== action.payload.postId
        );
      })
      .addCase(deleteSinglePost.rejected, (state) => {
        state.isPostContentLoading = false;
      })
      .addCase(likePost.pending, (state) => {
        state.isPostContentLoading = true;
        // console.log(isLoad);
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.isPostContentLoading = false;
        state.posts = state.posts.map((post) =>
          post._id === action.payload?._id ? action.payload : post
        );
      })
      .addCase(likePost.rejected, (state) => {
        state.isPostContentLoading = false;
      })
      .addCase(dislikePost.pending, (state) => {
        state.isPostContentLoading = true;
      })
      .addCase(dislikePost.fulfilled, (state, action) => {
        state.isPostContentLoading = false;
        state.posts = state.posts.map((post) =>
          post._id === action.payload?._id ? action.payload : { ...post }
        );
      })
      .addCase(dislikePost.rejected, (state) => {
        state.isPostContentLoading = false;
      })
      .addCase(commentOnPost.pending, (state) => {
        state.isPostContentLoading = true;
      })
      .addCase(commentOnPost.fulfilled, (state, action) => {
        state.isPostContentLoading = false;
        state.posts = action.payload;
      })
      .addCase(commentOnPost.rejected, (state) => {
        state.isPostContentLoading = false;
      })
      .addCase(deleteCommentOnPost.pending, (state) => {
        state.isPostContentLoading = true;
      })
      .addCase(deleteCommentOnPost.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isPostContentLoading = false;
      })
      .addCase(deleteCommentOnPost.rejected, (state) => {
        state.isPostContentLoading = false;
        // toast
      });
  },
});

export default postsSlice.reducer;
