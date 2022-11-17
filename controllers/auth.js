import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

const genToken = (info) => {
  return jwt.sign(info, process.env.JWT, { expiresIn: "7d" });
};

const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.status(200).json({
      _id: newUser._id,
      username: newUser.username,
      token: genToken({ user: newUser.id }),
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "Usuário não encontrado"));
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) return next(createError(400, "Senha incorreta"));
    res.status(200).json({
      _id: user._id,
      username: user.username,
      token: genToken({ user: user.id }),
    });
  } catch (error) {
    next(error);
  }
};
export { register, login };
