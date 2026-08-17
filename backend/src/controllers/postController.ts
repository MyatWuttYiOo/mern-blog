import { Request, Response } from "express";
import { Post } from "../models/Post.js";
interface AuthRequest extends Request {
  user?: {
    _id: string;
    id?: string;
  };
}
const postController = {
  // Get all posts
getAllPosts: async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string;
    
    let query = {};
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } }, 
          { content: { $regex: search, $options: "i" } }
        ]
      };
    }

    const posts = await Post.find(query)
      .populate("author", "username")
      .sort({ createdAt: -1 });

    return res.json(posts);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
},

  // Get post by ID
  getPostById: async (req: Request, res: Response) => {
    try {
      const post = await Post.findById(req.params.id).populate("author", "username");
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      return res.json(post);
    } catch (error: any) {
      return res.status(500).json({ message: error.message || "Server error fetching post" });
    }
  },

  // Create post
  createPost: async (req: AuthRequest, res: Response) => {
    try {
    const { title, content } = req.body;
    const newPost = await Post.create({
    title,
    content,
    author: req.user?._id || req.user?.id
    });
      return res.status(201).json(newPost);
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "Failed to create post" });
    }
  },

  // Delete post
  deletePost: async (req: Request, res: Response) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      return res.json({ message: "Post deleted successfully" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message || "Failed to delete post" });
    }
  },

  // Update post
  updatePost: async (req: Request, res: Response) => {
    try {
      const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) {
        return res.status(404).json({ message: "Post not found" });
      }
      return res.json(updated);
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "Failed to update post" });
    }
  }
};

export default postController;