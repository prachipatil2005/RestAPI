import express from "express";
import {
  create,
  deleteuser,
  fetch,
  update,
} from "../controller/userController.js";

const route = express.Router();

route.post("/create", create);
route.get("/getAllUsers", fetch);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteuser);

// route.get("/fetch", fetch);
export default route;
