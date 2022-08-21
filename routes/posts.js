import express from "express"
import {
  getPosts, createPost, getPost, updatePost, deletePost, likePost, commentPost, getPostsBySearch, likeComment
} from "../controllers/posts.js"

import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', auth, commentPost);
router.patch('/:id/commentPost/:comment_id', auth, likeComment);

export default router