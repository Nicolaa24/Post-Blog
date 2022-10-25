import User from "../src/models/User.js";
import Post from "../src/models/Post.js";

import path, { dirname } from "path";
import { fileURLToPath } from "url";

export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const user = await User.findById(req.userId);

    if (req.files) {
      let fileName = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, "..", upload, fileName));

      const newPostWithImage = new Post({
        username: user.username,
        title,
        description,
        imageUrl: fileName,
        author: req.userId,
      });

      await newPostWithImage.save();
      await User.findOneAndUpdate(req.userId, {
        $push: { posts: newPostWithImage },
      });

      return res.status(200).json({ message: "The Post has been created" });
    }

    const newPostWithoutImage = new Post({
      username: user.username,
      title,
      description,
      imageUrl: "",
      author: req.userId,
    });

    await newPostWithoutImage.save();
    await User.findByIdAndUpdate(req.userId, {
      $push: { posts: newPostWithoutImage },
    });
    return res
      .status(200)
      .json({ message: "The Post has been created without image" });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort("-createdAt");
    const popularPosts = await Post.find().limit(5).sort("-views");

    if (!posts) {
      return res.status(404).json({ message: "Posts wasn't find " });
    }
    res.status(200).json({ posts, popularPosts });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const getOnePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });

    if (!post) {
      return res.status(404).json({ message: "Post wasn't find" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const PostsList = await Promise.all(
      user.posts.map((post) => {
        return Post.findById(post._id);
      })
    );
    res.status(200).json(PostsList);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post wasn't fined" });
    }

    await User.findByIdAndUpdate(req.userId, {
      $pull: { posts: req.params.id },
    });

    res.status(200).json({ message: "Post has been success deleted" });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, description, id } = req.body;
    const post = await Post.findById(id);

    if (req.files) {
      let fileName = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, "..", fileName));
      post.imgUrl = fileName || "";
    }

    post.title = title;
    post.description = description;

    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
