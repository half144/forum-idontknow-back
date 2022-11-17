import User from "../models/User.js";
import { createError } from "../utils/error.js";

export const updateUser = async (req, res, next) => {
  const reqUserId = req.user;
  try {
    const updatedUser = await User.findByIdAndUpdate(reqUserId, req.body, {
      new: true,
    }).select("-password");
    res.json(updatedUser);
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const reqUserId = req.user;
  try {
    const removedUser = await User.findByIdAndDelete(reqUserId);
    res.status(200).json({ sucess: true });
  } catch (error) {
    next(createError(500, error));
  }
};

export const getUser = async (req, res, next) => {
  const reqUserId = req.params.id;
  try {
    const userFinded = await User.findById(reqUserId).select("-password");
    if (!userFinded) return next(createError(404, "user not founded"));
    res.status(200).json(userFinded);
  } catch (error) {
    return next(error);
  }
};
