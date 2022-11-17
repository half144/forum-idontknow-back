import Awnser from "../models/Awnser.js";
import Question from "../models/Question.js";
import User from "../models/User.js";
import { createError } from "../utils/error.js";
import mongoose from "mongoose";

export const getQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.questionId);
    if (!question) return next(404, "Essa pergunta não existe");
    res.json(question);
  } catch (error) {
    next(error);
  }
};

export const setSolved = async (req, res, next) => {
  const { questionId, awnserId } = req.params;

  try {
    const question = await Question.findOneAndUpdate(
      { _id: questionId },
      {
        $set: {
          solved: true,
          "awnsers.$[awnser].isCorrectAwnser": true,
        },
      },
      {
        arrayFilters: [{ "awnser._id": mongoose.Types.ObjectId(awnserId) }],
        new: true,
      }
    );
    return res.send(question);
  } catch (error) {
    next(error);
  }
};

export const getUserQuestion = async (req, res, next) => {
  try {
    const question = await Question.find({ user: req.params.userId }).sort({
      createdAt: -1,
    });
    if (!question) return next(404, "Essa pergunta não existe");
    res.json(question);
  } catch (error) {
    next(error);
  }
};

export const getAllQuestions = async (req, res, next) => {
  try {
    const question = await Question.find().sort({ createdAt: -1 });
    res.json(question);
  } catch (error) {
    next(error);
  }
};
export const getSolveds = async (req, res, next) => {
  try {
    const question = await Question.find({ solved: true });
    res.json(question);
  } catch (error) {
    next(error);
  }
};
export const getUnsolveds = async (req, res, next) => {
  try {
    const question = await Question.find({ solved: false });
    res.json(question);
  } catch (error) {
    next(error);
  }
};

export const createQuestion = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.user);
    const newQuestion = new Question({
      username: user.username,
      ...req.body,
    });
    await newQuestion.save();
    return res.json(newQuestion);
  } catch (error) {
    return next(error);
  }
};

export const createAwnser = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.user);
    const newAwnser = new Awnser({ username: user.username, ...req.body });
    const question = await Question.findByIdAndUpdate(req.params.questionId, {
      $push: { awnsers: newAwnser },
    });
    if (!question) return next(createError(404, "Essa pergunta não existe"));
    res.json({ sucess: true });
  } catch (error) {
    next(error);
  }
};

export const updateAwnser = async (req, res, next) => {
  const { questionId, awnserId } = req.params;
  try {
    const question = await Question.findOneAndUpdate(
      { _id: questionId },
      {
        $set: { "awnsers.$[awnser].awnser": req.body.awnser },
      },
      {
        arrayFilters: [{ "awnser._id": mongoose.Types.ObjectId(awnserId) }],
        new: true,
      }
    );
    return res.send(question);
  } catch (error) {
    next(error);
  }
};

export const deleteAwnser = async (req, res, next) => {
  const { questionId, awnserId } = req.params;
  try {
    const question = await Question.findByIdAndUpdate(
      questionId,
      {
        $pull: { awnsers: { _id: mongoose.Types.ObjectId(awnserId) } },
      },
      {
        new: true,
      }
    );
    return res.send(question);
  } catch (error) {
    next(error);
  }
};

export const createCommentAwnser = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.user);
    const { questionId, awnserId } = req.params;
    const newAwnser = new Awnser({ username: user.username, ...req.body });
    const question = await Question.findByIdAndUpdate(
      questionId,
      {
        $push: { "awnsers.$[awnser].comments": newAwnser },
      },
      {
        arrayFilters: [{ "awnser._id": mongoose.Types.ObjectId(awnserId) }],
        new: true,
      }
    );
    if (!question) return next(createError(404, "Essa pergunta não existe"));
    res.json(question);
  } catch (error) {
    next(error);
  }
};
