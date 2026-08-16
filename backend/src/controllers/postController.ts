import { Request,Response } from "express";
import { Post } from "../models/Post.js";
const postController = {
   getAllPosts: async (req: Request, res: Response) => {
    const posts = await Post.find().populate("author", "username");    return res.json(posts);
    },
    getPostById: async (req: Request, res: Response) => {
   const post = await Post.findById(req.params.id).populate("author", "username");    return res.json(post);
   },
   createPost: async (req: Request, res: Response) => {
    const newPost = new Post({ ...req.body});
    await newPost.save();
    return res.status(201).json(newPost);
},
   deletePost: async (req: Request, res: Response) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted successfully" });  
 },
    updatePost: async (req: Request, res: Response) => {
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(updated); 
}
}
export default postController;