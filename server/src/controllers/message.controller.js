import { User } from "../models/user.model.js";
import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";

export const sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    const recieverId = req.params.id;
    const senderId = req.user._id;
    const reciever = await User.findById(recieverId);
    if (!reciever) return next("No such user found");

    // Find the chat if any
    let chat = await Chat.findOne({
      participants: { $all: [senderId, recieverId] },
    });
    // Create a chat if there is no existing chat between the users
    if (!chat) {
      chat = await Chat.create({
        participants: [senderId, recieverId],
      });
    }

    const newMessage = await Message.create({
      sender: senderId,
      reciever: recieverId,
      message,
    });

    if (newMessage) {
      chat.messages.push(newMessage._id);
      await chat.save();
    }

    return res.status(200).json({
      success: true,
      message: "Message sent",
      data: chat,
    });
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const userToChatId = req.params.id;
    const senderId = req.user._id;

    const chat = await Chat.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate({
      path: "messages",
      populate: [
        {
          path: "reciever",
          model: User,
          select: "username avatar",
        },
        {
          path: "sender",
          model: User,
          select: "username avatar",
        },
      ],
    });

    return res.status(200).json({
      success: true,
      message: "Messages fetched successfully",
      data: chat ? chat.messages : [],
    });
  } catch (error) {
    next(error);
  }
};

export const fnName = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
