import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Kristina",
    lastName: "Rogers",
    username: "kristee",
    password: "kristee123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: "Hello everyone! I am an aspiring fullstack developer",
    website: "https://kristee.netlify.app",
    avatarURL:
      "https://res.cloudinary.com/doigywl1z/image/upload/v1652959058/avatar3_mj0ghj.jpg",
    bookmarks: [],
  },
  {
    _id: uuid(),
    firstName: "John",
    lastName: "Ferguson",
    username: "john_ferguson",
    password: "123456",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: "Hey there! let's connect",
    website: "https://johnferguson.netlify.app",
    avatarURL:
      "https://res.cloudinary.com/doigywl1z/image/upload/v1652959071/avatar1_vkolbj.jpg",
    bookmarks: [],
  },
  {
    _id: uuid(),
    firstName: "Natalie",
    lastName: "Robinson",
    username: "natalieee",
    password: "123456",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: "Hello everyone! I am an aspiring fullstack developer",
    website: "https://natalie.netlify.app",
    avatarURL:
      "https://res.cloudinary.com/doigywl1z/image/upload/v1652959062/avatar6_puj5vv.jpg",
    bookmarks: [],
  },
  {
    _id: uuid(),
    firstName: "Elijah",
    lastName: "Fisher",
    username: "elijah12",
    password: "123456",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: "Hello everyone! I am an aspiring fullstack developer",
    website: "https://elijahfisher.netlify.app",
    avatarURL:
      "https://res.cloudinary.com/doigywl1z/image/upload/v1652959070/avatar4_c7wcoo.jpg",
    bookmarks: [],
  },
  {
    _id: uuid(),
    firstName: "Michael",
    lastName: "Hensley",
    username: "michaelH",
    password: "123456",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio: "Hello everyone! I am an aspiring fullstack developer",
    website: "https://kristee.netlify.app",
    avatarURL:
      "https://res.cloudinary.com/doigywl1z/image/upload/v1652959063/avatar5_pgqpvg.jpg",
    bookmarks: [],
  },
];
