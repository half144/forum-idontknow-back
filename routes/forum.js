import { Router } from "express";
import {
  createAwnser,
  createCommentAwnser,
  createQuestion,
  deleteAwnser,
  getAllQuestions,
  getQuestion,
  getSolveds,
  getUnsolveds,
  getUserQuestion,
  setSolved,
  updateAwnser,
} from "../controllers/forum.js";
import { verifyToken, verifyUser } from "../middlewares/authGuard.js";

const router = Router();

router.get("/solveds", getSolveds);
router.get("/unsolveds", getUnsolveds);
router.post("/create", verifyToken, verifyUser, createQuestion);
router.get("/question/:questionId", getQuestion);
router.put("/solve/:questionId/:awnserId", verifyToken, verifyUser, setSolved);
router.get("/:userId", getUserQuestion);
router.post("/:questionId", verifyToken, verifyUser, createAwnser);
router.put("/:questionId/:awnserId", verifyToken, verifyUser, updateAwnser);
router.post(
  "/:questionId/:awnserId",
  verifyToken,
  verifyUser,
  createCommentAwnser
);
router.delete("/:questionId/:awnserId", verifyToken, verifyUser, deleteAwnser);
router.get("/", getAllQuestions);

export default router;
