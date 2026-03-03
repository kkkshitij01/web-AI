import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  generateWebsite,
  getWebsiteById,
  getAllWebsite,
  changes,
} from "../controllers/websiteControllers.js";
const websiteRouter = express.Router();

websiteRouter.post("/generate", isAuth, generateWebsite);
websiteRouter.get("/get-all", isAuth, getAllWebsite);
websiteRouter.post("/update/:id", isAuth, changes);
websiteRouter.get("/get-by-id/:id", isAuth, getWebsiteById);

export default websiteRouter;
