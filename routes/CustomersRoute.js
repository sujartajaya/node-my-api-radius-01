import express from "express";
import {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/Customers.js";

const router = express.Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomer);
router.post("/customers", createCustomer);
router.patch("/customers/:id", updateCustomer);
router.delete("/customers/:id", deleteCustomer);
export default router;
