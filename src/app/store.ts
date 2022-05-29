import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authSlice";
import postsReducer from "../features/PostPages/postsSlice";
import profileReducer from "../features/Profile/profileSlice";
import usersReducer from "../features/PostPages/usersSlice";
import themeReducer from "../features/theme/themeSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    users: usersReducer,
    posts: postsReducer,
    profile: profileReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
