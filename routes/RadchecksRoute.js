import express from "express";
import {
  getRadchecks,
  getRadcheck,
  createRadcheck,
  updateRadcheck,
  deleteRadcheck,
} from "../controllers/Radchecks.js";

const router = express.Router();
router.get("/radchecks", getRadchecks);
router.get("/radcheck/:id", getRadcheck); /** params = id user **/
router.post("/radchecks", createRadcheck);
router.patch("/radchecks/:id", updateRadcheck); /** param = id radcheck **/
router.delete("/radchecks/:id", deleteRadcheck); /** param = id radcheck **/

export default router;
