import { Router } from "express";
import { deleteUser, getUser, updateUser } from "../controllers/user.js";
import { verifyToken, verifyUser } from "../middlewares/authGuard.js";

const router = Router();

router.put("/update/:id", verifyToken, verifyUser, updateUser);
router.delete("/delete/:id", verifyToken, verifyUser, deleteUser);
router.get("/:id", getUser);

export default router;
