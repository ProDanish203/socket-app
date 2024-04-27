import { getPaginatedUsers } from "../utils/helpers.js";

export const getCurrentUser = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: "User fetched",
      data: req.user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 10);
    const search = req.query.search || "";
    const filter = req.query.filter || "";
    let sortDirection = 1;

    if (filter.toLowerCase() === "ztoa") {
      sortDirection = -1;
    }

    const users = await getPaginatedUsers({
      query: {
        username: { $regex: `^${search}`, $options: "i" },
        _id: { $ne: req.user._id },
      },
      page,
      limit,
      sort: { username: sortDirection },
    });

    return res.status(200).json({
      success: true,
      message: "All users",
      data: users,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
