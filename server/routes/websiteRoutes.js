import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  generateWebsite,
  getWebsiteById,
  getAllWebsite,
  changes,
  deploy,
  deleteWebsite,
  getBySlug,
} from "../controllers/websiteControllers.js";
const websiteRouter = express.Router();

websiteRouter.post("/generate", isAuth, generateWebsite);
websiteRouter.get("/get-all", isAuth, getAllWebsite);
websiteRouter.post("/update/:id", isAuth, changes);
websiteRouter.get("/get-by-id/:id", isAuth, getWebsiteById);
websiteRouter.get("/deploy/:id", isAuth, deploy);
websiteRouter.delete("/delete/:id", isAuth, deleteWebsite);
websiteRouter.get("/get-by-slug/:slug", isAuth, getBySlug);
export default websiteRouter;
