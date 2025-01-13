import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postSchema.js';

import { fixTags } from '../utils.js';

const router = express.Router();



export const getPosts = async (req, res) => {

  const { page } = req.query

  try {
    const LIMIT = 3;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

    res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createPost = async (req, res) => {
  const post = req.body;


  const newPostMessage = new PostMessage({
    ...post, creator: req.userId,
    tags: fixTags(req.body.tags),
    createdAt: new Date().toISOString()
  })

  try {
    await newPostMessage.save();
    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
}

export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
  } catch (error) {
    console.log(error)
  }
}


export const deleteComment = async (req, res) => {
  const { id } = req.params;
  const { comment_id } = req.params;


  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const post = await PostMessage.findById(id);

    post.comments = post.comments.filter(comment => comment.comment_id !== comment_id)

    const newPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json({ data: newPost.comments });

  } catch (error) {
    console.log(error)
  }

}

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  const allTags = tags.split(',');

  try {
    const titleRegex = new RegExp(searchQuery, "i");

    const allTagsAfterRegex = allTags.map(tag => new RegExp(tag, "i"));

    const searchObject = { title: { $regex: titleRegex } };
    const tagsObject = { tags: { $in: allTagsAfterRegex } };

    let searchCriteria = {};

    if (!searchQuery.trim() && !tags.length) {
      searchCriteria = {};
    } else if (!searchQuery.trim()) {
      searchCriteria = { tags: { $in: allTagsAfterRegex } };
    } else if (!tags.length) {
      searchCriteria = { title: { $regex: titleRegex } };
    } else {
      searchCriteria = { $or: [searchObject, tagsObject] };
    }

    const posts = await PostMessage.find(searchCriteria);

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const likePost = async (req, res) => {
  const { id } = req.params;


  try {
    if (!req.userId) { return res.json({ message: 'User is not authenticated!' }) }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const post = await PostMessage.findById(id);

    const index = post.likes.find(_id => _id === req.userId)

    if (index === undefined) {
      // like
      post.likes.push(req.userId)
    }
    else {
      //dislike
      post.likes = post.likes.filter((id) => { id !== String(req.userId) })
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error)
  }
}

export const likeComment = async (req, res) => {
  const { id } = req.params
  const { comment_id } = req.params

  try {
    if (!req.userId) { return res.json({ message: 'User is not authenticated!' }) }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const post = await PostMessage.findById(id)
    const commentChanged = post.comments.find(comment => comment.comment_id === comment_id)

    const index = commentChanged.likes.find(_id => _id === req.userId)

    if (index === undefined) {
      // like
      commentChanged.likes.push(req.userId)
      commentChanged.numLikes++
    }
    else {
      //dislike
      commentChanged.likes = commentChanged.likes.filter((id) => { id !== String(req.userId) })
      commentChanged.numLikes--
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })

    res.status(201).json(updatedPost)
  } catch (error) {
    console.log(error)
  }

}
export const editComment = async (req, res) => {
  const { id } = req.params
  const { comment_id } = req.params
  const { newComment } = req.body;


  try {
    if (!req.userId) { return res.json({ message: 'User is not authenticated!' }) }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const post = await PostMessage.findById(id)
    post.comments = post.comments.map(comment => comment.comment_id === comment_id ? { ...comment, text: newComment } : comment)


    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })



    res.status(201).json(updatedPost)
  } catch (error) {
    console.log(error)
  }

}
export const commentPost = async (req, res) => {
  const { id } = req.params
  const { value } = req.body

  try {
    const post = await PostMessage.findById(id)

    post?.comments.push(value)

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })

    res.status(201).json(updatedPost)
  } catch (error) {
    console.log(error)
  }

}



export default router;