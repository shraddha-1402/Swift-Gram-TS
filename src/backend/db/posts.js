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
      "ctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod  avoluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    imageURL:
      "https://res.cloudinary.com/doigywl1z/image/upload/v1652959058/avatar3_mj0ghj.jpg",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
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
  },
  {
    _id: "dssdUSNSL",
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui ",
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
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
