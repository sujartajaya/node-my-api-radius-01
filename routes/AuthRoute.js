import express from "express";
import { Login, Lougout, cookiesAuth } from "../controllers/Auth.js";

const router = express.Router();
router.post("/login", Login);
router.get("/token", cookiesAuth);
router.delete("/logout", Lougout);
export default router;