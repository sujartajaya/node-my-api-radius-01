import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getLogin,
  getUsername,
} from "../controllers/Users.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.post("/users", createUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.post("/user", getLogin);
router.post("/checkuser", getUsername);
export default router;
