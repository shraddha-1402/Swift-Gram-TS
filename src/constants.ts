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

const testLoginCredentials = {
  username: "adarshbalika",
  password: "adarshBalika123",
};

enum LocalRoutes {
  HOME = "home",
  SIGNIN = "/",
  SIGNUP = "/signup",
  PROFILE = "/profile",
  BOOKMARKS = "/bookmarks",
  SINGLE_POST = "/single-post",
}

export { LocalRoutes, emojis, testLoginCredentials };
