import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getLogin,
  getUsername,
  getUserByCustomerId,
} from "../controllers/Users.js";
import { authorization, isAdmin } from "../controllers/Auth.js";
const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", authorization, getUser);
router.get("/users/customer/:id/:offset/:limit", getUserByCustomerId);
router.post("/users", authorization, createUser);
router.patch("/users/:id", authorization, updateUser);
router.delete("/users/:id", authorization, deleteUser);
router.post("/user", getLogin);
router.post("/checkuser", authorization, getUsername);
export default router;
