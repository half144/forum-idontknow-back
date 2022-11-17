import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) return next(createError(401, "Você não está autenticado"));
  try {
    const user = jwt.verify(token, process.env.JWT);
    req.user = user.user;
    next();
  } catch (error) {
    return next(createError(404, error));
  }
};

export const verifyUser = (req, res, next) => {
  const reqUserId = req.user;
  const { id: paramsId } = req.params;
  const { user: bodyId } = req.body;
  try {
    if (reqUserId !== (paramsId || bodyId))
      return next(createError(403, "Acesso negado"));
    next();
  } catch (error) {
    next(error);
  }
};
