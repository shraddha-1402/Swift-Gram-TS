import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: "DJsndsor",
    content:
      "Really grateful for what life has offered me. And consistently trying to make myself better each day!",
    imageURL:
      "https://res.cloudinary.com/doigywl1z/image/upload/v1652959058/avatar3_mj0ghj.jpg",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "kristee",
    createdAt: "2021-08-28T10:55:06+05:30",
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        username: "john_ferguson",
        text: "Congratulations!",
        name: "John Ferguson",
        avatarURL:
          "https://res.cloudinary.com/doigywl1z/image/upload/v1652959071/avatar1_vkolbj.jpg",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "natalieee",
        text: "Happy for you!",
        name: "Natalie Robinson",
        avatarURL:
          "https://res.cloudinary.com/doigywl1z/image/upload/v1652959062/avatar6_puj5vv.jpg",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },
  {
    _id: "dssdUfghSNSL",
    content:
      "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
    imageURL:
      "https://res.cloudinary.com/doigywl1z/image/upload/v1656089848/epic-sunrise-photos-fog_yhveh2.jpg",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "john_ferguson",

    comments: [
      {
        _id: uuid(),
        username: "john_ferguson",
        text: "Interesting thoughts!",
        name: "John Ferguson",
        avatarURL:
          "https://res.cloudinary.com/doigywl1z/image/upload/v1652959071/avatar1_vkolbj.jpg",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "natalieee",
        text: "Wow! Such amazing thoughts",
        name: "Natalie Robinson",
        avatarURL:
          "https://res.cloudinary.com/doigywl1z/image/upload/v1652959062/avatar6_puj5vv.jpg",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    createdAt: "2021-01-15T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "sdfjUUsddeeEEH23",
    content:
      "Instead of worrying about what you cannot control, shift your energy to what you can create.",
    imageURL: "",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "john_ferguson",

    comments: [
      {
        _id: uuid(),
        username: "kristee",
        text: "Totally agreed!",
        name: "Kristina Rogers",
        avatarURL:
          "https://res.cloudinary.com/doigywl1z/image/upload/v1652959071/avatar1_vkolbj.jpg",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "john_ferguson",
        text: "True!",
        name: "John Ferguson",
        avatarURL:
          "https://res.cloudinary.com/doigywl1z/image/upload/v1652959071/avatar1_vkolbj.jpg",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "natalieee",
        text: "Wow!",
        name: "Natalie Robinson",
        avatarURL:
          "https://res.cloudinary.com/doigywl1z/image/upload/v1652959062/avatar6_puj5vv.jpg",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    createdAt: "2022-03-15T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "dssdUSNfdfdfSL",
    content:
      "Accept yourself, love yourself, and keep moving forward. If you want to fly, you have to give up what weighs you down.",
    imageURL: "",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "natalieee",

    comments: [
      {
        _id: uuid(),
        username: "john_ferguson",
        text: "Interesting",
        name: "John Ferguson",
        avatarURL:
          "https://res.cloudinary.com/doigywl1z/image/upload/v1652959071/avatar1_vkolbj.jpg",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "natalieee",
        text: "Wow!",
        name: "Natalie Robinson",
        avatarURL:
          "https://res.cloudinary.com/doigywl1z/image/upload/v1652959062/avatar6_puj5vv.jpg",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    createdAt: "2022-03-15T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "sdffdgfjUUEEH23",
    content:
      "Live the Life of Your Dreams: Be brave enough to live the life of your dreams according to your vision and purpose instead of the expectations and opinions of others.",
    imageURL: "",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "elijah12",

    comments: [
      {
        _id: uuid(),
        username: "john_ferguson",
        text: "Interesting",
        name: "John Ferguson",
        avatarURL:
          "https://res.cloudinary.com/doigywl1z/image/upload/v1652959071/avatar1_vkolbj.jpg",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "natalieee",
        text: "Wow!",
        name: "Natalie Robinson",
        avatarURL:
          "https://res.cloudinary.com/doigywl1z/image/upload/v1652959062/avatar6_puj5vv.jpg",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    createdAt: "2022-07-05T10:55:06+05:30",
    updatedAt: formatDate(),
  },
];
