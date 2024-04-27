import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoosePaginate from "mongoose-paginate-v2";
import validator from "validator";

const ChatSchema = new Schema(
  {
    hasUnreadChats: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);


export const Chat = model("Chat", ChatSchema);
