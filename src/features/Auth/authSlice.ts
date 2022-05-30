import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isLoginData } from "../../types/typeGuards";
import { Auth } from "../../types/types";
const getSMLoginData = () => {
  const localData = localStorage.getItem("smLoginData");
  if (localData === null) return null;
  const parsedData = JSON.parse(localData);
  return isLoginData(parsedData) ? parsedData : null;
};
const smLoginData = getSMLoginData();

const initialState: Auth.State = {
  token: smLoginData?.token || null,
  user: smLoginData?.user || null,
  isAuthLoading: false,
  isAuthContentLoading: false,
};

export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async (
    { username, password }: { username: string; password: string },
    thunkAPI
  ) => {
    try {
      const {
        data,
        status,
        statusText,
      }: {
        data: { foundUser: Auth.User; encodedToken: string };
        status: number;
        statusText: string;
      } = await axios.post("/api/auth/login", {
        username,
        password,
      });
      if (status === 200)
        return { user: data.foundUser, token: data.encodedToken };
      else throw new Error(`${status} ${statusText}`);
    } catch (error) {
      if (error === 404) return thunkAPI.rejectWithValue("User not found");
      else if (error === 401)
        return thunkAPI.rejectWithValue("Check your credentials");
      else return thunkAPI.rejectWithValue("Could not signin, try later!");
      // console.log(error);
      // return;
    }
  }
);

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (credentials: { username: string; password: string }, thunkAPI) => {
    try {
      const {
        data,
        status,
        statusText,
      }: {
        data: { createdUser: Auth.User; encodedToken: string };
        status: number;
        statusText: string;
      } = await axios.post("/api/auth/signup", {
        ...credentials,
        bio: "",
        website: "",
        avatarURL: "",
      });
      if (status === 201)
        return {
          user: data.createdUser,
          token: data.encodedToken,
        };
      else throw new Error(`${status} ${statusText}`);
    } catch (error) {
      if (error === 422) thunkAPI.rejectWithValue("Username already exists");
      else thunkAPI.rejectWithValue("Could not signup, try later");
      console.log(error);
      return null;
    }
  }
);

export const editUserProfile = createAsyncThunk(
  "/auth/editUserProfile",
  async (
    {
      userData,
      token,
    }: {
      userData: { bio: string; website: string; avatarURL: string };
      token: string;
    },
    thunkAPI
  ) => {
    try {
      const {
        data,
        status,
        statusText,
      }: {
        data: { user: Auth.User };
        status: number;
        statusText: string;
      } = await axios.post(
        "/api/users/edit",
        { userData },
        { headers: { authorization: token } }
      );
      if (status === 201) return data.user;
      else return thunkAPI.rejectWithValue(statusText);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllBookmarks = createAsyncThunk(
  "/posts/getAllBookmarks",
  async ({ token }: { token: string }, thunkAPI) => {
    try {
      const {
        data,
        status,
        statusText,
      }: {
        data: { bookmarks: string[] };
        status: number;
        statusText: string;
      } = await axios.get(`/api/users/bookmark/`, {
        headers: { authorization: token },
      });
      if (status === 200) return data.bookmarks;
      else throw new Error(`${status}, ${statusText}`);
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue("could not add  post to bookmark");
    }
  }
);

export const addPostToBookmark = createAsyncThunk(
  "/posts/addPostToBookmark",
  async ({ postId, token }: { postId: string; token: string }, thunkAPI) => {
    try {
      const { data, status, statusText } = await axios.post(
        `/api/users/bookmark/${postId}`,
        {},
        { headers: { authorization: token } }
      );
      if (status === 201) return data.bookmarks[data.bookmarks.length - 1];
      else throw new Error(`${status}, ${statusText}`);
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue("could not add  post to bookmark");
    }
  }
);

export const removePostFromBookmark = createAsyncThunk(
  "/posts/removePostFromBookmark",
  async ({ postId, token }: { postId: string; token: string }, thunkAPI) => {
    try {
      const { data, status, statusText } = await axios.post(
        `/api/users/remove-bookmark/${postId}`,
        {},
        { headers: { authorization: token } }
      );
      if (status === 201) return data.bookmarks;
      else throw new Error(`${status}, ${statusText}`);
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue("could not remove  post from bookmark");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOutUser: (state) => {
      localStorage.removeItem("smLoginData");
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // sign in user states
    builder
      .addCase(signInUser.pending, (state) => {
        state.isAuthLoading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        if (action.payload === null)
          return console.log("reached impossible condition");
        state.isAuthLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        delete action.payload.user.password;
        localStorage.setItem(
          "smLoginData",
          JSON.stringify({
            token: action.payload?.token,
            user: action.payload?.user,
          })
        );
        // add toast for displaying success
      })
      .addCase(signInUser.rejected, (state) => {
        state.isAuthLoading = false;
        // add toast for displaying error
      })
      .addCase(signUpUser.pending, (state) => {
        state.isAuthLoading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        if (action.payload === null)
          return console.log("reached impossible condition");
        state.isAuthLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        delete action.payload.user.password;
        localStorage.setItem(
          "smLoginData",
          JSON.stringify({
            token: action.payload.token,
            user: action.payload.user,
          })
        );
        // add toast for displaying success
      })
      .addCase(signUpUser.rejected, (state) => {
        state.isAuthLoading = false;
        // add toast for displaying error
      })
      .addCase(editUserProfile.pending, (state) => {
        state.isAuthContentLoading = true;
      })
      .addCase(editUserProfile.fulfilled, (state, action) => {
        state.isAuthContentLoading = false;
        state.user = action.payload;
      })
      .addCase(editUserProfile.rejected, (state, action) => {
        state.isAuthContentLoading = false;
        console.log(action.payload);
        // toast about error
      })
      .addCase(getAllBookmarks.pending, (state) => {
        state.isAuthContentLoading = true;
      })
      .addCase(getAllBookmarks.fulfilled, (state, action) => {
        state.isAuthContentLoading = false;
        if (state.user && action.payload) state.user.bookmarks = action.payload;
      })
      .addCase(getAllBookmarks.rejected, (state, action) => {
        state.isAuthContentLoading = false;
        console.log(action.payload);
        // toast about error
      })
      .addCase(addPostToBookmark.pending, (state) => {
        state.isAuthContentLoading = true;
      })
      .addCase(addPostToBookmark.fulfilled, (state, action) => {
        state.isAuthContentLoading = false;
        if (state.user) state.user.bookmarks.unshift(action.payload);
      })
      .addCase(addPostToBookmark.rejected, (state, action) => {
        state.isAuthContentLoading = false;
        console.log(action.payload);
        // toast about error
      })
      .addCase(removePostFromBookmark.pending, (state) => {
        state.isAuthContentLoading = true;
      })
      .addCase(removePostFromBookmark.fulfilled, (state, action) => {
        state.isAuthContentLoading = false;
        if (state.user) state.user.bookmarks = action.payload;
      })
      .addCase(removePostFromBookmark.rejected, (state, action) => {
        state.isAuthContentLoading = false;
        console.log(action.payload);
        // toast about error
      });
  },
});

export const { signOutUser } = authSlice.actions;
export default authSlice.reducer;
