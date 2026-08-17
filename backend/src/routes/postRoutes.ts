import { Router } from "express";
const router = Router();
import postController from "../controllers/postController";
import { authenticate } from "../middleware/authMiddleware";
router.get('/',postController.getAllPosts);
router.post('/',authenticate,postController.createPost);
router.get('/:id',postController.getPostById);
router.delete('/:id',authenticate,postController.deletePost);
router.put('/:id',authenticate,postController.updatePost);

export default router;
