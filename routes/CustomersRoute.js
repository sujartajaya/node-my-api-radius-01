import express from "express";
import {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getUserCustomers,
  createLogin,
  getCustomerById,
} from "../controllers/Customers.js";
import { authorization, isAdmin } from "../controllers/Auth.js";

const router = express.Router();
router.get("/customers", authorization, isAdmin, getCustomers);
router.get("/customers/:id", authorization, getCustomer); /** params = uuui */
router.get("/customers/user/:id", authorization, getUserCustomers);
router.get("/customer/:id", authorization, getCustomerById); /** param = id */
router.post("/customers", authorization, isAdmin, createCustomer);
router.post("/customer", authorization, isAdmin, createLogin);
router.patch("/customers/:id", authorization, updateCustomer);
router.delete("/customers/:id", authorization, isAdmin, deleteCustomer);
export default router;
