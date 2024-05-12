import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password, fullName, gender } = req.body;
    if (password.includes(" "))
      return next("Password must not contain any white spaces");
    if (!username) return next("Username is required");
    if (!email) return next("Email is required");
    if (!fullName) return next("Name is required");
    if (!gender) return next("Gender is required");

    const userExists = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (userExists) {
      return userExists.username === username
        ? next("Username already exists")
        : next("Email already in use");
    }

    const avatar = `https://avatar.iran.liara.run/public/${gender === "male" ? "boy" : "girl"}?username=${username}`;

    const user = await User.create({
      username,
      email,
      password,
      fullName,
      avatar: avatar || "",
    });
    if (!user) return next("Failed to create an account");

    return res.status(201).json({
      success: true,
      message: "Account created",
      data: "",
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username) return next("Username is required");
    if (!password) return next("Password is required");

    const userData = await User.findOne({ username });
    if (!userData) return next("Invalid credentials");

    const isPassCorrect = await userData.comparePassword(password);
    if (!isPassCorrect) return next("Invalid credentials");

    const accessToken = await userData.generateAccessToken();

    const user = await User.findById(userData._id).select("-password");

    // Cookie options
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    return res.status(200).cookie("accessToken", accessToken, options).json({
      success: true,
      message: "Login success",
      data: { user, accessToken },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    // Cookie options
    const options = {
      // httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      httpOnly: false,
      secure: false,
    };

    return res.status(200).clearCookie("accessToken", options).json({
      success: true,
      message: "Logged out successfully",
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
