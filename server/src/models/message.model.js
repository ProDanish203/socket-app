import { Schema, model } from "mongoose";

const MessageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Sender Id is required"],
    },
    reciever: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Reciever Id is required"],
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Message = model("Message", MessageSchema);
