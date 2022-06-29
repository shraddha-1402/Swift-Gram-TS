import { Auth, Posts } from "./types";

const emojis = [
  "🙂",
  "😊",
  "🤗",
  "😄",
  "😅",
  "😆",
  "😂",
  "🤣",
  "😘",
  "🥰",
  "😍",
  "🤩",
  "😇",
  "😎",
  "😋",
  "😜",
  "🙃",
  "😴",
  "🤯",
  "🥳",
];

export const postInitialState: Posts.Post = {
  _id: "",
  content: "",
  imageURL: "",
  likes: {
    likeCount: 0,
    likedBy: [],
    dislikedBy: [],
  },
  username: "",
  createdAt: "",
  updatedAt: "",
  comments: [],
};

export const userInitialState: Auth.User = {
  _id: "",
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  createdAt: "",
  updatedAt: "",
  bio: "",
  avatarURL: "",
  bookmarks: [],
  website: "",
  followers: [],
  following: [],
};

const testLoginCredentials = {
  username: "kristee",
  password: "kristee123",
};

enum LocalRoutes {
  HOME = "home",
  SIGNIN = "/",
  SIGNUP = "/signup",
  PROFILE = "/profile",
  BOOKMARKS = "/bookmarks",
  SINGLE_POST = "/single-post",
  EXPLORE = "/explore",
}

export { LocalRoutes, emojis, testLoginCredentials };
