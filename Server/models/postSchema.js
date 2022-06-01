import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  messege: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
})

const postMessege = mongoose.model('postMessege', postSchema)

export default postMessege