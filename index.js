import express from "express";
import dotenv from "dotenv";

import Customers from "./models/CustomersModel.js";
import Users from "./models/UsersModel.js";
import Radchecks from "./models/RadchecksModel.js";

import CustomersRoute from "./routes/CustomersRoute.js";
import UsersRoute from "./routes/UsersRoute.js";
import RadchecksRoute from "./routes/RadchecksRoute.js";

import { db } from "./db/Database.js";

const app = express();

dotenv.config();

const checkIP = (req, res, next) => {
  const ALLOWIP = [
    "2001:df7:5300:8::2c5",
    "103.191.63.241",
    "127.0.0.1",
    "2001:df7:5300:2::1c",
    "222.165.205.197",
    "180.249.186.23",
  ];
  const CLIENTIP = req.headers["x-forwarded-for"];

  if (ALLOWIP.includes(CLIENTIP)) {
    console.log("IP CLIENT = " + CLIENTIP);
    next();
  } else {
    console.log("IP CLIENT = " + CLIENTIP);
    res.status(403).send("Forbiden");
  }
};

process.env.TZ = "Asia/Makassar";

(async () => {
  await db.sync();
  await Customers.sync();
  await Users.sync();
  await Radchecks.sync();
})();

app.use(express.json());

//app.use(checkIP);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Welcome!" });
});

app.use(CustomersRoute);
app.use(UsersRoute);
app.use(RadchecksRoute);

app.listen(process.env.HTTP_PORT, () =>
  console.log(
    `Server running on port: http://localhost:${process.env.HTTP_PORT}`,
  ),
);
