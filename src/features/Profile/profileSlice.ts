import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API, Auth, Posts, Profile } from "../../types";
import { userInitialState } from "../../constants";

const initialState: Profile.State = {
  userDetails: userInitialState,
  userPosts: [],
  isProfileLoading: false,
  isProfileContentLoading: false,
};

export const getUserProfileDetails = createAsyncThunk(
  "/profile/getUserProfileDetails",
  async (username: string, thunkAPI) => {
    try {
      const {
        data,
        status,
        statusText,
      }: API.Response<{ user: Auth.User }> = await axios.get(
        `/api/users/${username}`
      );
      if (status === 200) return data.user;
      else throw new Error(`${status}, ${statusText}`);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Could not fetch data");
    }
  }
);

export const getUserPosts = createAsyncThunk(
  "/profile/getUserPosts",
  async (username: string, thunkAPI) => {
    try {
      const {
        data,
        status,
        statusText,
      }: API.Response<{ posts: Posts.Post[] }> = await axios.get(
        ` /api/posts/user/${username}`
      );
      if (status === 200) return data.posts;
      else throw new Error(`${status}, ${statusText}`);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Could not fetch data");
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfileDetails.pending, (state) => {
        state.isProfileLoading = true;
      })
      .addCase(getUserProfileDetails.fulfilled, (state, action) => {
        state.isProfileLoading = false;
        state.userDetails = action.payload;
      })
      .addCase(getUserProfileDetails.rejected, (state) => {
        state.isProfileLoading = false;
      })
      .addCase(getUserPosts.pending, (state) => {
        state.isProfileLoading = true;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.isProfileLoading = false;
        state.userPosts = [...action.payload].reverse();
      })
      .addCase(getUserPosts.rejected, (state) => {
        state.isProfileLoading = false;
      });
  },
});

export default profileSlice.reducer;
