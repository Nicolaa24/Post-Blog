import { Router } from "express";

import {
  createPost,
  deletePost,
  getAllPosts,
  getOnePost,
  getUserPosts,
  updatePost,
} from "../controllers/posts.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = new Router();

router.post("/", checkAuth, createPost);

router.get("/", getAllPosts);

router.get("/:id", getOnePost);

router.get("/user/posts", checkAuth, getUserPosts);

router.delete("/:id", checkAuth, deletePost);

router.put("/:id", checkAuth, updatePost);

export default router;
