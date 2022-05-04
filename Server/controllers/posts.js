import postMesseges from '../models/postSchema.js'


export const getPosts = async (req, res) => {
  try {
    const postCollection = await postMesseges.find()
    res.status(200).json(postCollection)
  } catch (error) {
    res.status(404).json(error)
  }
}

export const createPosts = async (req, res) => {
  const post = req.body
  const newPost = new postMesseges(post)
  
  try {
    await newPost.save()
    res.status(201).json(newPost)
  } catch (error) {
    res.status(403).json({
      messege: error
    })
  }
}

