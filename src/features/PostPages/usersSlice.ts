import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { editUserProfile } from "../Auth/authSlice";
import { API, Auth, Users } from "../../types";
import { AppDispatch } from "../../app/store";

const initialState: Users.State = {
  users: [],
  isUserLoading: false,
  isUserContentLoading: false,
};

export const getAllUsers = createAsyncThunk(
  "/users/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const {
        data,
        status,
        statusText,
      }: API.Response<{ users: Auth.User[] }> = await axios.get("/api/users");
      if (status === 200) return data.users;
      else throw new Error(`${status}, ${statusText}`);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Could not fetch data");
    }
  }
);

export const followUserMethod = createAsyncThunk(
  "/users/followUser",
  async (
    {
      followUserId,
      token,
      dispatch,
    }: { followUserId: string; token: string; dispatch: AppDispatch },
    thunkAPI
  ) => {
    try {
      console.log("inside followUser");
      const {
        data,
        status,
        statusText,
      }: API.Response<{
        user: Auth.User;
        followUser: Auth.User;
      }> = await axios.post(
        `/api/users/follow/${followUserId}`,
        {},
        {
          headers: { authorization: token },
        }
      );
      const { bio, avatarURL, website } = data.user;
      if (status === 200) {
        dispatch(
          editUserProfile({ userData: { bio, avatarURL, website }, token })
        );
        return data.followUser;
      } else throw new Error(`${status}, ${statusText}`);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("could not follow user");
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "/users/unfollowUser",
  async (
    {
      followUserId,
      token,
      dispatch,
    }: { followUserId: string; token: string; dispatch: AppDispatch },
    thunkAPI
  ) => {
    try {
      const {
        data,
        status,
        statusText,
      }: API.Response<{
        user: Auth.User;
        followUser: Auth.User;
      }> = await axios.post(`/api/users/unfollow/${followUserId}`);
      if (status === 201) {
        dispatch(editUserProfile({ userData: data.user, token }));
        return data.followUser;
      } else throw new Error(`${status}, ${statusText}`);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("could not follow user");
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    stopLoading: (state) => {
      state.isUserContentLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isUserLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isUserLoading = false;
        console.log(action.payload);
      })
      .addCase(followUserMethod.pending, (state) => {
        state.isUserContentLoading = true;
      })
      .addCase(followUserMethod.fulfilled, (state, action) => {
        state.users = [...state.users].map((currUser) =>
          currUser._id === action.payload._id ? action.payload : currUser
        );
      })
      .addCase(followUserMethod.rejected, (state, action) => {
        console.error(action.payload);
        state.isUserContentLoading = false;
      })
      .addCase(unfollowUser.pending, (state) => {
        state.isUserContentLoading = true;
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.isUserContentLoading = false;
        state.users = [...state.users].map((currUser) =>
          currUser._id === action.payload._id ? action.payload : currUser
        );
      })
      .addCase(unfollowUser.rejected, (state) => {
        state.isUserContentLoading = false;
      });
  },
});

export const { stopLoading } = usersSlice.actions;
export default usersSlice.reducer;
