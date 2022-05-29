export namespace Theme {
  export enum Mode {
    dark = "dark",
    light = "light",
  }

  export type State = {
    mode: keyof typeof Mode;
  };
}

export namespace Auth {
  export type User = {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    password?: string;
    createdAt: string;
    updatedAt: string;
    bio: string;
    avatarURL: string;
    website: string;
    bookmarks: string[];
    followers: User[];
    following: User[];
  };
  export type LoginData = {
    token: string | null;
    user: User | null;
  };

  export type State = {
    token: string | null;
    user: User | null;
    isAuthLoading: boolean;
    isAuthContentLoading: boolean;
  };
}

export namespace Posts {
  export type Comment = {
    _id: string;
    username: string;
    text: string;
    name: string;
    avatarURL: string;
    votes: {
      upvotedBy: unknown[];
      downvotedBy: unknown[];
    };
  };
  export type Post = {
    _id: string;
    content: string;
    likes: {
      likeCount: number;
      likedBy: unknown[];
      dislikedBy: unknown[];
    };
    username: string;
    createdAt: string;
    updatedAt: string;
    comments: Comment[];
  };

  export type State = {
    posts: Post[];
    isPostLoading: boolean;
    isPostContentLoading: boolean;
  };
}

export namespace Profile {
  export type State = {
    userDetails: Auth.User;
    userPosts: Posts.Post[];
    isProfileLoading: boolean;
    isProfileContentLoading: boolean;
  };
}

export namespace Users {
  export type State = {
    users: Auth.User[];
    isUserLoading: boolean;
    isUserContentLoading: boolean;
  };
}

export namespace API {
  export type Response<T> = {
    data: T;
    status: number;
    statusText: string;
  };
}
